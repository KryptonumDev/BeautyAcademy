import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  let status = searchParams.get('status')
  console.log(req.url)
  console.log(status)

  if (status === 'succeeded')
    return NextResponse.redirect(`https://beautyacademy.expert/payment-successful`)

  return NextResponse.redirect(`https://beautyacademy.expert/payment-failed`)
}