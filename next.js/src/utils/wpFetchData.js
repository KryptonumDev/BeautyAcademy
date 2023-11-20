import { create, read } from "src/app/actions";

const wpFetchData = async (query, variables) => {
  try {
    let currentUser = await (async () => {
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

    const headers = { 'Content-Type': 'application/json' };

    if (currentUser?.authToken) {
      headers['Authorization'] = `Bearer ${currentUser.authToken}`;
    }

    if (currentUser?.sessionToken) {
      headers['woocommerce-session'] = `Session ${currentUser.sessionToken}`;
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
      await create('user', currentUser)
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