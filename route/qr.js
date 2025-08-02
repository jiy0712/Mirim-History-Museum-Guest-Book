const express = require('express');
const router = express.Router();
const { makeQR } = require('./qrMake');
const { uploadImg } = require('../service/firebase');

//qr
router.post('/', async (req, res)=>{
    const { data } = req.body;
    if(!data){
        return res.status(400).json({ error: 'QR로 만들 데이터 없음' });
    }

    try{
        //base64로 생성
        const qr = await makeQR(data);
        const base64Data = qr.replace(/^data:image\/png;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');

        const fileName = `qr_${Date.now()}.png`;
        const qrimgUrl = await uploadImg(buffer, fileName);

        res.json({qrimgUrl});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'QR 생성 실패'});
    }
});

//생성 후 또 저장하도록
module.exports = router;