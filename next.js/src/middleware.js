import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session if expired - required for Server Components
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session && req.nextUrl.pathname.includes("/dashboard"))
    return NextResponse.redirect(new URL("/authorization", req.url));

  if(session && req.nextUrl.pathname.includes("/authorization"))
    return NextResponse.redirect(new URL("/dashboard/my-courses", req.url));

  if(session && req.nextUrl.pathname === "/dashboard")
  return NextResponse.redirect(new URL("/dashboard/my-courses", req.url));

  return res;
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

// session {
//   expires_at: 1706369261,
//   expires_in: 3540,
//   token_type: 'bearer',
//   access_token: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IklMWk04RVlyTnZKQ0N4WFciLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzA2MzY5MjYxLCJpYXQiOjE3MDYzNjU2NjEsImlzcyI6Imh0dHBzOi8vcWZsbG9uZ2Z2ZGpjdHhkcGRzdmouc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjE5ODUyOTI5LTc4MmEtNGI4YS05NmRkLTJjNmIzNzZkZDc5NiIsImVtYWlsIjoic2hldmFib2dkYW4xNkBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJlbWFpbC9zaWdudXAiLCJ0aW1lc3RhbXAiOjE3MDYzNjEwODV9XSwic2Vzc2lvbl9pZCI6IjRjNzIxMDBlLTIxNjktNDk3OC04NWYwLTllMTc0NThmNjQ5MiJ9.ZfeSUQ55TSFDMZQvAxD7cjS8hvyv6k5vy9pFXnhId2g',
//   refresh_token: 'ZrrBlJzQyv-tqL9VjnEonA',
//   provider_token: null,
//   provider_refresh_token: null,
//   user: {
//   id: '19852929-782a-4b8a-96dd-2c6b376dd796',
//   factors: null,
//   aud: 'authenticated',
//   iat: 1706365661,
//   iss: 'https://qfllongfvdjctxdpdsvj.supabase.co/auth/v1',
//   email: 'shevabogdan16@gmail.com',
//   phone: '',
//   app_metadata: { provider: 'email', providers: [ 'email' ] },
//   user_metadata: {},
//   role: 'authenticated',
//   aal: 'aal1',
//   amr: [ { method: 'email/signup', timestamp: 1706361085 } ],
//   session_id: '4c72100e-2169-4978-85f0-9e17458f6492'
// }
// }
// user {
//   id: '19852929-782a-4b8a-96dd-2c6b376dd796',
//   aud: 'authenticated',
//   role: 'authenticated',
//   email: 'shevabogdan16@gmail.com',
//   email_confirmed_at: '2024-01-27T13:11:16.056644Z',
//   phone: '',
//   confirmation_sent_at: '2024-01-27T13:08:09.683687Z',
//   confirmed_at: '2024-01-27T13:11:16.056644Z',
//   last_sign_in_at: '2024-01-27T13:11:25.479819Z',
//   app_metadata: { provider: 'email', providers: [ 'email' ] },
//   user_metadata: {},
//   identities: [
//   {
//   identity_id: '6eb0afc3-2d4b-453b-8c5d-cd63546c02c3',
//   id: '19852929-782a-4b8a-96dd-2c6b376dd796',
//   user_id: '19852929-782a-4b8a-96dd-2c6b376dd796',
//   identity_data: {
//   email: 'shevabogdan16@gmail.com',
//   email_verified: false,
//   phone_verified: false,
//   sub: '19852929-782a-4b8a-96dd-2c6b376dd796'
// },
//   provider: 'email',
//   last_sign_in_at: '2024-01-27T13:08:09.68082Z',
//   created_at: '2024-01-27T13:08:09.680867Z',
//   updated_at: '2024-01-27T13:08:09.680867Z',
//   email: 'shevabogdan16@gmail.com'
// }
// ],
//   created_at: '2024-01-27T13:08:09.676114Z',
//   updated_at: '2024-01-27T14:27:41.460876Z'
// }
