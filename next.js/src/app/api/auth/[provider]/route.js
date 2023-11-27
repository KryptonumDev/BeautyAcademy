import { NextResponse } from "next/server";
import { authenticate } from '@/lib/auth/authenticate';
import { v4 } from "uuid";

async function getProviderInput(provider, searchParams, username, password) {
  const providerEnum = provider.toUpperCase()
  switch (providerEnum) {
    case 'PASSWORD': {
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
  const { type, username, password } = await req.json()
  const { searchParams } = new URL(req.url)
  const input = await getProviderInput(params.provider, searchParams, username, password);

  try {
    const data = await authenticate(input);

    const setCookie = (response) => {
      response.cookies.set('user', JSON.stringify(data.user), { expires: new Date(data.refreshTokenExpiration * 1000), secure: true, httpOnly: true, sameSite: 'strict' })
      response.cookies.set('woocommerce-session', data.sessionToken)
      response.cookies.set('authToken', data.authToken, { expires: new Date(data.authTokenExpiration * 1000), sameSite: 'strict' })
      response.cookies.set('refreshToken', data.refreshToken, { expires: new Date(data.refreshTokenExpiration * 1000), secure: true, httpOnly: true, sameSite: 'strict' })

      return response
    }

    if (type === 'local' && params.provider === 'password') { // login in checkout by password

      let response = NextResponse.json({ success: true })
      return setCookie(response)

    } else if (type === 'local') { // login in checkout page by external provider

      let response = NextResponse.redirect('/checkout') // TODO: add prev data to checkout
      return setCookie(response)
    } else { // login in authorize page

      let response = NextResponse.redirect('/dashboard')
      return setCookie(response)
    }
  } catch (e) {
    console.log(e)
    //TODO: add error handling
  }
}

export { handler as GET, handler as POST }