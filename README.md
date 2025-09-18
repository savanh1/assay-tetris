# Assay Tetris — GitHub Pages Edition

**Assay Tetris** is a playful way to visualize building a translational pipeline using complementary assays. This repository is fully prepared to be published as a GitHub Pages site — no extra configuration is needed beyond pushing to the `main` branch.

This package includes:
- A responsive HTML5 front end (`index.html`)
- Touch-friendly, auto-repeat controls (`controls.css`, `controls.js`)
- A failsafe adapter (`game-input-adapter.js`) that maps on-screen buttons to your game logic and also synthesizes keyboard events (Arrow keys, Space, C) so the game works even if it was originally written for keyboard only
- A GitHub Actions workflow (`.github/workflows/pages.yml`) to build and deploy automatically

---

## 📂 Repository Structure

```
/
├── index.html                # Main game page
├── controls.css              # Styles for touch/onscreen controls
├── controls.js               # Pointer + swipe + hold-to-repeat logic
├── game-input-adapter.js     # Adapter to link controls to game logic / keyboard
├── README.md                 # Documentation (this file)
└── .github/
    └── workflows/
        └── pages.yml         # GitHub Actions workflow for Pages
```

---

## 🚀 Getting Started

### 1. Create or use a repository
- **User site** (one per account): repo must be named `yourusername.github.io`.
- **Project site**: repo can be any name (e.g. `assay-tetris`), and the game will be available at `https://yourusername.github.io/assay-tetris/`.

### 2. Add the files
Upload everything in this package to the **main** branch of your chosen repo.

### 3. Enable GitHub Pages
Go to:
- **Repo Settings → Pages**
- Under “Build and deployment,” set **Source: GitHub Actions**.

### 4. Trigger a build
Commit and push (or upload through the web UI).  
Check the **Actions** tab — you should see a workflow called **“pages build and deployment”**.  
When the **deploy** job finishes green, your site is live.

---

## 🎮 How It Works

- **Game Board**: Defined in `index.html` (`#board`).
- **Controls**:
  - Buttons with `data-action="left|right|rotate|soft|drop|hold"` automatically connect to `window.GameInput`.
  - Swipes are also supported:  
    - Swipe left/right → move piece  
    - Tap → rotate  
    - Swipe down → soft drop  
    - Fast/long swipe down → hard drop

- **GameInput Adapter**:
  - Tries to call functions like `moveLeft`, `rotatePiece`, `hardDrop`.
  - If not found, fires synthetic keypresses (Arrow keys, Space, C).
  - This guarantees compatibility with most Tetris-like JS engines.

---

## 🛠️ Customizing

1. **Mapping your game’s functions**  
   If your engine uses different names (e.g., `shiftLeft` instead of `moveLeft`), open `game-input-adapter.js` and change the mappings accordingly.

2. **Styling**  
   - Controls are styled via `controls.css`.
   - Adjust `--ctrl-size` or `--ctrl-gap` in `:root` to resize or space the buttons.

3. **Playfield / Assay Labels**  
   - Your blocks (IHC, RNA, qPCR, NGS, etc.) are defined in your main game logic.
   - This repo doesn’t change how assays are rendered — it just ensures smooth control.

---

## 🔧 Troubleshooting

- **Controls don’t move pieces**:
  1. Test with your **keyboard** (Arrow keys, Space, C).
  2. If keyboard works but buttons don’t, confirm `controls.js` and `game-input-adapter.js` are both loaded at the end of `index.html`.
  3. If nothing works, check your game’s function names and update `game-input-adapter.js`.

- **Deployment cancelled**:
  - Make sure you’re pushing to `main`.
  - Ensure repo Settings → Pages → Source is set to GitHub Actions.
  - Only look at the latest Actions run; older runs may be auto-cancelled.

- **Site not updating**:
  - GitHub Pages caches heavily. Try visiting with a query string like `?v=2` (e.g., `https://yourusername.github.io/?v=2`).

---

## 📜 License

This package is provided as a **starter scaffold**. You may freely modify and publish it under your own terms for personal or educational use.

---

👉 With this in place, you can push once and play your translational “Assay Tetris” directly in the browser.