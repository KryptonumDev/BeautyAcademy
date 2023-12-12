export async function register(input) {
  const query = `
    mutation Login($input: RegisterCustomerInput!) {
      registerCustomer(input: $input) {
        customer {
          sessionToken
        }
        viewer{
          name
          id
        }
        authToken
        refreshToken
      }
    }
  `;

  const res = await fetch('https://wp.beautyacademy.expert/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query,
      variables: {input: input}
    }),
    next: {
      revalidate: 0,
    },
  }).then((res) => res.json());

  if (res?.errors) {
    throw new Error(res.errors[0].message);
  }

  return res?.data?.registerCustomer;
}