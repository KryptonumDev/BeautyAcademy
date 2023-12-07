import React, { Suspense } from "react"
import styles from "./styles.module.scss"
import Loader from "@/components/moleculas/request-loader"
import Content from "./content"

export default function Orders() {
  return (
    <section className={styles.wrapper}>
      <h1>История покупок</h1>
      <p>Здесь вы найдете все ваши предыдущие заказы.</p>
      <Suspense fallback={<Loader show={true} />}>
        <Content />
      </Suspense>
    </section>
  )
}