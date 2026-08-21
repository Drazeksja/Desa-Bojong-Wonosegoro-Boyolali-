import type { Metadata } from "next";
import { Inter, Cinzel_Decorative } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cinzel = Cinzel_Decorative({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-cinzel" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://desa-bojong-wonosegoro-boyolali.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Website Resmi Desa Bojong — Informasi, Layanan & Potensi Desa",
    template: "%s | Desa Bojong, Wonosegoro, Boyolali",
  },
  description: "Website resmi Desa Bojong, Kecamatan Wonosegoro, Kabupaten Boyolali. Pusat informasi kependudukan, kesehatan, layanan warga, UMKM, pengaduan, dan transparansi APBDes.",
  keywords: [
    "Desa Bojong", "Wonosegoro", "Boyolali", "website desa",
    "layanan warga", "APBDes", "UMKM desa", "informasi desa",
    "berita desa Bojong", "pengaduan desa", "galeri desa Bojong"
  ],
  authors: [{ name: "Pemerintah Desa Bojong" }],
  creator: "Pemerintah Desa Bojong, Wonosegoro, Boyolali",
  verification: {
    google: "BPNfLKhBESoMDGAMMqofScDM9NrCa0hFDNjeu2lmTmY",
  },
  publisher: "Pemerintah Desa Bojong",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "Desa Bojong - Wonosegoro, Boyolali",
    title: "Website Resmi Desa Bojong — Informasi, Layanan & Potensi Desa",
    description: "Website resmi Desa Bojong, Kecamatan Wonosegoro, Kabupaten Boyolali. Pusat informasi kependudukan, layanan warga, dan transparansi APBDes.",
    images: [
      {
        url: "/musren.webp",
        width: 1200,
        height: 630,
        alt: "Desa Bojong, Wonosegoro, Boyolali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Resmi Desa Bojong",
    description: "Website resmi Desa Bojong, Kecamatan Wonosegoro, Kabupaten Boyolali.",
    images: ["/musren.webp"],
  },
  alternates: {
    canonical: siteUrl,
  },
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
