import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function POST(req) {
  const { amount } = await req.json()
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "pln",
      payment_method_types: ['blik'],
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
};