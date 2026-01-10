
import type { Metadata } from "next";
import "./globals.css";

import StickyHeader from "./components/StickyHeader";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "PCP Pal",
  description: "PCP compensation checker",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <div className="fixed top-0 left-0 right-0 z-50">
          <StickyHeader />
        </div>

        <main className="pt-[104px]">{children}</main>

        <Footer />
      </body>
    </html>
  );
}