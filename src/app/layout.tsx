import { Inter } from "next/font/google";
import { headers } from 'next/headers'
import "./globals.css";
import { cookieToInitialState } from 'wagmi'

import { config } from '@/config'
import Web3ModalProvider from '@/context'
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <html lang="en">
        <body className={inter.className}>
          <Web3ModalProvider initialState={initialState}>{children}</Web3ModalProvider>
        </body>
    </html>
  );
}
