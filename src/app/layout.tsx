import type { Metadata } from "next";
import { Inter, Cinzel_Decorative } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cinzel = Cinzel_Decorative({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-cinzel" });

export const metadata: Metadata = {
  title: "Website Resmi Desa Bojong — Informasi, Layanan & Potensi Desa",
  description: "Website resmi Desa Bojong. Pusat informasi kependudukan, kesehatan, layanan warga, UMKM, pengaduan, dan transparansi APBDes.",
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollAnimate from "@/components/ScrollAnimate";
import ChatbotWidget from "@/components/ChatbotWidget";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} ${cinzel.variable}`}>
        <ScrollAnimate />
        <Navbar />
        {children}
        <Footer />
        <ChatbotWidget />
      </body>
    </html>
  );
}
