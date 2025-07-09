import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Providers } from './components/global/providers'
import { Footer } from './components/layout/footer'

import './globals.css'
import { Header } from './components/layout/header'
import { basehub } from 'basehub'
import { Pump } from 'basehub/react-pump'

export const generateMetadata = async (): Promise<Metadata> => {
  const { site } = await basehub({ draft: true }).query({
    site: {
      metadata: {
        title: true,
        description: true,
        favicon: { url: true }
      }
    }
  })

  return {
    title: site.metadata.title,
    description: site.metadata.description,
    icons: {
      icon: site.metadata.favicon.url,
      shortcut: site.metadata.favicon.url
    }
  }
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Pump queries={[{ site: { accent: { hex: true } } }]}>
      {async ([
        {
          site: { accent }
        }
      ]) => {
        'use server'

        return (
          <html lang="en">
            <body
              style={{ ['--accent' as string]: accent.hex }}
              className={`${GeistSans.variable} ${GeistMono.variable} antialiased min-h-screen flex flex-col`}
            >
              <Header />
              <Providers>{children}</Providers>
              <Footer />
            </body>
          </html>
        )
      }}
    </Pump>
  )
}
