import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Manifesto = () => {
  const [content, setContent] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    fetch('/manifesto.md')
      .then(response => response.text())
      .then(text => setContent(text))
      .catch(error => console.error('Error loading manifesto:', error));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Terminal-style progress bar */}
      <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />
      
      <div className="terminal-container">
        <div className="terminal-header">
          <div className="terminal-controls">
            <span className="control red"></span>
            <span className="control yellow"></span>
            <span className="control green"></span>
          </div>
          <div className="terminal-title">phi9.space</div>
        </div>
        
        <div className="terminal-content">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              strong: ({children}) => {
                const text = children.toString();
                // Only highlight the most important phrases in orange
                const isHighlight = 
                  text.includes('phi9.space') ||
                  text.includes('Non-GNSS autonomous systems') ||
                  text.includes('national imperative for survival and dominance') ||
                  text.includes('phi9.space is India\'s definitive answer');
                return <strong className={isHighlight ? 'highlight' : ''}>{children}</strong>;
              }
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>

      <style jsx>{`
        /* Progress Bar */
        .progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          height: 2px;
          background: #ff6600;
          z-index: 1000;
          transition: width 0.1s ease-out;
        }

        /* Terminal Container */
        .terminal-container {
          min-height: 100vh;
          background-color: #ffffff;
          color: #000000;
          font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        /* Terminal Header */
        .terminal-header {
          background-color: #f5f5f5;
          padding: 8px 12px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #e0e0e0;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .terminal-controls {
          display: flex;
          gap: 6px;
          position: absolute;
        }

        .control {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          display: block;
        }

        .control.red {
          background-color: #ff5f56;
        }

        .control.yellow {
          background-color: #ffbd2e;
        }

        .control.green {
          background-color: #27c93f;
        }

        .terminal-title {
          flex: 1;
          text-align: center;
          font-size: 11px;
          color: #666;
        }

        /* Terminal Content */
        .terminal-content {
          flex: 1;
          overflow-y: auto;
          padding: 30px 40px;
          max-width: 800px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }

        /* Typography */
        .terminal-content :global(h2) {
          font-size: 11px;
          font-weight: bold;
          margin: 30px 0 15px 0;
          color: #000000;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .terminal-content :global(h2:first-child) {
          margin-top: 0;
        }

        .terminal-content :global(p) {
          font-size: 9px;
          line-height: 1.6;
          margin: 0 0 12px 0;
          color: #000000;
          text-align: justify;
          padding-top: 8px;
        }

        .terminal-content :global(h2 + p) {
          padding-top: 0;
        }

        .terminal-content :global(ul) {
          margin: 15px 0;
          padding-left: 20px;
        }

        .terminal-content :global(li) {
          font-size: 9px;
          line-height: 1.6;
          margin: 0 0 8px 0;
          color: #000000;
          text-align: justify;
          list-style-type: none;
          position: relative;
        }

        .terminal-content :global(li:before) {
          content: ">";
          position: absolute;
          left: -15px;
          color: #000000;
        }

        .terminal-content :global(strong) {
          font-weight: bold;
          color: #000000;
        }

        .terminal-content :global(strong.highlight) {
          color: #ff6600;
        }

        .terminal-content :global(em) {
          font-style: italic;
          color: #000000;
        }

        /* Scrollbar styling */
        .terminal-content::-webkit-scrollbar {
          width: 8px;
        }

        .terminal-content::-webkit-scrollbar-track {
          background: #f5f5f5;
        }

        .terminal-content::-webkit-scrollbar-thumb {
          background: #cccccc;
          border-radius: 4px;
        }

        .terminal-content::-webkit-scrollbar-thumb:hover {
          background: #999999;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .terminal-content {
            padding: 20px;
          }

          .terminal-content :global(h2) {
            font-size: 10px;
            margin: 24px 0 12px 0;
          }

          .terminal-content :global(p),
          .terminal-content :global(li) {
            font-size: 8px;
          }
        }

        @media print {
          .progress-bar,
          .terminal-header {
            display: none;
          }

          .terminal-container {
            background: white;
          }

          .terminal-content,
          .terminal-content :global(*) {
            color: black !important;
          }
        }
      `}</style>
    </>
  );
};

export default Manifesto;