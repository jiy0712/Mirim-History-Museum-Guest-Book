const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');
const admin = require('firebase-admin');

//firebase admin sdk 초기화
const adminsdk = require(''); //경로 추가하기 (json)

admin.initializeApp({
    credential: admin.credential.cert(adminsdk),
    storageBucket: 'mirim-history-museum-e3f30.appspot.com'
});

const bucket = admin.storage().bucket();

//firebase에 이미지 저장
async function uploadImg(fileBuffer, destination) {
    try{
        const file = bucket.file(destination);

        await file.save(fileBuffer, {
            metadata: {
                contentType: 'image/jpeg', //설정 바꿀 수 있음
            },
            public: true,
        });

        //수정 확인 필요
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`;
        return publicUrl;
    } catch(err){
        throw new Error('firebase 업로드 실패');
    }
}

module.exports = admin;