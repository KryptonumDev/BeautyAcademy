import React, { useState } from "react"
import styles from "./styles.module.scss"
import OAuthMethods from "@/components/organisms/oAuth-methods"
import Form from "@/components/organisms/authorization-form/index.js"

export default function Authorization({ nextStep, providers }) {
  const [registration, setRegistration] = useState(false)

  let data = {
    register: {
      text: 'Создайте аккаунт для просмотра курсов'
    },
    login: {
      text: 'Войдите в свой аккаунт'
    }
  }

  data = registration ? data.register : data.login

  return (
    <section className={styles.wrapper}>
      <h2>{data.text}</h2>
      <div className={styles.flex}>
        <OAuthMethods providers={providers} />
        <Form nextStep={nextStep} registration={registration} setRegistration={setRegistration} />
      </div>
    </section>
  )
}