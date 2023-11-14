import Orders from "@/components/sections/orders";
import wpFetchData from "@/utils/wpFetchData";
import React from "react"

export default async function Page() {
  const data = await getData();
  return (
    <Orders data={data.customer} />
  )
}

const getData = async () => {
  const { body: { data } } = await wpFetchData(`
    query {
      customer {
        id
        orders {
          nodes {
            total(format: FORMATTED)
            status
            orderKey
            orderNumber
            paymentMethod
            date
          }
        }
      }
    }
  `)
  return data;
}