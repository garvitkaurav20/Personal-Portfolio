import express from 'express';
import { db } from '../db/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/skills (Public)
router.get('/', (req, res) => {
  try {
    const skills = db.prepare('SELECT * FROM skills ORDER BY order_index ASC, id ASC').all();
    return res.json({ success: true, data: skills });
  } catch (error) {
    console.error('Error fetching skills:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch skills.' });
  }
});

// POST /api/skills (Protected)
router.post('/', authenticateToken, (req, res) => {
  try {
    const { name, category, proficiency, icon, is_featured, order_index } = req.body;

    if (!name || !category) {
      return res.status(400).json({ success: false, error: 'Name and category are required.' });
    }

    const info = db.prepare(`
      INSERT INTO skills (name, category, proficiency, icon, is_featured, order_index)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      name,
      category,
      proficiency || 85,
      icon || 'Code2',
      is_featured !== undefined ? (is_featured ? 1 : 0) : 1,
      order_index || 0
    );

    const newSkill = db.prepare('SELECT * FROM skills WHERE id = ?').get(info.lastInsertRowid);
    return res.status(201).json({ success: true, data: newSkill, message: 'Skill created successfully.' });
  } catch (error) {
    console.error('Error creating skill:', error);
    return res.status(500).json({ success: false, error: 'Failed to create skill.' });
  }
});

// PUT /api/skills/:id (Protected)
router.put('/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, proficiency, icon, is_featured, order_index } = req.body;

    const existing = db.prepare('SELECT * FROM skills WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Skill not found.' });
    }

    db.prepare(`
      UPDATE skills SET
        name = ?, category = ?, proficiency = ?, icon = ?, is_featured = ?, order_index = ?
      WHERE id = ?
    `).run(
      name ?? existing.name,
      category ?? existing.category,
      proficiency ?? existing.proficiency,
      icon ?? existing.icon,
      is_featured !== undefined ? (is_featured ? 1 : 0) : existing.is_featured,
      order_index ?? existing.order_index,
      id
    );

    const updated = db.prepare('SELECT * FROM skills WHERE id = ?').get(id);
    return res.json({ success: true, data: updated, message: 'Skill updated successfully.' });
  } catch (error) {
    console.error('Error updating skill:', error);
    return res.status(500).json({ success: false, error: 'Failed to update skill.' });
  }
});

// DELETE /api/skills/:id (Protected)
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT * FROM skills WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Skill not found.' });
    }

    db.prepare('DELETE FROM skills WHERE id = ?').run(id);
    return res.json({ success: true, message: 'Skill deleted successfully.' });
  } catch (error) {
    console.error('Error deleting skill:', error);
    return res.status(500).json({ success: false, error: 'Failed to delete skill.' });
  }
});

export default router;
