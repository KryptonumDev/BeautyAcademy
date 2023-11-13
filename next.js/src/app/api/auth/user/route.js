import { decode } from 'jsonwebtoken';
import { create, read } from 'src/app/actions';
import { NextResponse } from 'next/server';
import wpFetchData from '@/utils/wpFetchData';

function isTokenExpired(token) {
  const decodedToken = decode(token);

  if (!decodedToken?.exp) {
    return false;
  }

  // Expiry time is in seconds, but we need milliseconds so we do *1000
  const expiresAt = new Date((decodedToken.exp) * 1000);
  const now = new Date();

  return now.getTime() > expiresAt.getTime();;
}

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

  // replace fetchAPI with whatever you're using to connect to WPGraphQL.
  const res = await wpFetchData(query, { variables }); // TODO: rework fetch - this making infinte loop

  if (res?.errors) {
    throw new Error(res?.errors[0].message);
  }

  return res?.data?.refreshToken;
}

export async function GET() {
  let user = await read('user');

  // If the user doesn't have a refrsh token, they're not logged in.
  if (!user?.refreshToken) {
    await deleteCookie('user')

    return NextResponse.json({
      error: 'User is not logged in.'
    });
  }

  if (!user?.authToken || isTokenExpired(user.authToken)) {
    try {
      const { authToken } = await refreshAuthToken(
        user.refreshToken
      );

      // If the auth token is empty, log the user out.
      if (!authToken) {
        await deleteCookie('user')

        return NextResponse.json({
          error: 'User is not logged in.'
        });
      }

      user.authToken = authToken;
      user.isLoggedIn = true;

      const newUser = create('user', user);

      return NextResponse.json({ newUser }, {
        headers: {
          'Set-Cookie': newUser
        }
      })
    } catch {
      // This means the mutation failed, so the user is not logged in.
      // We don't destroy the session here, because we want to keep the stale data in case the server fixes itself.

      // TODO: rework delete cookie as writen previously
      await deleteCookie('user')

      return NextResponse.json({
        error: 'User is not logged in.'
      });
    }
  }

  // If we get here, the user is logged in.
  return NextResponse.json({ user })
}