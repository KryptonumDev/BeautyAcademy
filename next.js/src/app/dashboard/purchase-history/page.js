import wpFetchData from "@/utils/wpFetchData";
import React from "react"

export default async function Page() {
  const data = await getData();
  console.log('history')

  return (
    <div>
      children
    </div>
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