import type { Metadata, Viewport } from "next";
import "./globals.css";

import StickyHeader from "./components/StickyHeader";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "PCP Pal",
  description: "PCP compensation checker",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="fixed inset-x-0 top-0 z-50">
          <StickyHeader />
        </header>

        <main className="pt-[104px]">
          <div className="mx-auto max-w-md px-4">{children}</div>
        </main>

        <Footer />
      </body>
    </html>
  );
}