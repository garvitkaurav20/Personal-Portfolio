import React, { useState } from 'react';
import {
  Code2,
  Database,
  Cpu,
  Layers,
  Users,
  Search,
  Sparkles,
  CheckCircle2,
  FileCode,
  Coffee,
  Layout,
  Server,
  Terminal,
  Table,
  BarChart3,
  Palette,
  LineChart,
  PieChart,
  Brain,
  Network,
  GitBranch,
  Binary,
  HardDrive,
  Kanban,
  Lightbulb,
  MessageSquare,
  TrendingUp
} from 'lucide-react';

export default function Skills({ skills = [] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Icon resolver map
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Code2': return <Code2 size={20} />;
      case 'Database': return <Database size={20} />;
      case 'Coffee': return <Coffee size={20} />;
      case 'FileCode': return <FileCode size={20} />;
      case 'Layout': return <Layout size={20} />;
      case 'Server': return <Server size={20} />;
      case 'Terminal': return <Terminal size={20} />;
      case 'Table': return <Table size={20} />;
      case 'BarChart3': return <BarChart3 size={20} />;
      case 'Palette': return <Palette size={20} />;
      case 'LineChart': return <LineChart size={20} />;
      case 'PieChart': return <PieChart size={20} />;
      case 'Cpu': return <Cpu size={20} />;
      case 'Brain': return <Brain size={20} />;
      case 'Network': return <Network size={20} />;
      case 'GitBranch': return <GitBranch size={20} />;
      case 'Binary': return <Binary size={20} />;
      case 'HardDrive': return <HardDrive size={20} />;
      case 'Layers': return <Layers size={20} />;
      case 'Kanban': return <Kanban size={20} />;
      case 'Lightbulb': return <Lightbulb size={20} />;
      case 'Users': return <Users size={20} />;
      case 'MessageSquare': return <MessageSquare size={20} />;
      case 'TrendingUp': return <TrendingUp size={20} />;
      default: return <Sparkles size={20} />;
    }
  };

  const categories = ['All', 'Languages', 'Platforms', 'Tools', 'Coursework', 'Soft Skills'];

  const filteredSkills = skills.filter((s) => {
    const matchesCategory = activeCategory === 'All' || s.category === activeCategory;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="section-py" style={{ position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Cpu size={14} />
            <span>Technical Competence</span>
          </div>
          <h2 className="section-title">
            Skills & <span className="text-gradient">Expertise Matrix</span>
          </h2>
          <p className="section-subtitle">
            Comprehensive breakdown of programming languages, machine learning frameworks, database systems,
            academic coursework, and interpersonal leadership competencies.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2.5rem',
          }}
        >
          {/* Category Tabs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              padding: '0.4rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-glass-card)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '0.5rem 1.1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    background: isActive ? 'var(--gradient-primary)' : 'transparent',
                    color: isActive ? '#fff' : 'var(--text-secondary)',
                    boxShadow: isActive ? 'var(--shadow-neon)' : 'none',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Quick Search Input */}
          <div style={{ position: 'relative', width: '240px' }}>
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
              }}
            />
            <input
              type="text"
              placeholder="Search skill or tool..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{
                paddingLeft: '2.3rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                fontSize: '0.85rem',
              }}
            />
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid-3" style={{ gap: '1.25rem' }}>
          {filteredSkills.map((skill) => {
            const proficiency = skill.proficiency || 85;
            return (
              <div
                key={skill.id}
                className="glass-card"
                style={{
                  padding: '1.4rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div
                        style={{
                          padding: '0.5rem',
                          borderRadius: '10px',
                          background: 'rgba(6, 182, 212, 0.12)',
                          color: 'var(--accent-cyan)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {getIcon(skill.icon)}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{skill.name}</h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{skill.category}</span>
                      </div>
                    </div>

                    <span
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--accent-cyan)',
                      }}
                    >
                      {proficiency}%
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div
                  style={{
                    width: '100%',
                    height: '6px',
                    borderRadius: '4px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${proficiency}%`,
                      height: '100%',
                      borderRadius: '4px',
                      background: 'var(--gradient-primary)',
                      boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)',
                      transition: 'width 1s ease-in-out',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {filteredSkills.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
            No skills found matching your search. Try another category!
          </div>
        )}
      </div>
    </section>
  );
}
