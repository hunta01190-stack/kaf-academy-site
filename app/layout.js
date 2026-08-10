import "./globals.css";

export const metadata = {
  title: "KAF Academy | Kids Sports Coaching in Suwanee, GA",
  description: "Bilingual kids sports coaching in Suwanee, Georgia. Saturday level-based classes in Korean and English.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
