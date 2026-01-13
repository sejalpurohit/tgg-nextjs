import type { Metadata, Viewport } from "next";
import "./globals.css";

import StickyHeader from "./components/StickyHeader";
import Footer from "./components/Footer";
import StoreProvider from "./store/StoreProvider";

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
      <body className="bg-gray-100">
        <StoreProvider>
          <div className="mx-auto max-w-md min-h-screen bg-white shadow-xl">
            <header className="sticky top-0 z-50">
              <StickyHeader />
            </header>

            <main>
              <div className="px-4">{children}</div>
            </main>

            <Footer />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}