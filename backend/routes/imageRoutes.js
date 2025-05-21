import express from 'express';
import Image from '../models/Image.js';

const router = express.Router();

// Get image by filename
router.get('/:filename', async (req, res, next) => {
  try {
    const image = await Image.findOne({ filename: req.params.filename });

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found',
      });
    }

    res.set('Content-Type', image.contentType);
    res.send(image.data);
  } catch (err) {
    next(err);
  }
});

export default router;
