import express from 'express';
const router = express.Router();

import upload from '../services/image-upload';

const singleUpload = upload.single('image');

router.post('/image-upload', singleUpload, async (req, res) => {
  try {
    return res.json({ imageUrl: (req as any).file.location });
  } catch (err) {
    return res.status(422).send({
      errors: [{ title: 'Image Upload Error', detail: err.message }],
    });
  }
});

export default router;
