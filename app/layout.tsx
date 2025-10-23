import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bigs Pay",
  description: "Bigs Pay - 빅스 페이",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
