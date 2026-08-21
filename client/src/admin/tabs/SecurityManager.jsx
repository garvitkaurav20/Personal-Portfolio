import React, { useState } from 'react';
import { KeyRound, ShieldCheck, Save, Loader2 } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../components/Toast';

export default function SecurityManager() {
  const { addToast } = useToast();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      addToast('New passwords do not match.', 'error');
      return;
    }
    if (newPassword.length < 6) {
      addToast('Password must be at least 6 characters.', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await api.changePassword({ currentPassword, newPassword });
      if (res.success) {
        addToast('Admin password updated successfully!', 'success');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      console.error('Password change error:', err);
      addToast(err.message || 'Failed to update password.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card" style={{ padding: '2rem', maxWidth: '600px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
        <div style={{ padding: '0.6rem', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.12)', color: '#ef4444' }}>
          <ShieldCheck size={24} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Admin Security & Credentials</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Update your admin login password securely.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Current Password *</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="form-input"
            placeholder="••••••••••••"
          />
        </div>

        <div className="form-group">
          <label className="form-label">New Password * (Min 6 characters)</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="form-input"
            placeholder="••••••••••••"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Confirm New Password *</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="form-input"
            placeholder="••••••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
          style={{ marginTop: '1rem', width: '100%' }}
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Updating Password...</span>
            </>
          ) : (
            <>
              <Save size={16} />
              <span>Update Password</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
