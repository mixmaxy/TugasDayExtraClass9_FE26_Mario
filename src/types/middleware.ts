// KENAPA middleware untuk auth?
// Middleware berjalan di EDGE (CDN layer), bukan di server Node.js.
// Ini berarti proteksi route terjadi SEBELUM halaman di-render → lebih efisien
// dan tidak bisa di-bypass dengan langsung mengakses URL.
//
// CATATAN: Implementasi ini adalah SKELETON.
// Untuk proteksi penuh, integrasikan dengan Supabase Auth menggunakan
// package @supabase/ssr (lihat komentar di bawah).

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Route yang MEMBUTUHKAN login (protected)
const PROTECTED_ROUTES = ["/foods"];

// Route yang hanya untuk user yang BELUM login (auth routes)
const AUTH_ROUTES = ["/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ============================================================
  // Cek apakah user sudah login
  // Untuk implementasi nyata dengan Supabase Auth, ganti bagian ini:
  //
  // import { createServerClient } from "@supabase/ssr";
  // const supabase = createServerClient(...)
  // const { data: { user } } = await supabase.auth.getUser()
  // const isLoggedIn = !!user
  //
  // Untuk sekarang, cek cookie sederhana sebagai placeholder:
  // ============================================================
  const authCookie = request.cookies.get("auth-token");
  const isLoggedIn = !!authCookie?.value;

  // Jika user belum login dan mencoba akses protected route → redirect ke /login
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL("/login", request.url);
    // Simpan tujuan asli agar setelah login bisa redirect ke sana
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Jika user sudah login dan mencoba akses auth routes → redirect ke /foods
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/foods", request.url));
  }

  return NextResponse.next();
}

// Konfigurasi: route mana yang diproses middleware
// KENAPA exclude _next dan api?
// - _next/static, _next/image: aset statis tidak perlu auth check
// - api: API routes punya auth check sendiri
// - favicon.ico: aset publik
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
