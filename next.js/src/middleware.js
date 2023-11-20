import { NextResponse } from 'next/server'

export function middleware(request) {
  let logged = request.cookies.get('user')

  if (request.nextUrl.pathname.startsWith('/dashboard') && !logged)
    return NextResponse.redirect(new URL('/authorization', request.url))

  if (request.nextUrl.pathname === '/dashboard' && logged)
    return NextResponse.redirect(new URL('/dashboard/my-courses', request.url))

  if (request.nextUrl.pathname.startsWith('/authorization') && logged)
    return NextResponse.redirect(new URL('/dashboard/my-courses', request.url))
}
