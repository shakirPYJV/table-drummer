# Table Drummer v1.4

A rhythm game you play by hitting a table with drumsticks, or by clapping. Your microphone is the controller.

**Created by Shakir.**

- 20 original songs (10 free, 10 unlocked with coins), synthesized live in the game
- Upload your own MP3 / WAV / FLAC: the game separates the drums, tracks every beat (follows tempo drift) and builds a curated one-button chart from the kick, snare, hi-hats and melody, plus a drum sheet. Or record your own chart and it snaps to the beat.
- 29 "Learn music" rhythm lessons with real drum notation, plus free practice
- 6 hearts per song; with no hearts left, 3 misses in a row ends the run. Paid continues, style ranks (D to SSS) and a high score table
- Runs on Windows, macOS, Linux, Android and any modern browser

---

## Project layout

```
table-drummer/
├─ www/                      ← the whole game (this is all a web host needs)
│  ├─ index.html             ← the game itself
│  ├─ manifest.webmanifest   ← makes it installable as an app
│  ├─ sw.js                  ← lets it run offline
│  └─ icons/                 ← app icons
├─ electron/main.js          ← PC app (Windows / macOS / Linux)
├─ capacitor.config.json     ← Android app settings
├─ scripts/android-permissions.js
└─ package.json
```

## 0. Play it right now

Double-click `www/index.html`. It opens in Chrome or Edge and works straight away.

---

## 1. Publish on the web (easiest, and works on Android and PC)

The microphone only works on **https** pages, so use a host that gives you https for free.

**GitHub Pages**
1. Create a GitHub repository and upload the contents of the `www` folder.
2. In the repository, open **Settings → Pages**, set **Source** to your main branch, and save.
3. After a minute your game is live at `https://<your-name>.github.io/<repo>/`.

**Netlify** (no account setup needed): go to app.netlify.com/drop and drag the `www` folder onto the page.

**Install it like an app.** Open the link, then:
- **Android (Chrome):** menu ⋮ → **Add to Home screen / Install app**
- **PC (Chrome or Edge):** click the install icon in the address bar

It then opens full screen, has its own icon, and works offline after the first visit.

> **itch.io:** itch.io runs HTML games inside an embedded frame, which can block the microphone. If you publish there, also link to your GitHub Pages version, or upload the PC build below.

---

## 2. Android app (Google Play)

You need: **Node.js 20+**, **Android Studio** (it includes the Android SDK and Java).

```bash
cd table-drummer
npm install
npm run android:add      # creates the android/ project and adds the microphone permission
npm run android:open     # opens it in Android Studio
```

In Android Studio:
- **Test on your phone:** plug it in with USB debugging on, then press ▶ Run.
- **Build for Google Play:** **Build → Generate Signed App Bundle / APK → Android App Bundle**. Create a keystore when asked, and keep it safe: you need the same key for every future update.

Upload the `.aab` file in the **Google Play Console** (one-time $25 developer fee). The first time the game asks for the microphone, Android shows its normal permission prompt.

**After you change the game:** copy the new `index.html` into `www/`, then run `npm run android:sync` and build again.

App ID: `com.shakir.tabledrummer`. To change it, edit it in both `capacitor.config.json` and `package.json` **before** you run `android:add`.

---

## 3. PC app (Windows, macOS, Linux)

You need: **Node.js 20+**.

```bash
cd table-drummer
npm install
npm run pc               # runs the game as a desktop app
npm run build:win        # makes dist/Table Drummer Setup 1.4.0.exe (+ a portable .exe)
```

Use `npm run build:mac` on a Mac, or `npm run build:linux` for an AppImage. In the desktop app, **F11** toggles full screen.

You can sell or share the Windows installer on **itch.io** (upload the .exe), the **Microsoft Store**, or **Steam** (Steamworks). Windows may show a SmartScreen warning for unsigned apps. A code-signing certificate removes it.

**Microphone on Windows:** if no sound arrives, open **Settings → Privacy & security → Microphone** and turn on **Let desktop apps access your microphone**.

---

## Updating the version

The version appears in three places. Change all three together:
- `www/index.html`: the `v1.4` label and the Credits tab
- `www/sw.js`: `CACHE = 'table-drummer-v1.4'` (changing this makes installed copies update)
- `package.json`: `"version"`

## Notes

- Fonts load from Google Fonts when online. Offline, the game uses the device's own fonts.
- Progress (coins, unlocked songs, lesson progress, high scores, player name) is saved on each device. To move it to another device, use Setup → Sync & backup (sync code or backup file).
- Uploaded songs are stored in the browser's IndexedDB on that device only.
- Coins are an in-game reward only. No real money is involved.
