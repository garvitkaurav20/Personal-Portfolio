import express from 'express';
import { db } from '../db/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/experiences (Public)
router.get('/', (req, res) => {
  try {
    const experiences = db.prepare('SELECT * FROM experiences ORDER BY order_index ASC, id ASC').all();
    const parsed = experiences.map(e => ({
      ...e,
      highlights: e.highlights ? JSON.parse(e.highlights) : []
    }));
    return res.json({ success: true, data: parsed });
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch experiences.' });
  }
});

// POST /api/experiences (Protected)
router.post('/', authenticateToken, (req, res) => {
  try {
    const { role, company, duration, start_date, end_date, location, description, highlights, type, order_index } = req.body;

    if (!role || !company || !duration) {
      return res.status(400).json({ success: false, error: 'Role, company, and duration are required.' });
    }

    const highlightsStr = Array.isArray(highlights) ? JSON.stringify(highlights) : (highlights || '[]');

    const info = db.prepare(`
      INSERT INTO experiences (role, company, duration, start_date, end_date, location, description, highlights, type, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      role,
      company,
      duration,
      start_date || '',
      end_date || '',
      location || '',
      description || '',
      highlightsStr,
      type || 'Internship',
      order_index || 0
    );

    const created = db.prepare('SELECT * FROM experiences WHERE id = ?').get(info.lastInsertRowid);
    created.highlights = JSON.parse(created.highlights);

    return res.status(201).json({ success: true, data: created, message: 'Experience added successfully.' });
  } catch (error) {
    console.error('Error creating experience:', error);
    return res.status(500).json({ success: false, error: 'Failed to create experience.' });
  }
});

// PUT /api/experiences/:id (Protected)
router.put('/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT * FROM experiences WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Experience not found.' });
    }

    const { role, company, duration, start_date, end_date, location, description, highlights, type, order_index } = req.body;
    const highlightsStr = highlights ? (Array.isArray(highlights) ? JSON.stringify(highlights) : highlights) : existing.highlights;

    db.prepare(`
      UPDATE experiences SET
        role = ?, company = ?, duration = ?, start_date = ?, end_date = ?,
        location = ?, description = ?, highlights = ?, type = ?, order_index = ?
      WHERE id = ?
    `).run(
      role ?? existing.role,
      company ?? existing.company,
      duration ?? existing.duration,
      start_date ?? existing.start_date,
      end_date ?? existing.end_date,
      location ?? existing.location,
      description ?? existing.description,
      highlightsStr,
      type ?? existing.type,
      order_index ?? existing.order_index,
      id
    );

    const updated = db.prepare('SELECT * FROM experiences WHERE id = ?').get(id);
    updated.highlights = JSON.parse(updated.highlights);

    return res.json({ success: true, data: updated, message: 'Experience updated successfully.' });
  } catch (error) {
    console.error('Error updating experience:', error);
    return res.status(500).json({ success: false, error: 'Failed to update experience.' });
  }
});

// DELETE /api/experiences/:id (Protected)
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT * FROM experiences WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Experience not found.' });
    }

    db.prepare('DELETE FROM experiences WHERE id = ?').run(id);
    return res.json({ success: true, message: 'Experience deleted successfully.' });
  } catch (error) {
    console.error('Error deleting experience:', error);
    return res.status(500).json({ success: false, error: 'Failed to delete experience.' });
  }
});

export default router;
