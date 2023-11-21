import React from "react"
import styles from "./styles.module.scss"
import Button from "@/components/atoms/Button"
import { Sygn } from "@/components/atoms/Icons"

export default function NoContent({ text, link }) {
  return (
    <div className={styles.noOrders}>
      <Sygn />
      <h2>{text}</h2>
      <Button href={link.url}>{link.title}</Button>
    </div>
  )
}