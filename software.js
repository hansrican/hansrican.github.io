(() => {
  const section = document.querySelector('#software');
  if (!section) return;
  const items = JSON.parse(document.querySelector('#software-data').textContent);
  const buttons = [...section.querySelectorAll('[data-software]')];
  const panel = section.querySelector('#software-detail');
  let selected = null;
  function select(id) {
    selected = selected === id ? null : id;
    section.classList.toggle('has-selection', !!selected);
    buttons.forEach(button => {
      const active = button.dataset.software === selected;
      button.classList.toggle('is-selected', active);
      button.setAttribute('aria-expanded', String(active));
    });
    panel.hidden = !selected;
    if (!selected) return;
    const item = items.find(item => item.id === selected);
    const description = section.querySelector('#software-description');
    description.hidden = !item.description;
    description.textContent = item.description || '';
    panel.querySelector('dl').hidden = !!item.description;
    for (const [field, key] of Object.entries({
      selected: 'name', category: 'category', proficiency: 'proficiency',
      skills: 'skills', projects: 'projects'
    })) section.querySelector(`#software-${field}`).textContent = item[key] || '';
  }
  buttons.forEach(button => button.addEventListener('click', () => select(button.dataset.software)));
  section.querySelector('.software-close').addEventListener('click', () => {
    const button = buttons.find(button => button.dataset.software === selected);
    select(selected);
    button?.focus();
  });
  section.addEventListener('keydown', event => {
    if (event.key === 'Escape' && selected) {
      const button = buttons.find(button => button.dataset.software === selected);
      select(selected);
      button?.focus();
    }
  });
})();
