import './globals.css'
import type { Metadata } from 'next'
import {Lexend} from 'next/font/google'
import Providers from "@/components/providers";
import {Footer} from "tp-kit/components";
import {Menu} from "@/components/menu";

const lexend = Lexend({ subsets: ['latin'] })

export const metadata: Metadata = {
  robots: "noindex,nofollow",
  title: {
    default: "Page d'accueil - Starbucks",
    template: "%s - Starbucks"
  },
  description: 'Commandez de délicieuses boissons préparées avec soin par nos baristas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={lexend.className}>
        <Providers font={lexend}>
          <Menu />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
