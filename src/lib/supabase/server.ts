// Supabase Server Client - untuk Server Components dan API Routes
//
// Di Server Components, kita tidak bisa langsung akses cookies seperti di browser.
// Next.js menyediakan `cookies()` dari "next/headers" untuk membaca cookies
// dari incoming request secara type-safe.

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // setAll dipanggil dari Server Component - cookies read-only, diabaikan
            // Middleware akan handle refresh token
          }
        },
      },
    },
  );
}
