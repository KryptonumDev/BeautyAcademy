'use client'
import React, { useContext, useEffect, useState } from "react"
import styles from './styles.module.scss'
import Steps from "@/components/organisms/checkout-steps"
import PersonalData from "@/components/organisms/checkout-personal-data/index.js"
import { AppContext } from "src/context/app-context"
import Authorization from "../../organisms/checkout-authorization"
import { read } from "src/app/actions"
import Payment from "../../organisms/checkout-payment"
import Summary from "../../organisms/checkout-summary"

const stepNames = {
  1: 'Ваши данные',
  2: 'Доставка',
  3: 'Авторизация',
  4: 'Способ оплаты',
  5: 'Подтверждение заказа'
}

const stepContent = (props) => ({
  1: <PersonalData {...props} />,
  2: null,
  3: <Authorization {...props} />,
  4: <Payment {...props} />,
  5: <Summary {...props} />,
})

export default function Content({ providers }) {
  const register = true
  const delivery = false

  const [cart, setCart] = useContext(AppContext);
  const [step, setStep] = useState(5)
  const [input, setInput] = useState({
    "firmOrder": false,
    "billingDifferentThanShipping": true,
    "shipping": {
        "firstName": "Tets ",
        "address1": "test",
        "city": "test",
        "country": "PL",
        "postcode": "12-123",
        "email": "test@test.tes",
        "phone": "123123123",
        "company": ""
    },
    "billing": {
        "firstName": "Tets ",
        "address1": "test",
        "city": "test",
        "country": "PL",
        "postcode": "12-123",
        "email": "test@test.tes",
        "phone": "123123123",
        "company": ""
    },
    "paymentMethod": { name: 'card', title: 'Кредитная карта' }
  });
  const [orderData, setOrderData] = useState(null);

  const steps = [
    { id: 0, name: 'Корзина' },
    { id: 1, name: 'Ваши данные' },
    delivery && { id: 2, name: 'Доставка' },
    register && { id: 3, name: 'Авторизация' },
    { id: 4, name: 'Способ оплаты' },
    { id: 5, name: 'Подтверждение заказа' }
  ].filter(Boolean)

  const nextStep = async () => {
    const user = await read('user')

    let nextStep = step + 1

    if (nextStep === 2 && !delivery) nextStep++
    if (nextStep === 3 && (!register || user)) nextStep++

    setStep(nextStep)
  }

  return (
    <section className={styles.wrapper}>
      <h1>{stepNames[step]}</h1>
      <Steps steps={steps} step={step} />
      {stepContent({ nextStep, setStep, input, setInput, providers })[step]}
    </section>
  )
}