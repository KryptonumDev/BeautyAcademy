import React, { useEffect, useState } from "react"
import styles from "./styles.module.scss"
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "@/components/organisms/payment-form";
import Loader from "@/components/moleculas/request-loader";

export default function Payment({ input, cart }) {
  const [secretKey, setSecretKey] = useState(null);
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  debugger
  const paymentOptions = {
    clientSecret: secretKey,
    locale: 'ru',
    // currency: 'rub',
    fonts: [{
      family: 'Kapakana',
      src: 'url(../../../assets/fonts/Oranienbaum-Regular.woff2) format("woff2")',
      weight: 400,
    }],
    appearance: {
      variables: {
        borderRadius: '0'
        // fontFamily: 'Kapakana'
      },
      rules: {
        '.AccordionItem': {
          border: '1px solid var(--background-300, #F7EFEC)',
          backgroundColor: 'transparent',
          margin: '0px 0px 28px 0px',
          borderRadius: '0',
          boxShadow: 'none',
        },
        '.AccordionItem--selected': {
          border: '1px solid var(--background-600, #C9BBB7)',
          backgroundColor: 'var(--background-300, #F7EFEC)',
        },
        // '.Input': {
        //   backgroundColor: 'transparent',
        //   border: 'none',
        //   borderBottom: '0.5px solid var(--primary-700, #192A23)',
        //   boxShadow: 'none',
        //   borderRadius: '0',
        // },
        // '.p-AccordionButton': {
        //   fontSize: '20px',
        //   fontWeight: '400',
        //   fontFamily: 'var(--kapakana-font)'
        // },
      }
    }
  }

  useEffect(() => {
    fetch('http://localhost:3000/api/payment/create-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: cart.amount * 100 })
    })
      .then(res => res.json())
      .then(({ clientSecret }) => {
        setSecretKey(clientSecret)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className={styles.wrapper}>
      <h2>Выберите способ оплаты</h2>
      <div className={styles.form}>
        <Loader show={!secretKey}/>
        {secretKey && (
          <Elements options={paymentOptions} stripe={stripePromise} >
            <PaymentForm input={input} />
          </Elements>
        )}
      </div>
    </div>
  )
}