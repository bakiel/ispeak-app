const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { query } = require('../config/database');
const { authenticate, adminOnly } = require('../middleware/auth');

const router = express.Router();

// OpenRouter API for GPT-4o nano image analysis
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueId = crypto.randomBytes(8).toString('hex');
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${uniqueId}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Analyze image with GPT-4o nano via OpenRouter
async function analyzeImageWithAI(imageBase64, mimeType) {
  if (!OPENROUTER_API_KEY) {
    return { title: null, alt: null, description: null };
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://ispeak-app-prod.vercel.app',
        'X-Title': 'iSPEAK Media Library'
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini', // GPT-4o nano/mini for fast image analysis
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Analyze this image and provide:
1. A descriptive filename (lowercase, hyphens, no extension, max 50 chars)
2. An SEO-friendly alt text (max 125 chars)
3. A brief description (max 200 chars)

Respond in JSON format only:
{"filename": "...", "alt": "...", "description": "..."}`
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:${mimeType};base64,${imageBase64}`
                }
              }
            ]
          }
        ],
        max_tokens: 200
      })
    });

    const data = await response.json();

    if (data.choices && data.choices[0]?.message?.content) {
      const content = data.choices[0].message.content;
      // Extract JSON from response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          title: parsed.filename || null,
          alt: parsed.alt || null,
          description: parsed.description || null
        };
      }
    }
    return { title: null, alt: null, description: null };
  } catch (error) {
    console.error('AI image analysis error:', error);
    return { title: null, alt: null, description: null };
  }
}

// Get all media items (with pagination and search) - Public for image display
router.get('/', async (req, res) => {
  try {
    const { search, type, limit = '20', offset = '0' } = req.query;
    const limitInt = parseInt(limit, 10) || 20;
    const offsetInt = parseInt(offset, 10) || 0;

    let sql = `
      SELECT id, filename, original_name, file_path, url, mime_type, file_size,
             width, height, alt_text, title, description, folder,
             created_at, updated_at
      FROM media_library
      WHERE 1=1
    `;
    const params = [];

    if (search) {
      sql += ' AND (title LIKE ? OR alt_text LIKE ? OR original_name LIKE ? OR description LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    if (type) {
      sql += ' AND mime_type LIKE ?';
      params.push(`${type}%`);
    }

    sql += ` ORDER BY created_at DESC LIMIT ${limitInt} OFFSET ${offsetInt}`;

    const media = await query(sql, params);

    // Get total count
    let countSql = 'SELECT COUNT(*) as total FROM media_library WHERE 1=1';
    const countParams = [];
    if (search) {
      countSql += ' AND (title LIKE ? OR alt_text LIKE ? OR original_name LIKE ? OR description LIKE ?)';
      const searchTerm = `%${search}%`;
      countParams.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }
    if (type) {
      countSql += ' AND mime_type LIKE ?';
      countParams.push(`${type}%`);
    }

    const countResult = await query(countSql, countParams);

    res.json({
      media,
      total: countResult[0].total,
      page: Math.floor(offsetInt / limitInt) + 1,
      totalPages: Math.ceil(countResult[0].total / limitInt)
    });
  } catch (error) {
    console.error('Media fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch media' });
  }
});

// Get single media item
router.get('/:id', async (req, res) => {
  try {
    const media = await query('SELECT * FROM media_library WHERE id = ?', [req.params.id]);

    if (media.length === 0) {
      return res.status(404).json({ error: 'Media not found' });
    }

    res.json(media[0]);
  } catch (error) {
    console.error('Media fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch media' });
  }
});

