import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/app/components/Footer";
import { Header } from "./components/Header";
import LoadingScreen from "./components/LoadingScreen";
import { Suspense } from "react";
import ScrollToTop from "./components/ScrollToTop";

export const metadata: Metadata = {
  title: "Educare Foundation — Education Today, Brighter Tomorrow",
  description:
    "Empowering children in underserved communities through free learning centers, digital literacy labs, school supply kits, and girl-child education.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="antialiased">
      <body className=" bg-[#fdfbf3] text-[#15452e]">
        <ScrollToTop />
        <Suspense fallback={<LoadingScreen />}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
