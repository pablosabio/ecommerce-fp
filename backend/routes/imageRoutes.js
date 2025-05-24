// backend/routes/imageRoutes.js - FIXED VERSION
import express from 'express';
import Image from '../models/Image.js';

const router = express.Router();

// Get image by filename - simplified CORS approach
router.get('/:filename', async (req, res, next) => {
  try {
    console.log(`Image request for: ${req.params.filename}`);
    
    const image = await Image.findOne({ filename: req.params.filename });

    if (!image) {
      console.log(`Image not found in database: ${req.params.filename}`);
      return res.status(404).json({
        success: false,
        message: 'Image not found',
        filename: req.params.filename
      });
    }

    console.log(`Serving image: ${req.params.filename}, type: ${image.contentType}, size: ${image.data.length} bytes`);

    // Set content headers - let main CORS handle CORS headers
    res.set({
      'Content-Type': image.contentType,
      'Content-Length': image.data.length,
      'Cache-Control': 'public, max-age=86400',
      'Last-Modified': image.createdAt.toUTCString(),
    });
    
    res.send(image.data);
  } catch (err) {
    console.error('Error serving image:', err);
    res.status(500).json({
      success: false,
      message: 'Error serving image',
      error: err.message
    });
  }
});

export default router;