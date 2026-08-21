import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Phone,
  Sparkles,
  Cpu,
  Database,
  Brain,
  ShieldCheck,
  Award,
  Terminal,
  ExternalLink
} from 'lucide-react';

export default function Hero({ profile, onOpenResume, onOpenReport }) {
  const titles = [
    'AI & Machine Learning Engineer',
    'Full-Stack Developer',
    'Relational DBMS & SQL Specialist',
    'Cybersecurity & Network Analyst',
    'Tech Community & Summit Director'
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = titles[currentTitleIndex];
    let timer;

    if (!isDeleting && displayedText !== fullText) {
      timer = setTimeout(() => {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
      }, 70);
    } else if (!isDeleting && displayedText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText !== '') {
      timer = setTimeout(() => {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
      }, 35);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentTitleIndex]);

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        paddingTop: '6.5rem',
        paddingBottom: '4rem',
        overflow: 'hidden',
      }}
    >
      {/* Background radial glow */}
      <div
        className="bg-glow-orb"
        style={{
          top: '10%',
          left: '15%',
          width: '450px',
          height: '450px',
          background: 'rgba(6, 182, 212, 0.18)',
        }}
      />
      <div
        className="bg-glow-orb"
        style={{
          bottom: '15%',
          right: '10%',
          width: '500px',
          height: '500px',
          background: 'rgba(139, 92, 246, 0.18)',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '3.5rem',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Left Column: Text and Actions */}
          <div>
            {/* Status Pill */}
            <div
              className="section-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.45rem 1.1rem',
                marginBottom: '1.5rem',
              }}
            >
              <span
                style={{
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 10px #10b981',
                  display: 'inline-block',
                }}
              />
              <span>{profile?.availability_status || 'Open for Opportunities & Collaborations'}</span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
                fontWeight: 900,
                lineHeight: 1.15,
                marginBottom: '1.2rem',
                letterSpacing: '-0.03em',
              }}
            >
              Hi, I'm <span className="text-gradient">{profile?.full_name || 'Garvit Kaurav'}</span>
            </h1>

            {/* Dynamic Typewriter Heading */}
            <div
              style={{
                fontSize: 'clamp(1.2rem, 2.8vw, 1.7rem)',
                fontWeight: 700,
                color: 'var(--accent-cyan)',
                marginBottom: '1.5rem',
                minHeight: '2.4rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              <Terminal size={24} style={{ color: 'var(--accent-indigo)', flexShrink: 0 }} />
              <span>{displayedText}</span>
              <span
                style={{
                  display: 'inline-block',
                  width: '3px',
                  height: '1.3em',
                  background: 'var(--accent-cyan)',
                  marginLeft: '2px',
                  animation: 'pulseGlow 1s infinite',
                }}
              />
            </div>

            {/* Tagline / Intro Description */}
            <p
              style={{
                fontSize: '1.08rem',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                marginBottom: '2rem',
                maxWidth: '580px',
              }}
            >
              {profile?.tagline ||
                'Computer Science & Artificial Intelligence undergraduate at Galgotias College of Engineering & Technology (CGPA 7.68). Crafting intelligent ML pipelines, optimized DBMS architectures, and responsive full-stack applications.'}
            </p>

            {/* Quick Stats Badges */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                marginBottom: '2.5rem',
              }}
            >
              <div className="badge badge-cyan" style={{ padding: '0.4rem 0.85rem', fontSize: '0.82rem' }}>
                <Brain size={14} /> B.Tech CSE (AI) • CGPA 7.68
              </div>
              <div className="badge badge-purple" style={{ padding: '0.4rem 0.85rem', fontSize: '0.82rem' }}>
                <Database size={14} /> SQL & Relational DBMS
              </div>
              <div className="badge badge-emerald" style={{ padding: '0.4rem 0.85rem', fontSize: '0.82rem' }}>
                <ShieldCheck size={14} /> Cisco Cybersecurity Analyst
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                alignItems: 'center',
              }}
            >
              <a href="#projects" className="btn btn-primary">
                <span>View Projects</span>
                <ArrowRight size={18} />
              </a>

              <button onClick={onOpenResume} className="btn btn-secondary">
                <Download size={18} />
                <span>Resume / CV</span>
              </button>

              <a href="#contact" className="btn btn-outline">
                <Mail size={18} />
                <span>Get In Touch</span>
              </a>
            </div>

            {/* Social Links Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.2rem',
                marginTop: '2.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>CONNECT:</span>
              <a
                href={profile?.github_url || 'https://github.com/garvitkaurav'}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary btn-icon"
                title="GitHub"
                style={{ width: '38px', height: '38px' }}
              >
                <Github size={18} />
              </a>
              <a
                href={profile?.linkedin_url || 'https://linkedin.com/in/garvitkaurav'}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary btn-icon"
                title="LinkedIn"
                style={{ width: '38px', height: '38px' }}
              >
                <Linkedin size={18} />
              </a>
              <a
                href={`mailto:${profile?.email || 'garvitkaurav@gmail.com'}`}
                className="btn btn-secondary btn-icon"
                title="Email"
                style={{ width: '38px', height: '38px' }}
              >
                <Mail size={18} />
              </a>
              <a
                href={`tel:${profile?.phone || '8376853268'}`}
                className="btn btn-secondary btn-icon"
                title="Call Phone"
                style={{ width: '38px', height: '38px' }}
              >
                <Phone size={18} />
              </a>
            </div>
          </div>

          {/* Right Column: 3D Holographic Card & Avatar Preview */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            {/* Outer Rotating Glow Ring */}
            <div
              style={{
                position: 'absolute',
                width: '360px',
                height: '360px',
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, #06b6d4, #3b82f6, #8b5cf6, #ec4899, #06b6d4)',
                filter: 'blur(30px)',
                opacity: 0.35,
                animation: 'pulseGlow 6s infinite alternate',
              }}
            />

            {/* Profile Avatar Card */}
            <div
              className="glass-card animate-float"
              style={{
                width: '100%',
                maxWidth: '380px',
                padding: '2rem',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: 'var(--shadow-lg)',
                position: 'relative',
                zIndex: 2,
              }}
            >
              {/* Top Card Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                </div>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  garvit.ai.engine
                </span>
              </div>

              {/* Central Avatar Visual / Initials Mesh */}
              <div
                style={{
                  width: '140px',
                  height: '140px',
                  borderRadius: '50%',
                  margin: '0 auto 1.5rem',
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 50%, #a855f7 100%)',
                  padding: '4px',
                  boxShadow: '0 0 30px rgba(14, 165, 233, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'var(--bg-secondary)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                  }}
                >
                  <Brain size={44} color="#38bdf8" />
                  <span style={{ fontSize: '0.9rem', fontWeight: 800, marginTop: '4px', letterSpacing: '0.05em' }}>
                    GARVIT
                  </span>
                </div>

                {/* Floating Micro Badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '2px',
                    right: '2px',
                    background: '#10b981',
                    borderRadius: '50%',
                    padding: '6px',
                    border: '3px solid var(--bg-secondary)',
                    color: '#fff',
                    boxShadow: '0 0 10px #10b981',
                  }}
                >
                  <Sparkles size={14} />
                </div>
              </div>

              {/* Card Meta Information */}
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Garvit Kaurav</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                  Galgotias College of Engg & Tech
                </p>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  B.Tech CSE (AI) • 2023 - 2027
                </p>
              </div>

              {/* Mini Highlights Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.5rem',
                  textAlign: 'center',
                  padding: '0.8rem',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>7.68</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>CGPA</div>
                </div>
                <div style={{ borderLeft: '1px solid var(--border-subtle)', borderRight: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-purple)' }}>6+</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Certs</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>3+</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Summits</div>
                </div>
              </div>
            </div>

            {/* Floating Tech Pill 1 */}
            <div
              className="glass-card-static"
              style={{
                position: 'absolute',
                top: '5%',
                left: '-15px',
                padding: '0.5rem 0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.82rem',
                fontWeight: 600,
                zIndex: 3,
                boxShadow: 'var(--shadow-md)',
                animation: 'float 5s ease-in-out infinite',
              }}
            >
              <Cpu size={16} color="#38bdf8" />
              <span>Python & ML</span>
            </div>

            {/* Floating Tech Pill 2 */}
            <div
              className="glass-card-static"
              style={{
                position: 'absolute',
                bottom: '10%',
                right: '-15px',
                padding: '0.5rem 0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.82rem',
                fontWeight: 600,
                zIndex: 3,
                boxShadow: 'var(--shadow-md)',
                animation: 'float 4.5s ease-in-out infinite 1s',
              }}
            >
              <Database size={16} color="#10b981" />
              <span>SQL & DBMS</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-grid > div:first-child {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-grid p {
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>
    </section>
  );
}
