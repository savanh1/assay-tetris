# Assay Tetris — Full Pack (controls wired)

This folder is ready to publish as-is. Open `index.html` and the improved controls,
auto-repeat, and swipe are already connected through `game-input-adapter.js`.

## Use it 2 ways
1) **Drop-in replacement**: Rename this `index.html` to match your site and copy
   `controls.css`, `controls.js`, and `game-input-adapter.js` next to it.
   Edit `game-input-adapter.js` to call your game's movement functions.

2) **Patch your existing page**: If you want to keep your current HTML,
   still copy the three files above and add:
   ```html
   <link rel="stylesheet" href="controls.css">
   <script src="game-input-adapter.js"></script>
   <script src="controls.js"></script>
   <script>Controls.enableSwipe(document.querySelector('#board'));</script>
   ```

## What you get
- Instant touch with `pointerdown` (no mobile click delay)
- Larger hit areas and pressed feedback
- Hold-to-repeat for left/right/soft
- Swipe: left/right to move, tap to rotate, swipe down for drop

## Files
- `index.html` — wired example ready to deploy
- `controls.css` — styles for controls
- `controls.js` — pointer + swipe + repeat logic
- `game-input-adapter.js` — map to your game functions

Publish to GitHub Pages or any static host; no build step required.