const functions = require('firebase-functions');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const multer = require('multer');

const storageRouter = require('./route/storage');
const imgRouter = require('./route/img');
const qrRouter = require('./route/qr');

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

if (process.env.FUNCTIONS_EMULATOR) {
  app.use('/storage', express.static(path.join(__dirname, 'storage')));
}

app.use('/storage', storageRouter);
app.use('/img', upload.single('file'), imgRouter);
app.use('/qr', qrRouter);

exports.api = functions.runWith({ maxInstances: 10 }).https.onRequest(app);
