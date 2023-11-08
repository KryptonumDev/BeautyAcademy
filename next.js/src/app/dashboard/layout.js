import React from "react"

export default function DashboardLayout({ account, authorization }) {
  const logged = false

  return (
    <div>
      {logged ? account : authorization}
    </div>
  )
}