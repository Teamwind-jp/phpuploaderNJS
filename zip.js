const fs = require('fs');
const archiver = require('archiver');
const iconv = require('iconv-lite');
archiver.registerFormat('zip-encryptable', require('archiver-zip-encryptable'));

async function zipFolder(sourceDir, outputZip, psw) {
  return new Promise((resolve, reject) => {

    const output = fs.createWriteStream(outputZip);
    const archive = archiver('zip-encryptable', {
        zlib: { level: 9 },
        forceLocalTime: true,
        password: iconv.encode(psw, 'Shift_JIS')
    });

    //WriteStreamハンドラ
    output.on('close', () => {
      //console.log(`done: ${outputZip} (${archive.pointer()} バイト)`);
      resolve(archive.pointer());
    });

    archive.on('error', (err) => reject(err));
    archive.pipe(output);   //ストリームをアーカイブに接続
    archive.directory(sourceDir, false);    //フォルダ以下の内容を追加
    archive.finalize();     // 圧縮処理を終了
  });
}

// 関数をエクスポート
module.exports = { zipFolder };