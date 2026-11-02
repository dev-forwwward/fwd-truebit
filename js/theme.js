// ---------------------------------------
// THEME TOGGLE (Truebit light / dark)
// Elements: [data-theme="light"] / [data-theme="dark"] buttons in the navbar.
// The `theme-light` class carries the Webflow "Light" variable mode (Truebit collection).
// The saved theme is applied before paint by the small inline snippet in the Webflow <head>;
// this module handles clicks, keyboard and the active state.

const STORAGE_KEY = 'tb-theme';
const LIGHT_CLASS = 'theme-light';

function getTheme() {
    try { return localStorage.getItem(STORAGE_KEY) || 'dark'; } catch (e) { return 'dark'; }
}

function applyTheme(theme) {
    const isLight = theme === 'light';
    document.documentElement.classList.toggle(LIGHT_CLASS, isLight);
    document.body.classList.toggle(LIGHT_CLASS, isLight);
    document.querySelectorAll('[data-theme]').forEach((option) => {
        const active = option.getAttribute('data-theme') === (isLight ? 'light' : 'dark');
        option.classList.toggle('is-active', active);
        option.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
}

function pickTheme(option) {
    const theme = option.getAttribute('data-theme');
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { }
    applyTheme(theme);
}

export function themeToggle() {
    applyTheme(getTheme());

    document.addEventListener('click', (event) => {
        const option = event.target.closest('[data-theme]');
        if (option) pickTheme(option);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        const option = event.target.closest && event.target.closest('[data-theme]');
        if (!option) return;
        event.preventDefault();
        pickTheme(option);
    });
}
