/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

//라우터
const storageRouter = require('../route/storage');
const imgRouter = require('../route/img');
const qrRouter = require('../route/qr');

//글로벌 세팅 (함수 트래픽 10개 제한)
setGlobalOptions({maxInstances: 10});

//미들웨어
app.use(cors());
app.use(express.json());

//storage 정적 파일
app.use('/storage', express.static(path.join(__dirname, '../storage')));

//라우터 등록
app.use('/storage', storageRouter);
app.use('/img', imgRouter);
app.use('/ar', qrRouter);

//firebase functions에 express 연결
exports.api = onRequest(app);



// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
