const QRCode = require('qrcode'); //qr node

//QR 이미지 생성
async function makeQR(data){
    try{
        const dataUrl = await QRCode.toDataURL(data); //QR로 변환할 사진
        return dataUrl;
    }catch(err){
        throw new Error('QR코드 생성 중 오류');
    }
}

module.exports = { makeQR };