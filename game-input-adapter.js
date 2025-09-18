
// game-input-adapter.js (failsafe)
(function(){
  // Helper: synthesize a keypress for engines that listen to keyboard
  function press(key, code){
    const kd = new KeyboardEvent('keydown', {key, code, bubbles:true});
    const ku = new KeyboardEvent('keyup',   {key, code, bubbles:true});
    document.dispatchEvent(kd);
    // also send to window in case listeners are attached there
    window.dispatchEvent(kd);
    setTimeout(()=>{ document.dispatchEvent(ku); window.dispatchEvent(ku); }, 20);
  }

  // Try multiple common method names on different objects
  function maybeCall(paths){
    for (const p of paths){
      const [objPath, fn] = p.split('#');
      const obj = objPath.split('.').reduce((o,k)=> o && o[k], window);
      if (obj && typeof obj[fn] === 'function'){ obj[fn](); return true; }
    }
    return false;
  }

  // Map actions to a sequence of attempts, then to keyboard fallback
  const impl = {
    left(){
      if (maybeCall([
        'Game#moveLeft','game#moveLeft','Tetris#moveLeft',
        'Engine#left','GameInput#left'
      ])) return;
      press('ArrowLeft','ArrowLeft');
    },
    right(){
      if (maybeCall([
        'Game#moveRight','game#moveRight','Tetris#moveRight',
        'Engine#right','GameInput#right'
      ])) return;
      press('ArrowRight','ArrowRight');
    },
    rotate(){
      if (maybeCall([
        'Game#rotate','game#rotate','Tetris#rotatePiece',
        'Engine#rotate','GameInput#rotate','Game#rotatePiece'
      ])) return;
      // ArrowUp is common for rotate
      press('ArrowUp','ArrowUp');
    },
    soft(){
      if (maybeCall([
        'Game#softDrop','game#softDrop','Tetris#softDrop',
        'Engine#soft','GameInput#soft'
      ])) return;
      press('ArrowDown','ArrowDown');
    },
    drop(){
      if (maybeCall([
        'Game#hardDrop','game#hardDrop','Tetris#hardDrop',
        'Engine#drop','GameInput#drop'
      ])) return;
      // Space is common for hard drop
      press(' ','Space');
    },
    hold(){
      if (maybeCall([
        'Game#hold','game#hold','Tetris#holdPiece',
        'Engine#hold','GameInput#hold'
      ])) return;
      // C or Shift are common for hold
      press('c','KeyC');
    }
  };

  // Expose the unified API the controls expect
  window.GameInput = impl;
})();
