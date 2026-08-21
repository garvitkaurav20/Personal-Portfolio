import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Briefcase } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../components/Toast';

export default function ExperienceManager({ experiences = [], onRefresh }) {
  const { addToast } = useToast();
  const [editingExp, setEditingExp] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    role: '',
    company: '',
    duration: '',
    location: '',
    description: '',
    highlights: '',
    type: 'Internship',
    order_index: 0,
  });

  const handleEdit = (exp) => {
    setEditingExp(exp);
    setFormData({
      ...exp,
      highlights: Array.isArray(exp.highlights) ? exp.highlights.join('\n') : exp.highlights,
    });
    setShowAddForm(false);
  };

  const handleCancel = () => {
    setEditingExp(null);
    setShowAddForm(false);
    setFormData({
      role: '',
      company: '',
      duration: '',
      location: '',
      description: '',
      highlights: '',
      type: 'Internship',
      order_index: 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        highlights: formData.highlights.split('\n').filter((h) => h.trim().length > 0),
      };

      if (editingExp) {
        await api.updateExperience(editingExp.id, payload);
        addToast('Experience updated!', 'success');
      } else {
        await api.createExperience(payload);
        addToast('Experience added!', 'success');
      }
      handleCancel();
      onRefresh?.();
    } catch (err) {
      console.error('Error saving experience:', err);
      addToast(err.message || 'Failed to save experience.', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this experience entry?')) return;
    try {
      await api.deleteExperience(id);
      addToast('Experience deleted.', 'info');
      onRefresh?.();
    } catch (err) {
      addToast('Failed to delete experience.', 'error');
    }
  };

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Internships & Experience Manager</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Manage industry internships, job milestones, and key accomplishments.
          </p>
        </div>

        {!showAddForm && !editingExp && (
          <button onClick={() => setShowAddForm(true)} className="btn btn-primary btn-sm">
            <Plus size={16} />
            <span>Add Experience</span>
          </button>
        )}
      </div>

      {(showAddForm || editingExp) && (
        <form
          onSubmit={handleSubmit}
          style={{
            padding: '1.5rem',
            borderRadius: '14px',
            background: 'var(--bg-tertiary)',
            marginBottom: '2rem',
            border: '1px solid var(--border-glow)',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Role / Job Title *</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Company / Organization *</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
                className="form-input"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Duration *</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g. October 2025"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                value={formData.location || ''}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="form-select"
              >
                <option value="Internship">Internship</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Leadership">Leadership</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Key Highlights / Bullets (One per line)</label>
            <textarea
              value={formData.highlights}
              onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
              rows={4}
              placeholder="Assisted in identifying vulnerabilities..."
              className="form-textarea"
            />
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1rem' }}>
            <button type="submit" className="btn btn-primary btn-sm">
              <Save size={16} />
              <span>Save Entry</span>
            </button>
            <button type="button" onClick={handleCancel} className="btn btn-secondary btn-sm">
              <X size={16} />
              <span>Cancel</span>
            </button>
          </div>
        </form>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {experiences.map((exp) => (
          <div
            key={exp.id}
            style={{
              padding: '1.2rem',
              borderRadius: '12px',
              background: 'var(--bg-tertiary)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{exp.role} — <span style={{ color: 'var(--accent-cyan)' }}>{exp.company}</span></h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{exp.duration} • {exp.location}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => handleEdit(exp)} className="btn btn-secondary btn-icon" style={{ width: '34px', height: '34px' }}>
                <Edit2 size={14} />
              </button>
              <button onClick={() => handleDelete(exp.id)} className="btn btn-secondary btn-icon" style={{ width: '34px', height: '34px', color: '#ef4444' }}>
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
