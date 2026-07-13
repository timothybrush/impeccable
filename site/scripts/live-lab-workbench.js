const VIEW_COPY = {
  overview: {
    kicker: 'Runtime overview',
    title: 'Critical path and interaction latency',
    summary: 'Model-free product overhead, progressive review, initialization, and the latency simulator.',
  },
  providers: {
    kicker: 'Generation strategy',
    title: 'Provider reliability and review latency',
    summary: 'Five-run strict gates across full, compact, progressive, and parallel delivery.',
  },
  harness: {
    kicker: 'Harness architecture',
    title: 'Control lanes, worker wake, and tested decisions',
    summary: 'Foreground fallback, dedicated Codex worker evidence, and the ideas that survived testing.',
  },
  ui: {
    kicker: 'Live chrome gallery',
    title: 'Every Live UI state without a running session',
    summary: 'Trigger and compare the real control states in light and dark mode.',
  },
  all: {
    kicker: 'Complete evidence',
    title: 'All Live measurements and UI fixtures',
    summary: 'The full workbench in one scrollable surface.',
  },
};

export function initLiveLabWorkbench(root = document) {
  const workbench = root.querySelector('[data-live-lab-workbench]');
  if (!workbench || workbench.dataset.initialized === 'true') return;
  workbench.dataset.initialized = 'true';

  const buttons = [...workbench.querySelectorAll('[data-lab-view]')];
  const panels = [...workbench.querySelectorAll('[data-lab-panel]')];
  const kicker = workbench.querySelector('[data-lab-view-kicker]');
  const title = workbench.querySelector('[data-lab-view-title]');
  const summary = workbench.querySelector('[data-lab-view-summary]');
  const scroller = workbench.querySelector('.live-lab-workspace-scroll');

  const setView = (requested, { updateHash = true } = {}) => {
    const view = VIEW_COPY[requested] ? requested : 'overview';
    for (const button of buttons) {
      button.setAttribute('aria-pressed', String(button.dataset.labView === view));
    }
    for (const panel of panels) {
      panel.hidden = view !== 'all' && panel.dataset.labPanel !== view;
    }
    workbench.dataset.activeView = view;
    if (kicker) kicker.textContent = VIEW_COPY[view].kicker;
    if (title) title.textContent = VIEW_COPY[view].title;
    if (summary) summary.textContent = VIEW_COPY[view].summary;
    if (scroller) scroller.scrollTop = 0;
    if (updateHash && window.location.hash !== `#${view}`) {
      window.history.replaceState(null, '', `#${view}`);
    }
  };

  for (const button of buttons) {
    button.addEventListener('click', () => setView(button.dataset.labView));
  }

  workbench.querySelector('[data-lab-reset]')?.addEventListener('click', () => {
    const slider = workbench.querySelector('[data-model-latency]');
    if (!(slider instanceof HTMLInputElement)) return;
    slider.value = '15000';
    slider.dispatchEvent(new Event('input', { bubbles: true }));
    setView('overview');
  });

  window.addEventListener('hashchange', () => setView(window.location.hash.slice(1), { updateHash: false }));
  setView(window.location.hash.slice(1) || 'overview', { updateHash: false });
}
