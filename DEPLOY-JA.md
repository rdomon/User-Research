# BODiFi Spotify 対応版 — GitHub Pages 公開手順

対象: https://github.com/rdomon/User-Research
公開先: https://rdomon.github.io/User-Research/

1. 既存のリポジトリをバックアップします（VS Code で commit 済みか確認）。
2. ZIP を解凍し、中にある `index.html`, `styles.css`, `app.js`, `spotify.js`, `assets/` を、GitHub リポジトリの **main ブランチの root** にコピーして既存ファイルを上書きします。`bodifi-root-ready` などの新しい親フォルダを作らず、**index.html がリポジトリ直下にある** ようにしてください。
3. VS Code のターミナルから `git add index.html styles.css app.js spotify.js assets/`、`git commit -m "Publish Spotify player on root and improve playlist display"`、`git push origin main` を実行します。
4. GitHub Settings → Pages の公開設定は `main` / `(root)` のままで大丈夫です。
5. Spotify Developer Dashboard → アプリの Settings → Redirect URIs に `https://rdomon.github.io/User-Research/` を登録・保存してください（末尾 `/` まで一致させます）。
6. サイトを開き、既存の Client ID を入力または Spotify に再ログインしてください。サイトのURLを移動すると認証セッションは引き継がれません。
7. 更新されない場合はブラウザのハードリロード（Mac: Cmd+Shift+R）。

## プレイリストのトラック一覧について
Spotify の2026年の開発モードでは、別のユーザーが所有するプレイリストの曲一覧をAPIから取得できません。該当する場合「Track list restricted」と表示し、現在再生中の曲だけ表示します。所有または共同編集しているプレイリストは曲一覧をページごとに読み込みます（安全のため最大1000件）。Spotifyの再生自体は継続可能です。

## 制限
Spotify Premium が必要です。Spotifyの音源をフィットネスジムなど公共・商用の場で流す用途は、個人用Spotifyの利用規約に適合しない場合があります。公開前に権利・サービスの適合性を確認してください。
