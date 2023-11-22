import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'

const headers = {
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Authorization": `Bearer ${process.env.MAILERLITE_API_KEY}`
};

export async function POST(req) {
  try {
    const requestBody = await req.json();
    req.subscribed_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const response = await fetch(`https://connect.mailerlite.com/api/subscribers`, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    });
    const responseBody = await response.json();

    if (responseBody?.data?.email) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false }, { status: 500 });
    }
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}