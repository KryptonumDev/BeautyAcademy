import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  let redirect_status = searchParams.get('status')

  if (redirect_status === 'succeeded')
    return NextResponse.redirect(`https://beautyacademy.expert/payment-successful`)
  
  return NextResponse.redirect(`https://beautyacademy.expert/payment-failed`)
}

