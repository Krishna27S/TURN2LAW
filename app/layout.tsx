"use client";

import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "../components/Footer";
import { ChatButton } from "@/components/chat/ChatButton";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const pageTransition = {
  hidden: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-black flex flex-col`}>
        <SessionProvider>
          <AnimatePresence mode="wait">
            <motion.main 
              className="flex-grow p-6"
              initial="hidden"
              animate="enter"
              exit="exit"
              variants={pageTransition}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {children}
            </motion.main>
            <ChatButton />
            <Footer />
          </AnimatePresence>
        </SessionProvider>
      </body>
    </html>
  );
}