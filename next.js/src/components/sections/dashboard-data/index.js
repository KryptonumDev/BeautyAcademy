import React, { Suspense } from "react"
import styles from "./styles.module.scss"
import Content from "./content-wrap"
import Loader from "@/components/moleculas/request-loader"

export default function Data() {

  return (
    <section className={styles.wrapper}>
      <div>
        <h1>Мои данные</h1>
        <p className={styles.text}>Здесь вы найдете и измените свои данные.</p>
      </div>
      <Suspense fallback={<Loader show={true} />}>
        <Content />
      </Suspense>
    </section>
  )
}