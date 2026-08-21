import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Sparkles, Code2 } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../components/Toast';

export default function SkillsManager({ skills = [], onRefresh }) {
  const { addToast } = useToast();
  const [editingSkill, setEditingSkill] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Languages',
    proficiency: 85,
    icon: 'Code2',
    is_featured: 1,
    order_index: 0,
  });

  const categories = ['Languages', 'Platforms', 'Tools', 'Coursework', 'Soft Skills'];

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setFormData(skill);
    setShowAddForm(false);
  };

  const handleCancel = () => {
    setEditingSkill(null);
    setShowAddForm(false);
    setFormData({
      name: '',
      category: 'Languages',
      proficiency: 85,
      icon: 'Code2',
      is_featured: 1,
      order_index: 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSkill) {
        await api.updateSkill(editingSkill.id, formData);
        addToast('Skill updated successfully!', 'success');
      } else {
        await api.createSkill(formData);
        addToast('Skill created successfully!', 'success');
      }
      handleCancel();
      onRefresh?.();
    } catch (err) {
      console.error('Error saving skill:', err);
      addToast(err.message || 'Failed to save skill.', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
    try {
      await api.deleteSkill(id);
      addToast('Skill deleted.', 'info');
      onRefresh?.();
    } catch (err) {
      addToast('Failed to delete skill.', 'error');
    }
  };

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Technical Skills Management</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Add, update, re-order, or delete technical competencies across all categories.
          </p>
        </div>

        {!showAddForm && !editingSkill && (
          <button onClick={() => setShowAddForm(true)} className="btn btn-primary btn-sm">
            <Plus size={16} />
            <span>Add New Skill</span>
          </button>
        )}
      </div>

      {/* Add / Edit Form */}
      {(showAddForm || editingSkill) && (
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
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem' }}>
            {editingSkill ? `Edit Skill: ${editingSkill.name}` : 'Create New Skill'}
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Skill Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="form-input"
                placeholder="e.g. PyTorch"
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

            <div className="form-group">
              <label className="form-label">Proficiency Level ({formData.proficiency}%)</label>
              <input
                type="range"
                min="30"
                max="100"
                value={formData.proficiency}
                onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) })}
                style={{ width: '100%', marginTop: '0.6rem' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1rem' }}>
            <button type="submit" className="btn btn-primary btn-sm">
              <Save size={16} />
              <span>Save Skill</span>
            </button>
            <button type="button" onClick={handleCancel} className="btn btn-secondary btn-sm">
              <X size={16} />
              <span>Cancel</span>
            </button>
          </div>
        </form>
      )}

      {/* Skills Table List */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.75rem' }}>Name</th>
              <th style={{ padding: '0.75rem' }}>Category</th>
              <th style={{ padding: '0.75rem' }}>Proficiency</th>
              <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr key={skill.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '0.75rem', fontWeight: 600 }}>{skill.name}</td>
                <td style={{ padding: '0.75rem' }}>
                  <span className="badge badge-cyan">{skill.category}</span>
                </td>
                <td style={{ padding: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span>{skill.proficiency}%</span>
                    <div style={{ width: '80px', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${skill.proficiency}%`, height: '100%', background: 'var(--gradient-primary)' }} />
                    </div>
                  </div>
                </td>
                <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                  <button onClick={() => handleEdit(skill)} className="btn btn-secondary btn-icon" style={{ width: '32px', height: '32px', marginRight: '0.4rem' }}>
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => handleDelete(skill.id)} className="btn btn-secondary btn-icon" style={{ width: '32px', height: '32px', color: '#ef4444' }}>
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
