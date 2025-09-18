/* Assay Tetris — Pointer + Swipe Controls with Auto-Repeat */
;(() => {
  const INITIAL_DELAY_MS = 180;      // delay before repeating left/right
  const REPEAT_INTERVAL_MS = 55;     // repeat interval for left/right
  const SOFT_DROP_INTERVAL_MS = 35;  // repeat interval for soft drop

  // Input surface exposed by the game
  const Input = () => (window.GameInput || {
    left(){}, right(){}, rotate(){}, soft(){}, drop(){}, hold(){}
  });

  // Auto-repeat controller for buttons
  class Repeater{
    constructor(fn, initialDelay, interval){
      this.fn = fn
      this.initialDelay = initialDelay
      this.interval = interval
      this.t1 = null
      this.t2 = null
    }
    start(){
      if (this.t1 || this.t2) return
      this.fn()
      this.t1 = setTimeout(() => {
        this.t2 = setInterval(this.fn, this.interval)
      }, this.initialDelay)
    }
    stop(){
      clearTimeout(this.t1); clearInterval(this.t2)
      this.t1 = this.t2 = null
    }
  }

  function bindButtons(){
    const map = {
      left:  new Repeater(() => Input().left(),  INITIAL_DELAY_MS, REPEAT_INTERVAL_MS),
      right: new Repeater(() => Input().right(), INITIAL_DELAY_MS, REPEAT_INTERVAL_MS),
      soft:  new Repeater(() => Input().soft(),  INITIAL_DELAY_MS, SOFT_DROP_INTERVAL_MS),
    }
    const once = {
      rotate: () => Input().rotate(),
      drop:   () => Input().drop(),
      hold:   () => Input().hold(),
    }

    const buttons = Array.from(document.querySelectorAll('[data-action]'))
    if (!buttons.length) return
    const start = (btn) => {
      btn.classList.add('is-active')
      const action = btn.dataset.action
      if (map[action]) map[action].start()
      if (once[action]) once[action]()
    }
    const end = (btn) => {
      btn.classList.remove('is-active')
      const action = btn.dataset.action
      if (map[action]) map[action].stop()
    }

    buttons.forEach(btn => {
      btn.style.touchAction = 'manipulation'
      btn.addEventListener('pointerdown', e => { e.preventDefault(); btn.setPointerCapture(e.pointerId); start(btn) }, {passive:false})
      btn.addEventListener('pointerup',   e => { end(btn) })
      btn.addEventListener('pointercancel', e => { end(btn) })
      btn.addEventListener('lostpointercapture', e => { end(btn) })
      // Keyboard support if these are focused
      btn.addEventListener('keydown', e => {
        if (e.code === 'Space' || e.key === 'Enter'){ e.preventDefault(); start(btn) }
      })
      btn.addEventListener('keyup', e => {
        if (e.code === 'Space' || e.key === 'Enter'){ end(btn) }
      })
    })
  }

  // Basic swipe detector
  const Controls = {
    enableSwipe(el){
      if (!el) return
      let startX=0, startY=0, lastX=0, lastY=0, startT=0, moved=false

      const reset = () => { startX= startY= lastX= lastY= 0; startT= 0; moved=false }

      el.style.touchAction = 'none' // allow custom gestures
      el.addEventListener('pointerdown', e => {
        e.preventDefault()
        startX = lastX = e.clientX
        startY = lastY = e.clientY
        startT = performance.now()
        moved = false
        el.setPointerCapture(e.pointerId)
      }, {passive:false})

      el.addEventListener('pointermove', e => {
        if (!startT) return
        lastX = e.clientX; lastY = e.clientY
        if (Math.abs(lastX - startX) > 6 || Math.abs(lastY - startY) > 6) moved = true
      })

      el.addEventListener('pointerup', e => {
        const dx = lastX - startX
        const dy = lastY - startY
        const dt = performance.now() - startT
        const absX = Math.abs(dx)
        const absY = Math.abs(dy)

        // Tap to rotate
        if (!moved || (absX < 8 && absY < 8 && dt < 180)){
          Input().rotate()
          reset(); return
        }

        if (absX > absY){
          // horizontal move
          if (dx > 10) Input().right()
          else if (dx < -10) Input().left()
        } else {
          // vertical move
          if (dy > 14){
            if (dt < 150 || dy > 120) Input().drop() // fast swipe or long swipe -> hard drop
            else Input().soft()
          }
        }
        reset()
      })

      el.addEventListener('pointercancel', reset)
      el.addEventListener('lostpointercapture', reset)
    }
  }

  // expose Controls for optional swipe
  window.Controls = Controls

  // bind buttons on DOM ready
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', bindButtons)
  } else {
    bindButtons()
  }
})();