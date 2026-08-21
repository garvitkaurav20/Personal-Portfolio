import React, { useState } from 'react';
import { Save, User, Mail, Phone, MapPin, Sparkles, Loader2, Upload } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../components/Toast';

export default function ProfileManager({ profile, onUpdate }) {
  const { addToast } = useToast();
  const [formData, setFormData] = useState(profile || {});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.updateProfile(formData);
      if (res.success) {
        addToast('Profile updated successfully!', 'success');
        onUpdate?.(res.data);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      addToast(err.message || 'Failed to update profile.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.4rem' }}>
        Profile & Bio Settings
      </h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.8rem' }}>
        Update headline, bio narrative, contact info, social handles, and availability status.
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name || ''}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Availability Status</label>
            <input
              type="text"
              name="availability_status"
              value={formData.availability_status || ''}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g. Open for Opportunities"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Headline / Titles</label>
          <input
            type="text"
            name="headline"
            value={formData.headline || ''}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Hero Tagline</label>
          <input
            type="text"
            name="tagline"
            value={formData.tagline || ''}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">About Narrative / Bio</label>
          <textarea
            name="bio"
            value={formData.bio || ''}
            onChange={handleChange}
            rows={5}
            required
            className="form-textarea"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2rem' }}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location || ''}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2rem' }}>
          <div className="form-group">
            <label className="form-label">GitHub URL</label>
            <input
              type="url"
              name="github_url"
              value={formData.github_url || ''}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">LinkedIn URL</label>
            <input
              type="url"
              name="linkedin_url"
              value={formData.linkedin_url || ''}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Resume URL / Path</label>
            <input
              type="text"
              name="resume_url"
              value={formData.resume_url || ''}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
          style={{ marginTop: '1rem' }}
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Saving Profile...</span>
            </>
          ) : (
            <>
              <Save size={16} />
              <span>Save Profile Changes</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
