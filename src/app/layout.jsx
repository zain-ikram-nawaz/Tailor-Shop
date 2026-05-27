import "./globals.css";
import { SessionProvider } from "next-auth/react";
import NavbarClient from "@/components/NavbarClient";
import FooterClient from "@/components/FooterClient";

export const metadata = {
  title: "Bisma Fashion — Tailor Ka Price Calculator | Perfect Fit Guarantee",
  description:
    "Bisma Fashion ka online price calculator. Shalwar kameez, suit, sherwani, lehenga aur more ke liye instant price estimate lein. Ghar baithe apna budget plan karein.",
  openGraph: {
    type: "website",
    siteName: "Bisma Fashion",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ur">
      <body>
        <SessionProvider>
          <div className="flex flex-col min-h-screen bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
            <NavbarClient />
            <main className="flex-grow">{children}</main>
            <FooterClient />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
