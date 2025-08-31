import React, { useState, useEffect } from 'react';
import './Manifesto.css';

const Manifesto = () => {
  const [content, setContent] = useState('');

  // Include manifesto content inline for SEO
  const manifestoContent = `# Our Manifesto

We have a utopian view of how the world will be. Autonomous systems operating with seamless precision everywhere—delivery drones threading through urban corridors, agricultural robots optimising vast farmlands, mining systems extracting minerals from underground networks, exploration robots venturing into inaccessible territories across planets.

The next great leap forward lies in achieving *seamless physical AI —systems* that perceive, understand, and interact with the real world with unprecedented capability. We're creating embodied intelligence that can navigate any environment and operate to any challenge.

Physical AI represents the natural evolution of intelligence itself. Just as humans learned to interact meaningfully with their environment, AI systems are now developing the ability to engage seamlessly with physical objects, environments, and dynamics. This transformation will unlock genuine impact across every domain of human activity.

The opportunity to create *situational awareness* that integrates perception, cognition, and action into unified intelligence; creating systems with context-aware mastery of space, time, and environment—intelligence that can operate anywhere.

At **phi9.space**, our team of engineers and innovators is building foundations of networked intelligence.

The next billion autonomous systems will enable a *world of unprecedented prosperity, discovery, and human flourishing.*`;

  useEffect(() => {
    fetch('/manifesto.md')
      .then(response => response.text())
      .then(text => setContent(text))
      .catch(error => {
        console.error('Error loading manifesto:', error);
        setContent(manifestoContent); // Fallback to inline content
      });
  }, []);

  // Set default content initially for SEO
  useEffect(() => {
    if (!content && manifestoContent) {
      setContent(manifestoContent);
    }
  }, [content, manifestoContent]);

  // Function to parse markdown-like formatting
  const parseContent = (text) => {
    if (!text) return null;
    
    const lines = text.split('\n');
    return lines.map((line, index) => {
      // Empty lines
      if (line.trim() === '') {
        return null;
      }
      
      // Headers
      if (line.startsWith('## ')) {
        const content = parseInlineFormatting(line.substring(3));
        return <h2 key={index} className="manifesto-h2">{content}</h2>;
      }
      if (line.startsWith('# ')) {
        const content = parseInlineFormatting(line.substring(2));
        return <h1 key={index} className="manifesto-h1">{content}</h1>;
      }
      
      // Regular paragraphs
      const content = parseInlineFormatting(line);
      return <p key={index} className="manifesto-p">{content}</p>;
    });
  };

  // Function to parse inline formatting (bold, italic)
  const parseInlineFormatting = (text) => {
    // Split by bold markers
    const parts = text.split(/(\*\*\*[^\*]+\*\*\*|\*\*[^\*]+\*\*|\*[^\*]+\*)/g);
    
    return parts.map((part, index) => {
      // Bold + italic (***text***)
      if (part.startsWith('***') && part.endsWith('***')) {
        const content = part.slice(3, -3);
        return <span key={index} className="bold-italic">{content}</span>;
      }
      // Bold (**text**)
      else if (part.startsWith('**') && part.endsWith('**')) {
        const content = part.slice(2, -2);
        return <strong key={index}>{content}</strong>;
      }
      // Italic (*text*)
      else if (part.startsWith('*') && part.endsWith('*')) {
        const content = part.slice(1, -1);
        return <em key={index}>{content}</em>;
      }
      // Regular text
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="manifesto-container">
      <div className="manifesto-content">
        {parseContent(content)}
      </div>
    </div>
  );
};

export default Manifesto;
