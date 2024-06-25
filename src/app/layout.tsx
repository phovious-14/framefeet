"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import KitProvider from "./KitProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <KitProvider>
          {children}
        </KitProvider>
      </body>
    </html>
  );
}
