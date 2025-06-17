import './globals.css'

export const metadata = {
  title: 'iSPEAK Language Learning Program | African Languages for Children 3-14',
  description: 'Connect your child to their heritage through interactive online lessons in Yoruba, Kiswahili, Twi, and Amharic with certified native-speaking educators.',
  icons: {
    icon: 'https://i.ibb.co/HpXdBJrQ/i-SPEAK-Favicon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
