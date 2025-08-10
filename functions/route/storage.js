const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadImg } = require('../service/firebase');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('img'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: '이미지 파일 없음' });
  }

  try {
    const filename = Date.now() + path.extname(req.file.originalname);
    const destination = `img/${filename}`;
    const imgUrl = await uploadImg(req.file.buffer, destination, req.file.mimetype);

    res.json({
      message: '이미지 업로드 성공',
      imgUrl,
      fileName: filename,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '이미지 업로드 실패' });
  }
});

module.exports = router;