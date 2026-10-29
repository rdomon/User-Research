# Verification Log

## Date and environment

- Date: 2026-10-29
- Browser: Chromium 153.0.8010.12 (Playwright 1.63.0, headless)
- Runtime: Node.js v22.23.4, Linux
- How it was opened: `index.html` opened directly with `file://`
- Screen sizes: 1280×800 (landscape) and 390×844 (phone)

## Result

**All 31 checks passed.** The output of `tests/verify.js` is saved in `tests/verify-output.txt`.
To run it again: `npm i playwright`, then `node tests/verify.js`.

| # | What was checked | Result |
| --- | --- | --- |
| 1 | The first screen is "Select instructor" | Pass |
| 2 | Choosing an instructor opens "Music service" and updates the name in the header | Pass |
| 3 | Choosing a service opens "Class type" | Pass |
| 4 | Back returns to the previous step | Pass |
| 5 | A progress step that has not been reached cannot be clicked | Pass |
| 6 | Tapping a progress step goes back to it | Pass |
| 7 | Choosing a class opens "Playlist" | Pass |
| 8 | Help opens | Pass |
| 9 | `Esc` closes Help and the screen stays where it was | Pass |
| 10 | Choosing a playlist opens Now playing (paused at first) | Pass |
| 11 | Now playing shows the chosen service and class | Pass |
| 12 | The track count on the Browse button matches the playlist | Pass |
| 13 | The play button turns into a pause button | Pass |
| 14 | Elapsed time advances while playing (0:02 after 2 seconds) | Pass |
| 15 | Pause turns the button back into a play button | Pass |
| 16 | Tapping a track in the list plays that track | Pass |
| 17 | Next | Pass |
| 18 | Previous | Pass |
| 19 | Next on the last track wraps to the first track | Pass |
| 20 | Setting the progress bar to 50% shows 1:42 elapsed | Pass |
| 21 | The volume bar changes the label to 30% | Pass |
| 22 | Shuffle turns on | Pass |
| 23 | Next with shuffle on moves to a different track | Pass |
| 24 | Closing the playlist shows the Playlist button | Pass |
| 25 | The playlist opens again | Pass |
| 26 | Change returns to playlist selection | Pass |
| 27 | Choosing a different playlist shows its first track, paused | Pass |
| 28 | The header profile returns to instructor selection | Pass |
| 29 | Help opens and closes on another step (Music service) | Pass |
| 30 | No horizontal scrolling at phone width (390px) | Pass |
| 31 | No JavaScript errors | Pass |

Screen captures are in `docs/screenshots/` (instructor, service, class, playlist, help, Now playing, playlist closed, and phone width).

## Problems found and fixed during verification

| Problem | Fix |
| --- | --- |
| "Browse all 24 tracks" did not match each playlist's track count (21 and 18) | The label now follows the playlist's track count. Re-verified: pass |
| At phone width, "Back" overlapped the heading (the instructor name) | Added space above the heading. Checked on screen |
| A wrong expectation in the test (it expected the first service choice after the service had been changed) | Not an app bug. The test was corrected. The changed choice was reflected correctly |

## What has not been verified

- **Safari, Firefox, and Edge:** not tested
- **Real tablets and phones, touch input, and screen rotation:** not tested (phone width was checked only by resizing the browser window)
- **Google Fonts:** loading was blocked in the test environment, so the look with DM Sans and Manrope was not verified (tests and screenshots used the default sans-serif font)
- **Sound:** out of scope, because the prototype has no audio
- **WiiM, Spotify, and Apple Music:** out of scope, because the prototype is not connected to them
- **Long continuous playback:** not tested (automatic switching to the next track was checked only briefly; Next on the last track was checked)
- **Screen readers and keyboard-only use:** not tested (buttons have `aria-label` attributes)
- **Match with the Figma design:** images could not be retrieved, so the match covers only colors, layout, and text sizes rebuilt from the code. Parts that use images differ

## Device testing

The items for the instructor to check are in the "What the instructor should test on the device" section of `README.md`.
