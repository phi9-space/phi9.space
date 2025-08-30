'use client'

import React, { useState, useEffect } from 'react';

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
        return null;
      }

      // Headers
      if (line.startsWith('## ')) {
        const content = parseInlineFormatting(line.substring(3));
        return <h2 key={index} className="text-2xl font-bold text-primary mt-6 mb-3">{content}</h2>;
      }
      if (line.startsWith('# ')) {
        const content = parseInlineFormatting(line.substring(2));
        return <h1 key={index} className="text-3xl font-bold text-primary mt-8 mb-4 first:mt-0">{content}</h1>;
      }

      // Regular paragraphs
      const content = parseInlineFormatting(line);
      return <p key={index} className="mb-4 text-gray-700 leading-relaxed">{content}</p>;
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
    <div className="min-h-screen bg-base px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-base">
          <div className="prose prose-lg max-w-none prose-headings:text-primary prose-p:text-gray-700 prose-strong:text-primary prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
            {parseContent(content)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manifesto;
