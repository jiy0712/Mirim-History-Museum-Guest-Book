require('dotenv').config();

const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

console.log('firebase.js GOOGLE_APPLICATION_CREDENTIALS:', process.env.GOOGLE_APPLICATION_CREDENTIALS);

//firebase admin sdk 초기화
// const adminsdk = require('../mirim-history-museum-e3f30-firebase-adminsdk-fbsvc-2785f78949.json');

admin.initializeApp({
    // credential: admin.credential.cert(adminsdk),
    credential: admin.credential.applicationDefault(),
    storageBucket: 'mirim-history-museum-e3f30.firebasestorage.app'
});

const bucket = admin.storage().bucket();
console.log('버킷이름테스트 : ', bucket.name);
console.log("GOOGLE_APPLICATION_CREDENTIALS:", process.env.GOOGLE_APPLICATION_CREDENTIALS);
//firebase에 이미지 저장
async function uploadImg(fileBuffer, destination) {
    try{
        const file = bucket.file(destination);

        await file.save(fileBuffer, {
            metadata: {
                contentType: 'image/png', //설정 바꿀 수 있음
            },
            public: true,
        });

        //수정 확인 필요
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`;
        return publicUrl;
    } catch(err){
        console.error('firebase 업로드 실패 : ', err);
        throw new Error('firebase 업로드 실패');
    }
}

module.exports = { uploadImg };