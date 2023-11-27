import { isTokenExpired } from '@/utils/isTokenExpired';
import { NextResponse } from 'next/server';

// Our refresh token call to WPGraphQL.
async function refreshAuthToken(refreshToken) {
  const query = `
    mutation RefreshAuthToken( $refreshToken: String! ) {
      refreshToken( input: {refreshToken: $refreshToken } ) {
        authToken
      }
    }
  `;

  const variables = {
    refreshToken,
  };

  const res = await fetch('https://wp.beautyacademy.expert/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...{ query },
      ...(variables ? { variables } : {}),
    }),
    next: {
      revalidate: 0,
    },
  }).then((res) => res.json());

  if (res?.errors) {
    throw new Error(res?.errors[0].message);
  }

  return res?.data?.refreshToken;
}

export async function POST(req) {
  let { authToken, refreshToken } = await req.json()

  // If the user doesn't have a refrsh token, they're not logged in.
  if (!refreshToken) {
    let response = NextResponse.json({
      error: 'User is not logged in. 1'
    })
    response.cookies.set('user', null)
    return response
  }

  if (!authToken || isTokenExpired(authToken)) {
    try {
      const { authToken } = await refreshAuthToken(refreshToken);

      // If the auth token is empty, log the user out.
      if (!authToken) {
        let response = NextResponse.json({
          error: 'Auth token is empty.'
        })
        response.cookies.set('user', null)
        return response
      }

      let response = NextResponse.json({ authToken: authToken })
      response.cookies.set('authToken', authToken, { expires: new Date(5 * 60 * 1000), sameSite: 'strict' })
      return response

    } catch (e) {
      // This means the mutation failed, so the user is not logged in.
      // We don't destroy the session here, because we want to keep the stale data in case the server fixes itself.
      return NextResponse.json({
        error: 'Mutation failed.'
      });
    }
  }

  return NextResponse.json({ authToken: authToken })
}