import React, { useState } from 'react';
import {
  FolderGit2,
  ExternalLink,
  Github,
  Sparkles,
  Layers,
  Brain,
  Database,
  ShieldCheck,
  Globe,
  ArrowUpRight
} from 'lucide-react';
import ProjectModal from './ProjectModal';

export default function Projects({ projects = [] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Machine Learning & AI', 'Full-Stack Web', 'Cybersecurity'];

  const filteredProjects = projects.filter((p) => {
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  });

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Machine Learning & AI': return <Brain size={16} />;
      case 'Full-Stack Web': return <Globe size={16} />;
      case 'Cybersecurity': return <ShieldCheck size={16} />;
      default: return <Layers size={16} />;
    }
  };

  return (
    <section id="projects" className="section-py" style={{ background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <FolderGit2 size={14} />
            <span>Featured Portfolio</span>
          </div>
          <h2 className="section-title">
            Engineered <span className="text-gradient">Projects & Systems</span>
          </h2>
          <p className="section-subtitle">
            Explore a curated selection of machine learning architectures, optimized relational databases, and
            cybersecurity defense labs developed with rigorous software engineering principles.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.6rem',
            marginBottom: '3rem',
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.55rem 1.3rem',
                  borderRadius: 'var(--radius-full)',
                  border: isActive ? '1px solid var(--border-glow)' : '1px solid var(--border-subtle)',
                  background: isActive ? 'var(--gradient-primary)' : 'var(--bg-glass-card)',
                  color: isActive ? '#fff' : 'var(--text-secondary)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  boxShadow: isActive ? 'var(--shadow-neon)' : 'none',
                }}
              >
                {getCategoryIcon(cat)}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid-2" style={{ gap: '2rem' }}>
          {filteredProjects.map((project) => {
            const toolsList = project.tools ? project.tools.split(',').map((t) => t.trim()) : [];

            return (
              <div
                key={project.id}
                className="glass-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '2rem',
                  borderRadius: '20px',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div>
                  {/* Top Bar: Category & Metrics */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1.2rem',
                    }}
                  >
                    <div className="badge badge-cyan" style={{ fontSize: '0.78rem' }}>
                      {getCategoryIcon(project.category)}
                      <span>{project.category}</span>
                    </div>

                    {project.metrics && (
                      <span className="badge badge-purple" style={{ fontSize: '0.75rem' }}>
                        <Sparkles size={12} />
                        <span>{project.metrics}</span>
                      </span>
                    )}
                  </div>

                  {/* Project Title & Subtitle */}
                  <h3
                    style={{
                      fontSize: '1.45rem',
                      fontWeight: 800,
                      marginBottom: '0.4rem',
                      cursor: 'pointer',
                    }}
                    onClick={() => setSelectedProject(project)}
                  >
                    {project.title}
                  </h3>

                  {project.subtitle && (
                    <p style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '1rem' }}>
                      {project.subtitle}
                    </p>
                  )}

                  {/* Description */}
                  <p
                    style={{
                      fontSize: '0.94rem',
                      lineHeight: 1.7,
                      color: 'var(--text-secondary)',
                      marginBottom: '1.5rem',
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Tech Badges */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.45rem',
                      marginBottom: '1.8rem',
                    }}
                  >
                    {toolsList.slice(0, 5).map((tool, idx) => (
                      <span
                        key={idx}
                        style={{
                          padding: '0.25rem 0.65rem',
                          borderRadius: '6px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid var(--border-subtle)',
                          fontSize: '0.78rem',
                          fontWeight: 500,
                          color: 'var(--text-primary)',
                        }}
                      >
                        {tool}
                      </span>
                    ))}
                    {toolsList.length > 5 && (
                      <span
                        style={{
                          padding: '0.25rem 0.65rem',
                          borderRadius: '6px',
                          background: 'rgba(255, 255, 255, 0.03)',
                          fontSize: '0.78rem',
                          color: 'var(--text-muted)',
                        }}
                      >
                        +{toolsList.length - 5} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1.2rem',
                    borderTop: '1px solid var(--border-subtle)',
                  }}
                >
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="btn btn-outline btn-sm"
                  >
                    <span>Details & Specs</span>
                    <ArrowUpRight size={15} />
                  </button>

                  <div style={{ display: 'flex', gap: '0.6rem' }}>
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-secondary btn-icon"
                        title="GitHub Repository"
                        style={{ width: '36px', height: '36px' }}
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary btn-icon"
                        title="Live Demo"
                        style={{ width: '36px', height: '36px' }}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal View */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}
