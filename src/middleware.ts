import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"

//this middleware is used to protect routes from unauthorized users

// this function can be marked as "async" if using "await" inside
export function middleware(request :NextRequest) {
    // return NextResponse.redirect(new URL('/home', request.url))
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifymail'
    const token = request.cookies.get("token")?.value || ''

    if (token && isPublicPath) {
        return NextResponse.redirect(new URL("/profile", request.nextUrl))
    }
    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL("/login", request.nextUrl))
    }

   
}

export const config = {
    matcher: [
    '/',
    '/profile',
    '/profile/:path*',
    '/login',
    '/signup',
    '/verifymail'
    ]
}