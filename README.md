# phpuploaderNJS

本プロジェクトは、Nodejsによるサーバーサイドの保守ツールです。  
指定フォルダをzip(password付き)し他サーバーへアップロード(php)しバックアップしています。  
  
処理内容は、  
1.指定フォルダをzip。  
2.負荷のかからないサイズの複数ファイルにカット。  
3.順次phpサーバーへアップロードしています。  
4.phpサーバー側で結合し保管。
5.以上を日次または即時実行。  
以上です。  
  
※※補足※※  
Windowsサーバー用に.Net版で公開中の 下記プロジェクトと同様の処理をNodejs(JavaScript)版で作るとどうなるのかという目的で作成しました。  
phpuploader  VisualBasic版  
phpuploaderCS Visualc#版  
いろいろ比較した個人的な感想は、後述していますのでよろしければご覧ください。  

# Requirement
Windows11上で書いています。  
nvmにてnodejsをインストール。現時点では下記バージョンです。  
Visual Studio Codeを使用しています。バージョン: 1.103.2  
Node.js: 22.17.0  

本プロジェクトを実行するためのphpサーバーが必要です。  

# Usage
1.本プロジェクトのソース以外に使用しているライブラリ（node_modules）は下記です。  
　archiver (zip用)  
　archiver-zip-encryptable (zip暗号化サポート)  
　iconv-lite 　(utf8 -> sjis変換 zipのパスワード用)  
　axios form-data (upload用)  
　以上をターミナルにてインストールしています。  
  
2.index.jsのenv変数を実行環境に合わせて設定してください。  
  
3.ターミナルにて[npm start]で実行します。



使用しているテクニック。  
1. 指定フォルダをSharpZipLibでzip。
2. 負荷のかからないサイズの複数ファイルにFileStreamでカット。
3. 順次My.Computer.Network.UploadFileで送信。
4. Task.Runで実行。
5. 簡易PHPスクリプトでファイル受信。
6. 受信したファイルをPHPで結合。
7. md5でファイルの整合性チェック。
8. デリゲートを使用して、UIの更新を行う。

Visual Basic版も公開しています。

# Requirement
Visual Studio 2019 or later.  
Nothing in particular. It will work on Windows.  
.Net Framework 4.8 is specified, so please change it as appropriate.  
For zipping, I use the SharpZipLib library on NuGet.  
For uploading, I use Microsoft.VisualBasic.Devices.Network().[add Microsoft.VisualBasic.dll]  
PHP is required on the receiving side. However, the following PHP code is based on Windows.  

特にありません。windowsであれば動きます。  
.net framework4.8を指定しているので適宜変更してください。  
zipは、NuGetでSharpZipLibライブラリを使用しています。 
アップロードは、Microsoft.VisualBasic.Devices.Network()を使用しています。[参照にMicrosoft.VisualBasic.dllを追加しています。]  
受信側は、php必須です。ただ下記phpはwindows前提コードです。  

# License
MIT license. Copyright: Teamwind.
zip uses the SharpZipLib library.

MIT license。著作権は、Teamwindです。  
zipは、SharpZipLibライブラリ使用。

# Note
There may be bugs. Use at your own risk. Also, modify the code accordingly.
If you have any requests, please email us. 

バグがあるかもしれません。自己責任でご利用ください。また適宜コード変更してください。
ご要望等がございましたらメール下さい。

This is a sample php. 以下サンプルphpです。  

