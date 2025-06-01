import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import './styles/main.css';

function App() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <img 
        src="/Cover Logo.svg" 
        alt="PHI9" 
        className="max-w-full max-h-[80vh] w-auto h-auto"
      />
    </div>
  );
}

export default App;
