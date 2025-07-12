import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Simple test - just log all requests
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/recommendation") ||
    pathname.startsWith("/history")
  ) {
    // Check for auth token in cookies
    const token = request.cookies.get("auth")?.value;

    // If no token, redirect to home
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/recommendation/:path*", "/history/:path*"],
};
