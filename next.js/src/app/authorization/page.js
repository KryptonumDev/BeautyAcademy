import Authorization from "@/components/sections/authorization"
import React from "react"
import wpFetchData from "@/utils/wpFetchData"

export const dynamic = "force-dynamic"

export default async function AuthorizationProcess() {
  const { loginClients: providers } = await getData();

  return (
    <div>
      <Authorization providers={providers} />
    </div>
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
  `)
  return data;
}