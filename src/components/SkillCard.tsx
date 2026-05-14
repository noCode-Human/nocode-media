import { useState, useEffect, useRef } from 'react';
import { Star, Users, Calendar, ExternalLink } from 'lucide-react';
import type { Skill } from '@/data/skills';

interface SkillCardProps {
  skill: Skill;
  onClick: (skill: Skill) => void;
  index: number;
}

export default function SkillCard({ skill, onClick, index }: SkillCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, index * 100);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div
      ref={cardRef}
      className={`bento-card ${skill.featured ? 'featured' : ''}`}
      onClick={() => onClick(skill)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 80}ms`,
      }}
    >
      {/* Image */}
      <div
        style={{
          width: '100%',
          height: skill.featured ? '65%' : '55%',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <img
          src={skill.image}
          alt={skill.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'var(--market-accent-image-filter)',
            transition: 'transform 0.6s ease',
            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
          }}
        />
        {/* Overlay gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(transparent 40%, rgba(5,5,5,0.95) 100%)',
          }}
        />
        {/* Category badge */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            padding: '4px 10px',
            background: 'rgba(var(--market-accent-rgb), 0.15)',
            border: '1px solid rgba(var(--market-accent-rgb), 0.3)',
            color: 'var(--market-accent)',
            borderRadius: 4,
            fontSize: 10,
            fontFamily: "'Space Mono', monospace",
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}
        >
          {skill.category}
        </div>
        {/* Featured badge */}
        {skill.featured && (
          <div
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              padding: '4px 10px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff',
              borderRadius: 4,
              fontSize: 10,
              fontFamily: "'Space Mono', monospace",
              letterSpacing: '1px',
            }}
          >
            FEATURED
          </div>
        )}
      </div>

      {/* Content */}
      <div
        style={{
          padding: '16px 20px 20px',
          position: 'relative',
        }}
      >
        <h3
          style={{
            color: '#fff',
            fontSize: skill.featured ? 20 : 16,
            fontWeight: 600,
            marginBottom: 8,
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.3,
          }}
        >
          {skill.title}
        </h3>
        <p
          style={{
            color: '#888',
            fontSize: 12,
            lineHeight: 1.5,
            marginBottom: 16,
            fontFamily: "'Inter', sans-serif",
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {skill.description}
        </p>

        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Users size={12} color="#666" />
            <span style={{ color: '#999', fontSize: 11, fontFamily: "'Space Mono', monospace" }}>
              {formatNumber(skill.stats.uses)}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Star size={12} color="var(--market-accent)" />
            <span style={{ color: 'var(--market-accent)', fontSize: 11, fontFamily: "'Space Mono', monospace" }}>
              {skill.stats.rating}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Calendar size={12} color="#666" />
            <span style={{ color: '#666', fontSize: 10, fontFamily: "'Space Mono', monospace" }}>
              {skill.stats.created}
            </span>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <ExternalLink
              size={14}
              color={isHovered ? 'var(--market-accent)' : '#666'}
              style={{ transition: 'color 0.3s ease' }}
            />
          </div>
        </div>

        {/* Tags */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 6,
            marginTop: 12,
          }}
        >
          {skill.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              style={{
                padding: '3px 8px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#888',
                borderRadius: 4,
                fontSize: 9,
                fontFamily: "'Space Mono', monospace",
                letterSpacing: '0.5px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
