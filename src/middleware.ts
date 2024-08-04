import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
 const path = request.nextUrl.pathname;

 const isPublic = path === '/login' || path === '/signup' || path === '/verifyemail';

 const token = request.cookies.get('token')?.value || '';

 if(isPublic && token){
    return NextResponse.redirect(new URL('/dashboard',request.nextUrl));
 }else if(!isPublic && !token){
    return NextResponse.redirect(new URL('/login', request.nextUrl));
 }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/signup',
    '/verifyemail',
    '/forgotPassword'
  ],
}