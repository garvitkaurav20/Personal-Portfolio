-- Database Schema for Garvit Kaurav Full-Stack Portfolio
-- SQLite 3 compatible schema

-- 1. Users Table (Admin Authentication)
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Profile Details Table
CREATE TABLE IF NOT EXISTS profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    headline TEXT NOT NULL,
    tagline TEXT,
    bio TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    location TEXT NOT NULL,
    avatar_url TEXT,
    resume_url TEXT,
    github_url TEXT,
    linkedin_url TEXT,
    twitter_url TEXT,
    leetcode_url TEXT,
    cgpa TEXT,
    degree TEXT,
    institution TEXT,
    years_experience TEXT,
    availability_status TEXT DEFAULT 'Open for Opportunities',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Skills Table
CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- 'Languages', 'Platforms', 'Tools', 'Coursework', 'Soft Skills'
    proficiency INTEGER DEFAULT 85, -- Percentage 0-100
    icon TEXT, -- Lucide icon identifier or emoji
    is_featured INTEGER DEFAULT 1, -- 1 for true, 0 for false
    order_index INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT NOT NULL,
    category TEXT NOT NULL, -- 'Machine Learning & AI', 'Full-Stack Web', 'Data Analytics', 'Cybersecurity'
    tags TEXT NOT NULL, -- Comma-separated or JSON string
    tools TEXT NOT NULL, -- Comma-separated or JSON string
    github_url TEXT,
    live_url TEXT,
    image_url TEXT,
    metrics TEXT, -- e.g. "98.2% Accuracy", "Real-time query optimization"
    is_featured INTEGER DEFAULT 1,
    order_index INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 5. Experiences / Internships Table
CREATE TABLE IF NOT EXISTS experiences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    duration TEXT NOT NULL,
    start_date TEXT,
    end_date TEXT,
    location TEXT,
    description TEXT,
    highlights TEXT NOT NULL, -- JSON array of bullet points
    type TEXT DEFAULT 'Internship', -- 'Internship', 'Full-Time', 'Part-Time', 'Leadership'
    order_index INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 6. Education Table
CREATE TABLE IF NOT EXISTS education (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    degree TEXT NOT NULL,
    institution TEXT NOT NULL,
    field_of_study TEXT,
    grade_or_cgpa TEXT NOT NULL,
    duration TEXT NOT NULL,
    location TEXT NOT NULL,
    details TEXT,
    order_index INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 7. Achievements & Leadership Table
CREATE TABLE IF NOT EXISTS achievements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    role TEXT,
    organization TEXT,
    description TEXT NOT NULL,
    date_or_year TEXT NOT NULL,
    icon TEXT DEFAULT 'Trophy',
    order_index INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 8. Certifications Table
CREATE TABLE IF NOT EXISTS certifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issue_date TEXT,
    credential_url TEXT,
    badge_image TEXT,
    category TEXT DEFAULT 'Technical',
    order_index INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 9. Contact Inquiries / Messages Table
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    phone TEXT,
    is_read INTEGER DEFAULT 0,
    is_starred INTEGER DEFAULT 0,
    reply_status TEXT DEFAULT 'Unanswered', -- 'Unanswered', 'Replied', 'Archived'
    reply_notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 10. Analytics / Visits Table
CREATE TABLE IF NOT EXISTS analytics_visits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    page_path TEXT NOT NULL,
    ip_hash TEXT,
    user_agent TEXT,
    visited_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 11. Site Settings Table (Key-Value configuration)
CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
