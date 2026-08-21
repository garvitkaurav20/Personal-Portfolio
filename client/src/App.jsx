import React, { useState, useEffect } from 'react';
import { api } from './services/api';
import { useAuth } from './context/AuthContext';
import { useTheme } from './context/ThemeContext';
import { useToast } from './components/Toast';

import ParticlesBackground from './components/ParticlesBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

import ResumeModal from './components/ResumeModal';
import ProjectReportView from './components/ProjectReportView';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';

export default function App() {
  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();

  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [resumeOpen, setResumeOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);

  const fetchPortfolioData = async () => {
    try {
      setLoading(true);
      const [profRes, skillsRes, projRes, expRes, eduRes, achRes, certRes] = await Promise.all([
        api.getProfile().catch(() => ({ data: null })),
        api.getSkills().catch(() => ({ data: [] })),
        api.getProjects().catch(() => ({ data: [] })),
        api.getExperiences().catch(() => ({ data: [] })),
        api.getEducation().catch(() => ({ data: [] })),
        api.getAchievements().catch(() => ({ data: [] })),
        api.getCertifications().catch(() => ({ data: [] })),
      ]);

      if (profRes.data) setProfile(profRes.data);
      if (skillsRes.data) setSkills(skillsRes.data);
      if (projRes.data) setProjects(projRes.data);
      if (expRes.data) setExperiences(expRes.data);
      if (eduRes.data) setEducation(eduRes.data);
      if (achRes.data) setAchievements(achRes.data);
      if (certRes.data) setCertifications(certRes.data);
    } catch (err) {
      console.error('Error fetching portfolio data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
    // Log visitor analytics
    api.logVisit(window.location.pathname).catch(() => {});
  }, []);

  const handleOpenAdmin = () => {
    if (isAuthenticated) {
      setAdminDashboardOpen(true);
    } else {
      setAdminLoginOpen(true);
    }
  };

  return (
    <div className="portfolio-app" style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Background Interactive Particles Network */}
      <ParticlesBackground />

      {/* Navigation Header */}
      <Navbar
        onOpenReport={() => setReportOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Main Content Sections */}
      <main>
        <Hero
          profile={profile}
          onOpenResume={() => setResumeOpen(true)}
          onOpenReport={() => setReportOpen(true)}
        />
        <About profile={profile} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Experience experiences={experiences} />
        <Education education={education} />
        <Achievements achievements={achievements} />
        <Certifications certifications={certifications} />
        <Contact profile={profile} />
      </main>

      {/* Footer */}
      <Footer
        profile={profile}
        onOpenReport={() => setReportOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Modals */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        profile={profile}
        skills={skills}
        experiences={experiences}
        education={education}
        certifications={certifications}
      />

      <ProjectReportView
        isOpen={reportOpen}
        onClose={() => setReportOpen(false)}
      />

      <AdminLogin
        isOpen={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
        onSuccess={() => setAdminDashboardOpen(true)}
      />

      {adminDashboardOpen && (
        <AdminDashboard
          onClose={() => setAdminDashboardOpen(false)}
          onDataChange={fetchPortfolioData}
        />
      )}
    </div>
  );
}
