require('dotenv').config(); //.env

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

//라우터
const storageRouter = require('./route/storage');
const imgRouter = require('./route/img');
const qrRouter = require('./route/qr');

app.use(cors());
app.use(express.json());

//경로
app.use('/storage', express.static(path.join(__dirname, 'storage')));
app.use('/storage', storageRouter);
app.use('/img', imgRouter);
app.use('/qr', qrRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`서버 : ${PORT}`);
})