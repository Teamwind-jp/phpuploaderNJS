//	(c)Teamwind japan h.hayashi
//	サーバーメンテナンスツール Windows Server Maintenance Tools

const fs = require('fs');
const path = require('path');

const zip = require('./zip');
const cut = require('./cut');
const md5 = require('./md5');
const axios = require('./axios');

//各種設定情報
const env = {
    phpsrv: 'http://yourphpserver/receive.php', //このサンプルの様にアップロードするphpサーバーとコールするphpを指定してください。
    directories : ['C:\\folder1', 'C:\\folder2', 'C:\\folder3'], // このサンプルの様にアップロードするフォルダを指定してください。
    cutsize : 1024*1024*30,         //分割(転送)サイズ この場合は30Mbyte 
    psw : '123*+/あいう'  //zipパスワード　マルチバイトはzip.js内でShift_JISに変換しています。
};

(async () => {
    try {
        for (const [index, dir] of env.directories.entries()) {
            //フォルダチェック
            if (!fs.existsSync(dir)) {
                continue;
            }
            //zipファイル名
            const outputZip = dir+'.zip';
            //zip処理
            const rclen = await zip.zipFolder(dir, outputZip, env.psw);
            //完了チェック
            if (Number.isNaN(rclen)) {
                //?NG
                continue;
            }
            //カッター
            const rcfiles = await cut.cutter(outputZip, env.cutsize);
            //完了チェック
            if (Number.isNaN(rcfiles)) {
                //?NG
                continue;
            }
            //元ファイルのmd5取得
            const rcmd5 = await md5.md5hash(outputZip);
            //分割ファイルアップロード
            for (const [index, file] of rcfiles.entries()) {
                //このファイルのmd5
                const filemd5 = await md5.md5hash(file);
                //ファイル名のみ
                const fileName = path.basename(file);
                //phpへのprm=転送ファイル名,分割番号,最終分割番号,当該md5,結合したzipのmd5
                const prm = `${fileName},${index},${rcfiles.length - 1},${filemd5},${rcmd5}`;
                //console.log("Go:" + prm);
                //アップロード
                const rc = await axios.uploadFile(env.phpsrv, file, prm);
                //アップロード成功したら分割ファイル削除
                if (rc === 0) {
                    fs.unlinkSync(file);
                }
            }

            //処理完了　分割元のoutputZipを削除する
            fs.unlinkSync(outputZip);
        }
    } catch (error) {
        console.error('Error:', error);
    }
})();

