import React, { useState, useEffect } from 'react';
import './Manifesto.css';

const Manifesto = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('/manifesto.md')
      .then(response => response.text())
      .then(text => setContent(text))
      .catch(error => console.error('Error loading manifesto:', error));
  }, []);

  // Function to parse markdown-like formatting
  const parseContent = (text) => {
    if (!text) return null;
    
    const lines = text.split('\n');
    return lines.map((line, index) => {
      // Empty lines
      if (line.trim() === '') {
        return <div key={index} className="empty-line">&nbsp;</div>;
      }
      
      // Headers
      if (line.startsWith('## ')) {
        const content = parseInlineFormatting(line.substring(3));
        return <h2 key={index} className="terminal-h2">{content}</h2>;
      }
      if (line.startsWith('# ')) {
        const content = parseInlineFormatting(line.substring(2));
        return <h1 key={index} className="terminal-h1">{content}</h1>;
      }
      
      // Regular paragraphs
      const content = parseInlineFormatting(line);
      return <p key={index} className="terminal-p">{content}</p>;
    });
  };

  // Function to parse inline formatting (bold, italic)
  const parseInlineFormatting = (text) => {
    // Split by bold markers
    const parts = text.split(/(\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*)/g);
    
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
    <div className="terminal-container">
      <div className="terminal-content">
        {parseContent(content)}
      </div>
    </div>
  );
};

export default Manifesto;