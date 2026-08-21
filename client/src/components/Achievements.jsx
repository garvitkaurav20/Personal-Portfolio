import React from 'react';
import {
  Trophy,
  Award,
  ShieldCheck,
  Code2,
  Users,
  Calendar,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function Achievements({ achievements = [] }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck size={24} color="#10b981" />;
      case 'Code2': return <Code2 size={24} color="#06b6d4" />;
      case 'Award': return <Award size={24} color="#a855f7" />;
      case 'Users': return <Users size={24} color="#3b82f6" />;
      default: return <Trophy size={24} color="#f59e0b" />;
    }
  };

  return (
    <section id="achievements" className="section-py" style={{ position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Trophy size={14} />
            <span>Leadership & Recognition</span>
          </div>
          <h2 className="section-title">
            Key <span className="text-gradient">Achievements & Initiatives</span>
          </h2>
          <p className="section-subtitle">
            Demonstrated track record of leading technical societies, orchestrating university summits, and
            driving cybersecurity and editorial communities.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid-3" style={{ gap: '1.75rem' }}>
          {achievements.map((item, idx) => (
            <div
              key={item.id || idx}
              className="glass-card"
              style={{
                padding: '2rem',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.2rem',
                  }}
                >
                  <div
                    style={{
                      padding: '0.65rem',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-subtle)',
                      display: 'inline-flex',
                    }}
                  >
                    {getIcon(item.icon)}
                  </div>

                  <span
                    className="badge badge-cyan"
                    style={{ fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                  >
                    <Calendar size={12} />
                    <span>{item.date_or_year}</span>
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                  {item.title}
                </h3>

                {item.role && (
                  <p style={{ fontSize: '0.88rem', color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '0.8rem' }}>
                    {item.role}
                  </p>
                )}

                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  {item.description}
                </p>
              </div>

              {item.organization && (
                <div
                  style={{
                    paddingTop: '1.2rem',
                    marginTop: '1.5rem',
                    borderTop: '1px solid var(--border-subtle)',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <Users size={14} />
                  <span>{item.organization}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
