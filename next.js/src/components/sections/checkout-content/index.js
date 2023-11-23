'use client'
import React, { useState } from "react"
import styles from './styles.module.scss'
import Steps from "@/components/organisms/checkout-steps"

const stepNames = {
  1: 'Ваши данные',
  2: 'Доставка',
  3: 'Авторизация',
  4: 'Способ оплаты',
  5: 'Подтверждение заказа'
}

export default function Content({ data }) {

  const [step, setStep] = useState(1)

  return (
    <section className={styles.wrapper}>
      <h1>{stepNames[step]}</h1>
      <Steps step={step} />
    </section>
  )
}