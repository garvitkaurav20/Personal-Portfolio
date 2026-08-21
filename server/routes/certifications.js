import express from 'express';
import { db } from '../db/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/certifications (Public)
router.get('/', (req, res) => {
  try {
    const list = db.prepare('SELECT * FROM certifications ORDER BY order_index ASC, id ASC').all();
    return res.json({ success: true, data: list });
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch certifications.' });
  }
});

// POST /api/certifications (Protected)
router.post('/', authenticateToken, (req, res) => {
  try {
    const { title, issuer, issue_date, credential_url, badge_image, category, order_index } = req.body;

    if (!title || !issuer) {
      return res.status(400).json({ success: false, error: 'Title and issuer are required.' });
    }

    const info = db.prepare(`
      INSERT INTO certifications (title, issuer, issue_date, credential_url, badge_image, category, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      title,
      issuer,
      issue_date || '',
      credential_url || '',
      badge_image || '',
      category || 'Technical',
      order_index || 0
    );

    const created = db.prepare('SELECT * FROM certifications WHERE id = ?').get(info.lastInsertRowid);
    return res.status(201).json({ success: true, data: created, message: 'Certification added successfully.' });
  } catch (error) {
    console.error('Error creating certification:', error);
    return res.status(500).json({ success: false, error: 'Failed to create certification.' });
  }
});

// PUT /api/certifications/:id (Protected)
router.put('/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT * FROM certifications WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Certification not found.' });
    }

    const { title, issuer, issue_date, credential_url, badge_image, category, order_index } = req.body;

    db.prepare(`
      UPDATE certifications SET
        title = ?, issuer = ?, issue_date = ?, credential_url = ?,
        badge_image = ?, category = ?, order_index = ?
      WHERE id = ?
    `).run(
      title ?? existing.title,
      issuer ?? existing.issuer,
      issue_date ?? existing.issue_date,
      credential_url ?? existing.credential_url,
      badge_image ?? existing.badge_image,
      category ?? existing.category,
      order_index ?? existing.order_index,
      id
    );

    const updated = db.prepare('SELECT * FROM certifications WHERE id = ?').get(id);
    return res.json({ success: true, data: updated, message: 'Certification updated successfully.' });
  } catch (error) {
    console.error('Error updating certification:', error);
    return res.status(500).json({ success: false, error: 'Failed to update certification.' });
  }
});

// DELETE /api/certifications/:id (Protected)
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT * FROM certifications WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Certification not found.' });
    }

    db.prepare('DELETE FROM certifications WHERE id = ?').run(id);
    return res.json({ success: true, message: 'Certification deleted successfully.' });
  } catch (error) {
    console.error('Error deleting certification:', error);
    return res.status(500).json({ success: false, error: 'Failed to delete certification.' });
  }
});

export default router;
