import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const cookies = request.cookies;
  const authCookie = cookies.get('auth');
  
  return NextResponse.json({
    message: 'Debug endpoint',
    cookies: Object.fromEntries(cookies.entries()),
    authCookie: authCookie?.value || 'not found',
    headers: Object.fromEntries(request.headers.entries()),
  });
} 