import { useState, useEffect, useRef } from 'react';
import { Filter } from 'lucide-react';
import { skills, categories } from '@/data/skills';
import type { Skill } from '@/data/skills';
import SkillCard from '@/components/SkillCard';
import SkillDetailModal from '@/components/SkillDetailModal';

export default function TerminalGrid() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  return (
    <section
      id="terminal-grid"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        position: 'relative',
        zIndex: 1,
        paddingTop: 80,
        paddingBottom: 80,
      }}
    >
      {/* Sticky Terminal Header */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: 'rgba(5,5,5,0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(var(--market-accent-rgb), 0.1)',
          padding: '16px 32px',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          {/* System status */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#00ff9d',
                boxShadow: '0 0 8px #00ff9d',
              }}
            />
            <span
              style={{
                color: 'var(--market-accent)',
                fontSize: 12,
                fontFamily: "'Space Mono', monospace",
                letterSpacing: '2px',
              }}
              className="terminal-cursor"
            >
              SYSTEM: ONLINE // SELECT MODULE //
            </span>
          </div>

          {/* Category filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Filter size={14} color="#666" />
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['All', ...categories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '6px 14px',
                    background: activeCategory === cat
                      ? 'rgba(var(--market-accent-rgb), 0.15)'
                      : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${activeCategory === cat ? 'rgba(var(--market-accent-rgb), 0.4)' : '#222'}`,
                    color: activeCategory === cat ? 'var(--market-accent)' : '#666',
                    borderRadius: 6,
                    fontSize: 10,
                    fontFamily: "'Space Mono', monospace",
                    letterSpacing: '1px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textTransform: 'uppercase',
                  }}
                  onMouseEnter={(e) => {
                    if (activeCategory !== cat) {
                      e.currentTarget.style.borderColor = '#444';
                      e.currentTarget.style.color = '#999';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeCategory !== cat) {
                      e.currentTarget.style.borderColor = '#222';
                      e.currentTarget.style.color = '#666';
                    }
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '32px 24px',
        }}
      >
        {/* Stats bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
            padding: '0 8px',
          }}
        >
          <div
            style={{
              color: '#666',
              fontSize: 11,
              fontFamily: "'Space Mono', monospace",
              letterSpacing: '1px',
            }}
          >
            FOUND {filteredSkills.length} MODULE{filteredSkills.length !== 1 ? 'S' : ''}
          </div>
          <div
            style={{
              color: '#444',
              fontSize: 10,
              fontFamily: "'Space Mono', monospace",
            }}
          >
            noCode.media v1.0.0
          </div>
        </div>

        {/* Bento Grid */}
        <div
          className="bento-grid"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        >
          {filteredSkills.map((skill, index) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              onClick={setSelectedSkill}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <SkillDetailModal
          skill={selectedSkill}
          onClose={() => setSelectedSkill(null)}
        />
      )}
    </section>
  );
}
