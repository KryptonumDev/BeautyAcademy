import React, { Suspense } from "react"
import Loading from "./loading"
import Page from "./page"

export default function History() {
  return (
    <Suspense fallback={<Loading />}>
      <Page />
    </Suspense>
  )
}