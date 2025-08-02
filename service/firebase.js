require('dotenv').config();

const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');


//firebase admin sdk 초기화
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    storageBucket: 'mirim-history-museum-e3f30.firebasestorage.app'
});

const bucket = admin.storage().bucket();
//firebase에 이미지 저장
async function uploadImg(fileBuffer, destination) {
    try{
        const file = bucket.file(destination);

        await file.save(fileBuffer, {
            metadata: {
                contentType: 'image/png', //사진 종류에 따라 설정 변경
            },
            public: true,
        });

        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`;
        return publicUrl;
    } catch(err){
        console.error('firebase 업로드 실패 : ', err);
        throw new Error('firebase 업로드 실패');
    }
}

module.exports = { uploadImg };