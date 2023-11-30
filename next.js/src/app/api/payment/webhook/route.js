import { NextResponse } from "next/server";

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_5d5a3f789e9d5f1bce7b62865a6a7c88697bf9333a0e021c8c6d249cbd7c0c67";

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function POST(req) {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }


  switch (event.type) {
    case 'payment_intent.succeeded':
      // const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      //TODO: update an order
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }


  return NextResponse.json({
    // clientSecret: paymentIntent.client_secret,
    // id: paymentIntent.id,
  }, { status: 200 });
}