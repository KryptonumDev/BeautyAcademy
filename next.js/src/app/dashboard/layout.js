import DashboardControl from "@/components/sections/dashboard-control"
import React from "react"

export default function Account({ children }) {
  return (
    <div className="dashboard-layout">
      <DashboardControl/>
      {children}
    </div>
  )
}