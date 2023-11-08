'use client'
import React, { useState } from "react"

export default function Account({ downloads, history, courses, data }) {
  let [chosenSubPage, setSubPage] = useState("courses")

  return (
    <div>
      <button onClick={() => {setSubPage('courses')}}>
        КУРСЫ
      </button>
      <button onClick={() => {setSubPage('downloads')}}>
        ФАЙЛЫ
      </button>
      <button onClick={() => {setSubPage('history')}}>
        ИСТОРИЯ
      </button>
      <button onClick={() => {setSubPage('data')}}>
        ДАТА
      </button>
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