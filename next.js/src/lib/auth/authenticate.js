import wpFetchData from "@/utils/wpFetchData";
import { v4 } from "uuid";

export async function authenticate(variables) {
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
  // replace fetchAPI with whatever you're using to connect to WPGraphQL.
  const res = await wpFetchData(query, {
    input: {
      clientMutationId: v4(),
      ...variables,
    }
  });

  if (res?.errors) {
    throw new Error(res.errors[0].message);
  }

  return res?.body?.data?.login;
}