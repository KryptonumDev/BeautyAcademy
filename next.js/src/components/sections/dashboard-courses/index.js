import React, { Suspense } from "react"
import styles from "./styles.module.scss"
import Loader from "@/components/moleculas/request-loader"
import Content from "./content"

export default function Courses() {
  return (
    <section className={styles.wrapper}>
      <h1>Мои курсы</h1>
      <Suspense fallback={<Loader show={true} />}>
        <Content />
      </Suspense>
    </section>
  )
}