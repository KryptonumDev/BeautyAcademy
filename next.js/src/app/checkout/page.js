import Content from "@/components/sections/checkout-content";
import wpFetchData from "@/utils/wpFetchData";

export const dynamic = "force-dynamic"

export default async function Checkout() {
  const { loginClients: providers } = await getData();

  return (
    <Content providers={providers} />
  )
}

const getData = async () => {
  const { body: { data } } = await wpFetchData(`
    query getData {
      loginClients {
          provider
          authorizationUrl
      }
    }
  `, {}, 300)
  return data;
}