import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET || "cjp-net-cms-secret-key-2024";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // API routes (except /api/auth/* and /api/seed) require a valid NextAuth session
  if (
    pathname.startsWith("/api/") &&
    !pathname.startsWith("/api/auth/") &&
    pathname !== "/api/seed"
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
