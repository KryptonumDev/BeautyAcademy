'use client'
import DashboardControl from "@/components/sections/dashboard-control"
import React, { useState } from "react"
import History from "./@history/layout"

export default function Account() {
  let [chosenSubPage, setSubPage] = useState("history")
  return (
    <div className="dashboard-layout">
      <DashboardControl chosenSubPage={chosenSubPage} setSubPage={setSubPage} />
      {(() => {
        switch (chosenSubPage) {
          case 'courses':
            return null
          case 'downloads':
            return null
          case 'history':
            return <History />
          case 'data':
            return null
          default:
            return null
        }
      })()}
    </div>
  )
}