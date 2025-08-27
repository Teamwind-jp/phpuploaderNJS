const fs = require('fs');

//cutsizeで分割　ファイル名に.nnn（通番）を付加して同層に作成する。
async function cutter(inputFile, cutsize) {

    return new Promise((resolve, reject) => {
        // ストリームを使用してファイルを分割
        const readStream = fs.createReadStream(inputFile, { highWaterMark: cutsize });
        let partIndex = 0;
        let retfilepath = [];

        readStream.on('data', (chunk) => {
            const outputFilePath = inputFile + '.' + partIndex.toString().padStart(3, '0');
            // 分割ファイルを作成
            fs.writeFileSync(outputFilePath, chunk);
            //戻り値にファイル名の配列を返す
            retfilepath.push(outputFilePath);
            partIndex++;
        });

        readStream.on('end', () => {
            resolve(retfilepath);
            //console.log('全ての分割処理が完了しました。');
            });

        readStream.on('error', (err) => {
            //console.error('エラーが発生しました:', err);
        });
    });

}
// 関数をエクスポート
module.exports = { cutter };