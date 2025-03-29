"use client";

import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-black flex flex-col`}>
        <SessionProvider>
          <Navbar />
          <main className="flex-grow p-6">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
