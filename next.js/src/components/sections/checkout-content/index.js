'use client'
import React, { useContext, useState } from "react"
import styles from './styles.module.scss'
import Steps from "@/components/organisms/checkout-steps"
import PersonalData from "@/components/organisms/checkout-personal-data.js"
import { AppContext } from "src/context/app-context"
import Authorization from "../checkout-authorization"

const stepNames = {
  1: 'Ваши данные',
  2: 'Доставка',
  3: 'Авторизация',
  4: 'Способ оплаты',
  5: 'Подтверждение заказа'
}

const stepContent = (props) => ({
  1: <PersonalData {...props} />,
  2: <Authorization {...props} />,
  3: null,
  4: null,
  5: null,
})

export default function Content({ providers }) {

  const [cart, setCart] = useContext(AppContext);
  const [step, setStep] = useState(2)
  const [input, setInput] = useState({});
  const [orderData, setOrderData] = useState(null);

  const nextStep = () => {
    let next = step

    if (step === 1 && 'delivery')
      next += 1
    else if (step === 1 && 'registration')
      next += 2
    else
      next += 3

    if (step === 2 && 'registration')
      next += 1
    else
      next += 2

    if (step === 3)
      next += 1

    if (step === 4)
      next += 1

    setStep(next)
  }

  return (
    <section className={styles.wrapper}>
      <h1>{stepNames[step]}</h1>
      <Steps step={step} delivery={false} registration={true} />
      {stepContent({ nextStep, input, setInput, providers })[step]}
    </section>
  )
}