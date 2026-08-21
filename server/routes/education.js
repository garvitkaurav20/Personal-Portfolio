import express from 'express';
import { db } from '../db/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/education (Public)
router.get('/', (req, res) => {
  try {
    const list = db.prepare('SELECT * FROM education ORDER BY order_index ASC, id ASC').all();
    return res.json({ success: true, data: list });
  } catch (error) {
    console.error('Error fetching education:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch education.' });
  }
});

// POST /api/education (Protected)
router.post('/', authenticateToken, (req, res) => {
  try {
    const { degree, institution, field_of_study, grade_or_cgpa, duration, location, details, order_index } = req.body;

    if (!degree || !institution || !grade_or_cgpa || !duration) {
      return res.status(400).json({ success: false, error: 'Degree, institution, grade/CGPA, and duration are required.' });
    }

    const info = db.prepare(`
      INSERT INTO education (degree, institution, field_of_study, grade_or_cgpa, duration, location, details, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      degree,
      institution,
      field_of_study || '',
      grade_or_cgpa,
      duration,
      location || '',
      details || '',
      order_index || 0
    );

    const created = db.prepare('SELECT * FROM education WHERE id = ?').get(info.lastInsertRowid);
    return res.status(201).json({ success: true, data: created, message: 'Education record created successfully.' });
  } catch (error) {
    console.error('Error creating education:', error);
    return res.status(500).json({ success: false, error: 'Failed to create education record.' });
  }
});

// PUT /api/education/:id (Protected)
router.put('/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT * FROM education WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Education record not found.' });
    }

    const { degree, institution, field_of_study, grade_or_cgpa, duration, location, details, order_index } = req.body;

    db.prepare(`
      UPDATE education SET
        degree = ?, institution = ?, field_of_study = ?, grade_or_cgpa = ?,
        duration = ?, location = ?, details = ?, order_index = ?
      WHERE id = ?
    `).run(
      degree ?? existing.degree,
      institution ?? existing.institution,
      field_of_study ?? existing.field_of_study,
      grade_or_cgpa ?? existing.grade_or_cgpa,
      duration ?? existing.duration,
      location ?? existing.location,
      details ?? existing.details,
      order_index ?? existing.order_index,
      id
    );

    const updated = db.prepare('SELECT * FROM education WHERE id = ?').get(id);
    return res.json({ success: true, data: updated, message: 'Education record updated successfully.' });
  } catch (error) {
    console.error('Error updating education:', error);
    return res.status(500).json({ success: false, error: 'Failed to update education record.' });
  }
});

// DELETE /api/education/:id (Protected)
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT * FROM education WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Education record not found.' });
    }

    db.prepare('DELETE FROM education WHERE id = ?').run(id);
    return res.json({ success: true, message: 'Education record deleted successfully.' });
  } catch (error) {
    console.error('Error deleting education:', error);
    return res.status(500).json({ success: false, error: 'Failed to delete education record.' });
  }
});

export default router;
