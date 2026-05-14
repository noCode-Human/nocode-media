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

const asciiPrimary = String.raw`+-- noCode
|  <skill/>
+-> ./ship`;

const asciiGhost = String.raw`0101 0110
// modules
>_ build`;

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const asciiPrimaryRef = useRef<HTMLPreElement>(null);
  const asciiGhostRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const primary = asciiPrimaryRef.current;
    const ghost = asciiGhostRef.current;

    if (!section || !primary || !ghost) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    let targetX = section.clientWidth * 0.76;
    let targetY = section.clientHeight * 0.28;
    let primaryX = targetX;
    let primaryY = targetY;
    let ghostX = targetX - 42;
    let ghostY = targetY + 36;
    let visible = false;
    let frame = 0;
    let animationFrame = 0;

    const setVisible = (nextVisible: boolean) => {
      visible = nextVisible;
      primary.dataset.visible = String(nextVisible);
      ghost.dataset.visible = String(nextVisible);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;
      setVisible(true);
    };

    const handlePointerLeave = () => setVisible(false);

    const animate = () => {
      primaryX += (targetX - primaryX) * 0.16;
      primaryY += (targetY - primaryY) * 0.16;
      ghostX += (targetX - 52 - ghostX) * 0.08;
      ghostY += (targetY + 44 - ghostY) * 0.08;

      const drift = Math.sin(frame * 0.03) * 5;

      primary.style.transform = `translate3d(${primaryX}px, ${primaryY + drift}px, 0) translate(-50%, -50%)`;
      ghost.style.transform = `translate3d(${ghostX}px, ${ghostY - drift}px, 0) translate(-50%, -50%)`;

      frame += 1;
      animationFrame = requestAnimationFrame(animate);
    };

    section.addEventListener('pointermove', handlePointerMove);
    section.addEventListener('pointerleave', handlePointerLeave);
    setVisible(true);
    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      section.removeEventListener('pointermove', handlePointerMove);
      section.removeEventListener('pointerleave', handlePointerLeave);
      if (visible) setVisible(false);
    };
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
      <div className="hero-ascii-field" aria-hidden="true">
        <pre ref={asciiPrimaryRef} className="hero-ascii-trail hero-ascii-trail-primary">
          {asciiPrimary}
        </pre>
        <pre ref={asciiGhostRef} className="hero-ascii-trail hero-ascii-trail-ghost">
          {asciiGhost}
        </pre>
      </div>

      {/* Logo */}
      <div
        style={{
          position: 'absolute',
          top: 32,
          left: 32,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontSize: 14,
          fontWeight: 500,
          letterSpacing: '2px',
          textTransform: 'uppercase' as const,
          color: '#000',
          fontFamily: "'Inter', sans-serif",
          zIndex: 2,
        }}
      >
        <img
          src="/nocode-human-icon.png"
          alt=""
          aria-hidden="true"
          style={{
            width: 26,
            height: 26,
            objectFit: 'cover',
            borderRadius: 3,
            display: 'block',
          }}
        />
        <span className="hero-wordmark-text">noCode.media</span>
      </div>

      {/* Word Cycle */}
      <div className="word-cycle-container" style={{ padding: '0 24px', position: 'relative', zIndex: 2 }}>
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
          position: 'relative',
          zIndex: 2,
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
          position: 'relative',
          zIndex: 2,
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
          zIndex: 2,
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
        .hero-ascii-field {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }

        .hero-ascii-trail {
          position: absolute;
          top: 0;
          left: 0;
          margin: 0;
          white-space: pre;
          text-align: left;
          font-family: 'Space Mono', monospace;
          font-size: clamp(10px, 1vw, 14px);
          line-height: 1.18;
          letter-spacing: 0;
          opacity: 0;
          user-select: none;
          will-change: transform, opacity;
          transition: opacity 220ms cubic-bezier(0.25, 1, 0.5, 1);
        }

        .hero-ascii-trail-primary {
          color: var(--market-accent);
          text-shadow: 0 0 18px rgba(var(--market-accent-rgb), 0.18);
        }

        .hero-ascii-trail-ghost {
          color: #000;
          opacity: 0;
          filter: blur(0.2px);
        }

        .hero-ascii-trail-primary[data-visible="true"] {
          opacity: 0.58;
        }

        .hero-ascii-trail-ghost[data-visible="true"] {
          opacity: 0.16;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        @media (prefers-reduced-motion: reduce), (max-width: 767px) {
          .hero-ascii-field {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
