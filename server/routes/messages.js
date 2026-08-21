import express from 'express';
import { db } from '../db/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// POST /api/messages (Public - Contact Form Submission)
router.post('/', (req, res) => {
  try {
    const { name, email, subject, message, phone } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
    }

    const info = db.prepare(`
      INSERT INTO messages (name, email, subject, message, phone, is_read, is_starred, reply_status)
      VALUES (?, ?, ?, ?, ?, 0, 0, 'Unanswered')
    `).run(
      name.trim(),
      email.trim(),
      subject ? subject.trim() : 'New Portfolio Contact Message',
      message.trim(),
      phone ? phone.trim() : ''
    );

    const created = db.prepare('SELECT * FROM messages WHERE id = ?').get(info.lastInsertRowid);

    return res.status(201).json({
      success: true,
      data: created,
      message: 'Thank you! Your message has been received. Garvit will get back to you soon.'
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return res.status(500).json({ success: false, error: 'Failed to send your message. Please try again.' });
  }
});

// GET /api/messages (Protected - Admin Inbox)
router.get('/', authenticateToken, (req, res) => {
  try {
    const { status, starred } = req.query;
    let query = 'SELECT * FROM messages WHERE 1=1';
    const params = [];

    if (status === 'unread') {
      query += ' AND is_read = 0';
    } else if (status === 'read') {
      query += ' AND is_read = 1';
    }

    if (starred === 'true' || starred === '1') {
      query += ' AND is_starred = 1';
    }

    query += ' ORDER BY created_at DESC';

    const messages = db.prepare(query).all(...params);
    const unreadCount = db.prepare('SELECT COUNT(*) as count FROM messages WHERE is_read = 0').get().count;
    const totalCount = db.prepare('SELECT COUNT(*) as count FROM messages').get().count;

    return res.json({
      success: true,
      data: messages,
      meta: {
        total: totalCount,
        unread: unreadCount
      }
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch messages.' });
  }
});

// PATCH /api/messages/:id (Protected - Toggle read, star, or update reply status)
router.patch('/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT * FROM messages WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Message not found.' });
    }

    const { is_read, is_starred, reply_status, reply_notes } = req.body;

    db.prepare(`
      UPDATE messages SET
        is_read = ?,
        is_starred = ?,
        reply_status = ?,
        reply_notes = ?
      WHERE id = ?
    `).run(
      is_read !== undefined ? (is_read ? 1 : 0) : existing.is_read,
      is_starred !== undefined ? (is_starred ? 1 : 0) : existing.is_starred,
      reply_status ?? existing.reply_status,
      reply_notes ?? existing.reply_notes,
      id
    );

    const updated = db.prepare('SELECT * FROM messages WHERE id = ?').get(id);
    return res.json({ success: true, data: updated, message: 'Message updated successfully.' });
  } catch (error) {
    console.error('Error updating message:', error);
    return res.status(500).json({ success: false, error: 'Failed to update message.' });
  }
});

// DELETE /api/messages/:id (Protected - Delete message)
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT * FROM messages WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Message not found.' });
    }

    db.prepare('DELETE FROM messages WHERE id = ?').run(id);
    return res.json({ success: true, message: 'Message deleted successfully.' });
  } catch (error) {
    console.error('Error deleting message:', error);
    return res.status(500).json({ success: false, error: 'Failed to delete message.' });
  }
});

export default router;
