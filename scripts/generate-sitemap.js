const fs = require('fs');
const path = require('path');

const domain = process.argv[2] || process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://vishmithsuranjaya.dev';
const pages = [
  '/',
  '/projects',
  '/certifications',
  '/contact'
];

const now = new Date().toISOString();

const urls = pages.map(p => `  <url>\n    <loc>${domain.replace(/\/$/, '')}${p}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
fs.writeFileSync(path.join(publicDir, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${domain.replace(/\/$/, '')}/sitemap.xml\n`, 'utf8');
console.log('Wrote public/sitemap.xml and public/robots.txt for', domain);
