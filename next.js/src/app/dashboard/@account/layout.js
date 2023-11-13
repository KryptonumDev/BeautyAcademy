'use client'
import DashboardControl from "@/components/sections/dashboard-control"
import React, { useState } from "react"

export default function Account({ downloads, history, courses, data }) {
  let [chosenSubPage, setSubPage] = useState("courses")
  return (
    <div className="dashboard-layout">
      <DashboardControl chosenSubPage={chosenSubPage} setSubPage={setSubPage} />
      {(() => {
        switch (chosenSubPage) {
          case 'courses':
            return courses
          case 'downloads':
            return downloads
          case 'history':
            return history
          case 'data':
            return data
          default:
            return courses
        }
      })()}
    </div>
  )
}