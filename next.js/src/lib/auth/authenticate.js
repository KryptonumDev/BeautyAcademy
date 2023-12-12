export async function authenticate(input) {
  const query = `
    mutation Login($input: LoginInput!) {
      login(input: $input) {
        authToken
        refreshToken
        authTokenExpiration
        refreshTokenExpiration
        sessionToken
        user{
          name
          id
        }
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

  return res?.data?.login;
}