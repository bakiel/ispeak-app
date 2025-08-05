import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Image URLs from fal.ai history
const images = [
  {
    name: 'teacher-coffee-mug',
    url: 'https://v3.fal.media/files/kangaroo/Hq4ksusw0bCPCt7GWOU2y_8d6b4ff3d95e45c2b77d79e72c923b10.png',
    product: 'Teacher Coffee Mug'
  },
  {
    name: 'wall-posters',
    url: 'https://v3.fal.media/files/zebra/mmAaEnKMpfcJEqOVb7n84_f2a7008fd88644e7ca30956dc9b140636.png',
    product: 'Educational Wall Posters'
  },
  {
    name: 'african-tales-books',
    url: 'https://v3.fal.media/files/panda/JeaKQiN_jJ7L0zcnkEzLE_1d39dcf5d0724880b5147a0fbdc3b3db.png',
    product: 'African Tales Storybook'
  },
  {
    name: 'african-pattern-notebook',
    url: 'https://v3.fal.media/files/koala/Cc0AqxOGvnmJfnbGJ9fnO_bab468e8df9d439d8deee5aef3aa9785.png',
    product: 'African Pattern Notebook'
  },
  {
    name: 'paji-plush-toy',
    url: 'https://v3.fal.media/files/tiger/jKxJzvMGcX2fW7xZ9RQNO_82bcd511756249c293c8eb34d542b981.png',
    product: 'Paji Plushie'
  },
  {
    name: 'yoruba-flashcards',
    url: 'https://v3.fal.media/files/lion/Dfu1PzkoKBvnLgI7k5kPo_4bcba27c662041c99eb6592633e7f747.png',
    product: 'Yoruba Flashcards'
  },
  {
    name: 'kiswahili-phrase-book',
    url: 'https://v3.fal.media/files/penguin/v91VYsBrfwLlBjXAQtNJN_dcb3e743d5884298b85ba1ff736deec7.png',
    product: 'Kiswahili Phrase Book'
  }
];

// Create directory if it doesn't exist
const dir = path.join(__dirname, '../public/images/products');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Download function
function downloadImage(imageObj) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(dir, `${imageObj.name}.png`));
    
    https.get(imageObj.url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✓ Downloaded: ${imageObj.product}`);
          resolve();
        });
      } else {
        console.log(`✗ Failed (${response.statusCode}): ${imageObj.product}`);
        reject(new Error(`Failed to download ${imageObj.product}`));
      }
    }).on('error', (err) => {
      console.log(`✗ Error: ${imageObj.product} - ${err.message}`);
      reject(err);
    });
  });
}

// Download all images
async function downloadAll() {
  console.log('Starting download of fal.ai images...\n');
  
  for (const image of images) {
    try {
      await downloadImage(image);
    } catch (error) {
      console.error(`Failed to download ${image.name}: ${error.message}`);
    }
  }
  
  console.log('\nDownload process completed!');
}

downloadAll();