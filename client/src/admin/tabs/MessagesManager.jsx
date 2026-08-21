import React, { useState } from 'react';
import { Mail, Check, Trash2, Star, MessageSquare, Reply, Phone, Calendar } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../components/Toast';

export default function MessagesManager({ messages = [], onRefresh }) {
  const { addToast } = useToast();
  const [filter, setFilter] = useState('all'); // all, unread, read

  const filteredMessages = messages.filter((m) => {
    if (filter === 'unread') return !m.is_read;
    if (filter === 'read') return m.is_read;
    return true;
  });

  const toggleReadStatus = async (msg) => {
    try {
      await api.updateMessage(msg.id, { is_read: !msg.is_read });
      addToast(msg.is_read ? 'Marked as unread' : 'Marked as read', 'success');
      onRefresh?.();
    } catch (err) {
      addToast('Failed to update message status', 'error');
    }
  };

  const toggleStar = async (msg) => {
    try {
      await api.updateMessage(msg.id, { is_starred: !msg.is_starred });
      onRefresh?.();
    } catch (err) {
      addToast('Failed to star message', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message permanently?')) return;
    try {
      await api.deleteMessage(id);
      addToast('Message deleted', 'info');
      onRefresh?.();
    } catch (err) {
      addToast('Failed to delete message', 'error');
    }
  };

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Contact Inquiries & Messages</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Real-time contact submissions from recruiters, clients, and collaborators.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '0.4rem', background: 'var(--bg-tertiary)', padding: '0.3rem', borderRadius: '10px' }}>
          <button
            onClick={() => setFilter('all')}
            style={{
              padding: '0.35rem 0.8rem',
              borderRadius: '6px',
              border: 'none',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: filter === 'all' ? 'var(--accent-blue)' : 'transparent',
              color: filter === 'all' ? '#fff' : 'var(--text-secondary)',
            }}
          >
            All ({messages.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            style={{
              padding: '0.35rem 0.8rem',
              borderRadius: '6px',
              border: 'none',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: filter === 'unread' ? 'var(--accent-blue)' : 'transparent',
              color: filter === 'unread' ? '#fff' : 'var(--text-secondary)',
            }}
          >
            Unread ({messages.filter(m => !m.is_read).length})
          </button>
        </div>
      </div>

      {filteredMessages.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
          No messages found in this category.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              style={{
                padding: '1.5rem',
                borderRadius: '14px',
                background: msg.is_read ? 'rgba(255,255,255,0.02)' : 'rgba(6, 182, 212, 0.05)',
                border: msg.is_read ? '1px solid var(--border-subtle)' : '1px solid var(--border-glow)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.8rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.2rem' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{msg.name}</h4>
                    {!msg.is_read && <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>NEW</span>}
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    <span>✉️ {msg.email}</span>
                    {msg.phone && <span>📞 {msg.phone}</span>}
                    <span>🗓️ {msg.created_at}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button
                    onClick={() => toggleStar(msg)}
                    className="btn btn-secondary btn-icon"
                    style={{ width: '32px', height: '32px', color: msg.is_starred ? '#f59e0b' : 'var(--text-muted)' }}
                    title="Star message"
                  >
                    <Star size={14} fill={msg.is_starred ? '#f59e0b' : 'none'} />
                  </button>
                  <button
                    onClick={() => toggleReadStatus(msg)}
                    className="btn btn-secondary btn-icon"
                    style={{ width: '32px', height: '32px', color: msg.is_read ? 'var(--text-muted)' : '#10b981' }}
                    title={msg.is_read ? 'Mark unread' : 'Mark read'}
                  >
                    <Check size={14} />
                  </button>
                  <a
                    href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                    className="btn btn-primary btn-icon"
                    style={{ width: '32px', height: '32px' }}
                    title="Reply via Email"
                  >
                    <Reply size={14} />
                  </a>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="btn btn-secondary btn-icon"
                    style={{ width: '32px', height: '32px', color: '#ef4444' }}
                    title="Delete message"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--accent-cyan)' }}>
                Subject: {msg.subject}
              </div>

              <p style={{ fontSize: '0.9rem', lineHeight: 1.65, color: 'var(--text-primary)', background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px' }}>
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
