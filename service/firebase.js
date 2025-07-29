const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

//firebase admin sdk 초기화

//firebase에 이미지 저장
async function uploadImg(fileBuffer, destination) {
    try{
        const bucket = admin.storage().bucket();
        const file = bucket.file(destination);

        await file.save(fileBuffer, {
            metadata: {
                contentType: 'image/jpeg', //설정 바꿀 수 있음
            },
            public: true,
        });

        //수정 확인 필요
        //QR로 변환 예정인 url
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`;
        return publicUrl;
    } catch(err){
        throw new Error('firebase 업로드 실패');
    }
}