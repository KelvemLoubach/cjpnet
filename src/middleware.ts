import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET || "cjp-net-cms-secret-key-2024";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // GET requests to public content APIs are accessible without authentication
  // POST, PUT, DELETE require a valid NextAuth session
  if (
    pathname.startsWith("/api/") &&
    !pathname.startsWith("/api/auth/") &&
    pathname !== "/api/seed" &&
    request.method !== "GET"
  ) {
    const token = await getToken({ req: request, secret });
    if (!token) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
