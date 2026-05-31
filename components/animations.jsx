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
})();
