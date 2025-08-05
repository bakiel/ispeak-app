const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImages() {
  const imageDir = path.join(__dirname, '..', 'public', 'images', 'generated');
  
  try {
    const files = await fs.readdir(imageDir);
    const jpgFiles = files.filter(file => file.endsWith('.jpg'));
    
    console.log('🖼️  Optimizing images...\n');
    
    for (const file of jpgFiles) {
      const inputPath = path.join(imageDir, file);
      const stats = await fs.stat(inputPath);
      const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
      
      console.log(`📸 ${file} (${sizeMB}MB)`);
      
      // Skip if already optimized (less than 200KB)
      if (stats.size < 200 * 1024) {
        console.log('   ✅ Already optimized\n');
        continue;
      }
      
      // Optimize the image
      const tempPath = inputPath + '.tmp';
      
      await sharp(inputPath)
        .resize(1200, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .jpeg({ 
          quality: 85,
          progressive: true,
          mozjpeg: true
        })
        .toFile(tempPath);
      
      // Replace original with optimized version
      await fs.unlink(inputPath);
      await fs.rename(tempPath, inputPath);
      
      const newStats = await fs.stat(inputPath);
      const newSizeMB = (newStats.size / 1024 / 1024).toFixed(2);
      const reduction = ((1 - newStats.size / stats.size) * 100).toFixed(1);
      
      console.log(`   ✅ Optimized to ${newSizeMB}MB (-${reduction}%)\n`);
    }
    
    console.log('✨ Image optimization complete!');
    
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

optimizeImages();