// Upload media with AI analysis - Admin only
router.post('/upload', authenticate, adminOnly, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.file;
    const filePath = file.path;
    const fileUrl = `/uploads/${file.filename}`;

    // Read file for AI analysis
    let aiAnalysis = { title: null, alt: null, description: null };

    if (OPENROUTER_API_KEY && file.mimetype.startsWith('image/')) {
      const imageBuffer = fs.readFileSync(filePath);
      const imageBase64 = imageBuffer.toString('base64');
      aiAnalysis = await analyzeImageWithAI(imageBase64, file.mimetype);
    }

    // Generate title from AI or filename
    const title = aiAnalysis.title ||
                  path.basename(file.originalname, path.extname(file.originalname))
                    .replace(/[_-]/g, ' ')
                    .replace(/\s+/g, ' ')
                    .trim();

    // Get image dimensions (basic - could use sharp for better handling)
    let width = null;
    let height = null;

    // Insert into database
    const result = await query(`
      INSERT INTO media_library (
        filename, original_name, file_path, url, mime_type, file_size,
        width, height, alt_text, title, description, folder
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      file.filename,
      file.originalname,
      filePath,
      fileUrl,
      file.mimetype,
      file.size,
      width,
      height,
      aiAnalysis.alt || title,
      title,
      aiAnalysis.description || null,
      req.body.folder || 'uploads'
    ]);

    // Fetch the created media item
    const media = await query('SELECT * FROM media_library WHERE id = ?', [result.insertId]);

    res.status(201).json({
      message: 'File uploaded successfully',
      media: media[0],
      aiAnalysis: aiAnalysis.title ? true : false
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload file', details: error.message });
  }
});

// Upload from URL with AI analysis - Admin only
router.post('/upload-url', authenticate, adminOnly, async (req, res) => {
  try {
    const { url, folder = 'uploads' } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Fetch the image
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(400).json({ error: 'Failed to fetch image from URL' });
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.startsWith('image/')) {
      return res.status(400).json({ error: 'URL does not point to an image' });
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const ext = contentType.split('/')[1].split(';')[0] || 'jpg';
    const uniqueId = crypto.randomBytes(8).toString('hex');
    const filename = `${Date.now()}-${uniqueId}.${ext}`;

    const uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, buffer);

    // AI analysis
    let aiAnalysis = { title: null, alt: null, description: null };
    if (OPENROUTER_API_KEY) {
      const imageBase64 = buffer.toString('base64');
      aiAnalysis = await analyzeImageWithAI(imageBase64, contentType);
    }

    const title = aiAnalysis.title || 'imported-image';
    const fileUrl = `/uploads/${filename}`;

    // Insert into database
    const result = await query(`
      INSERT INTO media_library (
        filename, original_name, file_path, url, mime_type, file_size,
        alt_text, title, description, folder
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      filename,
      url.split('/').pop() || filename,
      filePath,
      fileUrl,
      contentType,
      buffer.length,
      aiAnalysis.alt || title,
      title,
      aiAnalysis.description || null,
      folder
    ]);

    const media = await query('SELECT * FROM media_library WHERE id = ?', [result.insertId]);

    res.status(201).json({
      message: 'Image imported successfully',
      media: media[0],
      aiAnalysis: aiAnalysis.title ? true : false
    });
  } catch (error) {
    console.error('URL upload error:', error);
    res.status(500).json({ error: 'Failed to import image', details: error.message });
  }
});

// Update media metadata - Admin only
router.put('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const { title, alt_text, description, folder } = req.body;

    await query(`
      UPDATE media_library SET
        title = COALESCE(?, title),
        alt_text = COALESCE(?, alt_text),
        description = COALESCE(?, description),
        folder = COALESCE(?, folder),
        updated_at = NOW()
      WHERE id = ?
    `, [title, alt_text, description, folder, req.params.id]);

    const media = await query('SELECT * FROM media_library WHERE id = ?', [req.params.id]);

    res.json({
      message: 'Media updated successfully',
      media: media[0]
    });
  } catch (error) {
    console.error('Media update error:', error);
    res.status(500).json({ error: 'Failed to update media' });
  }
});

// Delete media - Admin only
router.delete('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    // Get file path first
    const media = await query('SELECT file_path FROM media_library WHERE id = ?', [req.params.id]);

    if (media.length === 0) {
      return res.status(404).json({ error: 'Media not found' });
    }

    // Delete file from disk
    if (media[0].file_path && fs.existsSync(media[0].file_path)) {
      fs.unlinkSync(media[0].file_path);
    }

    // Delete from database
    await query('DELETE FROM media_library WHERE id = ?', [req.params.id]);

    res.json({ message: 'Media deleted successfully' });
  } catch (error) {
    console.error('Media delete error:', error);
    res.status(500).json({ error: 'Failed to delete media' });
  }
});

// Regenerate AI metadata for existing image - Admin only
router.post('/:id/analyze', authenticate, adminOnly, async (req, res) => {
  try {
    if (!OPENROUTER_API_KEY) {
      return res.status(400).json({ error: 'AI analysis not configured' });
    }

    const media = await query('SELECT * FROM media_library WHERE id = ?', [req.params.id]);

    if (media.length === 0) {
      return res.status(404).json({ error: 'Media not found' });
    }

    const item = media[0];

    if (!item.file_path || !fs.existsSync(item.file_path)) {
      return res.status(400).json({ error: 'File not found on disk' });
    }

    const imageBuffer = fs.readFileSync(item.file_path);
    const imageBase64 = imageBuffer.toString('base64');
    const aiAnalysis = await analyzeImageWithAI(imageBase64, item.mime_type);

    if (aiAnalysis.title) {
      await query(`
        UPDATE media_library SET
          title = ?,
          alt_text = ?,
          description = ?,
          updated_at = NOW()
        WHERE id = ?
      `, [aiAnalysis.title, aiAnalysis.alt, aiAnalysis.description, req.params.id]);
    }

    const updated = await query('SELECT * FROM media_library WHERE id = ?', [req.params.id]);

    res.json({
      message: 'AI analysis complete',
      media: updated[0],
      analysis: aiAnalysis
    });
  } catch (error) {
    console.error('AI analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze image' });
  }
});

// Get folders/categories
router.get('/folders/list', async (req, res) => {
  try {
    const folders = await query(`
      SELECT folder, COUNT(*) as count
      FROM media_library
      GROUP BY folder
      ORDER BY folder
    `);

    res.json(folders);
  } catch (error) {
    console.error('Folders fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch folders' });
  }
});

// Serve uploaded files
router.get('/file/:filename', (req, res) => {
  const filePath = path.join(__dirname, '../../uploads', req.params.filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  res.sendFile(filePath);
});

module.exports = router;
