const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

//img
router.get('/', async (req, res)=>{
    try{
        const [files] = await admin.storage().bucket().getFiles();

        const imgUrl = await Promise.all(
            files.map(async (f) => {
                const [url] = await f.getSignedUrl({
                    action:'read',
                    expires: '' //기간 설정
                });
                return url;
            })
        );
        res.json({ img: imgUrl});
    }catch(err){
        res.status(500).json({ error: '이미지 불러오기 실패'}); //이미지 불러오기 실패
    }
});

module.exports = router;