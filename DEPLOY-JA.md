# BODiFi Spotify LIVE — GitHub Pages公開・Raspberry Piテスト

## これはオンラインのライブ再生版です
- SpotifyのOAuth PKCE・Web Playback SDKとSpotify APIを使います。音楽を聴くにはインターネット、Spotify Premium、対応ブラウザ、ユーザー許可が必要です。
- WiiMへの直接接続や商用店舗での再生ライセンスを提供するものではありません。Milestone 1の**オフライン必須条件は満たしません**。課題提出には別のオフライン版を使ってください。

## 公開
1. バックアップを取り、このフォルダ内の `index.html`、`styles.css`、`app.js`、`spotify.js`、`assets/` を `Project 2` の直下にコピー。
2. VS Codeのターミナルで `git add index.html styles.css app.js spotify.js assets/`、`git commit -m "Improve live Spotify Pi player"`、`git push origin main`。
3. GitHub Pagesの `https://rdomon.github.io/User-Research/` を再読み込み。
4. Spotify Developer DashboardのRedirect URIにこのURLを完全一致で登録。Client Secretは使用しない。既存のClient IDをSpotify画面に設定。

## 操作
1 Instructor → 2 Music service（初回ログイン後は Continue to Class type）→ 3 Class type → 4 Playlist → Now Playing。
4ではSpotifyのライブラリからプレイリストをロードし、別の曲はSearch Spotifyを使います。Search SpotifyではMy Library / Accountも開けます。

## 1024×600テスト
ChromeでDevTools > Device Toolbarを開き1024×600に設定。全4ステップ、プレイリスト読み込みの失敗とRetry、アルバムアート、タッチターゲット、戻る、再読み込みを検証。実機Raspberry Piでの出力音声とタッチ操作は未検証です。

## 注意点
- 「Network available」はブラウザのネットワーク状態の目安であり、Spotifyの接続を保証しません。
- Spotifyに認可されていても、音を出すには再生デバイスをアクティベートする必要がある場合があります。
- Spotify APIにより、他人所有のプレイリストの曲一覧は取得できない場合があります。
