import React, { Suspense } from "react"
import Loading from "./loading"
import Page from "./page"

export default function History() {
  console.log('history')
  return (
    <Suspense fallback={<Loading />}>
      <Page />
    </Suspense>
  )
}