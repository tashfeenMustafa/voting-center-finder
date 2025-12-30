import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "./components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Find your Voting Center & Constituency | Bangladesh National Election 2025",
    template: "%s | Bangladesh Election 2025"
  },
  description: "Find your parliamentary constituency and voting center by searching through all 300 constituencies in Bangladesh. Search by district, thana, union, ward, or any keyword. This is an independent educational tool for informational purposes only.",
  keywords: [
    "Bangladesh Election 2025",
    "Election Constituency Finder",
    "Voting Center Bangladesh",
    "Parliamentary Constituency",
    "Election Commission Bangladesh",
    "Vote Koi Dibo",
    "নির্বাচনী এলাকা",
    "ভোট কেন্দ্র",
    "বাংলাদেশ নির্বাচন ২০২৫",
    "Constituency Search",
    "Election Information",
    "Bangladesh Parliament",
    "Jatiya Sangsad",
    "300 Constituencies"
  ],
  authors: [{ name: "Election Finder Team" }],
  creator: "Election Finder",
  publisher: "Election Finder",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/',
      'bn': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['bn_BD'],
    url: '/',
    siteName: 'Bangladesh Election Constituency Finder',
    title: 'Find your Voting Center & Constituency | Bangladesh National Election 2025',
    description: 'Find your parliamentary constituency and voting center by searching through all 300 constituencies in Bangladesh. Search by district, thana, union, ward, or any keyword.',
    images: [
      {
        url: '/image.PNG',
        width: 1200,
        height: 630,
        alt: 'Bangladesh Election Constituency Finder - Vote Koi Dibo?',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find your Voting Center & Constituency | Bangladesh National Election 2025',
    description: 'Find your parliamentary constituency and voting center by searching through all 300 constituencies in Bangladesh.',
    images: ['/image.PNG'],
    creator: '@electionfinder',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add verification codes if available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <meta
          property="og:title:bn"
          content="আপনার ভোট কেন্দ্র ও নির্বাচনী এলাকা খুঁজুন | বাংলাদেশ জাতীয় নির্বাচন ২০২৫"
        />
        <meta
          name="twitter:title:bn"
          content="আপনার ভোট কেন্দ্র ও নির্বাচনী এলাকা খুঁজুন | বাংলাদেশ জাতীয় নির্বাচন ২০২৫"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
