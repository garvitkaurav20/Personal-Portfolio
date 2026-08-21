import React from 'react';
import {
  X,
  Download,
  Printer,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Code2,
  Phone,
  Mail,
  MapPin,
  ExternalLink
} from 'lucide-react';

export default function ResumeModal({ isOpen, onClose, profile, skills = [], experiences = [], education = [], certifications = [] }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2500,
        background: 'rgba(5, 8, 15, 0.88)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        className="glass-card-static"
        style={{
          width: '100%',
          maxWidth: '850px',
          maxHeight: '92vh',
          overflowY: 'auto',
          borderRadius: '20px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-glow)',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div
          style={{
            padding: '1.2rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'var(--bg-tertiary)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <FileText size={20} color="#06b6d4" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Garvit Kaurav — Resume Preview</h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <button onClick={handlePrint} className="btn btn-secondary btn-sm" title="Print Resume">
              <Printer size={15} />
              <span>Print</span>
            </button>
            <a
              href={profile?.resume_url || '#'}
              download="Garvit_Kaurav_Resume.pdf"
              className="btn btn-primary btn-sm"
              title="Download PDF"
            >
              <Download size={15} />
              <span>Download</span>
            </a>
            <button onClick={onClose} className="btn btn-secondary btn-icon" style={{ width: '32px', height: '32px' }}>
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div
          id="printable-resume"
          style={{
            padding: '2.5rem',
            background: '#ffffff',
            color: '#1e293b',
            fontFamily: 'var(--font-main)',
            lineHeight: 1.5,
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', paddingBottom: '1.2rem', borderBottom: '2px solid #0284c7' }}>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.3rem', letterSpacing: '-0.02em' }}>
              {profile?.full_name || 'Garvit Kaurav'}
            </h1>
            <p style={{ fontSize: '1rem', fontWeight: 600, color: '#0284c7', marginBottom: '0.6rem' }}>
              {profile?.headline || 'AI & Machine Learning Engineer | Full-Stack Developer'}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.2rem', fontSize: '0.88rem', color: '#475569' }}>
              <span>📞 {profile?.phone || '8376853268'}</span>
              <span>✉️ {profile?.email || 'garvitkaurav@gmail.com'}</span>
              <span>📍 {profile?.location || 'Greater Noida / Gurugram'}</span>
              <span>🔗 linkedin.com/in/garvitkaurav</span>
            </div>
          </div>

          {/* Education */}
          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.3rem', marginBottom: '0.8rem' }}>
              Education
            </h3>
            {education.map((edu, idx) => (
              <div key={idx} style={{ marginBottom: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>
                  <span>{edu.institution}</span>
                  <span>{edu.duration}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#334155' }}>
                  <span>{edu.degree} {edu.field_of_study ? `(${edu.field_of_study})` : ''}</span>
                  <span style={{ fontWeight: 600, color: '#0284c7' }}>{edu.grade_or_cgpa}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Technical Skills */}
          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.3rem', marginBottom: '0.8rem' }}>
              Skills & Competencies
            </h3>
            <div style={{ fontSize: '0.88rem', lineHeight: 1.7, color: '#334155' }}>
              <p><strong>Languages:</strong> SQL, Python, Java, JavaScript, HTML5, CSS3</p>
              <p><strong>Platforms & DB:</strong> MySQL, SQLite, PyCharm, MS Excel, Power BI (Basics), Canva</p>
              <p><strong>Tools & ML:</strong> Scikit-learn, Pandas, NumPy, Data Visualization (Seaborn/Matplotlib), Cisco Packet Tracer, Git</p>
              <p><strong>Coursework:</strong> DSA, DAA, DBMS, Operating Systems, Software Engineering, Software Project Management</p>
              <p><strong>Soft Skills:</strong> Problem Solving, Teamwork, Project Management, Communication Skills, Critical Thinking, SEO</p>
            </div>
          </div>

          {/* Internships & Experience */}
          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.3rem', marginBottom: '0.8rem' }}>
              Internships & Industry Experience
            </h3>
            {experiences.map((exp, idx) => {
              const highlights = Array.isArray(exp.highlights) ? exp.highlights : [];
              return (
                <div key={idx} style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>
                    <span>{exp.role} — {exp.company}</span>
                    <span>{exp.duration}</span>
                  </div>
                  <ul style={{ paddingLeft: '1.2rem', marginTop: '0.3rem', fontSize: '0.86rem', color: '#334155' }}>
                    {highlights.map((h, hIdx) => (
                      <li key={hIdx} style={{ marginBottom: '0.25rem' }}>{h}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Projects */}
          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.3rem', marginBottom: '0.8rem' }}>
              Projects
            </h3>
            <div style={{ marginBottom: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.92rem', color: '#0f172a' }}>
                <span>Fraud Transaction Detection | Machine Learning & Python</span>
                <span>2024 - 2025</span>
              </div>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#334155', marginTop: '0.2rem' }}>
                <li>Engineered data processing pipelines and feature models with Random Forest, Logistic Regression & Neural Networks.</li>
                <li>Designed high-throughput data processing pipelines for analyzing large-scale financial transaction datasets.</li>
              </ul>
            </div>

            <div style={{ marginBottom: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.92rem', color: '#0f172a' }}>
                <span>Personal Expense Tracker | HTML, CSS, JavaScript, DBMS</span>
                <span>2025 - 2026</span>
              </div>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#334155', marginTop: '0.2rem' }}>
                <li>Built full-stack expense manager with optimized relational DBMS schemas for secure storage and query execution.</li>
                <li>Developed interactive client interfaces for multi-category budgeting and real-time financial chart analytics.</li>
              </ul>
            </div>
          </div>

          {/* Leadership & Certifications */}
          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.3rem', marginBottom: '0.8rem' }}>
              Certifications & Leadership
            </h3>
            <p style={{ fontSize: '0.86rem', color: '#334155', lineHeight: 1.6 }}>
              • <strong>Certifications:</strong> Accenture Data Analytics, MasterCard Cybersecurity, Google GenAI Prompt Engineering, Python (YouTube), Power BI, SEO (Udemy).<br />
              • <strong>Leadership:</strong> Club Head of Administrative Society & Deputy Secretary (CSE AI Dept) at Galgotias College; Lead Coordinator for GFGSC, GDG & InfoSec Diary; Director for GIMUN'25, GIH'25 & Unifest'26.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
