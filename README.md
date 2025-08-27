# phpuploaderNJS

本プロジェクトは、Nodejsによるサーバーサイドの保守ツールです。  

本exeの機能は、  
1.指定フォルダをzip。  
2.負荷のかからないサイズの複数ファイルにカット。  
3.順次他phpサーバーへアップロードしています。  
4.以上を日次または即時実行。  

以上です。  

公開中の 下記プロジェクト 
phpuploader  VisualBasic版  
phpuploaderCS Visualc#版  
と同様の処理をNodejs(JavaScript)版で作るとどうなるのかという目的で作成しました。  










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

