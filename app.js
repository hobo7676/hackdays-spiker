/* ═══════════════════════════════════════════════════════════
   RESONANCE — app.js
   Theme Engine + Micro-interaction Layer
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── THEME DEFINITIONS ───────────────────────────────────
  const themes = {
    light: {
      label: 'Light',
      icon: '☀️',
      vars: {
        '--bg':              '#f0ede4',
        '--card-bg':         '#f0ede4',
        '--surface':         '#faf9f5',
        '--primary':         '#004741',
        '--primary-glow':    'rgba(0, 71, 65, 0.18)',
        '--accent':          '#2d8a80',
        '--text':            '#004741',
        '--text-muted':      '#2d8a80',
        '--border':          '#2d8a80',
        '--border-strong':   '#004741',
        '--badge-bg':        '#004741',
        '--badge-text':      '#f0ede4',
        '--btn-bg':          '#004741',
        '--btn-text':        '#f0ede4',
        '--btn-hover':       'rgba(240, 237, 228, 0.55)',
        '--icon-gradient':   'linear-gradient(135deg, #004741 0%, #2d8a80 60%, #56c4b8 100%)',
        '--active-card-bg':  '#d0e8e6',
        '--status-loading':  '#d0e8e6',
        '--status-done':     '#d6f5e3',
        '--status-error':    '#f5d6d6',
        '--key-bg':          '#f0ede4',
        '--slider-track':    '#2d8a80',
        '--slider-thumb':    '#004741',
        '--scrollbar-thumb': '#2d8a80',
        '--scrollbar-track': '#f0ede4',
        '--ripple-color':    'rgba(0, 71, 65, 0.12)',
        '--select-option-bg':'#f0ede4',
        '--chevron-stroke':  '#004741',
      }
    },
    dark: {
      label: 'Dark',
      icon: '🌙',
      vars: {
        '--bg':              '#0f1a19',
        '--card-bg':         '#0f1a19',
        '--surface':         '#182826',
        '--primary':         '#56c4b8',
        '--primary-glow':    'rgba(86, 196, 184, 0.2)',
        '--accent':          '#7eddd3',
        '--text':            '#e0f5f2',
        '--text-muted':      '#7eddd3',
        '--border':          '#2d5a55',
        '--border-strong':   '#56c4b8',
        '--badge-bg':        '#56c4b8',
        '--badge-text':      '#0f1a19',
        '--btn-bg':          '#1c3d39',
        '--btn-text':        '#e0f5f2',
        '--btn-hover':       'rgba(86, 196, 184, 0.18)',
        '--icon-gradient':   'linear-gradient(135deg, #1c3d39 0%, #2d8a80 60%, #56c4b8 100%)',
        '--active-card-bg':  '#1c3d39',
        '--status-loading':  '#1c3d39',
        '--status-done':     '#1a3a2a',
        '--status-error':    '#3a1a1a',
        '--key-bg':          '#1c3d39',
        '--slider-track':    '#2d5a55',
        '--slider-thumb':    '#56c4b8',
        '--scrollbar-thumb': '#56c4b8',
        '--scrollbar-track': '#0f1a19',
        '--ripple-color':    'rgba(86, 196, 184, 0.15)',
        '--select-option-bg':'#182826',
        '--chevron-stroke':  '#56c4b8',
      }
    },
    ocean: {
      label: 'Ocean',
      icon: '🌊',
      vars: {
        '--bg':              '#0d1b2a',
        '--card-bg':         '#0d1b2a',
        '--surface':         '#1b2838',
        '--primary':         '#48bfe3',
        '--primary-glow':    'rgba(72, 191, 227, 0.2)',
        '--accent':          '#90e0ef',
        '--text':            '#caf0f8',
        '--text-muted':      '#90e0ef',
        '--border':          '#264653',
        '--border-strong':   '#48bfe3',
        '--badge-bg':        '#48bfe3',
        '--badge-text':      '#0d1b2a',
        '--btn-bg':          '#1a3347',
        '--btn-text':        '#caf0f8',
        '--btn-hover':       'rgba(72, 191, 227, 0.18)',
        '--icon-gradient':   'linear-gradient(135deg, #1a3347 0%, #2a6f97 60%, #48bfe3 100%)',
        '--active-card-bg':  '#1a3347',
        '--status-loading':  '#1a3347',
        '--status-done':     '#1a3a2d',
        '--status-error':    '#3a1a1e',
        '--key-bg':          '#1a3347',
        '--slider-track':    '#264653',
        '--slider-thumb':    '#48bfe3',
        '--scrollbar-thumb': '#48bfe3',
        '--scrollbar-track': '#0d1b2a',
        '--ripple-color':    'rgba(72, 191, 227, 0.15)',
        '--select-option-bg':'#1b2838',
        '--chevron-stroke':  '#48bfe3',
      }
    },
    sunset: {
      label: 'Sunset',
      icon: '🌅',
      vars: {
        '--bg':              '#1a1016',
        '--card-bg':         '#1a1016',
        '--surface':         '#2a1a22',
        '--primary':         '#f4845f',
        '--primary-glow':    'rgba(244, 132, 95, 0.2)',
        '--accent':          '#f7b267',
        '--text':            '#fce4d6',
        '--text-muted':      '#f7b267',
        '--border':          '#5a3040',
        '--border-strong':   '#f4845f',
        '--badge-bg':        '#f4845f',
        '--badge-text':      '#1a1016',
        '--btn-bg':          '#3a1a28',
        '--btn-text':        '#fce4d6',
        '--btn-hover':       'rgba(244, 132, 95, 0.18)',
        '--icon-gradient':   'linear-gradient(135deg, #3a1a28 0%, #c25038 60%, #f4845f 100%)',
        '--active-card-bg':  '#3a1a28',
        '--status-loading':  '#3a1a28',
        '--status-done':     '#2a3a1a',
        '--status-error':    '#3a1a1a',
        '--key-bg':          '#3a1a28',
        '--slider-track':    '#5a3040',
        '--slider-thumb':    '#f4845f',
        '--scrollbar-thumb': '#f4845f',
        '--scrollbar-track': '#1a1016',
        '--ripple-color':    'rgba(244, 132, 95, 0.15)',
        '--select-option-bg':'#2a1a22',
        '--chevron-stroke':  '#f4845f',
      }
    }
  };

  const themeKeys = Object.keys(themes);
  let currentTheme = 'light';

  // ─── INJECT THEME-AWARE CSS OVERRIDES ────────────────────
  const styleEl = document.createElement('style');
  styleEl.id = 'resonance-theme-overrides';
  styleEl.textContent = `
    /* ── TRANSITION LAYER ── */
    *, *::before, *::after {
      transition: background-color 0.35s ease,
                  color 0.35s ease,
                  border-color 0.35s ease,
                  box-shadow 0.35s ease,
                  fill 0.35s ease,
                  stroke 0.35s ease;
    }

    /* ── BASE ── */
    body                   { background: var(--bg) !important; color: var(--text) !important; }
    .card                  { background: var(--card-bg) !important; border-color: var(--border-strong) !important; }

    /* ── HEADER ── */
    .app-name              { color: var(--text) !important; }
    .logo-circle           { border-color: var(--border-strong) !important; }
    .logo-circle svg       { stroke: var(--primary) !important; }
    .badge-active          { background: var(--badge-bg) !important; color: var(--badge-text) !important; }
    .header-icons svg      { stroke: var(--accent) !important; }
    .header-icons svg:hover{ stroke: var(--primary) !important; }

    /* ── SECTION LABELS ── */
    .section-label         { color: var(--text-muted) !important; }

    /* ── ANALYZE BUTTON ── */
    .analyze-btn           { background: var(--btn-bg) !important; border-color: rgba(255,255,255,0.15) !important;
                             box-shadow: 0 4px 24px var(--primary-glow), inset 0 1px 0 rgba(255,255,255,0.1) !important; }
    .analyze-btn:hover     { background: var(--btn-hover) !important; }
    .analyze-btn:hover .analyze-label { color: var(--text) !important; }
    .analyze-label         { color: var(--btn-text) !important; }
    .analyze-sublabel      { color: var(--accent) !important; }
    .analyze-icon          { background: var(--icon-gradient) !important; box-shadow: 0 2px 10px var(--primary-glow) !important; }
    .analyze-icon svg      { stroke: var(--btn-text) !important; }
    .analyze-chevron svg   { stroke: var(--chevron-stroke) !important; }

    /* ── STATUS ── */
    .status-loading        { background: var(--status-loading) !important; border-color: var(--accent) !important; color: var(--text) !important; }
    .status-done           { background: var(--status-done) !important; border-color: var(--accent) !important; color: var(--text) !important; }
    .status-error          { background: var(--status-error) !important; border-color: #cc7d7d !important; color: var(--text) !important; }

    /* ── DESCRIPTION BOX ── */
    .description-box       { background: var(--surface) !important; border-color: var(--accent) !important; }
    .description-title     { color: var(--text-muted) !important; }
    .description-text      { color: var(--text) !important; }
    .description-text::-webkit-scrollbar-track { background: var(--scrollbar-track) !important; }
    .description-text::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb) !important; },
    .stop-btn              { background: var(--surface) !important; border-color: var(--accent) !important; color: var(--text) !important; }
    .stop-btn:hover        { background: var(--active-card-bg) !important; }

    /* ── DETAIL CARDS ── */
    .detail-card           { background: var(--surface) !important; border-color: var(--border) !important; }
    .detail-card.active    { border-color: var(--border-strong) !important; background: var(--active-card-bg) !important; }
    .detail-card.active .detail-card-header svg { fill: var(--primary) !important; stroke: none !important; }
    .detail-card:not(.active) .detail-card-header svg { fill: none !important; stroke: var(--accent) !important; }
    .detail-title          { color: var(--text) !important; }
    .detail-card.active .detail-title  { color: var(--primary) !important; }
    .detail-card:not(.active) .detail-title { color: var(--accent) !important; }
    .detail-sub            { color: var(--text-muted) !important; }

    /* ── SPEED / VOICE ── */
    .speed-label           { color: var(--text) !important; }
    .speed-value           { color: var(--text-muted) !important; }
    input[type="range"]    { background: var(--slider-track) !important; }
    input[type="range"]::-webkit-slider-thumb { background: var(--slider-thumb) !important; border-color: var(--bg) !important; }
    .voice-select-wrap     { background: var(--surface) !important; border-color: var(--border) !important; }
    .voice-left svg        { stroke: var(--primary) !important; }
    select#voiceSelect     { color: var(--text) !important; }
    select#voiceSelect option { background: var(--select-option-bg) !important; color: var(--text) !important; }
    .chevron-icon          { stroke: var(--accent) !important; }

    /* ── SHORTCUTS ── */
    .shortcuts-box         { background: var(--surface) !important; border-color: var(--border) !important; }
    .key                   { background: var(--key-bg) !important; border-color: var(--border) !important; color: var(--text) !important; }
    .plus                  { color: var(--text-muted) !important; }
    .shortcut-action       { color: var(--text) !important; }

    /* ── SPINNER ── */
    .spinner               { border-color: rgba(255,255,255,0.2) !important; border-top-color: var(--btn-text) !important; }

    /* ═══ THEME TOGGLE BUTTON ═══ */
    .theme-toggle-btn {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      border: 1.5px solid var(--border);
      background: var(--surface);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
      position: relative;
      overflow: hidden;
      transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
                  border-color 0.3s ease,
                  background 0.3s ease,
                  box-shadow 0.3s ease;
    }

    .theme-toggle-btn:hover {
      transform: scale(1.12);
      border-color: var(--primary);
      box-shadow: 0 0 14px var(--primary-glow);
    }

    .theme-toggle-btn:active {
      transform: scale(0.92);
    }

    .theme-toggle-btn .theme-icon {
      transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s;
    }

    .theme-toggle-btn.spinning .theme-icon {
      transform: rotate(360deg);
    }

    /* ── THEME LABEL TOOLTIP ── */
    .theme-toggle-btn::after {
      content: attr(data-theme-label);
      position: absolute;
      top: calc(100% + 6px);
      left: 50%;
      transform: translateX(-50%) scale(0.85);
      background: var(--primary);
      color: var(--badge-text);
      font-size: 10px;
      padding: 3px 8px;
      border-radius: 5px;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.25s, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
      z-index: 10;
    }

    .theme-toggle-btn:hover::after {
      opacity: 1;
      transform: translateX(-50%) scale(1);
    }

    /* ═══ RIPPLE EFFECT ═══ */
    .ripple-host { position: relative; overflow: hidden; }
    .ripple-host .ripple {
      position: absolute;
      border-radius: 50%;
      background: var(--ripple-color);
      transform: scale(0);
      animation: ripple-expand 0.55s ease-out forwards;
      pointer-events: none;
      z-index: 0;
    }
    @keyframes ripple-expand {
      to { transform: scale(4); opacity: 0; }
    }

    /* ═══ MICRO-INTERACTION: CLICKABLE FEEDBACK ═══ */
    .detail-card,
    .shortcuts-box .shortcut-row,
    .voice-select-wrap,
    .stop-btn {
      cursor: pointer;
      transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1),
                  box-shadow 0.2s ease,
                  border-color 0.2s ease,
                  background 0.2s ease;
    }

    .detail-card:hover {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 6px 20px var(--primary-glow);
    }
    .detail-card:active { transform: scale(0.97); }

    .voice-select-wrap:hover {
      border-color: var(--primary) !important;
      box-shadow: 0 4px 16px var(--primary-glow);
    }

    .shortcuts-box .shortcut-row {
      padding: 6px 8px;
      border-radius: 8px;
    }
    .shortcuts-box .shortcut-row:hover {
      background: var(--active-card-bg);
    }

    /* ═══ ANALYZE BUTTON PULSE ═══ */
    @keyframes pulse-ring {
      0%   { box-shadow: 0 0 0 0 var(--primary-glow); }
      70%  { box-shadow: 0 0 0 10px transparent; }
      100% { box-shadow: 0 0 0 0 transparent; }
    }

    .analyze-icon {
      animation: pulse-ring 2.5s ease-out infinite;
    }

    /* ═══ HEADER ICON BOUNCE ═══ */
    .header-icons svg {
      transition: stroke 0.2s, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
    }
    .header-icons svg:hover {
      transform: rotate(45deg) scale(1.15);
    }

    /* ═══ SECTION LABEL SLIDE-IN ═══ */
    .section-label {
      opacity: 0;
      transform: translateX(-8px);
      animation: slide-in 0.5s ease forwards;
    }
    @keyframes slide-in {
      to { opacity: 1; transform: translateX(0); }
    }
    .section-label:nth-of-type(2) { animation-delay: 0.08s; }
    .section-label:nth-of-type(3) { animation-delay: 0.16s; }
    .section-label:nth-of-type(4) { animation-delay: 0.24s; }

    /* ═══ BADGE GLOW ═══ */
    .badge-active {
      animation: badge-glow 3s ease-in-out infinite alternate;
    }
    @keyframes badge-glow {
      0%   { box-shadow: 0 0 4px var(--primary-glow); }
      100% { box-shadow: 0 0 12px var(--primary-glow), 0 0 24px var(--primary-glow); }
    }

    /* ═══ SPEED SLIDER THUMB HOVER ═══ */
    input[type="range"]::-webkit-slider-thumb {
      transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s;
    }
    input[type="range"]:hover::-webkit-slider-thumb {
      transform: scale(1.25);
      box-shadow: 0 0 8px var(--primary-glow);
    }
  `;
  document.head.appendChild(styleEl);

  // ─── CREATE THEME TOGGLE BUTTON ──────────────────────────
  const headerIcons = document.querySelector('.header-icons');
  const themeBtn = document.createElement('button');
  themeBtn.className = 'theme-toggle-btn';
  themeBtn.setAttribute('aria-label', 'Change theme');
  themeBtn.setAttribute('title', 'Change theme');
  themeBtn.innerHTML = `<span class="theme-icon">${themes.light.icon}</span>`;
  themeBtn.setAttribute('data-theme-label', themes.light.label);

  // Insert theme button before the settings gear icon
  headerIcons.insertBefore(themeBtn, headerIcons.firstChild);

  // ─── APPLY THEME ─────────────────────────────────────────
  function applyTheme(themeName, animate = true) {
    const theme = themes[themeName];
    if (!theme) return;

    currentTheme = themeName;
    const root = document.documentElement;

    // Set all CSS variables
    Object.entries(theme.vars).forEach(([prop, value]) => {
      root.style.setProperty(prop, value);
    });

    // Update button icon with spin animation
    const iconSpan = themeBtn.querySelector('.theme-icon');
    if (animate) {
      themeBtn.classList.add('spinning');
      setTimeout(() => {
        iconSpan.textContent = theme.icon;
        themeBtn.setAttribute('data-theme-label', theme.label);
      }, 200);
      setTimeout(() => themeBtn.classList.remove('spinning'), 400);
    } else {
      iconSpan.textContent = theme.icon;
      themeBtn.setAttribute('data-theme-label', theme.label);
    }

    // Persist preference
    try {
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        chrome.storage.local.set({ resonanceTheme: themeName });
      } else {
        localStorage.setItem('resonanceTheme', themeName);
      }
    } catch (_) {
      localStorage.setItem('resonanceTheme', themeName);
    }
  }

  // ─── CYCLE TO NEXT THEME ON CLICK ───────────────────────
  themeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const idx = themeKeys.indexOf(currentTheme);
    const next = themeKeys[(idx + 1) % themeKeys.length];
    applyTheme(next, true);
  });

  // ─── LOAD SAVED THEME ───────────────────────────────────
  function loadSavedTheme() {
    try {
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        chrome.storage.local.get('resonanceTheme', (data) => {
          const saved = data.resonanceTheme || 'light';
          applyTheme(saved, false);
        });
      } else {
        const saved = localStorage.getItem('resonanceTheme') || 'light';
        applyTheme(saved, false);
      }
    } catch (_) {
      applyTheme('light', false);
    }
  }

  loadSavedTheme();

  // ─── RIPPLE EFFECT ON INTERACTIVE ELEMENTS ──────────────
  function addRipple(el) {
    if (!el.classList.contains('ripple-host')) {
      el.classList.add('ripple-host');
    }

    el.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';

      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  }

  // Apply ripple to all clickable elements
  document.querySelectorAll('.detail-card, .analyze-btn, .voice-select-wrap, .stop-btn, .theme-toggle-btn')
    .forEach(addRipple);

  // ─── KEYBOARD SHORTCUT FOR THEME (Alt + T) ─────────────
  document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key.toLowerCase() === 't') {
      e.preventDefault();
      themeBtn.click();
    }
  });

});
