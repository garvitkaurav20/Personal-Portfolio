import React from 'react';
import {
  X,
  Github,
  ExternalLink,
  Brain,
  Database,
  ShieldCheck,
  Globe,
  Sparkles,
  Layers,
  BarChart,
  CheckCircle
} from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const toolsList = project.tools ? project.tools.split(',').map(t => t.trim()) : [];
  const tagsList = project.tags ? project.tags.split(',').map(t => t.trim()) : [];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2000,
        background: 'rgba(5, 8, 15, 0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={onClose}
    >
      <div
        className="glass-card-static"
        style={{
          width: '100%',
          maxWidth: '750px',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: '24px',
          padding: '2.2rem',
          position: 'relative',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-glow)',
          boxShadow: 'var(--shadow-lg)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn btn-secondary btn-icon"
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            width: '36px',
            height: '36px',
          }}
        >
          <X size={18} />
        </button>

        {/* Category & Featured Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <span className="badge badge-cyan" style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem' }}>
            {project.category}
          </span>
          {project.metrics && (
            <span className="badge badge-purple" style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem' }}>
              <Sparkles size={13} /> {project.metrics}
            </span>
          )}
        </div>

        {/* Project Title & Subtitle */}
        <h2 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.4rem' }}>
          {project.title}
        </h2>
        {project.subtitle && (
          <p style={{ fontSize: '1.05rem', color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '1.5rem' }}>
            {project.subtitle}
          </p>
        )}

        {/* Description Section */}
        <div style={{ marginBottom: '1.8rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.6rem', letterSpacing: '0.05em' }}>
            Overview & Problem Solved
          </h4>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--text-secondary)' }}>
            {project.description}
          </p>
        </div>

        {/* Tools and Technologies Used */}
        <div style={{ marginBottom: '1.8rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.8rem', letterSpacing: '0.05em' }}>
            Tools & Frameworks
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {toolsList.map((tool, i) => (
              <span
                key={i}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div style={{ marginBottom: '2.2rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.8rem', letterSpacing: '0.05em' }}>
            Keywords & Concepts
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {tagsList.map((tag, i) => (
              <span key={i} className="badge" style={{ fontSize: '0.78rem' }}>
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border-subtle)',
            flexWrap: 'wrap',
          }}
        >
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
              style={{ flex: 1, minWidth: '160px' }}
            >
              <ExternalLink size={17} />
              <span>Live Demonstration</span>
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
              style={{ flex: 1, minWidth: '160px' }}
            >
              <Github size={17} />
              <span>GitHub Repository</span>
            </a>
          )}
          <button onClick={onClose} className="btn btn-outline" style={{ minWidth: '100px' }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
