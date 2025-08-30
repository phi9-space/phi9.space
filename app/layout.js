import { Inter, Montserrat, Tinos, Arimo } from 'next/font/google'
import '../styles/globals.css'
import Navbar from '../components/layout/Navbar'

const inter = Inter({ subsets: ['latin'] })
const montserrat = Montserrat({ subsets: ['latin'] })
const tinos = Tinos({ weight: ['400', '700'], subsets: ['latin'] })
const arimo = Arimo({ subsets: ['latin'] })

export const metadata = {
  title: 'phi9.space',
  description: 'Building the enabling technology for GPS denied navigation systems',
  keywords: 'navigation, GPS, technology, situational awareness, physical AI',
  authors: [{ name: 'phi9.space' }],
  openGraph: {
    title: 'phi9.space',
    description: 'Building the enabling technology for GPS denied navigation systems',
    url: 'https://phi9.space',
    siteName: 'phi9.space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'phi9.space',
    description: 'Building the enabling technology for GPS denied navigation systems',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/images/PHI9 BL.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,400..700;1,400..700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Tinos:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} ${montserrat.className} ${tinos.className} ${arimo.className}`}>
        <Navbar />
        <main className="pt-8">
          {children}
        </main>
      </body>
    </html>
  )
}
