import "./globals.css";

const description =
  "Inline skating lessons for kids ages 4+ in Suwanee, Johns Creek, and Alpharetta, GA. Private and small-group weekend classes taught in Korean and English. 스와니 인라인 스케이트 레슨 · 한국어/영어 수업.";

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
    images: [{ url: "/Images/hero.jpg", width: 2000, height: 920 }],
  },
  icons: { icon: "/kaf-logo.png", apple: "/kaf-logo.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
