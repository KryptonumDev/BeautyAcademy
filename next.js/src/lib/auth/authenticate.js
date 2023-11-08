import fetchData from "@/utils/fetchData";

export async function authenticate( variables ) {
  const query = `
    mutation Login($input: LoginInput!) {
      login(input: $input) {
        authToken
        refreshToken
      }
    }
  `;

  // replace fetchAPI with whatever you're using to connect to WPGraphQL.
  const res = await fetchData( query, { variables } );

  if ( res?.errors ) {
    throw new Error( res.errors[0].message );
  }

  return res?.data?.login;
}