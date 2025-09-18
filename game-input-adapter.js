// game-input-adapter.js
// Edit these mappings to wire controls into YOUR existing game.
// If your game already exposes these functions, just call them here.
window.GameInput = {
  left(){ if (window.moveLeft)   return window.moveLeft(); },
  right(){ if (window.moveRight) return window.moveRight(); },
  rotate(){ if (window.rotatePiece) return window.rotatePiece(); },
  soft(){ if (window.softDrop) return window.softDrop(); },
  drop(){ if (window.hardDrop) return window.hardDrop(); },
  hold(){ if (window.holdPiece) return window.holdPiece(); },
};
// If your input API is different, replace the calls above with the right ones.