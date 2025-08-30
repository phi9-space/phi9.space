import Manifesto from '../../components/ui/Manifesto'

export const metadata = {
  title: 'Manifesto - phi9.space',
  description: 'Our manifesto: Building the enabling technology for GPS denied navigation systems. Read about our mission and vision for the future of navigation technology.',
  keywords: 'manifesto, phi9, navigation, GPS, technology, mission, vision',
  openGraph: {
    type: 'article',
    url: 'https://phi9.space/manifesto',
    title: 'Manifesto - phi9.space',
    description: 'Our manifesto: Building the enabling technology for GPS denied navigation systems.',
    siteName: 'phi9.space',
  },
  twitter: {
    card: 'summary',
    url: 'https://phi9.space/manifesto',
    title: 'Manifesto - phi9.space',
    description: 'Our manifesto: Building the enabling technology for GPS denied navigation systems.',
  },
  alternates: {
    canonical: 'https://phi9.space/manifesto',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ManifestoPage() {
  return <Manifesto />
}
