import { read } from "src/app/actions";

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

const wpFetchData = async (query, variables, needAuthorization = false) => {
  try {
    let currentUser = await (async () => {
      if(!needAuthorization) return {}
      
      let user = await read('user');

      if (!user) return {}

      let newUser = await fetch('http://localhost:3000/api/auth/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: user?.value
      })
        .then(async res => res.json())
        .then(async (res) => {
          if (res.error) {
            console.log(res.error)
            return {}
          }
          return res.user
        })

      return newUser
    })()
    let session = await read('woocommerce-session') || currentUser?.sessionToken //TODO: rework
    session = session?.value || session

    const headers = { 'Content-Type': 'application/json' };

    if (currentUser?.authToken) {
      headers['Authorization'] = `Bearer ${currentUser.authToken}`;
    }

    if (session) {
      headers['woocommerce-session'] = `Session ${session}`;
    }

    const response = await fetch('https://wp.beautyacademy.expert/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        ...{ query },
        ...(variables ? { variables } : {}),
      }),
      next: {
        revalidate: 0,
      },
    });

    const sessionToken = response.headers?.get('woocommerce-session')

    if (sessionToken) {
      currentUser.sessionToken = sessionToken
      if (typeof document !== 'undefined')
        setCookie('woocommerce-session', sessionToken, 30)
    }

    const body = await response.json();
    if (body.errors) {
      throw body.errors[0];
    }

    return { body };
  } catch (error) {
    throw {
      status: error.status || 500,
      message: error.message,
      query,
    };
  }
};

export default wpFetchData;