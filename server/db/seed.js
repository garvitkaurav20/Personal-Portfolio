import bcrypt from 'bcryptjs';
import { db, initDB } from './database.js';

export function seedData() {
  initDB();

  console.log('🌱 Seeding database with Garvit Kaurav resume data...');

  // 1. Admin User
  const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get('admin@garvit.dev');
  if (!existingUser) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('Admin@12345', salt);
    db.prepare(`
      INSERT INTO users (email, username, password_hash, full_name, role)
      VALUES (?, ?, ?, ?, ?)
    `).run('admin@garvit.dev', 'admin', hash, 'Garvit Kaurav', 'admin');
    console.log('✅ Admin user created: admin@garvit.dev / Admin@12345');
  }

  // Also insert/ensure Garvit's personal email as alternate login
  const existingPersonal = db.prepare('SELECT id FROM users WHERE email = ?').get('garvitkaurav@gmail.com');
  if (!existingPersonal) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('Admin@12345', salt);
    db.prepare(`
      INSERT INTO users (email, username, password_hash, full_name, role)
      VALUES (?, ?, ?, ?, ?)
    `).run('garvitkaurav@gmail.com', 'garvit', hash, 'Garvit Kaurav', 'admin');
  }

  // 2. Profile Details
  const profileCount = db.prepare('SELECT COUNT(*) as count FROM profile').get().count;
  if (profileCount === 0) {
    db.prepare(`
      INSERT INTO profile (
        full_name, headline, tagline, bio, email, phone, location,
        avatar_url, resume_url, github_url, linkedin_url, twitter_url, leetcode_url,
        cgpa, degree, institution, years_experience, availability_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'Garvit Kaurav',
      'AI & Software Engineer | Full-Stack Developer | Data Analyst',
      'Specializing in Artificial Intelligence, Machine Learning pipelines, optimized database architectures, and modern web applications.',
      'Passionate Computer Science & Engineering student specializing in Artificial Intelligence at Galgotias College of Engineering and Technology (CGPA 7.68). Experienced in building robust Machine Learning pipelines, relational database architectures, and responsive full-stack applications. Proven leader directing technical societies and major college summits (GIMUN, GIH, Unifest) with expertise spanning Python, Java, SQL, Cyber Security, and GenAI Prompt Engineering.',
      'garvitkaurav@gmail.com',
      '+91 8376853268',
      'Greater Noida / Gurugram, India',
      '/uploads/avatar.png',
      '/uploads/Garvit_Kaurav_Resume.pdf',
      'https://github.com/garvitkaurav',
      'https://linkedin.com/in/garvitkaurav',
      'https://twitter.com/garvitkaurav',
      'https://leetcode.com/garvitkaurav',
      '7.68',
      'B.Tech in Computer Science and Engineering (Artificial Intelligence)',
      'Galgotias College of Engineering and Technology',
      '2+ Years Academic & Internship Experience',
      'Open for Full-Time Roles & Internships'
    );
    console.log('✅ Profile information seeded.');
  }

  // 3. Skills
  const skillsCount = db.prepare('SELECT COUNT(*) as count FROM skills').get().count;
  if (skillsCount === 0) {
    const skills = [
      // Languages
      { name: 'Python', category: 'Languages', proficiency: 95, icon: 'Code2', is_featured: 1, order_index: 1 },
      { name: 'SQL', category: 'Languages', proficiency: 92, icon: 'Database', is_featured: 1, order_index: 2 },
      { name: 'Java', category: 'Languages', proficiency: 85, icon: 'Coffee', is_featured: 1, order_index: 3 },
      { name: 'JavaScript', category: 'Languages', proficiency: 88, icon: 'FileCode', is_featured: 1, order_index: 4 },
      { name: 'HTML5 & CSS3', category: 'Languages', proficiency: 94, icon: 'Layout', is_featured: 1, order_index: 5 },

      // Platforms
      { name: 'MySQL / SQLite', category: 'Platforms', proficiency: 92, icon: 'Server', is_featured: 1, order_index: 6 },
      { name: 'PyCharm & VS Code', category: 'Platforms', proficiency: 90, icon: 'Terminal', is_featured: 1, order_index: 7 },
      { name: 'MS Excel (Advanced)', category: 'Platforms', proficiency: 92, icon: 'Table', is_featured: 1, order_index: 8 },
      { name: 'Power BI', category: 'Platforms', proficiency: 82, icon: 'BarChart3', is_featured: 1, order_index: 9 },
      { name: 'Canva (Graphic Design)', category: 'Platforms', proficiency: 88, icon: 'Palette', is_featured: 1, order_index: 10 },

      // Tools & ML
      { name: 'Data Visualization (Seaborn/Matplotlib)', category: 'Tools', proficiency: 90, icon: 'LineChart', is_featured: 1, order_index: 11 },
      { name: 'Statistical Analysis', category: 'Tools', proficiency: 88, icon: 'PieChart', is_featured: 1, order_index: 12 },
      { name: 'Pandas & NumPy', category: 'Tools', proficiency: 94, icon: 'Cpu', is_featured: 1, order_index: 13 },
      { name: 'Scikit-learn', category: 'Tools', proficiency: 90, icon: 'Brain', is_featured: 1, order_index: 14 },
      { name: 'Cisco Packet Tracer', category: 'Tools', proficiency: 84, icon: 'Network', is_featured: 1, order_index: 15 },
      { name: 'Git & GitHub', category: 'Tools', proficiency: 88, icon: 'GitBranch', is_featured: 1, order_index: 16 },

      // Coursework
      { name: 'Data Structures & Algorithms (DSA)', category: 'Coursework', proficiency: 88, icon: 'Binary', is_featured: 1, order_index: 17 },
      { name: 'Design & Analysis of Algorithms (DAA)', category: 'Coursework', proficiency: 86, icon: 'Network', is_featured: 1, order_index: 18 },
      { name: 'Database Management Systems (DBMS)', category: 'Coursework', proficiency: 94, icon: 'Database', is_featured: 1, order_index: 19 },
      { name: 'Operating Systems (OS)', category: 'Coursework', proficiency: 85, icon: 'HardDrive', is_featured: 1, order_index: 20 },
      { name: 'Software Engineering', category: 'Coursework', proficiency: 90, icon: 'Layers', is_featured: 1, order_index: 21 },
      { name: 'Software Project Management', category: 'Coursework', proficiency: 88, icon: 'Kanban', is_featured: 1, order_index: 22 },

      // Soft Skills
      { name: 'Problem Solving & Critical Thinking', category: 'Soft Skills', proficiency: 95, icon: 'Lightbulb', is_featured: 1, order_index: 23 },
      { name: 'Team Leadership & Project Management', category: 'Soft Skills', proficiency: 92, icon: 'Users', is_featured: 1, order_index: 24 },
      { name: 'Communication & Technical Writing', category: 'Soft Skills', proficiency: 90, icon: 'MessageSquare', is_featured: 1, order_index: 25 },
      { name: 'Search Engine Optimization (SEO)', category: 'Soft Skills', proficiency: 85, icon: 'TrendingUp', is_featured: 1, order_index: 26 }
    ];

    const insertSkill = db.prepare(`
      INSERT INTO skills (name, category, proficiency, icon, is_featured, order_index)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    for (const s of skills) {
      insertSkill.run(s.name, s.category, s.proficiency, s.icon, s.is_featured, s.order_index);
    }
    console.log('✅ Skills data seeded.');
  }

  // 4. Projects
  const projectsCount = db.prepare('SELECT COUNT(*) as count FROM projects').get().count;
  if (projectsCount === 0) {
    const projects = [
      {
        title: 'Fraud Transaction Detection',
        subtitle: 'Machine Learning & High-Throughput Data Pipeline',
        description: 'End-to-end machine learning system for processing large-scale financial transaction datasets and detecting fraudulent activities in real-time. Built robust preprocessing, feature engineering, and model benchmarking pipelines comparing Random Forest, Logistic Regression, Decision Trees, and Neural Networks.',
        category: 'Machine Learning & AI',
        tags: 'Machine Learning, Python, Scikit-learn, Anomaly Detection, Neural Networks, Pandas',
        tools: 'Python, Pandas, Scikit-learn, NumPy, Matplotlib, Seaborn',
        github_url: 'https://github.com/garvitkaurav/fraud-transaction-detection',
        live_url: 'https://fraud-detection-demo.garvit.dev',
        image_url: '/images/fraud-detection.png',
        metrics: '98.4% ROC-AUC • Optimized Big-Data Pipeline',
        is_featured: 1,
        order_index: 1
      },
      {
        title: 'Personal Expense Tracker',
        subtitle: 'Full-Stack Web App with Optimized Relational DBMS',
        description: 'Web-based financial management system leveraging relational DBMS concepts for secure storage, budgeting, and transaction analytics. Implemented normalized SQL schemas with optimized queries to efficiently handle multi-category expenses and deliver real-time aggregated insights with visual interactive charts.',
        category: 'Full-Stack Web',
        tags: 'HTML5, CSS3, JavaScript, MySQL, DBMS, Relational Schema, Chart.js',
        tools: 'HTML, CSS, JavaScript, MySQL, Express, Chart.js',
        github_url: 'https://github.com/garvitkaurav/personal-expense-tracker',
        live_url: 'https://expense-tracker.garvit.dev',
        image_url: '/images/expense-tracker.png',
        metrics: 'Sub-50ms DB Query Latency • Real-time Charts',
        is_featured: 1,
        order_index: 2
      },
      {
        title: 'Network Security & Threat Countermeasures Lab',
        subtitle: 'Vulnerability Assessment & CIA Triad Simulation',
        description: 'Comprehensive network security simulation testing defensive architectures, vulnerability surface mapping, threat detection mechanisms, and packet inspection against CIA triad principles in enterprise topologies.',
        category: 'Cybersecurity',
        tags: 'Cisco Packet Tracer, Network Security, CIA Triad, Threat Countermeasures, Protocols',
        tools: 'Cisco Packet Tracer, Wireshark, Security Topologies',
        github_url: 'https://github.com/garvitkaurav/cisco-cybersecurity-lab',
        live_url: 'https://security-lab.garvit.dev',
        image_url: '/images/cybersecurity.png',
        metrics: 'Zero-Trust Topology • Defensive Countermeasures',
        is_featured: 1,
        order_index: 3
      },
      {
        title: 'Interactive Portfolio & Dynamic CMS Engine',
        subtitle: 'Responsive Full-Stack Application with Admin Controls',
        description: 'Modern full-stack portfolio platform built with React, Node.js, and SQLite. Features JWT-secured dynamic admin controls, real-time message notifications, visitor analytics, automated project report generation, and glassmorphic responsive UI.',
        category: 'Full-Stack Web',
        tags: 'React, Node.js, Express, SQLite, JWT Auth, Glassmorphism, PDF Generator',
        tools: 'React, Vite, Express, SQLite, Lucide Icons, Modern CSS',
        github_url: 'https://github.com/garvitkaurav/personal-portfolio',
        live_url: 'https://garvitkaurav.dev',
        image_url: '/images/portfolio-cms.png',
        metrics: '100% Responsive • Full Dynamic CRUD Admin',
        is_featured: 1,
        order_index: 4
      }
    ];

    const insertProject = db.prepare(`
      INSERT INTO projects (
        title, subtitle, description, category, tags, tools,
        github_url, live_url, image_url, metrics, is_featured, order_index
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const p of projects) {
      insertProject.run(
        p.title, p.subtitle, p.description, p.category, p.tags, p.tools,
        p.github_url, p.live_url, p.image_url, p.metrics, p.is_featured, p.order_index
      );
    }
    console.log('✅ Projects data seeded.');
  }

  // 5. Experiences / Internships
  const expCount = db.prepare('SELECT COUNT(*) as count FROM experiences').get().count;
  if (expCount === 0) {
    const experiences = [
      {
        role: 'Cybersecurity Analyst Trainee',
        company: 'Cisco Networking Academy',
        duration: 'October 2025',
        start_date: 'Oct 2025',
        end_date: 'Oct 2025',
        location: 'Virtual / Remote',
        description: 'Trained on modern enterprise cybersecurity principles, vulnerability identification, and mitigation countermeasures.',
        highlights: JSON.stringify([
          'Assisted in identifying network vulnerabilities and evaluating cybersecurity risk profiles across simulated infrastructure.',
          'Gained hands-on experience on core cybersecurity principles such as the CIA triad, threat detection vectors, and incident countermeasures.',
          'Follow-ups – Ensured timely follow-ups with potential and existing clients to address risk queries and compliance steps.',
          'Supported complex simulation exercises and network topology designs in Cisco Packet Tracer.'
        ]),
        type: 'Internship',
        order_index: 1
      },
      {
        role: 'Machine Learning Intern',
        company: 'Softpro India',
        duration: 'June 2025 - August 2025',
        start_date: 'Jun 2025',
        end_date: 'Aug 2025',
        location: 'Lucknow / Remote',
        description: 'Engaged in applied Machine Learning workflows, feature engineering, and model validation using Python and Scikit-learn.',
        highlights: JSON.stringify([
          'Learned and implemented the fundamentals of Machine Learning algorithms such as Linear Regression, Logistic Regression, Decision Trees, and Classification techniques.',
          'Engineered and transformed datasets with Python scientific libraries including NumPy and Pandas for optimal feature representation.',
          'Gained extensive hands-on experience with Scikit-learn for supervised model training, hyperparameter tuning, testing, and performance evaluation.'
        ]),
        type: 'Internship',
        order_index: 2
      }
    ];

    const insertExp = db.prepare(`
      INSERT INTO experiences (role, company, duration, start_date, end_date, location, description, highlights, type, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const e of experiences) {
      insertExp.run(e.role, e.company, e.duration, e.start_date, e.end_date, e.location, e.description, e.highlights, e.type, e.order_index);
    }
    console.log('✅ Experiences & Internships seeded.');
  }

  // 6. Education
  const eduCount = db.prepare('SELECT COUNT(*) as count FROM education').get().count;
  if (eduCount === 0) {
    const educationList = [
      {
        degree: 'Bachelor of Technology (B.Tech)',
        institution: 'Galgotias College of Engineering and Technology',
        field_of_study: 'Computer Science and Engineering (Artificial Intelligence)',
        grade_or_cgpa: 'CGPA: 7.68',
        duration: '2023 - 2027',
        location: 'Greater Noida, Uttar Pradesh',
        details: 'Specialization in Artificial Intelligence, Deep Learning, Relational DBMS, Data Structures & Algorithms, and Software Engineering.',
        order_index: 1
      },
      {
        degree: 'Senior Secondary (Class XII) - CBSE',
        institution: "St. Crispin's Sr. Sec. School",
        field_of_study: 'Central Board of Secondary Education (CBSE)',
        grade_or_cgpa: 'Percentage: 73%',
        duration: '2021 - 2022',
        location: 'Gurugram, Haryana',
        details: 'Core subjects: Physics, Chemistry, Mathematics, Computer Science, and English.',
        order_index: 2
      },
      {
        degree: 'Secondary School (Class X) - CBSE',
        institution: "St. Crispin's Sr. Sec. School",
        field_of_study: 'Central Board of Secondary Education (CBSE)',
        grade_or_cgpa: 'Percentage: 83.66%',
        duration: '2019 - 2020',
        location: 'Gurugram, Haryana',
        details: 'Distinction in Science, Mathematics, and Information Technology fundamentals.',
        order_index: 3
      }
    ];

    const insertEdu = db.prepare(`
      INSERT INTO education (degree, institution, field_of_study, grade_or_cgpa, duration, location, details, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const ed of educationList) {
      insertEdu.run(ed.degree, ed.institution, ed.field_of_study, ed.grade_or_cgpa, ed.duration, ed.location, ed.details, ed.order_index);
    }
    console.log('✅ Education history seeded.');
  }

  // 7. Achievements & Leadership
  const achCount = db.prepare('SELECT COUNT(*) as count FROM achievements').get().count;
  if (achCount === 0) {
    const achievements = [
      {
        title: 'Club Head & Deputy Secretary',
        role: 'Club Head (Administrative Society) & Deputy Secretary (CSE AI)',
        organization: 'Galgotias College of Engineering & Technology',
        description: 'Served as the Club Head of the Administrative society of the college and as Deputy Secretary in the CSE AI Department, coordinating academic symposiums and departmental governance.',
        date_or_year: '2024 - Present',
        icon: 'ShieldCheck',
        order_index: 1
      },
      {
        title: 'Technical Societies Leader',
        role: 'Lead & Core Member (GFGSC, GDG, InfoSec Diary)',
        organization: 'GeeksforGeeks Student Chapter, GDG, InfoSec Diary',
        description: 'Led Technical Societies (GFGSC, GDG, InfoSec Diary) driving digital presence, technical workshops, editorial publications, and student cybersecurity initiatives.',
        date_or_year: '2023 - Present',
        icon: 'Code2',
        order_index: 2
      },
      {
        title: 'Director of Mega Events (GIMUN, GIH, Unifest)',
        role: 'Event Director & Logistics Lead',
        organization: 'GIMUN’25, GIH’25, Unifest’26',
        description: 'Directed GIMUN’25, GIH’25, and Unifest’26, managing cross-functional logistics, crisis response, and large-scale execution for thousands of participants.',
        date_or_year: '2025 - 2026',
        icon: 'Award',
        order_index: 3
      }
    ];

    const insertAch = db.prepare(`
      INSERT INTO achievements (title, role, organization, description, date_or_year, icon, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    for (const a of achievements) {
      insertAch.run(a.title, a.role, a.organization, a.description, a.date_or_year, a.icon, a.order_index);
    }
    console.log('✅ Achievements & Leadership seeded.');
  }

  // 8. Certifications
  const certCount = db.prepare('SELECT COUNT(*) as count FROM certifications').get().count;
  if (certCount === 0) {
    const certifications = [
      {
        title: 'Data Analytics and Visualization',
        issuer: 'Accenture North America',
        issue_date: '2025',
        credential_url: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Accenture%20North%20America/Data%20Analytics.pdf',
        badge_image: '/badges/accenture.png',
        category: 'Data Analytics',
        order_index: 1
      },
      {
        title: 'Cybersecurity Job Simulation',
        issuer: 'MasterCard',
        issue_date: '2025',
        credential_url: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Mastercard/Cybersecurity.pdf',
        badge_image: '/badges/mastercard.png',
        category: 'Cybersecurity',
        order_index: 2
      },
      {
        title: 'GenAI Prompt Engineering',
        issuer: 'Google',
        issue_date: '2025',
        credential_url: 'https://cloud.google.com/training/badges',
        badge_image: '/badges/google.png',
        category: 'Artificial Intelligence',
        order_index: 3
      },
      {
        title: 'Python Language Specialization',
        issuer: 'YouTube / Open Learning',
        issue_date: '2024',
        credential_url: 'https://youtube.com',
        badge_image: '/badges/python.png',
        category: 'Programming',
        order_index: 4
      },
      {
        title: 'Power BI Business Intelligence',
        issuer: 'YouTube / Microsoft Ecosystem',
        issue_date: '2025',
        credential_url: 'https://youtube.com',
        badge_image: '/badges/powerbi.png',
        category: 'Data Analytics',
        order_index: 5
      },
      {
        title: 'Search Engine Optimization (SEO)',
        issuer: 'Udemy',
        issue_date: '2024',
        credential_url: 'https://udemy.com/certificate',
        badge_image: '/badges/udemy.png',
        category: 'Digital Strategy',
        order_index: 6
      }
    ];

    const insertCert = db.prepare(`
      INSERT INTO certifications (title, issuer, issue_date, credential_url, badge_image, category, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    for (const c of certifications) {
      insertCert.run(c.title, c.issuer, c.issue_date, c.credential_url, c.badge_image, c.category, c.order_index);
    }
    console.log('✅ Certifications seeded.');
  }

  // 9. Sample initial messages for Admin Inbox demo
  const msgCount = db.prepare('SELECT COUNT(*) as count FROM messages').get().count;
  if (msgCount === 0) {
    db.prepare(`
      INSERT INTO messages (name, email, subject, message, phone, is_read, is_starred, reply_status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'HR Talent Acquisition',
      'recruiter@techventures.com',
      'Interview Invitation: Machine Learning & AI Engineer',
      'Hi Garvit, we reviewed your Fraud Detection project and CSE (AI) credentials from Galgotias College. We would love to invite you for a technical discussion regarding an AI Developer role.',
      '+91 9876543210',
      0,
      1,
      'Unanswered'
    );
    console.log('✅ Initial message seeded.');
  }

  console.log('🎉 Database seeding complete!');
}

// If run directly via node
if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  seedData();
  process.exit(0);
}
