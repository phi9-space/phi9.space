import Home from '../components/ui/Home'

export const metadata = {
  title: 'phi9.space - Enabling Situational Awareness',
  description: 'Building the enabling technology for GPS denied navigation systems. Enabling situational awareness in Physical AI systems.',
  keywords: 'navigation, GPS, technology, situational awareness, physical AI, phi9',
  openGraph: {
    type: 'website',
    url: 'https://phi9.space/',
    title: 'phi9.space - Enabling Situational Awareness',
    description: 'Building the enabling technology for GPS denied navigation systems.',
    siteName: 'phi9.space',
  },
  twitter: {
    card: 'summary_large_image',
    url: 'https://phi9.space/',
    title: 'phi9.space - Enabling Situational Awareness',
    description: 'Building the enabling technology for GPS denied navigation systems.',
  },
  alternates: {
    canonical: 'https://phi9.space/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function HomePage() {
  return <Home />
}
