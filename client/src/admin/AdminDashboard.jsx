import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  User,
  Cpu,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Trophy,
  Award,
  MessageSquare,
  Lock,
  LogOut,
  ExternalLink,
  Eye,
  Sparkles,
  Sun,
  Moon,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { api } from '../services/api';
import { useToast } from '../components/Toast';

import ProfileManager from './tabs/ProfileManager';
import SkillsManager from './tabs/SkillsManager';
import ProjectsManager from './tabs/ProjectsManager';
import ExperienceManager from './tabs/ExperienceManager';
import EducationManager from './tabs/EducationManager';
import AchievementsManager from './tabs/AchievementsManager';
import CertificationsManager from './tabs/CertificationsManager';
import MessagesManager from './tabs/MessagesManager';
import SecurityManager from './tabs/SecurityManager';

export default function AdminDashboard({ onClose, onDataChange }) {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [
        statsRes,
        profRes,
        skillsRes,
        projRes,
        expRes,
        eduRes,
        achRes,
        certRes,
        msgRes
      ] = await Promise.all([
        api.getAnalyticsStats().catch(() => ({ data: {} })),
        api.getProfile().catch(() => ({ data: null })),
        api.getSkills().catch(() => ({ data: [] })),
        api.getProjects().catch(() => ({ data: [] })),
        api.getExperiences().catch(() => ({ data: [] })),
        api.getEducation().catch(() => ({ data: [] })),
        api.getAchievements().catch(() => ({ data: [] })),
        api.getCertifications().catch(() => ({ data: [] })),
        api.getMessages().catch(() => ({ data: [] })),
      ]);

      if (statsRes.success) setStats(statsRes.data);
      if (profRes.success) setProfile(profRes.data);
      if (skillsRes.success) setSkills(skillsRes.data);
      if (projRes.success) setProjects(projRes.data);
      if (expRes.success) setExperiences(expRes.data);
      if (eduRes.success) setEducation(eduRes.data);
      if (achRes.success) setAchievements(achRes.data);
      if (certRes.success) setCertifications(certRes.data);
      if (msgRes.success) setMessages(msgRes.data);

      onDataChange?.();
    } catch (err) {
      console.error('Error fetching admin data:', err);
      addToast('Failed to load some dashboard data.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleLogout = () => {
    logout();
    addToast('Logged out of Admin Dashboard', 'info');
    onClose();
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: <LayoutDashboard size={17} /> },
    { id: 'profile', name: 'Profile & Bio', icon: <User size={17} /> },
    { id: 'skills', name: 'Skills Matrix', icon: <Cpu size={17} />, count: skills.length },
    { id: 'projects', name: 'Projects', icon: <FolderGit2 size={17} />, count: projects.length },
    { id: 'experience', name: 'Internships', icon: <Briefcase size={17} />, count: experiences.length },
    { id: 'education', name: 'Education', icon: <GraduationCap size={17} />, count: education.length },
    { id: 'achievements', name: 'Achievements', icon: <Trophy size={17} />, count: achievements.length },
    { id: 'certifications', name: 'Certifications', icon: <Award size={17} />, count: certifications.length },
    { id: 'messages', name: 'Inquiries', icon: <MessageSquare size={17} />, count: messages.filter(m => !m.is_read).length, isBadge: true },
    { id: 'security', name: 'Security', icon: <Lock size={17} /> },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2800,
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Top Header Bar */}
      <header
        style={{
          padding: '0.8rem 2rem',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'var(--bg-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'var(--gradient-primary)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
            }}
          >
            GK
          </div>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Portfolio Admin Studio</h2>
            <p style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)' }}>
              Logged in as {user?.email || 'admin@garvit.dev'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <button
            onClick={fetchAllData}
            className="btn btn-secondary btn-icon"
            style={{ width: '36px', height: '36px' }}
            title="Refresh Data"
          >
            <RefreshCw size={15} />
          </button>

          <button
            onClick={toggleTheme}
            className="btn btn-secondary btn-icon"
            style={{ width: '36px', height: '36px' }}
          >
            {isDark ? <Sun size={15} color="#f59e0b" /> : <Moon size={15} color="#6366f1" />}
          </button>

          <button onClick={onClose} className="btn btn-secondary btn-sm">
            <Eye size={15} />
            <span>View Live Portfolio</span>
          </button>

          <button onClick={handleLogout} className="btn btn-outline btn-sm" style={{ color: '#ef4444' }}>
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Body */}
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', flex: 1, overflow: 'hidden' }} className="admin-body-grid">
        {/* Sidebar Nav */}
        <aside
          style={{
            background: 'var(--bg-secondary)',
            borderRight: '1px solid var(--border-subtle)',
            padding: '1.2rem 0.8rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
            overflowY: 'auto',
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 0.9rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: isActive ? 'var(--gradient-primary)' : 'transparent',
                  color: isActive ? '#fff' : 'var(--text-secondary)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  {tab.icon}
                  <span>{tab.name}</span>
                </div>
                {tab.count !== undefined && (
                  <span
                    style={{
                      fontSize: '0.72rem',
                      padding: '0.15rem 0.45rem',
                      borderRadius: '10px',
                      background: tab.isBadge && tab.count > 0 ? '#ef4444' : 'rgba(255, 255, 255, 0.12)',
                      color: '#fff',
                      fontWeight: 700,
                    }}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Workspace Content Area */}
        <main style={{ padding: '2rem', overflowY: 'auto', background: 'var(--bg-primary)' }}>
          {activeTab === 'overview' && (
            <div>
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
                  Welcome back, <span className="text-gradient">Garvit</span>
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Here is a high-level summary of your portfolio traffic, projects, and contact inquiries.
                </p>
              </div>

              {/* Stats Metrics Grid */}
              <div className="grid-4" style={{ gap: '1.2rem', marginBottom: '2rem' }}>
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL VISITS</div>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent-cyan)', margin: '0.4rem 0' }}>
                    {stats?.totalVisits || 142}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Unique Visitors: {stats?.uniqueVisitors || 87}</div>
                </div>

                <div className="glass-card" style={{ padding: '1.5rem' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>PROJECTS PUBLISHED</div>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent-purple)', margin: '0.4rem 0' }}>
                    {projects.length}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Across ML, Web & Security</div>
                </div>

                <div className="glass-card" style={{ padding: '1.5rem' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>SKILLS LISTED</div>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent-blue)', margin: '0.4rem 0' }}>
                    {skills.length}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Languages, Platforms & Tools</div>
                </div>

                <div className="glass-card" style={{ padding: '1.5rem' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>MESSAGES INBOX</div>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: '#10b981', margin: '0.4rem 0' }}>
                    {messages.length}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 600 }}>
                    {messages.filter(m => !m.is_read).length} Unread inquiries
                  </div>
                </div>
              </div>

              {/* Quick Actions & Recent Messages Preview */}
              <div className="grid-2" style={{ gap: '1.5rem' }}>
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
                    Recent Inquiries
                  </h4>
                  {messages.length === 0 ? (
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No messages yet.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                      {messages.slice(0, 3).map((m) => (
                        <div
                          key={m.id}
                          style={{
                            padding: '0.8rem',
                            borderRadius: '10px',
                            background: 'var(--bg-tertiary)',
                            fontSize: '0.85rem',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                            <span>{m.name}</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>{m.email}</span>
                          </div>
                          <p style={{ color: 'var(--text-secondary)', marginTop: '0.2rem', fontSize: '0.82rem' }}>
                            {m.subject}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="glass-card" style={{ padding: '1.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
                    Quick Shortcuts
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <button onClick={() => setActiveTab('projects')} className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                      <FolderGit2 size={16} />
                      <span>Add / Manage Featured Projects</span>
                    </button>
                    <button onClick={() => setActiveTab('skills')} className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                      <Cpu size={16} />
                      <span>Update Technical Skills Matrix</span>
                    </button>
                    <button onClick={() => setActiveTab('messages')} className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                      <MessageSquare size={16} />
                      <span>Review & Reply to Contact Inquiries</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && <ProfileManager profile={profile} onUpdate={fetchAllData} />}
          {activeTab === 'skills' && <SkillsManager skills={skills} onRefresh={fetchAllData} />}
          {activeTab === 'projects' && <ProjectsManager projects={projects} onRefresh={fetchAllData} />}
          {activeTab === 'experience' && <ExperienceManager experiences={experiences} onRefresh={fetchAllData} />}
          {activeTab === 'education' && <EducationManager education={education} onRefresh={fetchAllData} />}
          {activeTab === 'achievements' && <AchievementsManager achievements={achievements} onRefresh={fetchAllData} />}
          {activeTab === 'certifications' && <CertificationsManager certifications={certifications} onRefresh={fetchAllData} />}
          {activeTab === 'messages' && <MessagesManager messages={messages} onRefresh={fetchAllData} />}
          {activeTab === 'security' && <SecurityManager />}
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .admin-body-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
