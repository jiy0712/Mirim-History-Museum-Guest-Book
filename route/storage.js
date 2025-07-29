const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

//폴더 생성
const storageDir = path.join(__dirname, '..', 'storage');
if(!fs.existsSync(storageDir)){ //폴더 없으면 생성
    fs.mkdirSync(storageDir);
}

//추후 변수명 변경
const firebaseStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, storageDir);
    }
});
const firebaseStorage = multer({ storage });

//storage
router.post('/', storage.single('img'), (req, res)=>{
    if(!req.file){
        return res.status(400); //이미지 파일 없음
    }

    const fileUrl = ``; //URL 생성

    res.json({
        message: "이미지 업로드 성공",
        imgUrl : fileUrl,
        fileName: req.file.filename
    });
});

module.exports = router;