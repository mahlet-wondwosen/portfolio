import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const body = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mahlet-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Mahlet Wondwosen | Senior Frontend Engineer",
  description:
    "Portfolio of Mahlet Wondwosen Tegene, a senior frontend engineer in Addis Ababa building bank and financial portals and mini-apps with React, Next.js and TypeScript.",
  keywords: [
    "Mahlet Wondwosen",
    "Senior Frontend Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Ethiopia",
    "Addis Ababa",
  ],
  authors: [{ name: "Mahlet Wondwosen Tegene" }],
  openGraph: {
    title: "Mahlet Wondwosen | Senior Frontend Engineer",
    description:
      "Bank and financial portals and mini-apps in React, Next.js and TypeScript. Open to fully remote roles.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#4b3f8c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={body.variable}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
