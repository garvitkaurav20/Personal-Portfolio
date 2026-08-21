const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api`
  : '/api';

function getAuthHeader() {
  const token = localStorage.getItem('garvit_portfolio_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(endpoint, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...options.headers,
  };

  // If sending FormData (file upload), remove Content-Type so browser sets boundary
  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || `HTTP error ${response.status}`);
  }

  return data;
}

export const api = {
  // Auth
  login: (credentials) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  verifyToken: () => request('/auth/me'),
  changePassword: (data) => request('/auth/change-password', { method: 'POST', body: JSON.stringify(data) }),

  // Profile
  getProfile: () => request('/profile'),
  updateProfile: (profileData) => request('/profile', { method: 'PUT', body: JSON.stringify(profileData) }),

  // Skills
  getSkills: () => request('/skills'),
  createSkill: (skill) => request('/skills', { method: 'POST', body: JSON.stringify(skill) }),
  updateSkill: (id, skill) => request(`/skills/${id}`, { method: 'PUT', body: JSON.stringify(skill) }),
  deleteSkill: (id) => request(`/skills/${id}`, { method: 'DELETE' }),

  // Projects
  getProjects: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/projects${query ? `?${query}` : ''}`);
  },
  getProject: (id) => request(`/projects/${id}`),
  createProject: (project) => request('/projects', { method: 'POST', body: JSON.stringify(project) }),
  updateProject: (id, project) => request(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(project) }),
  deleteProject: (id) => request(`/projects/${id}`, { method: 'DELETE' }),

  // Experiences
  getExperiences: () => request('/experiences'),
  createExperience: (exp) => request('/experiences', { method: 'POST', body: JSON.stringify(exp) }),
  updateExperience: (id, exp) => request(`/experiences/${id}`, { method: 'PUT', body: JSON.stringify(exp) }),
  deleteExperience: (id) => request(`/experiences/${id}`, { method: 'DELETE' }),

  // Education
  getEducation: () => request('/education'),
  createEducation: (edu) => request('/education', { method: 'POST', body: JSON.stringify(edu) }),
  updateEducation: (id, edu) => request(`/education/${id}`, { method: 'PUT', body: JSON.stringify(edu) }),
  deleteEducation: (id) => request(`/education/${id}`, { method: 'DELETE' }),

  // Achievements
  getAchievements: () => request('/achievements'),
  createAchievement: (ach) => request('/achievements', { method: 'POST', body: JSON.stringify(ach) }),
  updateAchievement: (id, ach) => request(`/achievements/${id}`, { method: 'PUT', body: JSON.stringify(ach) }),
  deleteAchievement: (id) => request(`/achievements/${id}`, { method: 'DELETE' }),

  // Certifications
  getCertifications: () => request('/certifications'),
  createCertification: (cert) => request('/certifications', { method: 'POST', body: JSON.stringify(cert) }),
  updateCertification: (id, cert) => request(`/certifications/${id}`, { method: 'PUT', body: JSON.stringify(cert) }),
  deleteCertification: (id) => request(`/certifications/${id}`, { method: 'DELETE' }),

  // Contact Messages
  sendMessage: (msg) => request('/messages', { method: 'POST', body: JSON.stringify(msg) }),
  getMessages: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/messages${query ? `?${query}` : ''}`);
  },
  updateMessage: (id, data) => request(`/messages/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteMessage: (id) => request(`/messages/${id}`, { method: 'DELETE' }),

  // Analytics
  logVisit: (path) => request('/analytics/visit', { method: 'POST', body: JSON.stringify({ path }) }),
  getAnalyticsStats: () => request('/analytics/stats'),

  // File Upload
  uploadFile: (formData) => request('/upload', { method: 'POST', body: formData }),
};
