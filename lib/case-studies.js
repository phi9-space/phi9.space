import fs from 'fs'
import path from 'path'

export function getCaseStudies() {
  const contentDir = path.join(process.cwd(), 'public', 'content')
  const files = fs.readdirSync(contentDir)

  return files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const filePath = path.join(contentDir, file)
      const content = fs.readFileSync(filePath, 'utf8')

      // Extract title from first line or filename
      const lines = content.split('\n')
      let title = file.replace('.md', '').replace(/_/g, ' ')

      // Look for # header in first few lines
      for (let i = 0; i < Math.min(5, lines.length); i++) {
        if (lines[i].startsWith('# ')) {
          title = lines[i].replace('# ', '').trim()
          break
        }
      }

      // Extract first paragraph for description
      let description = ''
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim()
        if (line && !line.startsWith('#') && line.length > 50) {
          description = line
          break
        }
      }

      return {
        slug: file.replace('.md', '').toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-'),
        filename: file,
        title,
        description: description || 'Comprehensive case study on healthcare technology and patient monitoring solutions.',
        content: content.substring(0, 300) + '...' // Preview
      }
    })
}

export function getCaseStudy(slug) {
  const contentDir = path.join(process.cwd(), 'public', 'content')
  const files = fs.readdirSync(contentDir)

  const file = files.find(f =>
    f.replace('.md', '').toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-') === slug
  )

  if (!file) {
    return null
  }

  const filePath = path.join(contentDir, file)
  const content = fs.readFileSync(filePath, 'utf8')

  // Extract title
  const lines = content.split('\n')
  let title = file.replace('.md', '').replace(/_/g, ' ')

  for (let i = 0; i < Math.min(5, lines.length); i++) {
    if (lines[i].startsWith('# ')) {
      title = lines[i].replace('# ', '').trim()
      break
    }
  }

  return {
    slug,
    filename: file,
    title,
    content
  }
}

export function parseMarkdown(content) {
  // Extract footnotes/references first
  const footnoteRegex = /\[\^(\d+)\]:\s*(.+)/g
  const footnotes = {}
  let contentWithoutFootnotes = content

  let match
  while ((match = footnoteRegex.exec(content)) !== null) {
    footnotes[match[1]] = match[2].trim()
  }

  // Remove footnote definitions from content
  contentWithoutFootnotes = contentWithoutFootnotes.replace(footnoteRegex, '').trim()

  const lines = contentWithoutFootnotes.split('\n')
  const elements = []
  let inCodeBlock = false
  let codeBlockContent = ''
  let codeBlockLanguage = ''

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Code blocks
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre key={i} className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4">
            <code className={`language-${codeBlockLanguage}`}>
              {codeBlockContent.trim()}
            </code>
          </pre>
        )
        inCodeBlock = false
        codeBlockContent = ''
        codeBlockLanguage = ''
      } else {
        inCodeBlock = true
        codeBlockLanguage = line.replace('```', '')
      }
      continue
    }

    if (inCodeBlock) {
      codeBlockContent += line + '\n'
      continue
    }

    // Headers
    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={i} className="text-3xl font-bold text-primary mt-8 mb-4 first:mt-0">
          {parseInlineMarkdown(line.substring(2), footnotes)}
        </h1>
      )
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-2xl font-bold text-primary mt-6 mb-3">
          {parseInlineMarkdown(line.substring(3), footnotes)}
        </h2>
      )
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-xl font-bold text-primary mt-4 mb-2">
          {parseInlineMarkdown(line.substring(4), footnotes)}
        </h3>
      )
    }
    // Lists
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      elements.push(
        <li key={i} className="mb-1">
          {parseInlineMarkdown(line.substring(2), footnotes)}
        </li>
      )
    }
    // Empty lines
    else if (line.trim() === '') {
      // Add spacing
    }
    // Regular paragraphs
    else if (line.trim()) {
      elements.push(
        <p key={i} className="mb-4 text-gray-700 leading-relaxed">
          {parseInlineMarkdown(line, footnotes)}
        </p>
      )
    }
  }

  return elements
}

function parseInlineMarkdown(text, footnotes = {}) {
  // Handle footnote references [^1]
  text = text.replace(/\[\^(\d+)\]/g, (match, number) => {
    const url = footnotes[number]
    if (url) {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-accent hover:text-primary underline font-medium transition-colors duration-200 inline-flex items-center gap-1"><sup>${number}</sup><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></a>`
    }
    return `<sup class="text-accent">${number}</sup>`
  })

  // Handle regular links [text](url)
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-accent hover:text-primary underline font-medium transition-colors duration-200">$1</a>')

  // Handle bold **text**
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold">$1</strong>')

  // Handle italic *text*
  text = text.replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>')

  // Handle inline code `text`
  text = text.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>')

  return <span dangerouslySetInnerHTML={{ __html: text }} />
}
