"use client";
import Button from "@/components/atoms/Button";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import styles from "./styles.module.scss";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmPayment({ // TODO: webhook for payment result
        elements,
        redirect: 'if_required',
        confirmParams: {
            return_url: `http://localhost:3000/api/payment/complete-payment`
        }
    })

    if (error) {
      // TODO:
    }

    if (paymentIntent?.status === 'succeeded' && typeof window !== 'undefined') {
        // window.location.href = `https://auto-welt.info/api/complete-payment?id=${orderNumber}&redirect_status=${paymentIntent.status}&payment_intent=${paymentIntent.id}&payment_intent_client_secret=${clientSecret}`
    }

    if (paymentIntent?.last_payment_error) {
      // TODO:
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <PaymentElement />
      <Button type="submit">Оплачиваю</Button>
    </form>
  );
}