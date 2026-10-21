(() => {
  const section = document.querySelector('.home-abilities');
  if (!section) return;
  const buttons = [...section.querySelectorAll('.ability-keyword')];
  function select(active) {
    buttons.forEach(button => {
      const expanded = button === active;
      button.setAttribute('aria-expanded', String(expanded));
      document.getElementById(button.getAttribute('aria-controls')).hidden = !expanded;
    });
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    select(button.getAttribute('aria-expanded') === 'true' ? null : button);
  }));
  section.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const active = buttons.find(button => button.getAttribute('aria-expanded') === 'true');
    if (active) { select(null); active.focus(); }
  });
})();
