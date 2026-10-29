# BODiFi Music Player — Spotify-connected edition

This version preserves the existing visual layout and adds Spotify OAuth login, live song/playlist search, and actual playback via Spotify Web Playback SDK.

## Set up Spotify (required)

1. Get a **Spotify Premium** account. The owner of a new Spotify Developer *development-mode* app must have Premium too. The dashboard limits development-mode apps to five authorized users (at time of writing, October 2026).
2. Create an app in [Spotify Developer Dashboard](https://developer.spotify.com/dashboard). Choose **Web API** and **Web Playback SDK** when configuring the app, if asked.
3. Register an **exact Redirect URI**. For local development, use `http://127.0.0.1:5500/index.html` or another exact local address used by your server (Spotify may enforce loopback-address redirects rather than `localhost`). For a published site, use its exact **HTTPS** URL, such as `https://yourname.github.io/project2/index.html`. Both path and trailing slash must match.
4. Add the Spotify Premium account you use for testing as an allowed user in your Spotify developer app's user management section, if required.
5. Run a local web server in the project directory, such as `python3 -m http.server 5500 --bind 127.0.0.1`. Then open `http://127.0.0.1:5500/index.html`. **Opening as `file://` will not work for OAuth.** GitHub Pages over HTTPS works too.
6. Choose instructor → Spotify. Enter **Client ID** (not Client Secret) in the dialog and save. Press **Connect Spotify account**, sign in, and approve the permissions.
7. After returning to the site, search for a song or playlist and press Play/Open. If the browser blocks audio, press **Activate browser audio**, then choose the song again. Unmute the browser and your device.

## What is implemented

- OAuth Authorization Code with **PKCE**, using no server-side secret. Access tokens are in `sessionStorage`, Client ID in `localStorage`. Logout removes the current tab's token. Refresh tokens are refreshed automatically.
- Spotify song and playlist search (real results; maximum 10 per entity type per request under updated development-mode restrictions).
- Play tracks or try to play playlists in the browser; Spotify Web Playback SDK creates a Spotify Connect device.
- Play/pause, previous/next, seek, volume, shuffle through Spotify API; SDK state updates the existing Now Playing UI.
- Artwork, song titles, artists and durations reflect live metadata when available.
- Original prototype styles, instructor/class screens and layout are retained. Apple Music is **not connected**.

## Limitations / troubleshooting

- Requires a Spotify Premium account to stream through the Web Playback SDK; Spotify controls which songs can be streamed in your region and account.
- Spotify's 2026 Development Mode restrictions can prevent reading song lists from playlists **you don't own or collaborate on**. Playlist metadata and opening the playlist can work even if the track list is unavailable. Some playback operations may be restricted by Spotify.
- Browser playback requires secure context (**HTTPS or loopback HTTP**) and compatible DRM/audio permissions. It plays audio in the **current browser**, not automatically through a WiiM speaker. Using WiiM as the Spotify Connect device needs additional device-selection / network integration work.
- The preexisting example playlist data remains in `app.js` to support the original prototype but **is not actual Spotify audio**. Don't treat its fake "Connected" labels as a service connection.
- A commercial deployment of the Spotify Web Playback SDK requires **Spotify's prior written approval**, subject to Spotify's developer policy.
- **Never paste a Spotify Client Secret into frontend JavaScript or upload one to GitHub.**
- This code has passed JavaScript syntax checks, but live Spotify authentication and streaming could not be tested without your Spotify app credentials and Premium account.

## Files

- `index.html`, `styles.css`, `app.js`: original interface extended with Spotify search UI and playback controls.
- `spotify.js`: authorization, API wrapper and Web Playback SDK.
- `assets/favicon.svg`: original favicon.
