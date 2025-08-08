const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { uploadImg } = require('../service/firebase');

//폴더 생성
const storageDir = path.join(__dirname, '..', 'storage');
if(!fs.existsSync(storageDir)){ //폴더 없으면 생성
    fs.mkdirSync(storageDir);
}

const firebaseStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, storageDir);
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: firebaseStorage });

//storage
router.post('/', upload.single('img'), async (req, res)=>{
    if(!req.file){
        return res.status(400); //이미지 파일 없음
    }

    try{
        const filePath = path.join(storageDir, req.file.filename);
        const fileBuffer = fs.readFileSync(filePath);

        //firebase 사진 등록 (폴더로 세부화)
        const imgUrl = await uploadImg(fileBuffer, `img/$(req.file.filename)`);

        fs.unlinkSync(filePath); //로컬임시저장, 나중에 선택적 빼기 가능

        res.json({
            message: "이미지 업로드 성공",
            imgUrl,
            fileName: req.file.filename
        });
    } catch(err){
        console.error(err);
        res.status(500).json({ error: '이미지 업로드 실패'});
    }
});

module.exports = router;