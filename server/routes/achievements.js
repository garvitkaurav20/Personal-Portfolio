import express from 'express';
import { db } from '../db/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/achievements (Public)
router.get('/', (req, res) => {
  try {
    const list = db.prepare('SELECT * FROM achievements ORDER BY order_index ASC, id ASC').all();
    return res.json({ success: true, data: list });
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch achievements.' });
  }
});

// POST /api/achievements (Protected)
router.post('/', authenticateToken, (req, res) => {
  try {
    const { title, role, organization, description, date_or_year, icon, order_index } = req.body;

    if (!title || !description || !date_or_year) {
      return res.status(400).json({ success: false, error: 'Title, description, and date/year are required.' });
    }

    const info = db.prepare(`
      INSERT INTO achievements (title, role, organization, description, date_or_year, icon, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      title,
      role || '',
      organization || '',
      description,
      date_or_year,
      icon || 'Trophy',
      order_index || 0
    );

    const created = db.prepare('SELECT * FROM achievements WHERE id = ?').get(info.lastInsertRowid);
    return res.status(201).json({ success: true, data: created, message: 'Achievement added successfully.' });
  } catch (error) {
    console.error('Error creating achievement:', error);
    return res.status(500).json({ success: false, error: 'Failed to create achievement.' });
  }
});

// PUT /api/achievements/:id (Protected)
router.put('/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT * FROM achievements WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Achievement not found.' });
    }

    const { title, role, organization, description, date_or_year, icon, order_index } = req.body;

    db.prepare(`
      UPDATE achievements SET
        title = ?, role = ?, organization = ?, description = ?,
        date_or_year = ?, icon = ?, order_index = ?
      WHERE id = ?
    `).run(
      title ?? existing.title,
      role ?? existing.role,
      organization ?? existing.organization,
      description ?? existing.description,
      date_or_year ?? existing.date_or_year,
      icon ?? existing.icon,
      order_index ?? existing.order_index,
      id
    );

    const updated = db.prepare('SELECT * FROM achievements WHERE id = ?').get(id);
    return res.json({ success: true, data: updated, message: 'Achievement updated successfully.' });
  } catch (error) {
    console.error('Error updating achievement:', error);
    return res.status(500).json({ success: false, error: 'Failed to update achievement.' });
  }
});

// DELETE /api/achievements/:id (Protected)
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT * FROM achievements WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Achievement not found.' });
    }

    db.prepare('DELETE FROM achievements WHERE id = ?').run(id);
    return res.json({ success: true, message: 'Achievement deleted successfully.' });
  } catch (error) {
    console.error('Error deleting achievement:', error);
    return res.status(500).json({ success: false, error: 'Failed to delete achievement.' });
  }
});

export default router;
