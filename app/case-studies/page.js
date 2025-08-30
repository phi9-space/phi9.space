import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { getCaseStudies } from '../../lib/case-studies'

export const metadata = {
  title: 'Case Studies - phi9.space',
  description: 'Explore comprehensive case studies on healthcare technology, patient monitoring, and real-time location systems. Learn how phi9 is transforming healthcare delivery.',
  keywords: 'case studies, healthcare, patient monitoring, RTLS, phi9, healthcare technology',
  openGraph: {
    type: 'website',
    url: 'https://phi9.space/case-studies',
    title: 'Case Studies - phi9.space',
    description: 'Explore comprehensive case studies on healthcare technology and patient monitoring solutions.',
    siteName: 'phi9.space',
  },
  twitter: {
    card: 'summary',
    url: 'https://phi9.space/case-studies',
    title: 'Case Studies - phi9.space',
    description: 'Explore comprehensive case studies on healthcare technology and patient monitoring solutions.',
  },
  alternates: {
    canonical: 'https://phi9.space/case-studies',
  },
  robots: {
    index: true,
    follow: true,
  },
}



export default function CaseStudiesPage() {
  const caseStudies = getCaseStudies()

  return (
    <div className="min-h-screen bg-base px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Case Studies</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore comprehensive research and analysis on healthcare technology, patient monitoring,
            and real-time location systems. Learn how phi9 is transforming healthcare delivery.
          </p>
        </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-1">
        {caseStudies.map((study) => (
          <article key={study.slug} className="bg-base rounded-lg p-8 border border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4 hover:text-accent transition-colors">
                <Link href={`/case-studies/${study.slug}`}>
                  {study.title}
                </Link>
              </h2>

              <div className="flex items-start justify-between gap-4">
                <p className="text-gray-600 flex-1 leading-relaxed">
                  {study.description}
                </p>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="inline-flex items-center text-accent hover:text-primary transition-colors font-medium whitespace-nowrap"
                >
                  Read More
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

        {caseStudies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No case studies available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}
