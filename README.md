# phi9.space

Building the enabling technology for GPS denied navigation systems.

## 🚀 Features

- **Next.js 14** with App Router for optimal performance
- **Static Site Generation** for excellent SEO
- **Tailwind CSS** for responsive design
- **Dynamic Case Studies** with markdown support
- **SEO Optimized** with meta tags, Open Graph, and sitemap
- **GitHub Pages** ready deployment

## 📁 Project Structure

```
phi9.space/
├── app/                          # Next.js App Router pages
│   ├── case-studies/
│   │   ├── [slug]/               # Dynamic case study pages
│   │   └── page.js              # Case studies listing
│   ├── manifesto/
│   │   └── page.js              # Manifesto page
│   ├── layout.js                # Root layout
│   ├── page.js                  # Home page
│   └── globals.css              # Global styles
├── public/                       # Static assets
│   ├── content/                  # Markdown case studies
│   ├── manifesto.md             # Manifesto content
│   └── PHI9.SPACE.svg           # Logo
├── src/
│   └── components/               # React components
│       ├── Navbar.jsx
│       └── pages/
└── package.json
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/phi9.space.git
cd phi9.space

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the site.

### Building

```bash
# Build for production
npm run build

# Export static files for GitHub Pages
npm run export
```

## 📝 Adding Case Studies

1. Add your markdown file to `public/content/`
2. The system automatically generates:
   - Listing page entry
   - Individual case study page
   - SEO metadata
   - Sitemap entries

Example file structure:
```
public/content/
├── your-case-study.md
└── another-study.md
```

## 🚀 Deployment

### GitHub Pages

1. Update `package.json` homepage field:
```json
"homepage": "https://a3fckx.github.io/phi9.space"
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

### Other Platforms

The static export works with any static hosting:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 🔍 SEO Features

- ✅ Static generation for all pages
- ✅ Dynamic meta tags for each page
- ✅ Open Graph and Twitter Card support
- ✅ XML sitemap generation
- ✅ Robots.txt configuration
- ✅ Canonical URLs

## 📊 Case Studies

The site includes comprehensive case studies on:
- Healthcare technology implementation
- Patient monitoring systems
- RTLS (Real-Time Location Systems)
- Navigation technology solutions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

For questions or collaborations:
- Email: founders@phi9.space
- Website: https://phi9.space
