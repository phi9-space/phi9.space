import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCaseStudy, parseMarkdown } from '../../../lib/case-studies'

export async function generateStaticParams() {
  const { getCaseStudies } = await import('../../../lib/case-studies')
  const caseStudies = getCaseStudies()

  return caseStudies.map((study) => ({
    slug: study.slug,
  }))
}

export async function generateMetadata({ params }) {
  const { slug } = params
  const { getCaseStudy } = await import('../../../lib/case-studies')
  const caseStudy = getCaseStudy(slug)

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found - phi9.space',
    }
  }

  // Extract description from first paragraph
  const lines = caseStudy.content.split('\n')
  let description = ''
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (line && !line.startsWith('#') && line.length > 50) {
      description = line
      break
    }
  }

  return {
    title: `${caseStudy.title} - Case Study - phi9.space`,
    description: description || 'Comprehensive case study on healthcare technology and patient monitoring solutions.',
    keywords: `${caseStudy.title}, case study, healthcare, patient monitoring, RTLS, phi9`,
    openGraph: {
      type: 'article',
      url: `https://phi9.space/case-studies/${slug}`,
      title: `${caseStudy.title} - Case Study - phi9.space`,
      description: description || 'Comprehensive case study on healthcare technology and patient monitoring solutions.',
      siteName: 'phi9.space',
    },
    twitter: {
      card: 'summary',
      url: `https://phi9.space/case-studies/${slug}`,
      title: `${caseStudy.title} - Case Study - phi9.space`,
      description: description || 'Comprehensive case study on healthcare technology and patient monitoring solutions.',
    },
    alternates: {
      canonical: `https://phi9.space/case-studies/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}



export default function CaseStudyPage({ params }) {
  const { slug } = params
  const caseStudy = getCaseStudy(slug)

  if (!caseStudy) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-base px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/case-studies"
            className="inline-flex items-center text-accent hover:text-primary transition-colors mb-6"
          >
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Case Studies
          </Link>

          <div className="text-center">
            <span className="inline-block bg-accent bg-opacity-10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
              Case Study
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary">{caseStudy.title}</h1>
          </div>
        </div>

        <div className="prose prose-lg max-w-none prose-headings:text-primary prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-primary prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-pre:bg-gray-100 prose-code:bg-gray-100 prose-code:text-sm">
          <div className="bg-base">
            {parseMarkdown(caseStudy.content)}
          </div>
        </div>


      </div>
    </div>
  )
}
