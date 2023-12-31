import { NextResponse } from "next/server";
import wpFetchData from "./utils/wpFetchData";

export async function middleware(request) {
  let logged = request.cookies.get("refreshToken");

  if (request.nextUrl.pathname.startsWith("/dashboard") && !logged)
    return NextResponse.redirect(new URL("/authorization", request.url));

  if (request.nextUrl.pathname === "/dashboard" && logged)
    return NextResponse.redirect(new URL("/dashboard/my-courses", request.url));

  if (request.nextUrl.pathname.startsWith("/authorization") && logged)
    return NextResponse.redirect(new URL("/dashboard/my-courses", request.url));

  if (request.nextUrl.pathname === "/checkout") {
    const { body } = await wpFetchData(`
      query GET_CART {
        cart{
          isEmpty
        } 
      }
    `, {}, 300);

    if (body.data.cart.isEmpty)
      return NextResponse.redirect(new URL("/courses", request.url));
  }

  const pattern = /\/courses\/([^/]+)\/([^/]+)(?:\/[^./]+)?$/;

  const match = request.nextUrl.pathname.match(pattern);

  if (match && !request.nextUrl.pathname.includes(".")) {
    const { body } = await wpFetchData(`
      query GET_USER {
        viewer {
          courses {
            nodes {
              slug
            }
          }
        }
      }
    `, {}, 300);

    if (
      match[1] !== "category" &&
      !body.data.viewer?.courses?.nodes?.some(({ slug }) => slug === match[1])
    ) {
      return NextResponse.redirect(
        new URL(`/courses/${match[1]}`, request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     * - assets (static assets)
     */
    "/((?!api|_next/static|favicon.ico|assets).*)",
  ],
};
