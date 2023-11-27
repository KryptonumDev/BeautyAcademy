import React from "react"
import styles from "./styles.module.scss"
import { Logo } from "@/components/atoms/Icons"

export default function Hero({
  data: {
    hero_Paragraph,
    hero_Heading
  }
}) {
  return (
    <section className={styles.wrapper}>
      <Logo className={styles.logo} aria-label="Beauty Academy" />
      <p>{hero_Paragraph}</p>
      <h1>{hero_Heading}</h1>
    </section>
  )
}