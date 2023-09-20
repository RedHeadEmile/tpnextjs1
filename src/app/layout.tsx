import './globals.css'
import type { Metadata } from 'next'
import {Lexend} from 'next/font/google'
import Providers from "@/components/providers";

const lexend = Lexend({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={lexend.className}><Providers font={lexend}>{children}</Providers></body>
    </html>
  )
}
