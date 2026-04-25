// Supabase Browser Client - untuk Client Components ("use client")
//
// KENAPA dua client (browser vs server)?
// Supabase Auth menggunakan cookies untuk session.
// - Browser client: baca/tulis cookie via document.cookie
// - Server client: baca cookie via Next.js request headers (read-only)
// Package @supabase/ssr menangani perbedaan ini secara otomatis.
//
// SETUP: npm install @supabase/supabase-js @supabase/ssr

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
