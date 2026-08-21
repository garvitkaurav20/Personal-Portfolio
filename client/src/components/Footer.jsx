import React from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Heart,
  ArrowUp,
  FileText,
  Lock,
  Sparkles,
  Code
} from 'lucide-react';

export default function Footer({ profile, onOpenReport, onOpenResume, onOpenAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '4rem 0 2rem',
        position: 'relative',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 0.8fr 0.8fr 1fr',
            gap: '3rem',
            marginBottom: '3rem',
          }}
          className="footer-grid"
        >
          {/* Col 1: Brand & Bio */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontFamily: 'var(--font-heading)',
                fontSize: '1.4rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'var(--gradient-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: '1rem',
                }}
              >
                GK
              </div>
              <span>
                Garvit<span className="text-gradient">.dev</span>
              </span>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '320px' }}>
              Specializing in Artificial Intelligence, Machine Learning pipelines, optimized database architectures, and
              modern responsive web systems.
            </p>

            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <a
                href={profile?.github_url || 'https://github.com/garvitkaurav'}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary btn-icon"
                title="GitHub"
                style={{ width: '36px', height: '36px' }}
              >
                <Github size={16} />
              </a>
              <a
                href={profile?.linkedin_url || 'https://linkedin.com/in/garvitkaurav'}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary btn-icon"
                title="LinkedIn"
                style={{ width: '36px', height: '36px' }}
              >
                <Linkedin size={16} />
              </a>
              <a
                href={`mailto:${profile?.email || 'garvitkaurav@gmail.com'}`}
                className="btn btn-secondary btn-icon"
                title="Email"
                style={{ width: '36px', height: '36px' }}
              >
                <Mail size={16} />
              </a>
              <a
                href={`tel:${profile?.phone || '8376853268'}`}
                className="btn btn-secondary btn-icon"
                title="Phone"
                style={{ width: '36px', height: '36px' }}
              >
                <Phone size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.2rem', color: 'var(--text-primary)' }}>
              Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
              <a href="#about" style={{ color: 'var(--text-secondary)' }}>About Me</a>
              <a href="#skills" style={{ color: 'var(--text-secondary)' }}>Technical Skills</a>
              <a href="#projects" style={{ color: 'var(--text-secondary)' }}>Featured Projects</a>
              <a href="#experience" style={{ color: 'var(--text-secondary)' }}>Internships</a>
              <a href="#education" style={{ color: 'var(--text-secondary)' }}>Education</a>
              <a href="#certifications" style={{ color: 'var(--text-secondary)' }}>Certifications</a>
            </div>
          </div>

          {/* Col 3: Resources & Deliverables */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.2rem', color: 'var(--text-primary)' }}>
              Deliverables
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
              <button
                onClick={onOpenReport}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-cyan)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: 0,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <FileText size={14} />
                <span>Project Report</span>
              </button>
              <button
                onClick={onOpenResume}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: 0,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <FileText size={14} />
                <span>Resume / CV</span>
              </button>
              <button
                onClick={onOpenAdmin}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: 0,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <Lock size={14} />
                <span>Admin Login</span>
              </button>
            </div>
          </div>

          {/* Col 4: University & Academic Badge */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.2rem', color: 'var(--text-primary)' }}>
              Academic Base
            </h4>
            <div
              style={{
                padding: '1.2rem',
                borderRadius: '14px',
                background: 'var(--bg-glass-card)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                Galgotias College of Engg & Tech
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', marginBottom: '0.6rem' }}>
                B.Tech in CSE (Artificial Intelligence)
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Greater Noida, Uttar Pradesh (2023 - 2027)
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
          }}
        >
          <div>
            © {new Date().getFullYear()} Garvit Kaurav. Built with React, Node.js & SQLite.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={scrollToTop}
              className="btn btn-secondary btn-icon"
              title="Back to Top"
              style={{ width: '36px', height: '36px' }}
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
