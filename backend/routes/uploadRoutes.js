import { Router } from 'express';
import upload from '../middleware/upload.js';

const router = Router();

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Image file is required' });
    }

    const imageUrl = req.file.path || req.file.secure_url;

    if (!imageUrl) {
      return res.status(500).json({ success: false, message: 'Upload failed to return image URL' });
    }

    return res.status(200).json({ success: true, message: 'Image uploaded successfully', image_url: imageUrl });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Image upload failed',
    });
  }
});

export default router;
