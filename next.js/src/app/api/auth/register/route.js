import { NextResponse } from "next/server";
import { v4 } from "uuid";
import { register } from "@/lib/auth/register";
import { decode } from "jsonwebtoken";

export async function POST(req) {
  const { email, name, password, type } = await req.json()
  const input = {
    clientMutationId: v4(),
    email: email,
    firstName: name,
    password: password,
  };

  try {
    const data = await register(input);

    const setCookie = async (response) => {
      response.cookies.set('user', JSON.stringify(data.viewer), { expires: new Date(decode(data.refreshToken).exp * 1000), secure: true, httpOnly: true, sameSite: 'strict' })
      response.cookies.set('authToken', data.authToken, { expires: new Date(decode(data.authToken).exp * 1000), sameSite: 'strict' })
      response.cookies.set('refreshToken', data.refreshToken, { expires: new Date(decode(data.refreshToken).exp * 1000), secure: true, httpOnly: true, sameSite: 'strict' })

      return response
    }
    if (type === 'local') {
      let response = NextResponse.json({ success: true })
      return await setCookie(response)
    } else {
      let response = NextResponse.json({ redirect: '/dashboard/my-courses' })
      return await setCookie(response)
    }
  } catch (e) {
    console.log(e)
    return NextResponse.json({ success: false, error: e.message })
  }
}