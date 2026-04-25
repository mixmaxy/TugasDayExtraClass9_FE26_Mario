import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
 
// Syne: display font yang bold dan karakteristik untuk judul
// DM Sans: body font yang bersih dan readable
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap", // 'swap' penting untuk CLS (Core Web Vitals) - hindari FOIT
});
 
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});
 
export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "FoodVault — Kelola Makanan Kamu",
  },
  description:
    "Aplikasi manajemen makanan. Bedakan UPF (Ultra-Processed Food) dengan makanan segar secara mudah.",
};
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${syne.variable} ${dmSans.variable}`}>
      {/*
        lang="id" → penting untuk accessibility screen reader dan SEO
        Mendefinisikan bahasa utama dokumen
      */}
      <body className="bg-stone-50 text-stone-900 font-sans antialiased min-h-screen">
        <Navbar />
        {/*
          main dengan role semantik yang benar
          padding-top untuk kompensasi fixed navbar
        */}
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}