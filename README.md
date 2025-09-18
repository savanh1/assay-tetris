# Assay Tetris — Full Pack (Failsafe Keyboard Adapter)

Use this if your game was listening to keyboard events (Arrow keys/Space) and
the first pack didn't connect. This adapter tries common function names *and*
sends synthetic key events as a fallback.

## Files
- `index.html` — wired example
- `controls.css`, `controls.js` — improved controls
- `game-input-adapter.js` — tries multiple APIs then fires Arrow keys / Space / C

Tip: make sure these scripts load **after** your game script so methods exist.