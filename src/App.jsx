import './styles/main.css';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Manifesto from './components/pages/Manifesto';


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
        src="/PHI9 LOGO.svg" 
        alt="PHI9 Background" 
        style={{ 
          maxWidth: '100%', 
          maxHeight: '80%', 
          objectFit: 'contain' 
        }} 
      />
      <p style={{ marginTop: '2rem', fontSize: '1.125rem', fontFamily: 'Montserrat, sans-serif', color: '#000000', textAlign: 'center' }}>
        Read our manifesto <Link to="/manifesto" style={{ color: '#FF5C00', textDecoration: 'underline' }}>here</Link>.
      </p>
    </div>
  );
}

function App() {
  const location = useLocation();
  
  // Check if the path doesn't match any defined routes
  // This will handle both 404 cases and when a 200 status is triggered by Netlify
  const validPaths = ['/', '/manifesto', '/contact'];
  if (!validPaths.includes(location.pathname)) {
    return <NotFound />;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Manifesto />} />
        <Route path="/manifesto" element={<Manifesto />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
