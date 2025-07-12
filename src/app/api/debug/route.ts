import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const cookies = request.cookies;
  const authCookie = cookies.get('auth');
  
  // Convert cookies to object manually since RequestCookies doesn't have entries()
  const cookiesObj: Record<string, string> = {};
  cookies.getAll().forEach(cookie => {
    cookiesObj[cookie.name] = cookie.value;
  });
  
  return NextResponse.json({
    message: 'Debug endpoint',
    cookies: cookiesObj,
    authCookie: authCookie?.value || 'not found',
    headers: Object.fromEntries(request.headers.entries()),
  });
} 