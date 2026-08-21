import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Trophy } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../components/Toast';

export default function AchievementsManager({ achievements = [], onRefresh }) {
  const { addToast } = useToast();
  const [editingItem, setEditingItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    role: '',
    organization: '',
    description: '',
    date_or_year: '',
    icon: 'Trophy',
    order_index: 0,
  });

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowAddForm(false);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setShowAddForm(false);
    setFormData({
      title: '',
      role: '',
      organization: '',
      description: '',
      date_or_year: '',
      icon: 'Trophy',
      order_index: 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.updateAchievement(editingItem.id, formData);
        addToast('Achievement updated!', 'success');
      } else {
        await api.createAchievement(formData);
        addToast('Achievement created!', 'success');
      }
      handleCancel();
      onRefresh?.();
    } catch (err) {
      console.error('Error saving achievement:', err);
      addToast(err.message || 'Failed to save achievement.', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this achievement?')) return;
    try {
      await api.deleteAchievement(id);
      addToast('Achievement deleted.', 'info');
      onRefresh?.();
    } catch (err) {
      addToast('Failed to delete achievement.', 'error');
    }
  };

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Achievements & Leadership</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Manage leadership roles, society coordination, and major summits.
          </p>
        </div>

        {!showAddForm && !editingItem && (
          <button onClick={() => setShowAddForm(true)} className="btn btn-primary btn-sm">
            <Plus size={16} />
            <span>Add Achievement</span>
          </button>
        )}
      </div>

      {(showAddForm || editingItem) && (
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
              <label className="form-label">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Role Designation</label>
              <input
                type="text"
                value={formData.role || ''}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Organization / Society</label>
              <input
                type="text"
                value={formData.organization || ''}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Date / Period *</label>
              <input
                type="text"
                value={formData.date_or_year}
                onChange={(e) => setFormData({ ...formData, date_or_year: e.target.value })}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Icon</label>
              <select
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="form-select"
              >
                <option value="Trophy">Trophy</option>
                <option value="ShieldCheck">ShieldCheck</option>
                <option value="Code2">Code2</option>
                <option value="Award">Award</option>
                <option value="Users">Users</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={3}
              className="form-textarea"
            />
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1rem' }}>
            <button type="submit" className="btn btn-primary btn-sm">
              <Save size={16} />
              <span>Save</span>
            </button>
            <button type="button" onClick={handleCancel} className="btn btn-secondary btn-sm">
              <X size={16} />
              <span>Cancel</span>
            </button>
          </div>
        </form>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {achievements.map((item) => (
          <div
            key={item.id}
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
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{item.title}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>{item.role} • {item.date_or_year}</p>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{item.description}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => handleEdit(item)} className="btn btn-secondary btn-icon" style={{ width: '34px', height: '34px' }}>
                <Edit2 size={14} />
              </button>
              <button onClick={() => handleDelete(item.id)} className="btn btn-secondary btn-icon" style={{ width: '34px', height: '34px', color: '#ef4444' }}>
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
