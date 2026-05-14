import { useState, useEffect, useRef } from 'react';
import { X, Code, Eye, Image, Star, Users, Copy, Check, ExternalLink } from 'lucide-react';
import type { Skill, SkillExample } from '@/data/skills';

type TabType = 'preview' | 'markdown' | 'gallery';

const DEFAULT_SUPPORT_URL = 'https://ko-fi.com/s/768aff36b3';

interface SkillDetailModalProps {
  skill: Skill;
  onClose: () => void;
}

export default function SkillDetailModal({ skill, onClose }: SkillDetailModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('preview');
  const [copied, setCopied] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [selectedExample, setSelectedExample] = useState<SkillExample | null>(null);
  const [showCopySupport, setShowCopySupport] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showCopySupport) {
          setShowCopySupport(false);
          return;
        }

        if (selectedExample) {
          setSelectedExample(null);
          return;
        }

        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose, selectedExample, showCopySupport]);

  const copyToClipboard = async (text: string) => {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return;
      } catch {
        // Fall through to the textarea fallback for browsers that block clipboard access.
      }
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  };

  const handleCopy = async () => {
    await copyToClipboard(skill.markdown);
    setCopied(true);
    if (skill.supportAfterCopy) {
      setShowCopySupport(true);
    }
    setTimeout(() => setCopied(false), 2000);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'preview', label: 'HTML Preview', icon: <Eye size={14} /> },
    { id: 'markdown', label: 'Skill Docs', icon: <Code size={14} /> },
    { id: 'gallery', label: 'Examples', icon: <Image size={14} /> },
  ];

  // Create blob URL for iframe
  const getPreviewUrl = () => {
    const previewTheme = '<style>img { filter: hue-rotate(180deg) saturate(1.08); }</style>';
    const themedPreview = skill.htmlPreview.includes('</head>')
      ? skill.htmlPreview.replace('</head>', `${previewTheme}</head>`)
      : `${previewTheme}${skill.htmlPreview}`;
    const blob = new Blob([themedPreview], { type: 'text/html' });
    return URL.createObjectURL(blob);
  };

  const [previewUrl] = useState(() => getPreviewUrl());

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const renderMarkdown = () => {
    // Simple markdown renderer
    const lines = skill.markdown.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeContent = '';
    let codeLang = '';
    let tableRows: string[][] = [];
    let inTable = false;

    const flushCodeBlock = () => {
      if (codeContent) {
        elements.push(
          <div key={`code-${elements.length}`} style={{ position: 'relative', marginBottom: 16 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 12px',
                background: '#1a1a1a',
                borderRadius: '8px 8px 0 0',
                border: '1px solid #222',
                borderBottom: 'none',
              }}
            >
              <span style={{ color: '#666', fontSize: 10, fontFamily: "'Space Mono', monospace" }}>
                {codeLang || 'code'}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(codeContent);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#666',
                  cursor: 'pointer',
                  fontSize: 10,
                  fontFamily: "'Space Mono', monospace",
                }}
              >
                COPY
              </button>
            </div>
            <pre
              style={{
                margin: 0,
                padding: 16,
                background: '#0d0d0d',
                borderRadius: '0 0 8px 8px',
                overflow: 'auto',
                fontSize: 12,
                lineHeight: 1.6,
                border: '1px solid #222',
                borderTop: 'none',
                color: '#e0e0e0',
              }}
            >
              <code>{codeContent}</code>
            </pre>
          </div>
        );
      }
      codeContent = '';
      codeLang = '';
    };

    const flushTable = () => {
      if (tableRows.length > 0) {
        elements.push(
          <div key={`table-${elements.length}`} style={{ overflow: 'auto', marginBottom: 16 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr>
                  {tableRows[0].map((cell, i) => (
                    <th
                      key={i}
                      style={{
                        padding: '8px 12px',
                        background: '#1a1a1a',
                        color: 'var(--market-accent)',
                        border: '1px solid #222',
                        textAlign: 'left',
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 10,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.slice(2).map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        style={{
                          padding: '8px 12px',
                          border: '1px solid #222',
                          color: '#ccc',
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      tableRows = [];
      inTable = false;
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Code blocks
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          flushCodeBlock();
          inCodeBlock = false;
        } else {
          codeLang = line.replace('```', '').trim();
          inCodeBlock = true;
        }
        continue;
      }

      if (inCodeBlock) {
        codeContent += line + '\n';
        continue;
      }

      // Tables
      if (line.startsWith('|')) {
        inTable = true;
        const cells = line.split('|').filter(c => c.trim()).map(c => c.trim());
        if (cells.length > 0 && !cells.every(c => c.match(/^-+$/))) {
          tableRows.push(cells);
        }
        continue;
      } else if (inTable) {
        flushTable();
      }

      // Headings
      if (line.startsWith('## ')) {
        elements.push(
          <h2
            key={`h2-${i}`}
            style={{
              color: '#fff',
              fontSize: 20,
              fontWeight: 600,
              marginBottom: 12,
              marginTop: 24,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {line.replace('## ', '')}
          </h2>
        );
        continue;
      }

      if (line.startsWith('### ')) {
        elements.push(
          <h3
            key={`h3-${i}`}
            style={{
              color: 'var(--market-accent)',
              fontSize: 14,
              fontWeight: 600,
              marginBottom: 8,
              marginTop: 16,
              fontFamily: "'Space Mono', monospace",
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            {line.replace('### ', '')}
          </h3>
        );
        continue;
      }

      // Empty line
      if (line.trim() === '') {
        continue;
      }

      // Bullet points
      if (line.startsWith('- ')) {
        elements.push(
          <li
            key={`li-${i}`}
            style={{
              color: '#ccc',
              fontSize: 13,
              lineHeight: 1.8,
              marginLeft: 20,
              fontFamily: "'Inter', sans-serif",
              listStyleType: 'disc',
            }}
          >
            {line.replace('- ', '')}
          </li>
        );
        continue;
      }

      // Inline code
      const parts = line.split(/(`[^`]+`)/);
      const rendered = parts.map((part, pi) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code
              key={pi}
              style={{
                background: '#1a1a1a',
                padding: '2px 6px',
                borderRadius: 4,
                color: 'var(--market-accent)',
                fontSize: 12,
                fontFamily: "'Space Mono', monospace",
              }}
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        return <span key={pi}>{part}</span>;
      });

      elements.push(
        <p
          key={`p-${i}`}
          style={{
            color: '#ccc',
            fontSize: 13,
            lineHeight: 1.8,
            marginBottom: 8,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {rendered}
        </p>
      );
    }

    if (inCodeBlock) {
      flushCodeBlock();
    }
    if (inTable) {
      flushTable();
    }

    return elements;
  };

  const supportUrl = skill.supportUrl || skill.purchaseUrl || DEFAULT_SUPPORT_URL;
  const supportLabel = skill.supportLabel || 'Support with a tip';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        ref={modalRef}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 960,
          background: '#0a0a0a',
          borderRadius: 16,
          border: '1px solid rgba(var(--market-accent-rgb), 0.2)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div
          className="skill-modal-header"
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #222',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            position: 'relative',
            flexWrap: 'wrap',
          }}
        >
          {/* Skill image */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              overflow: 'hidden',
              border: '1px solid #333',
              flexShrink: 0,
            }}
          >
            <img
              src={skill.image}
              alt={skill.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'var(--market-accent-image-filter)' }}
            />
          </div>

          {/* Title area */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <h2
                style={{
                  color: '#fff',
                  fontSize: 20,
                  fontWeight: 600,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {skill.title}
              </h2>
              <span
                style={{
                  padding: '2px 8px',
                  background: 'rgba(var(--market-accent-rgb), 0.1)',
                  border: '1px solid rgba(var(--market-accent-rgb), 0.3)',
                  color: 'var(--market-accent)',
                  borderRadius: 4,
                  fontSize: 9,
                  fontFamily: "'Space Mono', monospace",
                  textTransform: 'uppercase',
                }}
              >
                {skill.category}
              </span>
            </div>
            <p
              style={{
                color: '#888',
                fontSize: 12,
                fontFamily: "'Inter', sans-serif",
                lineHeight: 1.4,
              }}
            >
              {skill.description}
            </p>
          </div>

          {skill.purchaseUrl && (
            <a
              className="skill-purchase-link"
              href={skill.purchaseUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                marginRight: 8,
                padding: '9px 12px',
                background: 'var(--market-accent)',
                color: '#050505',
                borderRadius: 6,
                fontSize: 10,
                fontWeight: 800,
                fontFamily: "'Space Mono', monospace",
                letterSpacing: '1px',
                textDecoration: 'none',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              {skill.purchaseLabel || 'Get Skill'}
              <ExternalLink size={12} />
            </a>
          )}

          {/* Stats */}
          <div style={{ display: 'flex', gap: 16, marginRight: 40 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center' }}>
                <Users size={12} color="#666" />
                <span style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>
                  {formatNumber(skill.stats.uses)}
                </span>
              </div>
              <span style={{ color: '#666', fontSize: 9, fontFamily: "'Space Mono', monospace" }}>
                USES
              </span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center' }}>
                <Star size={12} color="var(--market-accent)" />
                <span style={{ color: 'var(--market-accent)', fontSize: 14, fontWeight: 600 }}>
                  {skill.stats.rating}
                </span>
              </div>
              <span style={{ color: '#666', fontSize: 9, fontFamily: "'Space Mono', monospace" }}>
                RATING
              </span>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              width: 32,
              height: 32,
              borderRadius: 8,
              background: '#1a1a1a',
              border: '1px solid #333',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--market-accent)';
              e.currentTarget.style.color = 'var(--market-accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#333';
              e.currentTarget.style.color = '#fff';
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid #222',
            background: '#0d0d0d',
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIframeLoaded(false);
              }}
              style={{
                flex: 1,
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                background: activeTab === tab.id ? '#0a0a0a' : 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid var(--market-accent)' : '2px solid transparent',
                color: activeTab === tab.id ? 'var(--market-accent)' : '#666',
                fontSize: 12,
                fontFamily: "'Space Mono', monospace",
                letterSpacing: '1px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textTransform: 'uppercase',
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div
          style={{
            maxHeight: '60vh',
            overflow: 'auto',
            padding: activeTab === 'preview' ? 0 : 24,
          }}
        >
          {/* HTML Preview Tab */}
          {activeTab === 'preview' && (
            <div style={{ position: 'relative' }}>
              {!iframeLoaded && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#0a0a0a',
                    zIndex: 1,
                    height: 400,
                  }}
                >
                  <div
                    style={{
                      color: 'var(--market-accent)',
                      fontSize: 12,
                      fontFamily: "'Space Mono', monospace",
                      animation: 'pulse 1.5s infinite',
                    }}
                  >
                    LOADING PREVIEW...
                  </div>
                </div>
              )}
              <iframe
                src={previewUrl}
                title={`${skill.title} Preview`}
                style={{
                  width: '100%',
                  height: 500,
                  border: 'none',
                  background: '#0a0a0a',
                }}
                onLoad={() => setIframeLoaded(true)}
                sandbox="allow-scripts"
              />
            </div>
          )}

          {/* Markdown Tab */}
          {activeTab === 'markdown' && (
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 20,
                }}
              >
                <span
                  style={{
                    color: '#666',
                    fontSize: 10,
                    fontFamily: "'Space Mono', monospace",
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                  }}
                >
                  SKILL DOCUMENTATION
                </span>
                <button
                  onClick={handleCopy}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 12px',
                    background: copied ? 'rgba(0,255,156,0.1)' : '#1a1a1a',
                    border: `1px solid ${copied ? 'rgba(0,255,156,0.3)' : '#333'}`,
                    color: copied ? '#00ff9d' : '#888',
                    borderRadius: 6,
                    fontSize: 10,
                    fontFamily: "'Space Mono', monospace",
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  {copied ? 'COPIED' : 'COPY'}
                </button>
              </div>
              <div>{renderMarkdown()}</div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div>
              <div
                style={{
                  marginBottom: 20,
                  color: '#666',
                  fontSize: 10,
                  fontFamily: "'Space Mono', monospace",
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
              >
                EXAMPLES GALLERY
              </div>
              <div className="gallery-grid">
                {skill.examples.map((example, index) => (
                  <div
                    key={index}
                    className="gallery-item"
                    role={example.html ? 'button' : undefined}
                    tabIndex={example.html ? 0 : undefined}
                    onClick={() => {
                      if (example.html) setSelectedExample(example);
                    }}
                    onKeyDown={(event) => {
                      if (!example.html) return;
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setSelectedExample(example);
                      }
                    }}
                    style={{
                      animation: `slideUp 0.4s ease ${index * 100}ms both`,
                      cursor: example.html ? 'pointer' : 'default',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        aspectRatio: '16/9',
                        overflow: 'hidden',
                        background: '#050505',
                      }}
                    >
                      {example.html ? (
                        <iframe
                          title={`${example.title} template preview`}
                          srcDoc={example.html}
                          sandbox="allow-scripts"
                          style={{
                            border: 'none',
                            transform: 'scale(0.42)',
                            transformOrigin: 'top left',
                            width: '238%',
                            height: '238%',
                            pointerEvents: 'none',
                            background: '#fff',
                          }}
                        />
                      ) : (
                        <img
                          src={example.image}
                          alt={example.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            filter: 'var(--market-accent-image-filter)',
                            transition: 'transform 0.4s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        />
                      )}
                    </div>
                    <div style={{ padding: 12 }}>
                      <div
                        style={{
                          color: '#fff',
                          fontSize: 13,
                          fontWeight: 600,
                          marginBottom: 4,
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {example.title}
                      </div>
                      {example.fileName && (
                        <div
                          style={{
                            color: 'var(--market-accent)',
                            fontSize: 9,
                            fontFamily: "'Space Mono', monospace",
                            marginBottom: 6,
                            letterSpacing: '0.5px',
                          }}
                        >
                          {example.fileName}
                        </div>
                      )}
                      <div
                        style={{
                          color: '#888',
                          fontSize: 11,
                          fontFamily: "'Inter', sans-serif",
                          lineHeight: 1.4,
                        }}
                      >
                        {example.description}
                      </div>
                      {example.html && (
                        <div
                          style={{
                            marginTop: 12,
                            color: '#fff',
                            fontSize: 9,
                            fontFamily: "'Space Mono', monospace",
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                          }}
                        >
                          Open live preview
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {showCopySupport && (
        <div
          onClick={(event) => {
            event.stopPropagation();
            setShowCopySupport(false);
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 240,
            background: 'rgba(0, 0, 0, 0.72)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              width: 'min(540px, 100%)',
              background: '#080808',
              border: '1px solid rgba(var(--market-accent-rgb), 0.4)',
              borderRadius: 14,
              overflow: 'hidden',
              boxShadow: '0 28px 90px rgba(0, 0, 0, 0.62)',
            }}
          >
            <img
              src="/nocode-human-polar-promo.png"
              alt="NoCode Human support promo"
              style={{
                width: '100%',
                aspectRatio: '16/9',
                objectFit: 'cover',
                display: 'block',
                borderBottom: '1px solid #222',
              }}
            />
            <div style={{ padding: 24 }}>
              <div
                style={{
                  color: 'var(--market-accent)',
                  fontSize: 10,
                  fontFamily: "'Space Mono', monospace",
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: 12,
                }}
              >
                Copied to clipboard
              </div>
              <h3
                style={{
                  color: '#fff',
                  fontSize: 28,
                  lineHeight: 1.05,
                  fontFamily: "'Inter', sans-serif",
                  margin: '0 0 10px',
                }}
              >
                Support noCode Human
              </h3>
              <p
                style={{
                  color: '#aaa',
                  fontSize: 14,
                  lineHeight: 1.6,
                  fontFamily: "'Inter', sans-serif",
                  margin: '0 0 22px',
                }}
              >
                Tips help keep the templates, skills, and weird useful little build tools coming.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a
                  href={supportUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '12px 16px',
                    background: 'var(--market-accent)',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 800,
                    fontFamily: "'Space Mono', monospace",
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                  }}
                >
                  {supportLabel}
                  <ExternalLink size={14} />
                </a>
                <button
                  onClick={() => setShowCopySupport(false)}
                  style={{
                    padding: '12px 16px',
                    background: '#171717',
                    border: '1px solid #333',
                    color: '#bbb',
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 700,
                    fontFamily: "'Space Mono', monospace",
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                >
                  Keep browsing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedExample?.html && (
        <div
          onClick={(event) => {
            event.stopPropagation();
            setSelectedExample(null);
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 220,
            background: 'rgba(0, 0, 0, 0.78)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              width: 'min(1180px, 100%)',
              height: 'min(760px, 92vh)',
              background: '#080808',
              border: '1px solid rgba(var(--market-accent-rgb), 0.35)',
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow: '0 24px 80px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                minHeight: 54,
                padding: '12px 14px 12px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 14,
                borderBottom: '1px solid #222',
                background: '#0d0d0d',
              }}
            >
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 700,
                    fontFamily: "'Inter', sans-serif",
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {selectedExample.title}
                </div>
                <div
                  style={{
                    color: 'var(--market-accent)',
                    fontSize: 10,
                    fontFamily: "'Space Mono', monospace",
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    marginTop: 3,
                  }}
                >
                  Live interactive preview
                </div>
              </div>
              <button
                onClick={() => setSelectedExample(null)}
                style={{
                  width: 34,
                  height: 34,
                  flexShrink: 0,
                  borderRadius: 8,
                  background: '#171717',
                  border: '1px solid #333',
                  color: '#fff',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                }}
                aria-label="Close live preview"
              >
                <X size={16} />
              </button>
            </div>
            <iframe
              title={`${selectedExample.title} live preview`}
              srcDoc={selectedExample.html}
              sandbox="allow-scripts allow-forms allow-popups"
              allow="clipboard-write"
              style={{
                width: '100%',
                flex: 1,
                border: 'none',
                background: '#fff',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
