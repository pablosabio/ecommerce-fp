import express from 'express';
import Image from '../models/Image.js';

const router = express.Router();

// Get image by filename with proper CORS headers
router.get('/:filename', async (req, res, next) => {
  try {
    // Set CORS headers for images
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    
    const image = await Image.findOne({ filename: req.params.filename });

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found',
      });
    }

    // Set proper cache headers
    res.set({
      'Content-Type': image.contentType,
      'Cache-Control': 'public, max-age=86400', // Cache for 1 day
      'Last-Modified': image.createdAt.toUTCString(),
    });
    
    res.send(image.data);
  } catch (err) {
    console.error('Error serving image:', err);
    next(err);
  }
});

export default router;