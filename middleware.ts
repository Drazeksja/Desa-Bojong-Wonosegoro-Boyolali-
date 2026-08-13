import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PREFIX = "/berita/admin";
const LOGIN_PATH = "/berita/admin/masuk";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith(PROTECTED_PREFIX)) {
    return NextResponse.next();
  }

  // Halaman gerbang sendiri tidak boleh ikut diblokir (nanti infinite redirect)
  if (pathname === LOGIN_PATH) {
    return NextResponse.next();
  }

  const session = req.cookies.get("admin_session")?.value;
  const expected = process.env.ADMIN_SESSION_TOKEN;

  if (!session || !expected || session !== expected) {
    const loginUrl = new URL(LOGIN_PATH, req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/berita/admin/:path*"],
};
