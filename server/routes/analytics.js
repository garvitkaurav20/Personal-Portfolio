import express from 'express';
import crypto from 'crypto';
import { db } from '../db/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// POST /api/analytics/visit (Public - Log page visit)
router.post('/visit', (req, res) => {
  try {
    const { path } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const ipHash = crypto.createHash('sha256').update(String(ip)).digest('hex').substring(0, 16);

    db.prepare(`
      INSERT INTO analytics_visits (page_path, ip_hash, user_agent)
      VALUES (?, ?, ?)
    `).run(path || '/', ipHash, userAgent);

    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
});

// GET /api/analytics/stats (Protected - Admin Stats Overview)
router.get('/stats', authenticateToken, (req, res) => {
  try {
    const totalVisits = db.prepare('SELECT COUNT(*) as count FROM analytics_visits').get().count;
    const uniqueVisitors = db.prepare('SELECT COUNT(DISTINCT ip_hash) as count FROM analytics_visits').get().count;
    const totalProjects = db.prepare('SELECT COUNT(*) as count FROM projects').get().count;
    const totalSkills = db.prepare('SELECT COUNT(*) as count FROM skills').get().count;
    const totalExperiences = db.prepare('SELECT COUNT(*) as count FROM experiences').get().count;
    const totalCertifications = db.prepare('SELECT COUNT(*) as count FROM certifications').get().count;
    const totalAchievements = db.prepare('SELECT COUNT(*) as count FROM achievements').get().count;
    const totalMessages = db.prepare('SELECT COUNT(*) as count FROM messages').get().count;
    const unreadMessages = db.prepare('SELECT COUNT(*) as count FROM messages WHERE is_read = 0').get().count;

    const recentVisits = db.prepare(`
      SELECT page_path, visited_at 
      FROM analytics_visits 
      ORDER BY visited_at DESC 
      LIMIT 10
    `).all();

    const recentMessages = db.prepare(`
      SELECT id, name, email, subject, message, is_read, created_at 
      FROM messages 
      ORDER BY created_at DESC 
      LIMIT 5
    `).all();

    const projectsByCategory = db.prepare(`
      SELECT category, COUNT(*) as count 
      FROM projects 
      GROUP BY category
    `).all();

    const skillsByCategory = db.prepare(`
      SELECT category, COUNT(*) as count 
      FROM skills 
      GROUP BY category
    `).all();

    return res.json({
      success: true,
      data: {
        totalVisits,
        uniqueVisitors,
        totalProjects,
        totalSkills,
        totalExperiences,
        totalCertifications,
        totalAchievements,
        totalMessages,
        unreadMessages,
        recentVisits,
        recentMessages,
        projectsByCategory,
        skillsByCategory
      }
    });
  } catch (error) {
    console.error('Error fetching analytics stats:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch analytics statistics.' });
  }
});

export default router;
