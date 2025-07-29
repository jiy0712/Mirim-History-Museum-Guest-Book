const express = require('express');
const router = express.Router();
const { makeQR } = require(); //경로값 넣기

//qr
router.post('/', async (req, res)=>{
    const { data } = req.body;

    if(!data){
        return res.status(400).json({ error: 'QR로 만들 데이터 없음' });
    }

    try{
        const qrimgUrl = await makeQR(data);
        res.json({qrimgUrl});
    }catch(err){
        res.status(500).json({ error: 'QR 생성 실패'});
    }
});

//생성 후 또 저장하도록
module.exports = router;