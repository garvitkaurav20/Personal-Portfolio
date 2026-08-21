import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, ExternalLink, Github, Sparkles } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../components/Toast';

export default function ProjectsManager({ projects = [], onRefresh }) {
  const { addToast } = useToast();
  const [editingProject, setEditingProject] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    category: 'Machine Learning & AI',
    tags: '',
    tools: '',
    github_url: '',
    live_url: '',
    image_url: '',
    metrics: '',
    is_featured: 1,
    order_index: 0,
  });

  const categories = ['Machine Learning & AI', 'Full-Stack Web', 'Cybersecurity', 'Data Analytics'];

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData(project);
    setShowAddForm(false);
  };

  const handleCancel = () => {
    setEditingProject(null);
    setShowAddForm(false);
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      category: 'Machine Learning & AI',
      tags: '',
      tools: '',
      github_url: '',
      live_url: '',
      image_url: '',
      metrics: '',
      is_featured: 1,
      order_index: 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await api.updateProject(editingProject.id, formData);
        addToast('Project updated successfully!', 'success');
      } else {
        await api.createProject(formData);
        addToast('Project created successfully!', 'success');
      }
      handleCancel();
      onRefresh?.();
    } catch (err) {
      console.error('Error saving project:', err);
      addToast(err.message || 'Failed to save project.', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.deleteProject(id);
      addToast('Project deleted.', 'info');
      onRefresh?.();
    } catch (err) {
      addToast('Failed to delete project.', 'error');
    }
  };

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Project Portfolio Management</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Publish, update metrics, descriptions, GitHub links, and live demos.
          </p>
        </div>

        {!showAddForm && !editingProject && (
          <button onClick={() => setShowAddForm(true)} className="btn btn-primary btn-sm">
            <Plus size={16} />
            <span>Add New Project</span>
          </button>
        )}
      </div>

      {/* Add / Edit Form */}
      {(showAddForm || editingProject) && (
        <form
          onSubmit={handleSubmit}
          style={{
            padding: '1.8rem',
            borderRadius: '16px',
            background: 'var(--bg-tertiary)',
            marginBottom: '2rem',
            border: '1px solid var(--border-glow)',
          }}
        >
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.2rem' }}>
            {editingProject ? `Edit: ${editingProject.title}` : 'Add New Project'}
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.2rem' }}>
            <div className="form-group">
              <label className="form-label">Project Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="form-select"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
            <div className="form-group">
              <label className="form-label">Subtitle / Focus Area</label>
              <input
                type="text"
                value={formData.subtitle || ''}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="form-input"
                placeholder="e.g. Machine Learning & Python Pipeline"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Key Metric Highlight</label>
              <input
                type="text"
                value={formData.metrics || ''}
                onChange={(e) => setFormData({ ...formData, metrics: e.target.value })}
                className="form-input"
                placeholder="e.g. 98.4% ROC-AUC • Sub-50ms Latency"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Detailed Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={4}
              className="form-textarea"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
            <div className="form-group">
              <label className="form-label">Tools & Frameworks (Comma separated)</label>
              <input
                type="text"
                value={formData.tools || ''}
                onChange={(e) => setFormData({ ...formData, tools: e.target.value })}
                className="form-input"
                placeholder="Python, Scikit-learn, Pandas, MySQL"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tags / Keywords (Comma separated)</label>
              <input
                type="text"
                value={formData.tags || ''}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="form-input"
                placeholder="Machine Learning, Anomaly Detection, Big Data"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
            <div className="form-group">
              <label className="form-label">GitHub Repository URL</label>
              <input
                type="url"
                value={formData.github_url || ''}
                onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                className="form-input"
                placeholder="https://github.com/garvitkaurav/project"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Live Demo URL</label>
              <input
                type="url"
                value={formData.live_url || ''}
                onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                className="form-input"
                placeholder="https://demo.garvit.dev"
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.2rem' }}>
            <button type="submit" className="btn btn-primary btn-sm">
              <Save size={16} />
              <span>Save Project</span>
            </button>
            <button type="button" onClick={handleCancel} className="btn btn-secondary btn-sm">
              <X size={16} />
              <span>Cancel</span>
            </button>
          </div>
        </form>
      )}

      {/* Projects Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {projects.map((p) => (
          <div
            key={p.id}
            style={{
              padding: '1.2rem',
              borderRadius: '12px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{p.title}</h4>
                <span className="badge badge-cyan" style={{ fontSize: '0.75rem' }}>{p.category}</span>
                {p.metrics && <span className="badge badge-purple" style={{ fontSize: '0.72rem' }}>{p.metrics}</span>}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '600px' }}>
                {p.subtitle || p.description.substring(0, 90) + '...'}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => handleEdit(p)} className="btn btn-secondary btn-icon" style={{ width: '34px', height: '34px' }}>
                <Edit2 size={14} />
              </button>
              <button onClick={() => handleDelete(p.id)} className="btn btn-secondary btn-icon" style={{ width: '34px', height: '34px', color: '#ef4444' }}>
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
