const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

//axiosを使用してphpサーバーへuploadしています
const uploadFile = async (php, filefullPath, prm) => {
  const form = new FormData();
  form.append('file', fs.createReadStream(filefullPath));
  try {
    const response = await axios.post(php + '?prm=' + prm, form, {
      headers: form.getHeaders()
    });
    //console.log('アップロード成功:', response.data);
    //response.dataを取得する場合は、php側でecho等で出力する。
    return 0;
  } catch (error) {
    console.error('アップロード失敗:', error.message);
    return -1;
  }
};

// 関数をエクスポート
module.exports = { uploadFile };