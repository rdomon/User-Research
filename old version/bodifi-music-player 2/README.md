# Bodifi Music Player (Prototype)

> **This is a prototype for checking the look and the flow of the screens. It makes no sound. It is not connected to a WiiM device, Spotify, or Apple Music.**
> See [What is simulated](#what-is-simulated) and [What is not connected to WiiM](#what-is-not-connected-to-wiim) before you rely on anything you see.

## What the prototype does

A fitness instructor can choose music and reach the Now playing screen in this order:

1. Select an instructor
2. Select a music service (Spotify or Apple Music)
3. Select a class type (Power Circuit, Dance Cardio, or Strength & Flow)
4. Select a playlist
5. On the Now playing screen: play/pause, previous/next, pick a track, seek, change volume, and shuffle

It is built from the FigJam user flow "Bodifi Music Player User Flow" and a design made in Figma Make. It uses plain HTML, CSS, and JavaScript, with no libraries and no build step.

## How to start it

1. Unzip the folder. Keep `index.html`, `styles.css`, `app.js`, and `assets/` together in the same place.
2. Open `index.html` in a browser (Chrome is recommended). No server or installation is needed.
3. Connect to the internet the first time. The fonts load from Google Fonts. If the device is offline, the page falls back to the default sans-serif font, and everything still works.

The layout fits landscape tablets and desktops (801px wide and above) and portrait phones (800px wide and below).

## Controls

| Where | Action | Result |
| --- | --- | --- |
| Instructor, service, class, and playlist cards | Tap a card | Go to the next step |
| Top left of the setup card | **Back** | Go back one step |
| Progress bar at the top of setup | Tap a step | Jump to a step you have already reached (later steps cannot be tapped) |
| Top right of the header | Instructor name (profile) | Return to instructor selection. Playback stops |
| Bottom left of the setup screens | **?** (Help) | Show help. Close it with **Close**, a tap outside the box, or the `Esc` key |
| Now playing | Play button | Play / pause |
| Now playing | Previous / Next | Move to the previous or next track. If more than 3 seconds have played, Previous restarts the current track instead |
| Now playing | Progress bar | Move the playback position |
| Now playing | Volume bar | Change the volume number shown (the real volume does not change) |
| Now playing | Shuffle icon | Turn shuffle on or off. When on, Previous and Next pick a random track other than the current one |
| Playlist panel | Tap a track | Play that track |
| Playlist panel | **Change** | Return to playlist selection |
| Playlist panel | `‹` at the top right | Close the playlist. A **Playlist** button appears at the top left to open it again |

If you change a choice at an earlier step, the choices after it are cleared.

## What is simulated

These things only look real. The screen reproduces the behavior; nothing happens behind it.

| What you see | What actually happens |
| --- | --- |
| Play/pause, elapsed time, and the progress bar | A timer advances the numbers. **No sound is played.** |
| End of a track | When the elapsed time reaches the track length, the next track starts automatically |
| Volume bar and a number such as "72%" | The bar and the number move. They do not change any real volume |
| "Wi-Fi connected" in the header | **Fixed text.** The real Wi-Fi state is not checked |
| "Connected" on the music service cards | **Fixed text.** No login or account link exists |
| Instructors, classes, playlists, track titles, artists, and track lengths | Sample data written in `app.js`. These are not real songs or real account playlists |
| Track counts such as "21 tracks" | Display text only. Each playlist actually lists only **5 tracks** |
| **Browse all N tracks** | Shows a short message and nothing else |
| Instructor photos, album art, and logo | Replaced with initials in a circle, color gradients, and the text "bodifi" |
| Clock | This one is real. It shows the current time of the device the page is open on |

Reloading the page clears your choices and returns to the first screen. Nothing is saved.

## What is not connected to WiiM

The prototype never talks to a WiiM device. It **cannot**:

- Play sound through a WiiM, or control a WiiM's play, pause, or volume
- Check the WiiM's network connection
- Log in to Spotify or Apple Music, or load real playlists or tracks
- Run an automatic diagnosis from the Help screen (Help only shows instructions)

The Help text (check the WiiM connection, then contact the front desk if it does not improve) is the wording from the user flow, shown as a screen.

## What the instructor should test on the device

Open the prototype on the real device used in class (for example, the tablet). **Automated checks have been run, but a real device, touch input, and real sound have not been tested** (see [VERIFICATION.md](VERIFICATION.md)).

**Display and touch**
- [ ] The page fits the device screen and the text is readable. Can you read the instructor name, track title, and clock from where you stand in the studio?
- [ ] The buttons are easy to press with a finger (play, previous/next, shuffle, Back, Help). Do you press the wrong one by mistake?
- [ ] The progress bar and volume bar are easy to drag with a finger
- [ ] The layout does not break when you rotate the device between portrait and landscape
- [ ] The colors have enough contrast in both a bright studio and a dark studio

**Flow**
- [ ] You can go from instructor selection to the Now playing screen without getting lost. How many taps did it take? (The shortest path is 4 taps.)
- [ ] Is any step too long, or missing? (For example: should repeat users be able to skip re-selecting?)
- [ ] Back and the progress steps take you where you expect
- [ ] If you tap the wrong thing during class, you can recover quickly (Change, closing and opening the playlist)
- [ ] The Help text tells you what to do when something goes wrong

**Checks that need the real system, which this prototype cannot do**
- [ ] Sound actually plays through the WiiM
- [ ] The track names and order match the real playlists used in class
- [ ] Changing the volume matches the real volume of the device

## Files

```
bodifi-music-player/
├── index.html              Page structure
├── styles.css              Design
├── app.js                  Screen switching, state, and the playback simulation
├── assets/
│   └── favicon.svg         Browser tab icon
├── docs/screenshots/       Screens captured during verification (8 images)
├── tests/
│   ├── verify.js           Automated browser verification script
│   └── verify-output.txt   Output of that run
├── VERIFICATION.md         Verification log
└── README.md               This file
```

- **Images and icons:** The on-screen icons (play, previous/next, shuffle, and others) and the music service logos are written as inline SVG inside the HTML and JavaScript. The only separate image file is `assets/favicon.svg`.
- **Fonts:** DM Sans and Manrope load from Google Fonts. **The font files are not included** because they could not be downloaded in the environment where this was built. Offline, the page uses the default sans-serif font, and letter width and weight differ slightly. To use the prototype fully offline, download the two fonts, put them in `assets/fonts/`, and replace the Google Fonts link in `index.html` with `@font-face` rules.

## Changing the sample data

Edit `INSTRUCTORS`, `SERVICES`, `CLASSES`, and `PLAYLISTS` at the top of `app.js`. You can change track titles, artists, track lengths (in seconds), and colors (`hue`).

## Known limitations

- The instructor photos, album art, and logo images from Figma Make could not be retrieved, so substitutes are shown. The look differs a little from the design.
- In the user flow, closing Help returns to instructor selection. In this prototype, closing Help **returns to the screen you were on**, which matches the Figma Make design.
- Verification is mostly automated testing in Chromium. Safari, Firefox, a real tablet, and touch input have not been tested.

## Sources

- User flow: FigJam "Bodifi Music Player User Flow"
- Screen design: Figma Make design generated from the reference material
- Fonts: DM Sans and Manrope (Google Fonts)
