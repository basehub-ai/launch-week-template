import './globals.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Providers } from './components/global/providers'
import { Footer } from './components/layout/footer'
import { Header } from './components/layout/header'
import { basehub } from 'basehub'
import { Pump } from 'basehub/react-pump'
import { siteOrigin } from '@/constants/routing'
import { PageView } from './components/page-view'
import { Toolbar } from 'basehub/next-toolbar'

export const experimental_ppr = true
export const dynamic = 'force-static'

export const generateMetadata = async (): Promise<Metadata> => {
  const { site } = await basehub().query({
    site: {
      metadata: {
        title: true,
        description: true,
        favicon: { url: true },
        ogImage: { url: true }
      }
    }
  })

  const title = site.metadata.title
  const description = site.metadata.description

  return {
    title,
    description,
    icons: {
      icon: site.metadata.favicon.url,
      shortcut: site.metadata.favicon.url
    },
    openGraph: {
      title,
      description,
      siteName: 'BaseHub',
      images: [
        {
          width: 1200,
          height: 630,
          url: site.metadata.ogImage.url
        }
      ],
      locale: 'en-US',
      type: 'website',
      url: siteOrigin
    }
  }
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Pump
      queries={[
        {
          site: { accent: { r: true, g: true, b: true } },
          analytics: {
            pageviews: {
              ingestKey: true
            }
          }
        }
      ]}
    >
      {async ([
        {
          site: {
            accent: { r, g, b }
          },
          analytics
        }
      ]) => {
        'use server'

        const accent = `rgb(${r}, ${g}, ${b})`
        const accentTransparent = `rgba(${r}, ${g}, ${b}, 0.2)`

        return (
          <html
            lang="en"
            className={`${GeistSans.variable} ${GeistMono.variable}`}
          >
            <body
              style={{
                ['--accent' as string]: accent,
                ['--accent-transparent' as string]: accentTransparent,
                minHeight: '100dvh'
              }}
              className="antialiased flex flex-col"
            >
              <Header />
              <Providers>{children}</Providers>
              <Footer />

              <Toolbar />
              <PageView eKey={analytics.pageviews.ingestKey} />
            </body>
          </html>
        )
      }}
    </Pump>
  )
}
