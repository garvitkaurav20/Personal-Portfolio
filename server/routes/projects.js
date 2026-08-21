import express from 'express';
import { db } from '../db/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/projects (Public)
router.get('/', (req, res) => {
  try {
    const { category, featured } = req.query;
    let query = 'SELECT * FROM projects WHERE 1=1';
    const params = [];

    if (category && category !== 'All') {
      query += ' AND category = ?';
      params.push(category);
    }

    if (featured === 'true' || featured === '1') {
      query += ' AND is_featured = 1';
    }

    query += ' ORDER BY order_index ASC, id DESC';

    const projects = db.prepare(query).all(...params);
    return res.json({ success: true, data: projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch projects.' });
  }
});

// GET /api/projects/:id (Public)
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(id);
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found.' });
    }
    return res.json({ success: true, data: project });
  } catch (error) {
    console.error('Error fetching project:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch project.' });
  }
});

// POST /api/projects (Protected)
router.post('/', authenticateToken, (req, res) => {
  try {
    const {
      title, subtitle, description, category, tags, tools,
      github_url, live_url, image_url, metrics, is_featured, order_index
    } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ success: false, error: 'Title, description and category are required.' });
    }

    const info = db.prepare(`
      INSERT INTO projects (
        title, subtitle, description, category, tags, tools,
        github_url, live_url, image_url, metrics, is_featured, order_index
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      title,
      subtitle || '',
      description,
      category,
      tags || '',
      tools || '',
      github_url || '',
      live_url || '',
      image_url || '',
      metrics || '',
      is_featured !== undefined ? (is_featured ? 1 : 0) : 1,
      order_index || 0
    );

    const newProject = db.prepare('SELECT * FROM projects WHERE id = ?').get(info.lastInsertRowid);
    return res.status(201).json({ success: true, data: newProject, message: 'Project created successfully.' });
  } catch (error) {
    console.error('Error creating project:', error);
    return res.status(500).json({ success: false, error: 'Failed to create project.' });
  }
});

// PUT /api/projects/:id (Protected)
router.put('/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT * FROM projects WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Project not found.' });
    }

    const {
      title, subtitle, description, category, tags, tools,
      github_url, live_url, image_url, metrics, is_featured, order_index
    } = req.body;

    db.prepare(`
      UPDATE projects SET
        title = ?, subtitle = ?, description = ?, category = ?, tags = ?, tools = ?,
        github_url = ?, live_url = ?, image_url = ?, metrics = ?, is_featured = ?, order_index = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      title ?? existing.title,
      subtitle ?? existing.subtitle,
      description ?? existing.description,
      category ?? existing.category,
      tags ?? existing.tags,
      tools ?? existing.tools,
      github_url ?? existing.github_url,
      live_url ?? existing.live_url,
      image_url ?? existing.image_url,
      metrics ?? existing.metrics,
      is_featured !== undefined ? (is_featured ? 1 : 0) : existing.is_featured,
      order_index ?? existing.order_index,
      id
    );

    const updated = db.prepare('SELECT * FROM projects WHERE id = ?').get(id);
    return res.json({ success: true, data: updated, message: 'Project updated successfully.' });
  } catch (error) {
    console.error('Error updating project:', error);
    return res.status(500).json({ success: false, error: 'Failed to update project.' });
  }
});

// DELETE /api/projects/:id (Protected)
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT * FROM projects WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Project not found.' });
    }

    db.prepare('DELETE FROM projects WHERE id = ?').run(id);
    return res.json({ success: true, message: 'Project deleted successfully.' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return res.status(500).json({ success: false, error: 'Failed to delete project.' });
  }
});

export default router;
