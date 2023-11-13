import React from "react"
import { read } from "../actions"

export default async function DashboardLayout({ account, authorization }) {
  const logged = await read('user')
  return (
    <div>
      {logged ? account : authorization}
    </div>
  )
}