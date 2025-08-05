#!/usr/bin/env node

/**
 * Script to validate all image URLs in the codebase
 * Ensures all external images are from allowed domains
 */

const fs = require('fs');
const path = require('path');
const { IMAGE_DOMAINS, getImageDomain, isImageDomainAllowed } = require('../lib/imageConfig');

// Patterns to find image URLs
const IMAGE_PATTERNS = [
  /src\s*=\s*["']([^"']+)["']/gi,
  /url\s*:\s*["']([^"']+)["']/gi,
  /image\s*:\s*["']([^"']+)["']/gi,
  /featured_image\s*:\s*["']([^"']+)["']/gi,
  /og_image\s*:\s*["']([^"']+)["']/gi,
];

// File extensions to check
const FILE_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.json'];

// Directories to skip
const SKIP_DIRS = ['node_modules', '.next', '.git', 'dist', 'build'];

function isImageUrl(url) {
  // Common image extensions
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.ico', '.bmp'];
  
  // Check if URL has image extension
  const hasImageExtension = imageExtensions.some(ext => url.toLowerCase().includes(ext));
  
  // Check if it's a known image service
  const imageServices = ['supabase.co/storage', 'fal.media', 'imagekit.io', 'imgbb.com'];
  const isImageService = imageServices.some(service => url.includes(service));
  
  return hasImageExtension || isImageService;
}

function findImageUrls(content) {
  const urls = new Set();
  
  IMAGE_PATTERNS.forEach(pattern => {
    const matches = content.matchAll(pattern);
    for (const match of matches) {
      const url = match[1];
      // Only check external URLs that look like images
      if ((url.startsWith('http://') || url.startsWith('https://')) && isImageUrl(url)) {
        urls.add(url);
      }
    }
  });
  
  return Array.from(urls);
}

function scanDirectory(dirPath, issues = []) {
  const items = fs.readdirSync(dirPath);
  
  items.forEach(item => {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (!SKIP_DIRS.includes(item)) {
        scanDirectory(fullPath, issues);
      }
    } else if (stat.isFile()) {
      const ext = path.extname(fullPath).toLowerCase();
      if (FILE_EXTENSIONS.includes(ext)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const urls = findImageUrls(content);
        
        urls.forEach(url => {
          if (!isImageDomainAllowed(url)) {
            const domain = getImageDomain(url);
            issues.push({
              file: fullPath,
              url,
              domain
            });
          }
        });
      }
    }
  });
  
  return issues;
}

// Run validation
console.log('🔍 Scanning for image URLs...\n');

const projectRoot = path.join(__dirname, '..');
const issues = scanDirectory(projectRoot);

if (issues.length === 0) {
  console.log('✅ All image URLs are from allowed domains!');
  console.log('\nAllowed domains:');
  IMAGE_DOMAINS.forEach(domain => console.log(`  - ${domain}`));
} else {
  console.log(`❌ Found ${issues.length} image(s) from unauthorized domains:\n`);
  
  // Group by domain
  const byDomain = {};
  issues.forEach(issue => {
    if (!byDomain[issue.domain]) {
      byDomain[issue.domain] = [];
    }
    byDomain[issue.domain].push(issue);
  });
  
  Object.entries(byDomain).forEach(([domain, domainIssues]) => {
    console.log(`\n📍 Domain: ${domain} (${domainIssues.length} occurrences)`);
    domainIssues.forEach(issue => {
      const relPath = path.relative(projectRoot, issue.file);
      console.log(`   - ${relPath}`);
      console.log(`     URL: ${issue.url}`);
    });
  });
  
  console.log('\n💡 To fix this:');
  console.log('1. Add the domain(s) to IMAGE_DOMAINS in lib/imageConfig.js');
  console.log('2. Run this script again to verify');
  
  process.exit(1);
}