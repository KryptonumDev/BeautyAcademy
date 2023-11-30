"use client";
import Button from "@/components/atoms/Button";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import styles from "./styles.module.scss";

export default function PaymentForm({ input }) {
  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmPayment({ // TODO: webhook for payment result
      elements,
      redirect: 'if_required',
      confirmParams: {
        return_url: `https://beautyacademy.expert/api/payment/intent-result-redirector`
      }
    })

    if (error) {
      // TODO:
    }

    if (paymentIntent?.status === 'succeeded' && typeof window !== 'undefined') {
      window.location.href = `https://beautyacademy.expert/payment-successful`
      // ?id=${orderNumber}&redirect_status=${paymentIntent.status}&payment_intent=${paymentIntent.id}&payment_intent_client_secret=${clientSecret}
    }

    if (paymentIntent?.last_payment_error) {
      // TODO:
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <PaymentElement options={{
        layout: {
          type: 'accordion',
          defaultCollapsed: false,
          radios: true,
          spacedAccordionItems: true,
        },
        defaultValues: {
          billingDetails: {
            name: input.billing.firstName,
            email: input.billing.email,
            phone: input.billing.phone,
            address: {
              country: '',
              postal_code: input.billing.postcode,
              state: '',
              city: input.billing.city,
              line1: input.billing.address1,
            }
          }
        },
      }} />
      <Button type="submit">Оплачиваю</Button>
    </form>
  );
}