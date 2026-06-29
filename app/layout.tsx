import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import OrganizationSchema from "@/components/shared/OrganizationSchema";
import LiveChatLoader from "@/components/chat/LiveChatLoader";
import GlobalBackground from "@/components/layout/GlobalBackground";
import PageTransition from "@/components/shared/PageTransition";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mubixlabs.studio"),

  // Simplified Favicon (only what you have)
  icons: {
    icon: "/favicon.ico",
  },

  title: {
    default: "Mubix Labs | Software That Moves The World Forward",
    template: "%s | Mubix Labs",
  },
  description: "Mubix Labs builds developer tools, web platforms, mobile apps, and enterprise software solutions that scale.",

  openGraph: {
    title: "Mubix Labs",
    description: "We build software that moves the world forward — web, mobile, AI, and enterprise solutions.",
    url: "https://mubixlabs.studio",
    siteName: "Mubix Labs",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mubix Labs",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Mubix Labs",
    description: "We build software that moves the world forward.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GlobalBackground />
        <OrganizationSchema />
        <Navbar />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
      <Footer />
<LiveChatLoader />
<Analytics />
<SpeedInsights />

{process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
  <>
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
      strategy="afterInteractive"
    />

    <Script id="google-analytics" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
          page_path: window.location.pathname,
        });
      `}
    </Script>
  </>
)}
</body>
    </html>
  );
}