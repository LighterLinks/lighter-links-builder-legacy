import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { toasterOptions } from "@/utils/toasts";
import Head from "next/head";
import { Suspense } from "react";
import { NavigationEvents } from "@/lib/navigation-events";
import useModal from "@/lib/hook/useModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lighter Links Builder",
  description: "All-in-one Web service deployment platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <body className={inter.className}>
        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
        <Toaster toastOptions={toasterOptions} position="top-right" />
        <div id="modal-root"></div>
        {children}
      </body>
    </html>
  );
}
