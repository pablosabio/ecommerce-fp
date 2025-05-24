import express from 'express';
import Image from '../models/Image.js';

const router = express.Router();

// Handle OPTIONS requests for CORS preflight
router.options('/:filename', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.sendStatus(200);
});

// Get image by filename with proper CORS
router.get('/:filename', async (req, res, next) => {
  try {
    console.log(`Image request for: ${req.params.filename}`);
    
    const image = await Image.findOne({ filename: req.params.filename });

    if (!image) {
      console.log(`Image not found in database: ${req.params.filename}`);
      // Set CORS headers even for 404 responses
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
      
      return res.status(404).json({
        success: false,
        message: 'Image not found',
        filename: req.params.filename
      });
    }

    console.log(`Serving image: ${req.params.filename}, type: ${image.contentType}, size: ${image.data.length} bytes`);

    // Set CORS headers BEFORE sending the image
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'false'); // Important for images
    
    // Set content headers
    res.set({
      'Content-Type': image.contentType,
      'Content-Length': image.data.length,
      'Cache-Control': 'public, max-age=86400',
      'Last-Modified': image.createdAt.toUTCString(),
    });
    
    res.send(image.data);
  } catch (err) {
    console.error('Error serving image:', err);
    
    // Set CORS headers for error responses too
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    
    res.status(500).json({
      success: false,
      message: 'Error serving image',
      error: err.message
    });
  }
});

export default router;