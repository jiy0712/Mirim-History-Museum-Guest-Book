const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

//라우터
//추후 '././' 경로 넣기
const storageRouter = require();
const imgRouter = require();
const qrRouter = require();

app.use(cors());
app.use(express.json());

app.use('/storage', express.static(path.join(__dirname, 'storage')));

app.use('/storage', storageRouter);
app.use('/img', imgRouter);
app.use('/qr', qrRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`서버 : ${PORT}`);
})