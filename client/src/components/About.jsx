import React from 'react';
import {
  GraduationCap,
  Brain,
  Database,
  Users,
  ShieldCheck,
  CheckCircle,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Sparkles,
  Award
} from 'lucide-react';

export default function About({ profile }) {
  const pillars = [
    {
      icon: <Brain size={24} color="#06b6d4" />,
      title: 'Artificial Intelligence & ML',
      description: 'Building end-to-end data processing pipelines, feature engineering, and training algorithms (Random Forest, Logistic Regression, Neural Networks) using Python & Scikit-learn.',
    },
    {
      icon: <Database size={24} color="#3b82f6" />,
      title: 'Relational DBMS & Web Stack',
      description: 'Engineering optimized relational schemas with low query latency, multi-tier full-stack architectures, and responsive data analytics interfaces.',
    },
    {
      icon: <Users size={24} color="#8b5cf6" />,
      title: 'Leadership & Event Direction',
      description: 'Directing university summits (GIMUN’25, GIH’25, Unifest’26) for 5000+ delegates; Club Head of Administrative Society & Deputy Secretary CSE AI.',
    },
    {
      icon: <ShieldCheck size={24} color="#10b981" />,
      title: 'Cybersecurity & Networks',
      description: 'Hands-on network security modeling, CIA triad validation, vulnerability surface evaluation, and simulation topologies in Cisco Packet Tracer.',
    },
  ];

  return (
    <section id="about" className="section-py" style={{ background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={14} />
            <span>Profile Overview</span>
          </div>
          <h2 className="section-title">
            About <span className="text-gradient">Garvit Kaurav</span>
          </h2>
          <p className="section-subtitle">
            A driven Computer Science undergraduate specializing in Artificial Intelligence with a passion for
            scalable software, predictive machine learning, and transformative student leadership.
          </p>
        </div>

        {/* Main 2-Column Content */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2.5rem',
            alignItems: 'stretch',
            marginBottom: '3rem',
          }}
          className="about-grid"
        >
          {/* Left: Detailed Narrative & Key Details Card */}
          <div className="glass-card" style={{ padding: '2.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
                <div
                  style={{
                    padding: '0.6rem',
                    borderRadius: '12px',
                    background: 'rgba(6, 182, 212, 0.12)',
                    color: 'var(--accent-cyan)',
                  }}
                >
                  <GraduationCap size={26} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Academic Foundation</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                    {profile?.institution || 'Galgotias College of Engineering and Technology'}
                  </p>
                </div>
              </div>

              <p style={{ fontSize: '0.98rem', lineHeight: 1.75, marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                {profile?.bio ||
                  'Passionate Computer Science & Engineering student specializing in Artificial Intelligence at Galgotias College of Engineering and Technology (CGPA 7.68). Experienced in building robust Machine Learning pipelines, relational database architectures, and responsive full-stack applications. Proven leader directing technical societies and major college summits with expertise spanning Python, Java, SQL, Cyber Security, and GenAI Prompt Engineering.'}
              </p>
            </div>

            {/* Quick Contact & Location Specs */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-subtle)',
              }}
              className="about-contact-grid"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <MapPin size={18} color="#06b6d4" />
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Location</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>{profile?.location || 'Greater Noida, India'}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Calendar size={18} color="#3b82f6" />
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Degree Period</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>2023 - 2027</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Mail size={18} color="#8b5cf6" />
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email</div>
                  <a href={`mailto:${profile?.email || 'garvitkaurav@gmail.com'}`} style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {profile?.email || 'garvitkaurav@gmail.com'}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Phone size={18} color="#10b981" />
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Phone</div>
                  <a href={`tel:${profile?.phone || '8376853268'}`} style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {profile?.phone || '+91 8376853268'}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: 4 Core Pillars Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.2rem' }}>
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: '1.4rem 1.6rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1.2rem',
                }}
              >
                <div
                  style={{
                    padding: '0.75rem',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-subtle)',
                    flexShrink: 0,
                  }}
                >
                  {pillar.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.35rem' }}>{pillar.title}</h4>
                  <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
          .about-contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
