import './styles/main.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Manifesto from './components/pages/Manifesto';

function NotFound() {
  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      <img 
        src="/PHI9 BG.svg" 
        alt="PHI9 Background" 
        style={{ 
          maxWidth: '100%', 
          maxHeight: '100%', 
          objectFit: 'contain' 
        }} 
      />
    </div>
  );
}

function App() {
  const location = useLocation();
  
  // Check if the path doesn't match any defined routes
  // This will handle both 404 cases and when a 200 status is triggered by Netlify
  if (location.pathname !== '/' && !location.pathname.startsWith('/manifesto')) {
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
