import React from 'react';
import {
  Award,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Brain,
  BarChart3,
  Code2,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export default function Certifications({ certifications = [] }) {
  const getIssuerBadgeColor = (issuer) => {
    const text = issuer.toLowerCase();
    if (text.includes('google')) return 'badge-cyan';
    if (text.includes('accenture')) return 'badge-purple';
    if (text.includes('mastercard')) return 'badge-emerald';
    if (text.includes('udemy')) return 'badge-amber';
    return 'badge-cyan';
  };

  const getIssuerIcon = (issuer) => {
    const text = issuer.toLowerCase();
    if (text.includes('google')) return <Brain size={20} color="#06b6d4" />;
    if (text.includes('accenture')) return <BarChart3 size={20} color="#a855f7" />;
    if (text.includes('mastercard')) return <ShieldCheck size={20} color="#10b981" />;
    if (text.includes('udemy')) return <TrendingUp size={20} color="#f59e0b" />;
    return <Award size={20} color="#38bdf8" />;
  };

  return (
    <section id="certifications" className="section-py" style={{ background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Award size={14} />
            <span>Verified Credentials</span>
          </div>
          <h2 className="section-title">
            Certifications & <span className="text-gradient">Industry Badges</span>
          </h2>
          <p className="section-subtitle">
            Professional specializations completed across Data Analytics, Machine Learning, Cybersecurity simulations, and GenAI.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid-3" style={{ gap: '1.5rem' }}>
          {certifications.map((cert, idx) => (
            <div
              key={cert.id || idx}
              className="glass-card"
              style={{
                padding: '1.8rem',
                borderRadius: '18px',
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
                    marginBottom: '1rem',
                  }}
                >
                  <div
                    style={{
                      padding: '0.6rem',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {getIssuerIcon(cert.issuer)}
                  </div>

                  <span className={`badge ${getIssuerBadgeColor(cert.issuer)}`} style={{ fontSize: '0.78rem' }}>
                    {cert.issuer}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                  {cert.title}
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
                  Issued by <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{cert.issuer}</span>
                  {cert.issue_date && ` • ${cert.issue_date}`}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                  <CheckCircle2 size={14} />
                  <span>Verified</span>
                </div>

                {cert.credential_url ? (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline btn-sm"
                    style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
                  >
                    <span>View Credential</span>
                    <ExternalLink size={13} />
                  </a>
                ) : (
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Completion Certificate</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
