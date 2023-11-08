import { read } from "src/app/actions";

const wpFetchData = async (query, variables) => {
  try {
    const currentUser = await read('user');
    console.log( currentUser );
    const headers = { 'Content-Type': 'application/json' };
  
    if( currentUser?.authToken ) {
      headers['Authorization'] = `Bearer ${currentUser.authToken}`;
    }

    if ( currentUser?.wooSessionToken ) {
      headers['woocommerce-session'] = `Session ${currentUser.wooSessionToken}`;
    }
  

    const response = await fetch(process.env.WP_ENDPOINT, {
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