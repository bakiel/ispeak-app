import './globals.css'
import { logoUrls } from '@/lib/logoConfig'
import CartProvider from '@/components/shop/CartProvider'
import CartSidebar from '@/components/shop/CartSidebar'

export const metadata = {
  title: 'iSPEAK Language Learning Program | African Languages for Children 3-14',
  description: 'Connect your child to their heritage through interactive online lessons in Yoruba, Kiswahili, Twi, and Amharic with certified native-speaking educators.',
  metadataBase: new URL('https://ispeaklanguages.com'),
  icons: {
    icon: [
      { url: logoUrls.favicon, sizes: '32x32', type: 'image/png' },
      { url: logoUrls.favicon, sizes: '16x16', type: 'image/png' },
    ],
    apple: logoUrls.favicon,
    shortcut: logoUrls.favicon,
  },
  openGraph: {
    title: 'iSPEAK Language Learning Program',
    description: 'Connect your child to their heritage through interactive online lessons in African languages',
    url: 'https://ispeaklanguages.com',
    siteName: 'iSPEAK Languages',
    images: [
      {
        url: 'https://gfbedvoexpulmmfitxje.supabase.co/storage/v1/object/public/logos/ispeak-logo-with-text.png',
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <CartProvider>
          {children}
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  )
}
