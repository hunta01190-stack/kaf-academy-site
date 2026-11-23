import { Archivo_Black, Inter } from "next/font/google";
import "./globals.css";

const display = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const description =
  "Inline skating lessons for kids ages 4+ and adults in Suwanee, Johns Creek, and Alpharetta, GA. Private and small-group weekend classes taught in Korean and English. 스와니 인라인 스케이트 레슨 · 한국어/영어 수업.";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://kafinline.com"
  ),
  title: "KAF Academy | Kids Inline Skating Lessons in Suwanee, GA",
  description,
  keywords: [
    "inline skating lessons",
    "kids skating lessons Suwanee",
    "Johns Creek skating lessons",
    "Alpharetta inline skating",
    "Korean English bilingual coach",
    "스와니 인라인",
    "애틀랜타 인라인 레슨",
  ],
  openGraph: {
    title: "KAF Academy | Kids Inline Skating Lessons",
    description,
    type: "website",
    locale: "en_US",
    images: [{ url: "/Images/hero.jpg", width: 1628, height: 920 }],
  },
  icons: { icon: "/kaf-logo.png", apple: "/kaf-logo.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
