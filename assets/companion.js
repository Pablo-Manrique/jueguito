(function(global){
  let rootEl = null;
  let gestureTimer = null;

  const GESTURES = ['wave','cheer','think','sleep','surprise','sad'];
  const DURATIONS = { wave:800, cheer:900, think:1000, sleep:1600, surprise:500, sad:1100 };
  const FX_TEXT = { wave:'', cheer:'\u2726', think:'?', sleep:'z z z', surprise:'!', sad:'' };

  function build(){
    const wrap = document.createElement('div');
    wrap.className = 'blip';
    wrap.innerHTML =
      '<div class="blip-fx"></div>' +
      '<div class="blip-arm left"></div>' +
      '<div class="blip-arm right"></div>' +
      '<div class="blip-body">' +
        '<div class="blip-belly"></div>' +
        '<div class="blip-eye left"></div>' +
        '<div class="blip-eye right"></div>' +
        '<div class="blip-mouth"></div>' +
      '</div>';
    return wrap;
  }

  function mount(container, opts){
    opts = opts || {};
    if(!container) return null;
    rootEl = build();
    if(opts.size) rootEl.style.setProperty('--blip-size', opts.size + 'px');
    container.appendChild(rootEl);
    if(opts.autoGesture){
      setTimeout(()=>play(opts.autoGesture), opts.autoGestureDelay || 500);
    }
    return rootEl;
  }

  function play(gesture){
    if(!rootEl || GESTURES.indexOf(gesture) === -1) return;
    const fx = rootEl.querySelector('.blip-fx');
    clearTimeout(gestureTimer);
    GESTURES.forEach(g=>rootEl.classList.remove('g-'+g));
    void rootEl.offsetWidth;
    if(fx) fx.textContent = FX_TEXT[gesture] || '';
    rootEl.classList.add('g-'+gesture);
    const dur = DURATIONS[gesture] || 900;
    gestureTimer = setTimeout(()=>{
      if(rootEl) rootEl.classList.remove('g-'+gesture);
    }, dur);
  }

  global.Companion = { mount, play, GESTURES };
})(window);
