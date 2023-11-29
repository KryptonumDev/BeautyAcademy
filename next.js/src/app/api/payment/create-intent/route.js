import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function POST(req) {
  const { amount, currency = 'pln' } = await req.json()
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      // automatic_payment_methods: {
      //   enabled: true,
      // },
      payment_method_types: ['blik', 'card', 'p24', 'paypal', 'google_pay', 'apple_pay'],
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id,
    }, { status: 200 });
  }
  catch (err) {
    console.log(err)
    return NextResponse.error(err, {
      status: 400,
    });
  }
}