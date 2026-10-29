/* Bodifi Music Player — vanilla JS
   Flow: Select instructor → Music service → Class type → Playlist → Now playing
   (+ Help overlay, Back, progress-step jump, header profile, Change playlist, collapse playlist) */
(() => {
  'use strict';

  // ---------- Data ----------
  const STEPS = [
    { id: 'instructor', label: 'Select instructor' },
    { id: 'service', label: 'Music service' },
    { id: 'class', label: 'Class type' },
    { id: 'playlist', label: 'Playlist' },
  ];
  const NOW_PLAYING = 4;

  const INSTRUCTORS = [
    { name: 'Jordan M.', initial: 'J', hue: 18 },
    { name: 'Alex R.', initial: 'A', hue: 200 },
    { name: 'Taylor S.', initial: 'T', hue: 285 },
  ];

  const SERVICES = [
    {
      name: 'Spotify',
      path: 'M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z',
    },
    {
      name: 'Apple Music',
      path: 'M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03a12.5 12.5 0 001.57-.1c.822-.106 1.596-.35 2.295-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.045-1.773-.6-1.943-1.536a1.88 1.88 0 011.038-2.022c.323-.16.67-.25 1.018-.324.378-.082.758-.153 1.134-.24.274-.063.457-.23.51-.516a.904.904 0 00.02-.193c0-1.815 0-3.63-.002-5.443a.725.725 0 00-.026-.185c-.04-.15-.15-.243-.304-.234-.16.01-.318.035-.475.066-.76.15-1.52.303-2.28.456l-2.325.47-1.374.278c-.016.003-.032.01-.048.013-.277.077-.377.203-.39.49-.002.042 0 .086 0 .13-.002 2.602 0 5.204-.003 7.805 0 .42-.047.836-.215 1.227-.278.64-.77 1.04-1.434 1.233-.35.1-.71.16-1.075.172-.96.036-1.755-.6-1.92-1.544-.14-.812.23-1.685 1.154-2.075.357-.15.73-.232 1.108-.31.287-.06.575-.116.86-.177.383-.083.583-.323.6-.714v-.15c0-2.96 0-5.922.002-8.882 0-.123.013-.25.042-.37.07-.285.273-.448.546-.518.255-.066.515-.112.774-.165.733-.15 1.466-.296 2.2-.444l2.27-.46c.67-.134 1.34-.27 2.01-.403.22-.043.442-.088.663-.106.31-.025.523.17.554.482.008.073.012.148.012.223.002 1.91.002 3.822 0 5.732z',
    },
  ];

  const CLASSES = [
    { name: 'Power Circuit', time: '45 min', detail: 'High energy' },
    { name: 'Dance Cardio', time: '50 min', detail: 'Dance' },
    { name: 'Strength & Flow', time: '60 min', detail: 'Balanced' },
  ];

  // dur = seconds, hue = placeholder artwork colour
  const PLAYLISTS = [
    {
      name: 'Power Circuit', count: '24 tracks', length: '1 hr 26 min', hue: 75,
      tracks: [
        { title: 'Run It Up', artist: 'Sienna Vale', dur: 222, hue: 75 },
        { title: 'All The Way', artist: 'Nova Ray', dur: 198, hue: 15 },
        { title: 'Higher Ground', artist: 'Sienna Vale', dur: 242, hue: 210 },
        { title: 'Move With Me', artist: 'Jordan K.', dur: 216, hue: 330 },
        { title: 'One More Round', artist: 'The Current', dur: 231, hue: 45 },
      ],
    },
    {
      name: 'Cardio After Dark', count: '21 tracks', length: '1 hr 12 min', hue: 265,
      tracks: [
        { title: 'Neon Pulse', artist: 'Kite Avenue', dur: 205, hue: 265 },
        { title: 'Midnight Sprint', artist: 'Nova Ray', dur: 189, hue: 300 },
        { title: 'After Hours', artist: 'The Current', dur: 224, hue: 240 },
        { title: 'Heartbeat City', artist: 'Sienna Vale', dur: 211, hue: 180 },
        { title: 'Lights Out', artist: 'Jordan K.', dur: 197, hue: 20 },
      ],
    },
    {
      name: 'Sunday Reset', count: '18 tracks', length: '58 min', hue: 150,
      tracks: [
        { title: 'Slow Morning', artist: 'Marlow', dur: 236, hue: 150 },
        { title: 'Deep Breath', artist: 'Aya Lin', dur: 208, hue: 190 },
        { title: 'Open Window', artist: 'Marlow', dur: 251, hue: 95 },
        { title: 'Soft Landing', artist: 'The Current', dur: 219, hue: 35 },
        { title: 'Still Water', artist: 'Aya Lin', dur: 244, hue: 220 },
      ],
    },
  ];

  // ---------- State ----------
  const state = {
    step: 0,            // 0-3 setup, 4 now playing
    furthest: 0,        // furthest setup step the user may jump to
    returnStep: 0,      // step to show when help closes (kept for clarity)
    instructor: 0,
    service: null,
    classType: null,
    playlist: null,
    track: 0,
    elapsed: 0,
    playing: false,
    shuffle: false,
    volume: 72,
    collapsed: false,
  };

  // ---------- Helpers ----------
  const $ = (id) => document.getElementById(id);
  const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  const currentTracks = () => PLAYLISTS[state.playlist ?? 0].tracks;
  const currentTrack = () => currentTracks()[state.track];

  const spotify = window.BodifiSpotify;
  let realPlaylist = null, realTracks = [], realTrack = null, realActive = false;
  let playlistListUnavailable = false;
  let libraryOffset = 0, libraryLoading = false, currentSpotifyTab = 'search';
  const libraryItems = new Map();
  let profileCache = null;
  let stepPlaylists = [];
  let stepPlaylistsLoading = false;
  let realPosition = 0, realDuration = 0, realPaused = true;
  const safe = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const imageHTML = (url, hue = 100) => url && /^https:\/\//.test(url) ? `<img class="spotify-cover" src="${safe(url)}" alt="Album art" />` : artHTML(hue);
  const report = err => { console.error(err); toast(err.message || String(err)); $('spotifyResults').textContent = err.message || String(err); };
  async function realAction(fn) { try { await fn(); } catch (err) { report(err); } }
  function applyPlayback(data) {
    if (!data?.playback) return;
    const ps = data.playback, tr = ps.track_window?.current_track;
    if (!tr) return;
    realActive = true; realTrack = { uri: tr.uri, title: tr.name, artist: tr.artists?.map(x => x.name).join(', ') || '', dur: (tr.duration_ms || 0)/1000, image: tr.album?.images?.[0]?.url };
    realPosition = ps.position / 1000; realDuration = realTrack.dur; realPaused = ps.paused;
    state.playing = !realPaused;
    if (state.step === NOW_PLAYING) { renderTrackInfo(); renderPlayButton(); }
  }
  async function connectPlayback() {
    const r = await spotify.connect(applyPlayback, report);
    toast('Spotify browser player is ready'); return r;
  }
  function showSpotifyModal() { $('spotifyModal').hidden = false; renderSpotifyAccount(); setSpotifyTab(currentSpotifyTab); updateContinueButton(); }
  function updateContinueButton() { $('continueSetup').hidden = !(spotify.connected() && state.step === 1); }
  function continueSetup() { if (!spotify.connected()) { toast('Connect Spotify first.'); return; } $('spotifyModal').hidden = true; state.service = 0; state.furthest = Math.max(state.furthest, 2); goTo(2); }
  function setSpotifyTab(tab) {
    currentSpotifyTab = tab;
    document.querySelectorAll('[data-spotify-tab]').forEach(b => {
      const active = b.dataset.spotifyTab === tab;
      b.classList.toggle('active', active);
      b.setAttribute('aria-selected', String(active));
    });
    $('spotifySearchView').hidden = tab !== 'search';
    $('spotifyLibraryView').hidden = tab !== 'library';
    $('spotifyProfileView').hidden = tab !== 'account';
    updateContinueButton();
    $('spotifyModalTitle').textContent = ({ search:'Search music', library:'My Library', account:'My Spotify Account' })[tab];
    if (!spotify.connected()) return;
    if (tab === 'library' && !libraryItems.size) realAction(() => fetchMyPlaylists(true));
    if (tab === 'account') realAction(fetchMyProfile);
  }
  async function fetchMyProfile() {
    const el = $('spotifyProfile');
    el.textContent = 'Loading your Spotify profile…';
    try {
      profileCache = profileCache || await spotify.api('/me');
      const p = profileCache;
      const photo = p.images?.[0]?.url;
      const profileLink = p.external_urls?.spotify || `https://open.spotify.com/user/${encodeURIComponent(p.id || '')}`;
      el.innerHTML = `<div class="spotify-profile-card">${photo ? `<img class="spotify-profile-avatar" src="${safe(photo)}" alt="Spotify profile image">` : '<span class="spotify-profile-avatar placeholder">♫</span>'}<div><strong>${safe(p.display_name || p.id || 'Spotify user')}</strong><small>Connected Spotify account</small><a target="_blank" rel="noopener noreferrer" href="${safe(profileLink)}">Open profile on Spotify ↗</a></div></div>`;
    } catch(e) { el.textContent = `Could not load your account: ${e.message}`; }
  }
  async function fetchMyPlaylists(reset = false) {
    if (libraryLoading) return;
    if (reset) { libraryOffset = 0; libraryItems.clear(); $('myPlaylists').replaceChildren(); }
    libraryLoading = true;
    const el = $('myPlaylists');
    const more = $('loadMorePlaylists');
    more.hidden = true;
    const status = document.createElement('p'); status.className = 'spotify-help-text'; status.textContent = 'Loading playlists…'; el.append(status);
    try {
      const page = await spotify.myPlaylists(libraryOffset);
      status.remove();
      const items = (page?.items || []).filter(Boolean);
      for (const x of items) {
        if (!x.id || !x.uri) continue;
        libraryItems.set(x.id, x);
        const b = document.createElement('button'); b.className = 'spotify-result'; b.type = 'button';
        b.dataset.kind = 'playlist'; b.dataset.id = x.id; b.dataset.uri = x.uri;
        const cover = imageHTML(x.images?.[0]?.url);
        const count = x.items?.total ?? x.tracks?.total;
        b.innerHTML = `${cover}<span><strong>${safe(x.name)}</strong><small>${count == null ? 'Spotify playlist' : `${count} tracks`} · ${safe(x.owner?.display_name || 'Spotify')}</small></span><span class="spotify-action">Play ›</span>`;
        el.append(b);
      }
      libraryOffset += items.length;
      if (!libraryItems.size) el.innerHTML = '<p class="spotify-help-text">No playlists found on this Spotify account.</p>';
      more.hidden = !(page?.next && items.length);
    } catch (e) {
      status.remove();
      const err = document.createElement('p'); err.className = 'playlist-notice';
      err.textContent = `Could not load playlists: ${e.message}. Try reconnecting Spotify and allowing playlist access.`;
      el.append(err);
    } finally { libraryLoading = false; }
  }
  function renderSpotifyAccount() {
    const account = $('spotifyAccount');
    if (!spotify.clientId()) {
      account.innerHTML = `<p>Enter your Spotify Developer Client ID. Register this page URL as the Redirect URI in your Spotify app.</p><form id="spotifyClientForm" class="spotify-config-form"><input aria-label="Spotify Client ID" placeholder="Spotify Client ID" required pattern="[a-zA-Z0-9]+" /><button type="submit">Save Client ID</button></form>`;
    } else if (!spotify.connected()) {
      account.innerHTML = `<p>Connect Spotify Premium to search and play real music. <button id="editClientId" class="spotify-link" type="button">Change Client ID</button></p><button id="connectSpotify" type="button" class="spotify-primary">Connect Spotify account</button>`;
    } else {
      account.innerHTML = `<div class="spotify-connected"><span class="connection-dot"></span> Spotify authorized <button id="logoutSpotify" class="spotify-link" type="button">Disconnect</button></div><button id="activateSpotify" class="spotify-outline" type="button">Activate browser audio</button>`;
    }
    $('spotifySearchForm').hidden = !spotify.connected();
    document.querySelector('.spotify-tabs').hidden = !spotify.connected();
  }
  async function performSearch(q, type) {
    $('spotifyResults').textContent = 'Searching Spotify…';
    const result = await spotify.search(q, type);
    const tracks = result.tracks?.items || [], playlists = (result.playlists?.items || []).filter(Boolean);
    $('spotifyResults').innerHTML = `<p class="spotify-result-label">Songs (${tracks.length})</p>` + tracks.map(t => `<button class="spotify-result" data-uri="${safe(t.uri)}" data-kind="track">${imageHTML(t.album?.images?.[0]?.url)}<span><strong>${safe(t.name)}</strong><small>${safe(t.artists?.map(x=>x.name).join(', '))}</small></span><span class="spotify-action">Play ›</span></button>`).join('') + `<p class="spotify-result-label">Playlists (${playlists.length})</p>` + playlists.map(x => `<button class="spotify-result" data-id="${safe(x.id)}" data-uri="${safe(x.uri)}" data-kind="playlist">${imageHTML(x.images?.[0]?.url)}<span><strong>${safe(x.name)}</strong><small>${safe(x.owner?.display_name || 'Spotify playlist')}</small></span><span class="spotify-action">Open ›</span></button>`).join('');
    if (!tracks.length && !playlists.length) $('spotifyResults').innerHTML = '<p>No results found. Try a different search.</p>';
  }
  async function loadPlaylist(id, uri) {
    realPlaylist = { id, uri, title: 'Spotify playlist', total: null };
    realTracks = [];
    realTrack = null;
    playlistListUnavailable = false;
    try {
      const detail = await spotify.api(`/playlists/${encodeURIComponent(id)}`);
      realPlaylist.title = detail.name || 'Spotify playlist';
      realPlaylist.total = detail.items?.total ?? null;
    } catch (e) {
      console.warn('Playlist metadata unavailable:', e);
    }
    try {
      // In Spotify Development Mode (2026), only owned/collaborative
      // playlists expose items. Load all available pages, not just 50.
      const entries = await spotify.playlistItemsAll(id);
      realTracks = entries.map(entry => entry.item || entry.track)
        .filter(x => x?.uri?.startsWith('spotify:track:'))
        .map(x => ({ uri: x.uri, title: x.name, artist: x.artists?.map(y => y.name).join(', ') || '', dur: (x.duration_ms || 0) / 1000, image: x.album?.images?.[0]?.url }));
    } catch (e) {
      playlistListUnavailable = true;
      console.warn('Playlist items unavailable:', e);
      toast('This playlist can play, but Spotify restricts its track list.');
    }
    state.step = NOW_PLAYING; state.service = 0; realActive = true; state.playing = false;
    $('spotifyModal').hidden = true; render();
    await connectPlayback();
    await spotify.play({ context_uri: uri });
  }
  const NOTE_SVG =
    '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>';

  const artHTML = (hue) =>
    `<span class="art" style="background:linear-gradient(135deg,hsl(${hue} 55% 38%),hsl(${(hue + 40) % 360} 60% 22%))">${NOTE_SVG}</span>`;

  const avatarStyle = (hue) => `background:linear-gradient(135deg,hsl(${hue} 55% 45%),hsl(${hue} 50% 25%))`;

  let toastTimer;
  function toast(msg) {
    const el = $('toast');
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (el.hidden = true), 2400);
  }

  // ---------- Navigation ----------
  function goTo(step) {
    state.step = step;
    render();
  }

  function choose(stepIndex, apply) {
    apply();
    // Re-choosing an earlier step invalidates later choices
    if (stepIndex < 1) { state.service = null; }
    if (stepIndex < 2) { state.classType = null; }
    if (stepIndex < 3) { state.playlist = null; }
    state.furthest = Math.max(stepIndex + 1, Math.min(state.furthest, stepIndex + 1));
    goTo(stepIndex + 1);
  }

  function goBack() {
    if (state.step > 0 && state.step < NOW_PLAYING) goTo(state.step - 1);
  }

  // ---------- Rendering ----------
  function renderProgress() {
    $('flowProgress').innerHTML = STEPS.map((s, i) => {
      const complete = i <= state.step;
      const reachable = i <= state.furthest;
      return `<button type="button" data-step="${i}" class="${complete ? 'complete' : ''}"
        ${reachable ? '' : 'disabled'} ${state.step === i ? 'aria-current="step"' : ''}>
        <i>${i + 1}</i>${s.label}</button>`;
    }).join('');
  }

  function renderSetup() {
    const eyebrow = $('setupEyebrow');
    const title = $('setupTitle');
    const sub = $('setupSub');
    const body = $('setupBody');
    const inst = INSTRUCTORS[state.instructor];

    $('backButton').hidden = state.step === 0;

    if (state.step === 0) {
      eyebrow.textContent = 'Welcome back';
      title.textContent = 'Select instructor';
      sub.textContent = 'Choose your profile to load your classes and playlists.';
      body.innerHTML = `<div class="choice-grid three">${INSTRUCTORS.map((p, i) => `
        <button class="choice-card ${state.furthest > 0 && state.instructor === i ? 'selected' : ''}" type="button" data-pick="${i}">
          <span class="choice-avatar" style="width:64px;height:64px;${avatarStyle(p.hue)}">${p.initial}</span>
          <strong>${p.name}</strong><small>Instructor</small>
        </button>`).join('')}</div>`;
    } else if (state.step === 1) {
      eyebrow.textContent = inst.name;
      title.textContent = 'Music service';
      sub.textContent = 'Choose Spotify to sign in, or continue with your authorized account.';
      body.innerHTML = `<p class="connection-guidance" role="status">${spotify.connected() ? '● Spotify account authorized. Tap Spotify to continue to Class type.' : '● Spotify account not connected. Tap Spotify to sign in.'}</p><div class="choice-grid two">${SERVICES.map((s, i) => `
        <button class="choice-card ${state.service === i ? 'selected' : ''}" type="button" data-pick="${i}">
          <span class="service-mark"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${s.path}"/></svg></span>
          <strong>${s.name}</strong><small>${i === 0 ? (spotify.connected() ? "Authorized" : "Connect account") : "Prototype only"}</small>
        </button>`).join('')}</div>`;
    } else if (state.step === 2) {
      eyebrow.textContent = `${SERVICES[state.service].name} selected`;
      title.textContent = 'Class type';
      sub.textContent = 'Select the class you are about to teach.';
      body.innerHTML = `<div class="choice-grid three">${CLASSES.map((c, i) => `
        <button class="choice-card class-card ${state.classType === i ? 'selected' : ''}" type="button" data-pick="${i}">
          <span class="class-number">0${i + 1}</span>
          <strong>${c.name}</strong><small>${c.time} · ${c.detail}</small>
        </button>`).join('')}</div>`;
    } else if (state.step === 3) {
      eyebrow.textContent = CLASSES[state.classType].name;
      title.textContent = 'Playlist';
      sub.textContent = 'Select music, then continue to the Now playing screen.';
      if (state.service === 0 && spotify.connected()) {
        body.innerHTML = `<div class="playlist-choices" id="setupSpotifyPlaylists"><p class="spotify-help-text">Loading your Spotify playlists…</p></div><button class="spotify-outline setup-search" type="button" id="searchOtherMusic">Search Spotify instead</button>`;
        if (stepPlaylists.length) renderStepPlaylists();
        else if (!stepPlaylistsLoading) realAction(fetchStepPlaylists);
      } else {
        body.innerHTML = `<p class="spotify-help-text">Please connect Spotify to choose real music.</p>`;
      }
    }
  }

  async function fetchStepPlaylists() {
    if (stepPlaylistsLoading || state.step !== 3) return;
    stepPlaylistsLoading = true;
    try {
      // Fetch up to 200 playlists to offer a useful account library on the setup screen.
      const found = [];
      for (let offset = 0; offset < 200; offset += 50) {
        const page = await spotify.myPlaylists(offset);
        const items = (page.items || []).filter(Boolean);
        found.push(...items);
        if (!page.next || !items.length) break;
      }
      stepPlaylists = found;
      if (state.step === 3) renderStepPlaylists();
    } catch (err) {
      const el = $('setupSpotifyPlaylists');
      if (el) el.innerHTML = `<p class="spotify-help-text">Couldn't load your playlists. Use Search Spotify or try again.</p><button class="spotify-outline" id="retrySetupPlaylists" type="button">Retry</button>`;
      console.error(err);
    } finally { stepPlaylistsLoading = false; }
  }
  function renderStepPlaylists() {
    const el = $('setupSpotifyPlaylists'); if (!el) return;
    if (!stepPlaylists.length) {
      el.innerHTML = '<p class="spotify-help-text">No Spotify playlists found. You can search for music instead.</p>';
      return;
    }
    el.innerHTML = stepPlaylists.map((p,i) => `<button type="button" class="playlist-choice" data-real-playlist="${i}">
      ${imageHTML(p.images?.[0]?.url)}
      <span class="meta"><strong>${safe(p.name)}</strong><small>${p.items?.total ?? p.tracks?.total ?? '—'} tracks · ${safe(p.owner?.display_name || 'Spotify')}</small></span>
      <span class="playlist-arrow" aria-hidden="true">›</span>
    </button>`).join('');
  }

  function renderPlaylistPanel() {
    const pl = realActive ? { name: realPlaylist?.title || 'Spotify music', tracks: realTracks } : PLAYLISTS[state.playlist ?? 0];
    $('plName').textContent = pl.name;
    $('browseBtn').textContent = realActive ? 'Search Spotify' : `Browse all ${parseInt(pl.count, 10)} tracks`;
    const displayCount = realActive
      ? (playlistListUnavailable ? (realPlaylist?.total != null ? `${realPlaylist.total} tracks · list restricted` : 'Track list restricted')
        : realPlaylist?.total != null && realTracks.length < realPlaylist.total ? `${realTracks.length} of ${realPlaylist.total} tracks` : `${realTracks.length} tracks`)
      : pl.count;
    $('plSummary').innerHTML = `<span>${safe(displayCount)}</span><span>${realActive ? 'Spotify' : pl.length}</span><span>${safe(CLASSES[state.classType ?? 0].detail)}</span>`;
    // A search result is one song, not an empty playlist. For a playlist
    // Spotify restricts, show the real now-playing track without claiming to
    // have downloaded the playlist's full track list.
    const showCurrentOnly = realActive && !realTracks.length && realTrack;
    const rows = showCurrentOnly ? [realTrack] : pl.tracks;
    $('trackList').innerHTML = rows.map((t, i) => {
      const active = realActive ? (realTrack?.uri === t.uri) : i === state.track;
      return `<button type="button" class="track-row ${active ? 'active' : ''}" data-track="${i}" ${showCurrentOnly ? 'data-current-only="true"' : ''}>
        <span class="track-number">${active && state.playing ? '●' : String(i + 1).padStart(2, '0')}</span>
        ${imageHTML(t.image, t.hue)}
        <span class="row-copy"><strong>${safe(t.title)}</strong><small>${safe(t.artist)}</small></span>
        <span class="duration">${fmt(t.dur)}</span>
        ${active ? '<svg width="7" height="14" viewBox="0 0 10.5 19.5" fill="none"><path d="M0.75 18.75L9.75 9.75L0.75 0.75" stroke="#C8F542" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' : '<span></span>'}
      </button>`;
    }).join('');
    if (realActive && playlistListUnavailable) {
      $('trackList').insertAdjacentHTML('beforeend', '<p class="playlist-notice">Spotify limits track lists to playlists you own or collaborate on. The current song appears above; search for other songs using Search Spotify.</p>');
    } else if (realActive && !rows.length) {
      $('trackList').insertAdjacentHTML('beforeend', '<p class="playlist-notice">No tracks available yet. Start playback or search for music.</p>');
    }
  }

  function renderTrackInfo() {
    const t = realActive ? (realTrack || realTracks[0] || {title:"Select a song",artist:"Spotify",dur:1}) : currentTrack();
    $('trackTitle').textContent = t.title;
    $('trackArtist').textContent = t.artist;
    $('albumArt').innerHTML = imageHTML(t.image, t.hue);
    $('timeTotal').textContent = fmt(t.dur || 0);
    $('ctxService').textContent = SERVICES[state.service ?? 0].name;
    $('ctxClass').textContent = CLASSES[state.classType ?? 0].name;
    renderPlaylistPanel();
    renderTime();
  }

  function setRange(el, pct) {
    el.value = pct;
    el.style.setProperty('--value', `${pct}%`);
  }

  function renderTime() {
    const t = realActive ? (realTrack || {dur:1}) : currentTrack();
    const pct = Math.min(100, ((realActive ? realPosition : state.elapsed) / (t.dur || 1)) * 100);
    setRange($('songProgress'), pct);
    $('timeElapsed').textContent = fmt(realActive ? realPosition : state.elapsed);
  }

  function renderPlayButton() {
    const b = $('playBtn');
    b.setAttribute('aria-label', state.playing ? 'Pause' : 'Play');
    b.innerHTML = state.playing
      ? '<svg width="34" height="34" viewBox="0 0 33 33" fill="none"><path d="M11 8.25V24.75M22 8.25V24.75" stroke="#111827" stroke-width="4.125" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      : '<span class="play-icon"></span>';
  }

  function renderHeader() {
    const p = INSTRUCTORS[state.instructor];
    $('profileName').textContent = p.name;
    $('profileAvatar').textContent = p.initial;
    $('profileAvatar').setAttribute('style', avatarStyle(p.hue));
  }

  function render() {
    const playing = state.step === NOW_PLAYING;
    $('setupScreen').hidden = playing;
    $('dashboard').hidden = !playing;
    $('dashboard').classList.toggle('playlist-collapsed', state.collapsed);
    renderHeader();
    $('openSearch').hidden = !spotify.connected();
    if (playing) {
      renderTrackInfo();
      renderPlayButton();
      $('shuffleBtn').classList.toggle('on', state.shuffle);
      $('shuffleBtn').setAttribute('aria-pressed', String(state.shuffle));
    } else {
      renderProgress();
      renderSetup();
    }
  }

  // ---------- Playback ----------
  function selectTrack(i) {
    state.track = i;
    state.elapsed = 0;
    state.playing = true;
    renderTrackInfo();
    renderPlayButton();
  }

  function nextIndex(dir) {
    const n = currentTracks().length;
    if (state.shuffle && n > 1) {
      let r;
      do { r = Math.floor(Math.random() * n); } while (r === state.track);
      return r;
    }
    return (state.track + dir + n) % n;
  }

  function move(dir) {
    selectTrack(nextIndex(dir));
  }

  setInterval(() => {
    if (realActive) { if (state.step === NOW_PLAYING && !realPaused) { realPosition = Math.min(realDuration, realPosition + .25); renderTime(); } return; }
    if (state.step !== NOW_PLAYING || !state.playing) return;
    state.elapsed += 0.25;
    if (state.elapsed >= currentTrack().dur) {
      move(1);
    } else {
      renderTime();
    }
  }, 250);

  // ---------- Clock ----------
  function updateClock() {
    $('clock').textContent = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
      .format(new Date()).replace(' ', '');
  }
  updateClock();
  setInterval(updateClock, 15000);

  // ---------- Help ----------
  function openHelp() { $('helpOverlay').hidden = false; $('helpClose').focus(); }
  function closeHelp() { $('helpOverlay').hidden = true; }

  // ---------- Events ----------
  $('flowProgress').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-step]');
    if (b && !b.disabled) goTo(Number(b.dataset.step));
  });

  $('setupBody').addEventListener('click', (e) => {
    const b = e.target.closest('[data-pick]');
    if (!b) return;
    const i = Number(b.dataset.pick);
    if (state.step === 0) choose(0, () => { state.instructor = i; });
    else if (state.step === 1) { if (i === 0) { state.service = 0; if (spotify.connected()) { state.furthest = Math.max(state.furthest, 2); goTo(2); } else showSpotifyModal(); } else toast('Apple Music is a prototype option. Select Spotify for real playback.'); }
    else if (state.step === 2) choose(2, () => { state.classType = i; });
    else if (state.step === 3) {
      toast('Choose one of your Spotify playlists or use Search Spotify.');
    }
  });

  $('setupBody').addEventListener('click', e => {
    const card = e.target.closest('[data-real-playlist]');
    if (card) {
      const p = stepPlaylists[Number(card.dataset.realPlaylist)];
      if (p) realAction(() => loadPlaylist(p.id, p.uri));
    }
    if (e.target.closest('#searchOtherMusic')) { showSpotifyModal(); setSpotifyTab('search'); }
    if (e.target.closest('#retrySetupPlaylists')) realAction(fetchStepPlaylists);
  });
  $('continueSetup').addEventListener('click', continueSetup);
  $('backButton').addEventListener('click', goBack);
  $('profileButton').addEventListener('click', () => { state.playing = false; goTo(0); });
  $('helpButton').addEventListener('click', openHelp);
  $('helpClose').addEventListener('click', closeHelp);
  $('helpOverlay').addEventListener('click', (e) => { if (e.target === $('helpOverlay')) closeHelp(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeHelp(); });

  $('playBtn').addEventListener('click', () => { if (realActive) { realAction(async () => { if (realPaused) await spotify.resume(); else await spotify.pause(); }); return; } state.playing = !state.playing; renderPlayButton(); renderPlaylistPanel(); });
  $('prevBtn').addEventListener('click', () => { if (realActive) { realAction(() => spotify.prev()); return; }
    if (state.elapsed > 3) { state.elapsed = 0; renderTime(); } else move(-1);
  });
  $('nextBtn').addEventListener('click', () => realActive ? realAction(() => spotify.next()) : move(1));
  $('shuffleBtn').addEventListener('click', () => {
    state.shuffle = !state.shuffle;
    $('shuffleBtn').classList.toggle('on', state.shuffle);
    $('shuffleBtn').setAttribute('aria-pressed', String(state.shuffle));
    if (realActive) realAction(() => spotify.shuffle(state.shuffle)); else toast(state.shuffle ? 'Shuffle on' : 'Shuffle off');
  });

  $('songProgress').addEventListener('input', (e) => {
    const pct = Number(e.target.value);
    if (realActive) { realAction(() => spotify.seek((pct / 100) * realDuration * 1000)); return; }
    state.elapsed = (pct / 100) * currentTrack().dur;
    renderTime();
  });
  $('volume').addEventListener('input', (e) => {
    state.volume = Number(e.target.value);
    setRange(e.target, state.volume);
    $('volumeLabel').textContent = `${state.volume}%`;
    if (realActive) realAction(() => spotify.volume(state.volume));
  });

  $('trackList').addEventListener('click', (e) => {
    const b = e.target.closest('[data-track]');
    if (b) { if (realActive) { const t = b.dataset.currentOnly ? realTrack : realTracks[Number(b.dataset.track)]; if (t?.uri) realAction(() => spotify.play({uris:[t.uri]})); } else selectTrack(Number(b.dataset.track)); }
  });
  $('changePlaylist').addEventListener('click', () => { state.playing = false; goTo(3); });
  $('collapsePlaylist').addEventListener('click', () => { state.collapsed = true; $('dashboard').classList.add('playlist-collapsed'); });
  $('expandPlaylist').addEventListener('click', () => { state.collapsed = false; $('dashboard').classList.remove('playlist-collapsed'); });
  $('browseBtn').addEventListener('click', () => realActive ? showSpotifyModal() : toast('Showing the first 5 sample tracks')); 

  $('openSearch').addEventListener('click', showSpotifyModal);
  $('closeSpotifyModal').addEventListener('click', () => { $('spotifyModal').hidden = true; });
  $('spotifyModal').addEventListener('click', e => { if (e.target === $('spotifyModal')) $('spotifyModal').hidden = true; });
  $('spotifyAccount').addEventListener('submit', e => { if (e.target.id === 'spotifyClientForm') { e.preventDefault(); spotify.setClientId(e.target.querySelector('input').value); renderSpotifyAccount(); } });
  $('spotifyAccount').addEventListener('click', e => {
    if (e.target.id === 'connectSpotify') realAction(() => spotify.auth());
    if (e.target.id === 'activateSpotify') realAction(connectPlayback);
    if (e.target.id === 'logoutSpotify') { spotify.logout(); realActive = false; libraryItems.clear(); profileCache = null; currentSpotifyTab = 'search'; renderSpotifyAccount(); setSpotifyTab('search'); render(); }
    if (e.target.id === 'editClientId') { spotify.setClientId(''); renderSpotifyAccount(); }
  });
  $('spotifySearchForm').addEventListener('submit', e => { e.preventDefault(); realAction(() => performSearch($('spotifyQuery').value.trim(), $('spotifySearchType').value)); });
  document.querySelectorAll('[data-spotify-tab]').forEach(b => b.addEventListener('click', () => setSpotifyTab(b.dataset.spotifyTab)));
  $('refreshLibrary').addEventListener('click', () => realAction(() => fetchMyPlaylists(true)));
  $('loadMorePlaylists').addEventListener('click', () => realAction(() => fetchMyPlaylists(false)));
  $('myPlaylists').addEventListener('click', e => {
    const b = e.target.closest('button[data-kind="playlist"]'); if (!b) return;
    realAction(() => loadPlaylist(b.dataset.id, b.dataset.uri));
  });
  $('spotifyResults').addEventListener('click', e => {
    const b = e.target.closest('button.spotify-result'); if (!b) return;
    realAction(async () => {
      if (b.dataset.kind === 'playlist') return loadPlaylist(b.dataset.id, b.dataset.uri);
      await connectPlayback(); await spotify.play({uris:[b.dataset.uri]});
      realActive = true; realPlaylist = {title:'Spotify search', total:1}; realTracks = []; realTrack = null; playlistListUnavailable = false;
      state.service = 0; state.step = NOW_PLAYING; $('spotifyModal').hidden = true; render();
    });
  });

  function updateNetworkIndicator() {
    const online = navigator.onLine;
    $('networkStatusText').textContent = online ? 'Network available' : 'Offline · Spotify unavailable';
    $('networkStatus').classList.toggle('network-offline', !online);
  }
  window.addEventListener('online', updateNetworkIndicator);
  window.addEventListener('offline', updateNetworkIndicator);
  updateNetworkIndicator();

  // ---------- Init ----------
  setRange($('volume'), state.volume);
  render();
  spotify.callback().then(() => { if (spotify.connected()) { if (state.step === 0) { state.step = 1; state.furthest = Math.max(state.furthest, 1); } showSpotifyModal(); toast('Spotify connected. Continue to class type!'); } }).catch(report);
})();
