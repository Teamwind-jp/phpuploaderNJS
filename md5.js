var crypto = require("crypto");
var fs = require("fs");

async function md5hash(filePath) {
    return new Promise((resolve, reject) => {
        var readStream = fs.createReadStream(filePath);
        var md5hash = crypto.createHash('md5');
        //md5hash.setEncoding('base64');
        readStream.pipe(md5hash);
        readStream.on('end', () => {
            resolve(md5hash.digest("hex"));
        });
        readStream.on('error', (e) => {
            reject(e);
        });
    });
}

// 関数をエクスポート
module.exports = { md5hash };