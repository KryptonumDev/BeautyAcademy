'use client'
import React, { useState } from "react"
import styles from "./styles.module.scss"
import OAuthMethods from "@/components/organisms/oAuth-methods"

export default function Authorization({ data, providers }) {
  const [registration, setRegistration] = useState(false)

  data = registration ? data.register : data.login

  return (
    <section className={styles.wrapper}>
      <h1>{data.title}</h1>
      <p>{data.text}</p>
      <div className={styles.flex}>
        <OAuthMethods providers={providers}/>
      </div>
    </section>
  )
}