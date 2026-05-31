function FadeCascade({ children }) {
  return React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;
    const cascadeClass = `cascade-anim cascade-${Math.min(index + 1, 5)}`;
    return React.cloneElement(child, {
      className: child.props.className ? `${child.props.className} ${cascadeClass}` : cascadeClass
    });
  });
}

Object.assign(window, { FadeCascade });

// Primary button touch animation: touchstart → lozenge → touchend → orange → reset
(function () {
  if (!('ontouchstart' in window)) return;
  var resetTimer = null;

  document.addEventListener('touchstart', function (e) {
    var btn = e.target.closest('.pk-btn');
    if (!btn) return;
    clearTimeout(resetTimer);
    btn.classList.remove('pk-btn--tapped');
    btn.classList.add('pk-btn--touching');
  }, { passive: true });

  document.addEventListener('touchend', function (e) {
    var btn = e.target.closest('.pk-btn');
    if (!btn) return;
    btn.classList.remove('pk-btn--touching');
    btn.classList.add('pk-btn--tapped');
    resetTimer = setTimeout(function () {
      btn.classList.remove('pk-btn--tapped');
    }, 320);
  }, { passive: true });

  document.addEventListener('touchcancel', function (e) {
    var btn = e.target.closest('.pk-btn');
    if (!btn) return;
    clearTimeout(resetTimer);
    btn.classList.remove('pk-btn--touching', 'pk-btn--tapped');
  }, { passive: true });

  function clearAllBtnStates() {
    clearTimeout(resetTimer);
    document.querySelectorAll('.pk-btn--touching, .pk-btn--tapped').forEach(function (btn) {
      btn.classList.remove('pk-btn--touching', 'pk-btn--tapped');
    });
  }

  // Clear stale touch classes when page hides (navigation) and when restored from bfcache
  window.addEventListener('pagehide', clearAllBtnStates);
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) clearAllBtnStates();
  });
})();
