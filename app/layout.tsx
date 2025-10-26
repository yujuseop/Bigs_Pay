import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "./providers/reactQueryProvider";
import Header from "@/components/header";

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
      <body>
        <Header />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
