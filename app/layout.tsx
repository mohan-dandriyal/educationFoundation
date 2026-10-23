import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/app/components/Footer";
import { Header } from "./components/Header";
import LoadingScreen from "./components/LoadingScreen";
import { Suspense } from "react";
import ScrollToTop from "./components/ScrollToTop";

export const metadata: Metadata = {
  title: "D. Sullivan — Leading the Change",
  description: "Technology for a more resilient future of agriculture.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-screen flex-col">
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
