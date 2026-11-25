import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {

  const { pathname } = request.nextUrl;

  // Skip middleware for login page and API routes
  const publicRoutes = ["/login", "/"];
  if (publicRoutes.includes(pathname)){
    return NextResponse.next();
  }

  // Route yang dijaga (perlu login kalo mau masuk)
  const token = request.cookies.get("token")?.value;
 
  if (!token) {
    // Tidak ada token, redirect ke login
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  // Token ada, cek apakah valid
  const payload = await verifyToken(token);
  
  if (!payload) {
    // Token invalid, redirect ke login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Cek role user, misal kalo mau akses route /employee harus punya role EMPLOYEE
  const role = payload.role as string; 

  if (pathname.startsWith("/employee") && role !== "EMPLOYEE") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith('/hrd') && role !== 'HRD'){
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname.startsWith('/bod') && role !== 'BOD'){
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Kalau semua valid, lanjutkan ke route yang diminta
  return NextResponse.next();
}


// Match semua request
export const config = {
  matcher: ['/((?!api|_next|static|favicon).*)'],
};
