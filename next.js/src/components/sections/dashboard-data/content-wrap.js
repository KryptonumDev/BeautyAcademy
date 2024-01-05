import React from "react";
import Contentfull from "./content";
import wpFetchData from "@/utils/wpFetchData";

export default async function Content() {
  const { customer } = await getData();

  return (
    <Contentfull customer={customer} />
  )
}

const getData = async () => {
  const { body: { data } } = await wpFetchData(`
    query {
      customer {
        billing {
          firstName
          address1
          country
          city
          postcode
          phone
          company
        }
      }
    }
  `, {}, 300)
  return data;
}