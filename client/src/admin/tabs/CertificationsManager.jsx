import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Award, ExternalLink } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../components/Toast';

export default function CertificationsManager({ certifications = [], onRefresh }) {
  const { addToast } = useToast();
  const [editingCert, setEditingCert] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    issue_date: '',
    credential_url: '',
    badge_image: '',
    category: 'Technical',
    order_index: 0,
  });

  const handleEdit = (cert) => {
    setEditingCert(cert);
    setFormData(cert);
    setShowAddForm(false);
  };

  const handleCancel = () => {
    setEditingCert(null);
    setShowAddForm(false);
    setFormData({
      title: '',
      issuer: '',
      issue_date: '',
      credential_url: '',
      badge_image: '',
      category: 'Technical',
      order_index: 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCert) {
        await api.updateCertification(editingCert.id, formData);
        addToast('Certification updated!', 'success');
      } else {
        await api.createCertification(formData);
        addToast('Certification added!', 'success');
      }
      handleCancel();
      onRefresh?.();
    } catch (err) {
      console.error('Error saving certification:', err);
      addToast(err.message || 'Failed to save certification.', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this certification?')) return;
    try {
      await api.deleteCertification(id);
      addToast('Certification deleted.', 'info');
      onRefresh?.();
    } catch (err) {
      addToast('Failed to delete certification.', 'error');
    }
  };

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Certifications & Badges</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Manage verified credentials from Accenture, MasterCard, Google, Udemy, etc.
          </p>
        </div>

        {!showAddForm && !editingCert && (
          <button onClick={() => setShowAddForm(true)} className="btn btn-primary btn-sm">
            <Plus size={16} />
            <span>Add Certification</span>
          </button>
        )}
      </div>

      {(showAddForm || editingCert) && (
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
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Certification Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Issuer Organization *</label>
              <input
                type="text"
                value={formData.issuer}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                placeholder="e.g. Google, Accenture, MasterCard"
                required
                className="form-input"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Issue Date / Year</label>
              <input
                type="text"
                value={formData.issue_date || ''}
                onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
                placeholder="2025"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Credential Verification URL</label>
              <input
                type="url"
                value={formData.credential_url || ''}
                onChange={(e) => setFormData({ ...formData, credential_url: e.target.value })}
                placeholder="https://cloud.google.com/..."
                className="form-input"
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1rem' }}>
            <button type="submit" className="btn btn-primary btn-sm">
              <Save size={16} />
              <span>Save Credential</span>
            </button>
            <button type="button" onClick={handleCancel} className="btn btn-secondary btn-sm">
              <X size={16} />
              <span>Cancel</span>
            </button>
          </div>
        </form>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {certifications.map((cert) => (
          <div
            key={cert.id}
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
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{cert.title}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>{cert.issuer} {cert.issue_date && `• ${cert.issue_date}`}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => handleEdit(cert)} className="btn btn-secondary btn-icon" style={{ width: '34px', height: '34px' }}>
                <Edit2 size={14} />
              </button>
              <button onClick={() => handleDelete(cert.id)} className="btn btn-secondary btn-icon" style={{ width: '34px', height: '34px', color: '#ef4444' }}>
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
