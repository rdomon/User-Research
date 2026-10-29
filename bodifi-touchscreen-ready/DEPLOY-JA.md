# BODiFi Spotify — 設定方法（Raspberry Pi対応）

1. このZIPの `index.html`、`styles.css`、`app.js`、`spotify.js`、`assets/` を既存の `Project 2` のルートに上書きコピー。
2. VS Codeターミナルで `git add index.html styles.css app.js spotify.js assets/` → `git commit -m "Fix Spotify setup and Pi display"` → `git push origin main`。
3. `https://rdomon.github.io/User-Research/` を開き、Command+Shift+Rで強制再読み込み。
4. Spotify Developer DashboardのRedirect URIに `https://rdomon.github.io/User-Research/` を登録。
5. Instructor → Spotify。ログイン前なら認証後に `Continue to Class type →` を押し、③クラスを選択、④自分のSpotifyプレイリストを選択して再生。既に認証済みなら②を押すと直接③に進みます。
6. ④でほかの楽曲を探す場合は `Search Spotify instead` を使用。

SpotifyのAPI権限制限により他人のプレイリストのトラック一覧は取得できない場合があります。ブラウザ再生にはSpotify Premiumが必要です。
