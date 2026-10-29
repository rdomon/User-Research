# BODiFi My Library 追加版 — 公開方法

1. ZIPを展開し、`index.html`、`app.js`、`spotify.js`、`styles.css`、`assets/`を既存のProject 2の直下（GitHub Pagesのroot）に上書き配置します。
2. VS Codeで `git add index.html app.js spotify.js styles.css assets/` → `git commit -m "Add Spotify My Library and Account"` → `git push origin main` を実行します。
3. `https://rdomon.github.io/User-Research/` を開き、Spotify検索画面の **My Library** および **Account** タブを確認します。
4. My Libraryでは接続中のアカウントの所有・フォロー中のプレイリストを取得します。**Refresh**で再取得、**Load more playlists**で続きを読み込みます。リストのプレイリストを押すと再生画面に進みます。
5. AccountはSpotifyのユーザー名・プロフィール画像・Spotifyへのリンクを表示します。

認証スコープ（`playlist-read-private`、`playlist-read-collaborative`、`user-read-private`）は既に含まれています。権限不足などが出たらSpotifyの **Disconnect** → 再接続で認可し直してください。

注意：2026年のSpotify Development Modeでは、フォロー中でも他人が所有するプレイリストの曲一覧をAPIで取得できないことがあります。そうしたプレイリストでも再生自体は可能な場合があります。Spotify Premium、HTTPS、適切なRedirect URIが必要です。実際のSpotifyアカウントでの動作は環境上未検証です。
