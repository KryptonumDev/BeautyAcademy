'use client'
import React, { useState } from "react"
import styles from "./styles.module.scss"
import OAuthMethods from "@/components/organisms/oAuth-methods"
import Form from "@/components/organisms/authorization-form/index.js"

export default function Authorization({ providers }) {
  const [registration, setRegistration] = useState(false)

  let data = {
    register: {
      title: 'Регистрация',
      text: 'Зарегистрируйтесь, чтобы получить доступ к курсам Академии Красоты'
    },
    login: {
      title: 'Авторизация',
      text: 'Войдите в свой аккаунт, чтобы продолжить обучение'
    }
  }

  data = registration ? data.register : data.login

  return (
    <section className={styles.wrapper}>
      <h1>{data.title}</h1>
      <p>{data.text}</p>
      <div className={styles.flex}>
        {/* <OAuthMethods providers={providers} /> */}
        <div/>
        <Form type='global' registration={registration} setRegistration={setRegistration} />
      </div>
    </section>
  )
}