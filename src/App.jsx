import './styles/main.css';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from './components/Navbar';
import Manifesto from './components/pages/Manifesto';
import Home from './components/pages/Home';


function NotFound() {
  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      <img 
        src="/PHI9.SPACE.svg" 
        alt="PHI9 Background" 
        style={{ 
          maxWidth: '100%', 
          maxHeight: '80%', 
          objectFit: 'contain' 
        }} 
      />
      <p style={{ marginTop: '2rem', fontSize: '1.125rem', fontFamily: 'Montserrat, sans-serif', color: 'var(--color-primary)', textAlign: 'center' }}>
        Read our manifesto <Link to="/manifesto" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>here</Link>.
      </p>
    </div>
  );
}

function App() {
  const location = useLocation();

  // Check if the path doesn't match any defined routes
  // This will handle both 404 cases and when a 200 status is triggered by Netlify
  const validPaths = ['/', '/manifesto'];
  if (!validPaths.includes(location.pathname)) {
    return <NotFound />;
  }

  // Dynamic meta tags based on current route
  const getMetaTags = () => {
    const baseMeta = {
      title: "phi9.space",
      description: "Building the enabling technology for GPS denied navigation systems",
      keywords: "physical AI, autonomous systems, situational awareness, navigation, robotics, AI technology",
      url: window.location.href,
      image: window.location.origin + "/PHI9.SPACE.svg"
    };

    switch (location.pathname) {
      case '/':
        return {
          ...baseMeta,
          title: "phi9.space - Enabling Physical AI Situational Awareness",
          description: "Building the enabling technology for GPS denied navigation systems. We create embodied intelligence that navigates any environment.",
          heading: "Enabling situational awareness in Physical AI systems."
        };
      case '/manifesto':
        return {
          ...baseMeta,
          title: "Manifesto - phi9.space",
          description: "Our vision for the future of autonomous systems and physical AI. From delivery drones to exploration robots, creating unprecedented prosperity.",
          heading: "Our Manifesto for Physical AI"
        };
      default:
        return baseMeta;
    }
  };

  const meta = getMetaTags();

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />

        {/* Canonical URL */}
        <link rel="canonical" href={meta.url} />

        {/* Open Graph tags */}
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:url" content={meta.url} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="phi9.space" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "phi9.space",
            "description": meta.description,
            "url": window.location.origin,
            "logo": meta.image,
            "sameAs": [
              "https://github.com/a3fckx/phi9.space"
            ]
          })}
        </script>
      </Helmet>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manifesto" element={<Manifesto />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
