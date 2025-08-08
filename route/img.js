const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

//img
router.get('/', async (req, res)=>{
    try{
        const [files] = await admin.storage().bucket().getFiles({
            prefix: 'img/'
        });

        const oneYearLater = new Date();
        oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

        const imgUrl = await Promise.all(
            files.map(async (f) => {
                const [url] = await f.getSignedUrl({
                    action:'read',
                    expires: oneYearLater
                });
                const [metadata] = await f.getMetadata();
                return{
                    name: f.name,
                    url,
                    contentType: metadata.contentType,
                    size: metadata.size,
                    timeCreated: metadata.timeCreated,
                    updated: metadata.updated,
                };
            })
        );
        res.json({ img: imgUrl});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: '이미지 불러오기 실패'}); //이미지 불러오기 실패
    }
});

module.exports = router;