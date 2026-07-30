import type { Metadata } from "next";
import "../styles/globals.css";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Providers } from "./providers";
import { SITE_CONFIG } from "../lib/constants";

export const metadata: Metadata = {
  title: {
    default: "iNgabo — National Telecom Fraud Intelligence Platform",
    template: "%s | iNgabo — Digital Shield of Rwanda",
  },
  description: SITE_CONFIG.description,
  keywords: [
    "iNgabo",
    "Rwanda Telecom Fraud",
    "SIM Swap Detection",
    "IMEI Phone Recovery",
    "RIB Cybercrime",
    "RURA Telecom Security",
    "CAMARA API Rwanda",
    "Smishing NLP Protection",
    "Neo4j Graph Cybercrime",
    "Rwanda Coding Academy",
  ],
  authors: [{ name: "iNgabo Platform Team & Rwanda Coding Academy" }],
  creator: "iNgabo Project",
  publisher: "Rwanda Investigation Bureau & MINICT",
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.fullName,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/bg.jpg",
        width: 1200,
        height: 630,
        alt: "iNgabo National Digital Trust Architecture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.fullName,
    description: SITE_CONFIG.description,
    images: ["/bg.jpg"],
    creator: "@ingabo_rw",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-[#111827] antialiased">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
