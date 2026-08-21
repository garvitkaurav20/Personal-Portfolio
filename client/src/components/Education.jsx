import React from 'react';
import {
  GraduationCap,
  School,
  Award,
  Calendar,
  MapPin,
  Sparkles,
  BookOpen
} from 'lucide-react';

export default function Education({ education = [] }) {
  return (
    <section id="education" className="section-py" style={{ background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <GraduationCap size={14} />
            <span>Academic Background</span>
          </div>
          <h2 className="section-title">
            Education & <span className="text-gradient">Qualifications</span>
          </h2>
          <p className="section-subtitle">
            Formal engineering education in Computer Science & Artificial Intelligence along with foundational schooling.
          </p>
        </div>

        {/* Education Cards Grid */}
        <div className="grid-3" style={{ gap: '1.75rem' }}>
          {education.map((edu, idx) => {
            const isCollege = edu.institution.toLowerCase().includes('galgotias');

            return (
              <div
                key={edu.id || idx}
                className="glass-card"
                style={{
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '20px',
                  border: isCollege ? '1px solid var(--border-glow)' : '1px solid var(--border-subtle)',
                }}
              >
                <div>
                  {/* Top Badge Row */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1.2rem',
                    }}
                  >
                    <div
                      style={{
                        padding: '0.6rem',
                        borderRadius: '12px',
                        background: isCollege ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                        color: isCollege ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                      }}
                    >
                      {isCollege ? <GraduationCap size={24} /> : <School size={24} />}
                    </div>

                    <div
                      className={isCollege ? 'badge badge-cyan' : 'badge badge-purple'}
                      style={{ fontWeight: 700, fontSize: '0.82rem', padding: '0.35rem 0.8rem' }}
                    >
                      <Award size={14} />
                      <span>{edu.grade_or_cgpa}</span>
                    </div>
                  </div>

                  {/* Institution Name */}
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                    {edu.institution}
                  </h3>

                  {/* Degree & Field */}
                  <p
                    style={{
                      fontSize: '0.94rem',
                      fontWeight: 600,
                      color: isCollege ? 'var(--accent-cyan)' : 'var(--text-primary)',
                      marginBottom: '1rem',
                    }}
                  >
                    {edu.degree}
                  </p>

                  {/* Additional Details */}
                  {edu.details && (
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                      {edu.details}
                    </p>
                  )}
                </div>

                {/* Footer with Duration & Location */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1.2rem',
                    borderTop: '1px solid var(--border-subtle)',
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Calendar size={14} />
                    <span>{edu.duration}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <MapPin size={14} />
                    <span>{edu.location}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
