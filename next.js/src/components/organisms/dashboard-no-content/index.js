import React from "react"
import styles from "./styles.module.scss"
import { Sygn } from "@/components/atoms/Icons"
import Button from "@/components/atoms/Button"

export default function NoContent({ text, link }) {
  return (
    <div className={styles.noOrders}>
      <Sygn />
      <h2>{text}</h2>
      <Button href={link.url}>{link.title}</Button>
    </div>
  )
}