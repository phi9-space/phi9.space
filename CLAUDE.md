# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

phi9.space is a React-based website built with Vite and Tailwind CSS, focusing on India's defense future through a manifesto and strategic vision. The site is deployed to both Netlify and GitHub Pages.

## Tech Stack

- **Framework**: React 18 with React Router v6
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS with custom components
- **Deployment**: Netlify (primary) and GitHub Pages
- **Dependencies**: Framer Motion for animations, React Markdown for content rendering

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy

# Build for Netlify
npm run netlify-build
```

## Project Architecture

### Routing Structure
- `/` - Home page (src/components/pages/Home.jsx)
- `/manifesto` - Manifesto page (src/components/pages/Manifesto.jsx)
- `*` - 404 handler displays PHI9.SPACE logo with link to manifesto

### Key Files
- **src/App.jsx**: Main application component with routing logic and 404 handling
- **src/components/Navbar.jsx**: Navigation component
- **src/components/pages/**: Page components (Home.jsx, Manifesto.jsx)
- **public/manifesto.md**: Markdown content for the manifesto page
- **vite.config.js**: Build configuration with code splitting for React and vendor libraries

### Deployment Configuration
- **netlify.toml**: Configures SPA routing with catch-all redirect to index.html
- **.github/workflows/deploy.yml**: GitHub Actions workflow for GitHub Pages deployment
- **public/CNAME**: Custom domain configuration for GitHub Pages

### Build Optimizations
- Code splitting enabled for React libraries and vendor dependencies
- Terser minification for production builds
- Source maps disabled for faster builds
- Chunk size warning limit set to 1000KB

## Important Notes

- The project uses absolute imports from the src directory
- All routes are handled client-side with React Router
- Static assets (logos, SVGs) are served from the public directory
- No testing framework or linting tools are currently configured
- Custom CSS files exist alongside Tailwind for specific components (Navbar.css, Home.css, Manifesto.css)