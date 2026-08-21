import React from 'react';
import {
  Briefcase,
  Building2,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Brain
} from 'lucide-react';

export default function Experience({ experiences = [] }) {
  return (
    <section id="experience" className="section-py" style={{ position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Briefcase size={14} />
            <span>Practical Experience</span>
          </div>
          <h2 className="section-title">
            Internships & <span className="text-gradient">Industry Experience</span>
          </h2>
          <p className="section-subtitle">
            Hands-on technical internships in enterprise cybersecurity analysis and applied machine learning algorithms.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div
          style={{
            maxWidth: '850px',
            margin: '0 auto',
            position: 'relative',
            paddingLeft: '2rem',
          }}
        >
          {/* Central Line */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              bottom: '10px',
              left: '7px',
              width: '2px',
              background: 'linear-gradient(to bottom, var(--accent-cyan), var(--accent-indigo), var(--accent-purple))',
              borderRadius: '2px',
            }}
          />

          {/* Timeline Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {experiences.map((exp, idx) => {
              const isCisco = exp.company.toLowerCase().includes('cisco');
              const highlights = Array.isArray(exp.highlights) ? exp.highlights : [];

              return (
                <div key={exp.id || idx} style={{ position: 'relative' }}>
                  {/* Timeline Dot Icon */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '-2rem',
                      top: '1.2rem',
                      transform: 'translateX(-50%)',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'var(--bg-secondary)',
                      border: '2px solid var(--accent-cyan)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 15px rgba(6, 182, 212, 0.4)',
                      zIndex: 2,
                    }}
                  >
                    {isCisco ? (
                      <ShieldCheck size={16} color="#06b6d4" />
                    ) : (
                      <Brain size={16} color="#8b5cf6" />
                    )}
                  </div>

                  {/* Experience Card */}
                  <div
                    className="glass-card"
                    style={{
                      padding: '2rem',
                      borderRadius: '20px',
                    }}
                  >
                    {/* Header Row */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        flexWrap: 'wrap',
                        gap: '0.8rem',
                        marginBottom: '1rem',
                      }}
                    >
                      <div>
                        <span className="badge badge-cyan" style={{ marginBottom: '0.4rem' }}>
                          {exp.type || 'Internship'}
                        </span>
                        <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>{exp.role}</h3>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: 'var(--accent-cyan)',
                            fontWeight: 600,
                            fontSize: '1rem',
                            marginTop: '0.2rem',
                          }}
                        >
                          <Building2 size={16} />
                          <span>{exp.company}</span>
                        </div>
                      </div>

                      {/* Date & Location Badges */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            background: 'rgba(255, 255, 255, 0.05)',
                            padding: '0.3rem 0.75rem',
                            borderRadius: '8px',
                            border: '1px solid var(--border-subtle)',
                          }}
                        >
                          <Calendar size={14} color="#06b6d4" />
                          <span>{exp.duration}</span>
                        </div>

                        {exp.location && (
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              fontSize: '0.78rem',
                              color: 'var(--text-muted)',
                            }}
                          >
                            <MapPin size={13} />
                            <span>{exp.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Short Description */}
                    {exp.description && (
                      <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', marginBottom: '1.2rem' }}>
                        {exp.description}
                      </p>
                    )}

                    {/* Bullet Highlights */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                      {highlights.map((point, pIdx) => (
                        <div
                          key={pIdx}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.75rem',
                          }}
                        >
                          <CheckCircle2
                            size={17}
                            color="#10b981"
                            style={{ flexShrink: 0, marginTop: '3px' }}
                          />
                          <span style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
