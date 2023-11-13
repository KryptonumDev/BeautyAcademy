const wpFetchData = async (query, variables, withUser = true) => {
  try {
    // let currentUser

    if (withUser) {
      // currentUser = await fetch('/api/auth/user').then(res => res.json());
      // const userData = JSON.parse(user.value)
    }

    const headers = { 'Content-Type': 'application/json' };

    // if (currentUser?.authToken) {
    //   headers['Authorization'] = `Bearer ${userData.authToken}`;
    // }

    // if (currentUser?.wooSessionToken) {
    //   headers['woocommerce-session'] = `Session ${userData.sessionToken}`;
    // }


    const response = await fetch('https://wp.beautyacademy.expert/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        ...{ query },
        ...(variables ? { variables } : {}),
      }),
      next: {
        revalidate: 100,
      },
    });

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