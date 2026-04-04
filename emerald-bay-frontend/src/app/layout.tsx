import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel, Ibarra_Real_Nova, Playfair_Display, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const defaultSiteUrl = "https://emeraldbayresorts.com";

function getSiteUrl() {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!rawUrl) return defaultSiteUrl;
  return rawUrl.startsWith("http") ? rawUrl : defaultSiteUrl;
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const ibarraRealNova = Ibarra_Real_Nova({
  variable: "--font-ibarra",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Emerald Bay Resort Mirissa",
    template: "%s | Emerald Bay Resort Mirissa",
  },
  description:
    "Beachfront resort in Mirissa with modern rooms, curated tours, premium amenities, and direct access to Sri Lanka's southern coast.",
  keywords: [
    "Emerald Bay Resort",
    "Mirissa hotel",
    "Sri Lanka beach resort",
    "rooms and suites Mirissa",
    "Mirissa tours",
    "Emerald Bay Resort Mirissa",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Emerald Bay Resort Mirissa",
    title: "Emerald Bay Resort Mirissa",
    description:
      "Stay by the ocean in Mirissa with elegant rooms, premium facilities, and curated travel experiences.",
    images: [
      {
        url: "/edited.png",
        width: 1200,
        height: 630,
        alt: "Emerald Bay Resort Mirissa",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emerald Bay Resort Mirissa",
    description:
      "Beachfront stay in Mirissa with premium rooms, tours, and curated experiences.",
    images: ["/edited.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
  icon: "/favicon.ico",
  shortcut: "/favicon.ico",
  apple: "/logo.png",
},
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} ${ibarraRealNova.variable} ${playfairDisplay.variable} ${dmSerifDisplay.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
