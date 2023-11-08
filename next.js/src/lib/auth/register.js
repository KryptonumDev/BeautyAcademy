import wpFetchData from "@/utils/wpFetchData";
import { v4 } from "uuid";

export async function register(variables) {
  const query = `
    mutation Login($input: RegisterCustomerInput!) {
      registerCustomer(input: $input) {
        customer {
          sessionToken
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

  return res?.body?.data?.registerCustomer;
}