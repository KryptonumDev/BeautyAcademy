import { NextResponse } from "next/server";
import { authenticate } from '@/lib/auth/authenticate';
import { v4 } from "uuid";
import { create } from "src/app/actions";

async function getProviderInput(provider, req) {
  const providerEnum = provider.toUpperCase()
  switch (providerEnum) {
    case 'PASSWORD': {
      const { username, password } = await req.json()
      return {
        clientMutationId: v4(),
        provider: providerEnum,
        credentials: {
          username: username,
          password: password,
        },
      };
    }
    default: {
      const { searchParams } = new URL(req.url)
      const code = searchParams.get('code')
      const state = searchParams.get('state')

      const input = {
        clientMutationId: v4(),
        provider: providerEnum,
        oauthResponse: {
          code: code,
        },
      }

      if (state) { // Not all providers send a state.
        input.oauthResponse.state = state;
      }

      return input;
    }
  }
}

async function handler(req, { params }) {
  const input = await getProviderInput(params.provider, req);

  try {
    const data = await authenticate(input);

    const user = {
      ...data,
      isLoggedIn: true,
    };
    let newCoockie = await create({ name: 'user', value: user, age: user.refreshTokenExpiration })
    // TODO: add cookie for auth token and refresh token

    if (params.provider === 'password') {
      return NextResponse.json({ success: true }, {
        headers: {
          'Set-Cookie': newCoockie
        }
      })
    } else {
      return NextResponse.redirect('/dashboard', {
        headers: {
          'Set-Cookie': newCoockie
        }
      })
    }
  } catch (e) {
    console.log(e)
    //TODO: add error handling
    // Do something with the error
    // NextResponse.status( 401 ).json( { error: e.message } );

    // Or redirect them to the login page.
    // return NextResponse.redirect('http://localhost:3000/dashboard/test')
  }
}

export { handler as GET, handler as POST }