import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const googleToken = request.cookies.get("googleUserToken");
  if (!token) {
    if (!googleToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/dashboard", "/payment/:path", "/admin", "/hotelcreation"],
};
