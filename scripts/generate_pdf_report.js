import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const markdownPath = path.join(__dirname, '../PROJECT_REPORT.md');
const outputPath = path.join(__dirname, '../project_report.html');

console.log('📄 Generating printable Project Report HTML...');

const mdContent = fs.readFileSync(markdownPath, 'utf8');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Project Report - Garvit Kaurav Personal Portfolio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@600;800&family=JetBrains+Mono&display=swap" rel="stylesheet">
  <style>
    @page { margin: 20mm; size: A4; }
    body {
      font-family: 'Inter', sans-serif;
      line-height: 1.65;
      color: #1e293b;
      max-width: 850px;
      margin: 0 auto;
      padding: 40px 20px;
      background: #fff;
    }
    h1, h2, h3, h4 { font-family: 'Outfit', sans-serif; color: #0f172a; }
    h1 { font-size: 2.2rem; border-bottom: 3px solid #0284c7; padding-bottom: 12px; margin-bottom: 24px; text-align: center; }
    h2 { font-size: 1.4rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-top: 32px; color: #0369a1; }
    h3 { font-size: 1.1rem; margin-top: 20px; }
    table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 0.9rem; }
    th, td { border: 1px solid #cbd5e1; padding: 10px 14px; text-align: left; }
    th { background: #f1f5f9; font-weight: 700; }
    code { font-family: 'JetBrains Mono', monospace; background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 0.88em; }
    pre { background: #0f172a; color: #f8fafc; padding: 16px; border-radius: 8px; overflow-x: auto; font-size: 0.85rem; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 9999px; font-size: 0.8rem; font-weight: 600; background: #e0f2fe; color: #0284c7; }
    .print-btn {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 10px 20px;
      background: #0284c7;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);
    }
    @media print {
      .print-btn { display: none; }
      body { padding: 0; max-width: 100%; }
    }
  </style>
</head>
<body>
  <button class="print-btn" onclick="window.print()">🖨️ Print to PDF</button>
  <div style="text-align: center; margin-bottom: 30px;">
    <span class="badge">OFFICIAL TECHNICAL PROJECT DELIVERABLE</span>
  </div>
  <div style="white-space: pre-wrap; font-family: inherit;">
${mdContent.replace(/```/g, '---')}
  </div>
</body>
</html>`;

fs.writeFileSync(outputPath, htmlContent, 'utf8');
console.log('✅ Generated printable project report HTML at:', outputPath);
