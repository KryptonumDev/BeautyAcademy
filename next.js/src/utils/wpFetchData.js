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

const wpFetchData = async (query, variables, revalidate = 0) => {
  try {
    const headers = { 'Content-Type': 'application/json' };

    const authToken = await (async () => {
      // if (typeof document === 'undefined') return null
      // TODO: check if auth needed
      let authToken = await read('authToken');
      let refreshToken = await read('refreshToken');

      if (!authToken && !refreshToken) return null

      let newToken = await fetch('http://localhost:3000/api/auth/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          authToken: authToken?.value,
          refreshToken: refreshToken?.value,
        })
      })
        .then(async res => res.json())
        .then(async (res) => {
          if (res.error) {
            console.log(res.error)
            return null
          }
          return res.authToken
        })

      return newToken
    })()

    let sessionToken = await (async () => {
      // if (typeof document === 'undefined') return null
      return await read('woocommerce-session')
    })()

    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    if (sessionToken) {
      headers['woocommerce-session'] = `Session ${sessionToken.value}`;
    }

    const response = await fetch('https://wp.beautyacademy.expert/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        ...{ query },
        ...(variables ? { variables } : {}),
      }),
      next: {
        revalidate: revalidate,
      },
    });

    if (!sessionToken) {
      sessionToken = response.headers?.get('woocommerce-session')

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