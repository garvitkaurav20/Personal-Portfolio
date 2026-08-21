import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, GraduationCap } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../components/Toast';

export default function EducationManager({ education = [], onRefresh }) {
  const { addToast } = useToast();
  const [editingEdu, setEditingEdu] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    field_of_study: '',
    grade_or_cgpa: '',
    duration: '',
    location: '',
    details: '',
    order_index: 0,
  });

  const handleEdit = (edu) => {
    setEditingEdu(edu);
    setFormData(edu);
    setShowAddForm(false);
  };

  const handleCancel = () => {
    setEditingEdu(null);
    setShowAddForm(false);
    setFormData({
      degree: '',
      institution: '',
      field_of_study: '',
      grade_or_cgpa: '',
      duration: '',
      location: '',
      details: '',
      order_index: 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEdu) {
        await api.updateEducation(editingEdu.id, formData);
        addToast('Education updated!', 'success');
      } else {
        await api.createEducation(formData);
        addToast('Education added!', 'success');
      }
      handleCancel();
      onRefresh?.();
    } catch (err) {
      console.error('Error saving education:', err);
      addToast(err.message || 'Failed to save education.', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this education record?')) return;
    try {
      await api.deleteEducation(id);
      addToast('Education deleted.', 'info');
      onRefresh?.();
    } catch (err) {
      addToast('Failed to delete education.', 'error');
    }
  };

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Education Management</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Update academic degrees, institutions, and scores/CGPA.
          </p>
        </div>

        {!showAddForm && !editingEdu && (
          <button onClick={() => setShowAddForm(true)} className="btn btn-primary btn-sm">
            <Plus size={16} />
            <span>Add Education</span>
          </button>
        )}
      </div>

      {(showAddForm || editingEdu) && (
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
              <label className="form-label">Degree / Qualification *</label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Institution / School *</label>
              <input
                type="text"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                required
                className="form-input"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">CGPA / Percentage *</label>
              <input
                type="text"
                value={formData.grade_or_cgpa}
                onChange={(e) => setFormData({ ...formData, grade_or_cgpa: e.target.value })}
                placeholder="CGPA: 7.68 or Percentage: 83.66%"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Duration *</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="2023 - 2027"
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
          </div>

          <div className="form-group">
            <label className="form-label">Details / Specialization</label>
            <textarea
              value={formData.details || ''}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              rows={3}
              className="form-textarea"
            />
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1rem' }}>
            <button type="submit" className="btn btn-primary btn-sm">
              <Save size={16} />
              <span>Save Record</span>
            </button>
            <button type="button" onClick={handleCancel} className="btn btn-secondary btn-sm">
              <X size={16} />
              <span>Cancel</span>
            </button>
          </div>
        </form>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {education.map((edu) => (
          <div
            key={edu.id}
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
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{edu.institution}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>{edu.degree} • <strong>{edu.grade_or_cgpa}</strong></p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{edu.duration} • {edu.location}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => handleEdit(edu)} className="btn btn-secondary btn-icon" style={{ width: '34px', height: '34px' }}>
                <Edit2 size={14} />
              </button>
              <button onClick={() => handleDelete(edu.id)} className="btn btn-secondary btn-icon" style={{ width: '34px', height: '34px', color: '#ef4444' }}>
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
