import { NextResponse } from 'next/server'
import wpFetchData from './utils/wpFetchData'

export async function middleware(request) {
  let logged = request.cookies.get('user')

  if (request.nextUrl.pathname.startsWith('/dashboard') && !logged)
    return NextResponse.redirect(new URL('/authorization', request.url))

  if (request.nextUrl.pathname === '/dashboard' && logged)
    return NextResponse.redirect(new URL('/dashboard/my-courses', request.url))

  if (request.nextUrl.pathname.startsWith('/authorization') && logged)
    return NextResponse.redirect(new URL('/dashboard/my-courses', request.url))

  if (request.nextUrl.pathname === '/checkout') {
    const { body } = await wpFetchData(`
      query GET_CART {
        cart{
          isEmpty
        } 
      }
    `)

    if (body.data.cart.isEmpty)
      return NextResponse.redirect(new URL('/courses', request.url))
    // return NextResponse.json({ success: false, message: 'Корзина пуста' }, { status: 401 })
  }
}
