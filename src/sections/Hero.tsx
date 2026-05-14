import { useEffect, useRef } from 'react';
import { ArrowDown, Terminal } from 'lucide-react';

const cycleWords = [
  "3D Portraits",
  "WebGL Shaders",
  "Dashboard UI",
  "CSS Generators",
  "SVG Art",
  "AI Chatbots",
  "Kinetic Type",
  "Data Viz",
  "Animations",
  "HTML Templates",
  "3D Portraits",
  "WebGL Shaders",
];

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add any entrance animations here if needed
  }, []);

  const scrollToGrid = () => {
    const gridSection = document.getElementById('terminal-grid');
    if (gridSection) {
      gridSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: '#f7f7f7',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Logo */}
      <div
        style={{
          position: 'absolute',
          top: 32,
          left: 32,
          fontSize: 14,
          fontWeight: 500,
          letterSpacing: '2px',
          textTransform: 'uppercase' as const,
          color: '#000',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        noCode.media
      </div>

      {/* Word Cycle */}
      <div className="word-cycle-container" style={{ padding: '0 24px' }}>
        <h2 className="word-cycle-sentence">
          <span>Browse</span>
          <div className="word-cycle-list">
            <ul>
              {cycleWords.map((word, i) => (
                <li key={i}>{word}</li>
              ))}
            </ul>
          </div>
        </h2>
      </div>

      {/* Subtitle */}
      <p
        style={{
          marginTop: 40,
          color: '#6b6b6b',
          fontSize: 14,
          fontFamily: "'Space Mono', monospace",
          letterSpacing: '2px',
          textTransform: 'uppercase' as const,
        }}
      >
        AI-Powered Development Skills
      </p>

      {/* CTA */}
      <button
        onClick={scrollToGrid}
        style={{
          marginTop: 48,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '14px 28px',
          background: '#000',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: '1px',
          cursor: 'pointer',
          fontFamily: "'Inter', sans-serif",
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#333';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#000';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <Terminal size={16} />
        EXPLORE MODULES
      </button>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          color: '#999',
          fontSize: 11,
          fontFamily: "'Space Mono', monospace",
          letterSpacing: '2px',
          animation: 'bounce 2s infinite',
        }}
      >
        <span>SCROLL</span>
        <ArrowDown size={16} />
      </div>

      {/* Right edge floating button */}
      <div
        style={{
          position: 'fixed',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%) rotate(90deg)',
          transformOrigin: 'center center',
          zIndex: 10,
        }}
      >
        <button
          onClick={scrollToGrid}
          style={{
            padding: '10px 20px',
            background: '#000',
            color: '#fff',
            border: 'none',
            fontSize: 11,
            fontFamily: "'Space Mono', monospace",
            letterSpacing: '2px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--market-accent)';
            e.currentTarget.style.color = '#000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#000';
            e.currentTarget.style.color = '#fff';
          }}
        >
          VIEW TERMINAL
        </button>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
      `}</style>
    </section>
  );
}
