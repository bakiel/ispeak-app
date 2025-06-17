import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://ispeaklanguage.org'),
  title: {
    default: 'iSPEAK - Learn African Languages Online',
    template: '%s | iSPEAK',
  },
  description: 'Live online language lessons for children and teens aged 3 and above. Learn Yoruba, Kiswahili, Twi, and Amharic with indigenous speakers through interactive, culturally immersive classes.',
  keywords: ['African languages', 'online language learning', 'Yoruba', 'Kiswahili', 'Twi', 'Amharic', 'children education', 'cultural education'],
  authors: [{ name: 'iSPEAK Language Learning' }],
  creator: 'iSPEAK',
  publisher: 'iSPEAK',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ispeaklanguage.org',
    siteName: 'iSPEAK',
    title: 'iSPEAK - Learn African Languages Online',
    description: 'Live online language lessons for children and teens aged 3 and above',
    images: [
      {
        url: '/images/logo/iSpeak Logo.png',
        width: 1200,
        height: 630,
        alt: 'iSPEAK Language Learning',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'iSPEAK - Learn African Languages Online',
    description: 'Live online language lessons for children and teens aged 3 and above',
    images: ['/images/logo/iSpeak Logo.png'],
  },
  icons: {
    icon: '/images/logo/iSPEAK-Favicon.png',
    shortcut: '/images/logo/iSPEAK-Favicon.png',
    apple: '/images/logo/iSPEAK-Favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}