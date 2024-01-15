'use client'
import React, { useContext, useState } from "react"
import styles from './styles.module.scss'
import Steps from "@/components/organisms/checkout-steps"
import PersonalData from "@/components/organisms/checkout-personal-data/index.js"
import Authorization from "../../organisms/checkout-authorization"
import { read } from "src/app/actions"
import Payment from "../../organisms/checkout-payment"
import Summary from "../../organisms/checkout-summary"
import { AppContext } from "src/context/app-context"

const stepNames = {
  1: 'Ваши данные',
  2: 'Доставка',
  3: 'Авторизация',
  4: 'Подтверждение заказа',
  5: 'Оплата',
}

const stepContent = (props) => ({
  1: <PersonalData {...props} />,
  2: null,
  3: <Authorization {...props} />,
  4: <Summary {...props} />,
  5: <Payment {...props} />,
})

export default function Content({ providers }) {
  const register = true
  const delivery = false

  const [cart, setCart] = useContext(AppContext)
  const [step, setStep] = useState(1)
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
  // const [orderData, setOrderData] = useState(null);

  const steps = [
    { id: 0, name: 'Корзина' },
    { id: 1, name: 'Ваши данные' },
    delivery && { id: 2, name: 'Доставка' },
    register && { id: 3, name: 'Авторизация' },
    { id: 4, name: 'Подтверждение заказа' },
    { id: 5, name: 'Оплата' }
  ].filter(Boolean)

  const nextStep = async () => {
    const user = await read('refreshToken')

    let nextStep = step + 1

    if (nextStep === 2 && !delivery) nextStep++
    if (nextStep === 3 && (!register || user)) nextStep++

    setStep(nextStep)
  }

  return (
    <section className={styles.wrapper}>
      <h1>{stepNames[step]}</h1>
      <Steps steps={steps} step={step} />
      {stepContent({ nextStep, setStep, input, setInput, providers, cart, setCart })[step]}
    </section>
  )
}