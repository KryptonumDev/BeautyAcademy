// import { NextResponse } from "next/server";
import { v4 } from "uuid";
// import { create } from "src/app/actions";
import { register } from "@/lib/auth/register";

export async function POST(req) {
  const { email, name, password } = await req.json()
  const input = {
    clientMutationId: v4(),
    email: email,
    firstName: name,
    password: password,
  };

  try {
    const data = await register(input);
    console.log(data)
    // add login..?
    // or maybe redirect to thanks for registration

    // const user = {
    //   ...data,
    //   isLoggedIn: true,
    // };
    // let newCoockie = await create({ name: 'user', value: JSON.stringify(user), age: user.refreshTokenExpiration })


    // return NextResponse.redirect('/dashboard', {
    //   headers: {
    //     'Set-Cookie': newCoockie
    //   }
    // })
  } catch (e) {
    console.log(e)
    // Do something with the error
    // NextResponse.status( 401 ).json( { error: e.message } );

    // Or redirect them to the login page.
    // return NextResponse.redirect('http://localhost:3000/dashboard/test')
  }
}