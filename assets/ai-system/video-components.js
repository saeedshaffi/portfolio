export function createCalendar(root, initialDate = new Date()) {
  let view = new Date(initialDate.getFullYear(), initialDate.getMonth(), 1);
  let selected = initialDate;
  const names = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  function render() {
    const first = (view.getDay() + 6) % 7;
    const count = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    root.innerHTML = `<div class="er-calendar-head"><button data-move="-1" aria-label="Previous month">&#8249;</button><strong>${view.toLocaleString('en', { month: 'long', year: 'numeric' })}</strong><button data-move="1" aria-label="Next month">&#8250;</button></div><div class="er-calendar-grid">${names.map(n => `<strong>${n}</strong>`).join('')}${'<span></span>'.repeat(first)}${Array.from({length: count}, (_, i) => { const d = i + 1; const active = selected.getFullYear() === view.getFullYear() && selected.getMonth() === view.getMonth() && selected.getDate() === d; return `<button data-day="${d}" aria-pressed="${active}">${d}</button>`; }).join('')}</div>`;
  }

  root.addEventListener('click', event => {
    const move = event.target.closest('[data-move]');
    const day = event.target.closest('[data-day]');
    if (move) view = new Date(view.getFullYear(), view.getMonth() + Number(move.dataset.move), 1);
    if (day) {
      selected = new Date(view.getFullYear(), view.getMonth(), Number(day.dataset.day));
      root.dispatchEvent(new CustomEvent('datechange', { detail: selected }));
    }
    if (move || day) render();
  });
  render();
}

export function setGauge(element, value, min = 0, max = 100) {
  const safe = Math.min(max, Math.max(min, Number(value)));
  const percent = ((safe - min) / (max - min)) * 100;
  element.style.setProperty('--value', percent);
  const output = element.querySelector('.er-gauge-value');
  if (output) output.textContent = safe;
  element.setAttribute('aria-valuenow', safe);
  element.setAttribute('aria-valuemin', min);
  element.setAttribute('aria-valuemax', max);
}
