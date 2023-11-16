import { decode } from 'jsonwebtoken';
import { create, deleteCookie, read } from 'src/app/actions';
import { NextResponse } from 'next/server';

function isTokenExpired(token) {
  const decodedToken = decode(token);

  if (!decodedToken?.exp) {
    return false;
  }

  // Expiry time is in seconds, but we need milliseconds so we do *1000
  const expiresAt = new Date((decodedToken.exp) * 1000);
  const now = new Date();
  return now.getTime() > expiresAt.getTime();
}

// Our refresh token call to WPGraphQL.
async function refreshAuthToken(refreshToken) {
  console.log(refreshToken)
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
  let user = await req.json()
  // If the user doesn't have a refrsh token, they're not logged in.
  if (!user?.refreshToken) {
    await deleteCookie('user')

    return NextResponse.json({
      error: 'User is not logged in. 1'
    });
  }

  if (!user?.authToken || isTokenExpired(user.authToken)) {
    try {
      const { authToken } = await refreshAuthToken(
        user.refreshToken
      );

      // If the auth token is empty, log the user out.
      if (!authToken) {
        return NextResponse.json({
          error: 'User is not logged in. 2'
        });
      }

      user.authToken = authToken;
      user.isLoggedIn = true;

      const newUser = await create({ name: 'user', value: user, age: user.refreshTokenExpiration });

      return NextResponse.json({ user }, {
        headers: {
          'Set-Cookie': newUser
        }
      })
    } catch (e) {
      // console.log(e)
      // This means the mutation failed, so the user is not logged in.
      // We don't destroy the session here, because we want to keep the stale data in case the server fixes itself.
      return NextResponse.json({
        error: 'User is not logged in. 3'
      });
    }
  }
  // If we get here, the user is logged in.
  return NextResponse.json({ user })
}