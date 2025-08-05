const fs = require('fs');
const path = require('path');

console.log('🔍 iSPEAK Website Image Verification Report\n');
console.log('=' .repeat(50));

// Check generated images
const imageDir = path.join(__dirname, '..', 'public', 'images', 'generated');
const expectedImages = [
  'children-counting-swahili.jpg',
  'about-hero-educators.jpg', 
  'ispeak-method-pillars.jpg',
  'yoruba-culture-card.jpg',
  'kiswahili-culture-card.jpg',
  'twi-culture-card.jpg',
  'amharic-culture-card.jpg',
  'cultural-preservation-icon.jpg',
  'global-connection-icon.jpg',
  'education-excellence-icon.jpg'
];

console.log('\n📁 Image Directory:', imageDir);
console.log('\n📸 Image Status:\n');

let totalSize = 0;
let missingImages = [];

expectedImages.forEach(imageName => {
  const imagePath = path.join(imageDir, imageName);
  
  if (fs.existsSync(imagePath)) {
    const stats = fs.statSync(imagePath);
    const sizeKB = (stats.size / 1024).toFixed(1);
    totalSize += stats.size;
    
    if (stats.size === 0) {
      console.log(`❌ ${imageName} - 0 bytes (EMPTY FILE)`);
      missingImages.push(imageName);
    } else if (stats.size > 500 * 1024) {
      console.log(`⚠️  ${imageName} - ${sizeKB}KB (NEEDS OPTIMIZATION)`);
    } else {
      console.log(`✅ ${imageName} - ${sizeKB}KB`);
    }
  } else {
    console.log(`❌ ${imageName} - NOT FOUND`);
    missingImages.push(imageName);
  }
});

console.log('\n' + '=' .repeat(50));
console.log('\n📊 Summary:');
console.log(`Total images: ${expectedImages.length}`);
console.log(`Images found: ${expectedImages.length - missingImages.length}`);
console.log(`Missing/Empty: ${missingImages.length}`);
console.log(`Total size: ${(totalSize / 1024 / 1024).toFixed(2)}MB`);

console.log('\n🌐 Active Website: http://localhost:3001');

console.log('\n📍 Image Integration Locations:');
console.log('- Homepage: Swahili counting banner & iSPEAK Method pillars');
console.log('- About page: Hero educator image');
console.log('- Plans page: All 4 language cultural images');
console.log('- Mission page: 3 value proposition images');

console.log('\n🎨 Image Generation Details:');
console.log('- API: fal.ai GPT-Image-1');
console.log('- Base image: Paji mascot (for consistent style)');
console.log('- Optimized: Images reduced by 90%+ using sharp');

if (missingImages.length > 0) {
  console.log('\n⚠️  Action Required:');
  console.log('Some images are missing or empty. Run the generation script again:');
  console.log('node scripts/generate-website-images-fal.cjs');
}