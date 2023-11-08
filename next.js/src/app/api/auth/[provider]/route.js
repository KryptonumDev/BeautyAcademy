import { NextResponse } from "next/server";
import { authenticate } from '@/lib/auth/authenticate';

async function getProviderInput(provider, req) {
  const providerEnum = provider.toUpperCase()
  switch (providerEnum) {
    case 'PASSWORD': {
      const { username, password } = await req.json()
      return {
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

export async function POST(req) {
  const { searchParams } = new URL(req.url)
  const provider = searchParams.get('provider')

  const input = await getProviderInput(provider, req);

  try {
    const data = await authenticate(input);

    // We're using iron session to store the session data in a secure httpOnly cookie, but you can use any session management library you like.
    const user = {
      ...data,
      isLoggedIn: true,
    };

    // Let's send them somewhere.
    return NextResponse.redirect(307, '/dashboard').json({ user });
  } catch (e) {
    // Do something with the error
    // NextResponse.status( 401 ).json( { error: e.message } );

    // Or redirect them to the login page.
    return NextResponse.redirect(401, '/login');
  }
}