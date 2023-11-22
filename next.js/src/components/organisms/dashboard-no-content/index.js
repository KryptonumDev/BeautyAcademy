import React from "react"
import styles from "./styles.module.scss"

export default function NoContent({ text, link }) {
  return (
    <div className={styles.noOrders}>
      <Sygn />
      <h2>{text}</h2>
      <Button href={link.url}>{link.title}</Button>
    </div>
  )
}