import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Amazing Stories - Modern WordPress Blog",
  description: "Web開発、技術、デジタルイノベーションに関する厳選されたコンテンツをお届けします",
  keywords: "Web開発, JavaScript, TypeScript, React, Next.js, ブログ",
  authors: [{ name: "Amazing Stories Team" }],
  openGraph: {
    title: "Amazing Stories - Modern WordPress Blog",
    description: "Web開発、技術、デジタルイノベーションに関する厳選されたコンテンツをお届けします",
    type: "website",
    locale: "ja_JP",
    siteName: "Amazing Stories",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amazing Stories - Modern WordPress Blog",
    description: "Web開発、技術、デジタルイノベーションに関する厳選されたコンテンツをお届けします",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
