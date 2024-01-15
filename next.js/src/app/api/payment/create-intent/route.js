import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const { amount, currency = 'usd' } = await req.json()
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      // automatic_payment_methods: {
      //   enabled: true,
      // },
      payment_method_types: [
        // 'blik', PLN
        'card', 
        // 'p24', EUR / PLN
        // 'paypal', not work
        // 'klarna' EUR / PLN
      ],
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