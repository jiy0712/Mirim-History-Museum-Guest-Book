require('dotenv').config();

const admin = require('firebase-admin');
const fs = require('fs');

//mirim-7a49c.firebasestorage.app

//로컬개발 한다면
if (process.env.GOOGLE_APPLICATION_CREDENTIALS && fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)) {
  const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'mirim-7a49c.firebasestorage.app',
  });
} else {
  admin.initializeApp({
  });
}

const bucket = admin.storage().bucket();

//이미지 업로드
async function uploadImg(fileBuffer, destination, contentType = 'image/png') {
  try {
    const file = bucket.file(destination);
    await file.save(fileBuffer, { metadata: { contentType }, resumable: false });
    await file.makePublic();
    return `https://storage.googleapis.com/${bucket.name}/${destination}`;
  } catch (err) {
    console.error('firebase 업로드 실패 : ', err);
    throw new Error('firebase 업로드 실패');
  }
}

module.exports = { uploadImg };