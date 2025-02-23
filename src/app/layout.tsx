import type { Metadata } from "next";
import {  Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Promotion from "@/components/Promotion";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Shopping Store",
  description: "Consigue las mejores prendas de vestir en nuestra tienda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrool-smooth">
      <body
        className={`${inter.className} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <Promotion />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
