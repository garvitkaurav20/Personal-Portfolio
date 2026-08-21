import express from 'express';
import { db } from '../db/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/profile (Public)
router.get('/', (req, res) => {
  try {
    const profile = db.prepare('SELECT * FROM profile ORDER BY id ASC LIMIT 1').get();
    if (!profile) {
      return res.status(404).json({ success: false, error: 'Profile not found.' });
    }
    return res.json({ success: true, data: profile });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch profile.' });
  }
});

// PUT /api/profile (Protected)
router.put('/', authenticateToken, (req, res) => {
  try {
    const {
      full_name, headline, tagline, bio, email, phone, location,
      avatar_url, resume_url, github_url, linkedin_url, twitter_url, leetcode_url,
      cgpa, degree, institution, years_experience, availability_status
    } = req.body;

    const existing = db.prepare('SELECT id FROM profile ORDER BY id ASC LIMIT 1').get();

    if (existing) {
      db.prepare(`
        UPDATE profile SET
          full_name = ?, headline = ?, tagline = ?, bio = ?, email = ?, phone = ?, location = ?,
          avatar_url = ?, resume_url = ?, github_url = ?, linkedin_url = ?, twitter_url = ?, leetcode_url = ?,
          cgpa = ?, degree = ?, institution = ?, years_experience = ?, availability_status = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(
        full_name, headline, tagline, bio, email, phone, location,
        avatar_url, resume_url, github_url, linkedin_url, twitter_url, leetcode_url,
        cgpa, degree, institution, years_experience, availability_status,
        existing.id
      );
    } else {
      db.prepare(`
        INSERT INTO profile (
          full_name, headline, tagline, bio, email, phone, location,
          avatar_url, resume_url, github_url, linkedin_url, twitter_url, leetcode_url,
          cgpa, degree, institution, years_experience, availability_status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        full_name, headline, tagline, bio, email, phone, location,
        avatar_url, resume_url, github_url, linkedin_url, twitter_url, leetcode_url,
        cgpa, degree, institution, years_experience, availability_status
      );
    }

    const updatedProfile = db.prepare('SELECT * FROM profile ORDER BY id ASC LIMIT 1').get();
    return res.json({ success: true, data: updatedProfile, message: 'Profile updated successfully.' });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ success: false, error: 'Failed to update profile.' });
  }
});

export default router;
