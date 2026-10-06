import { bindEvents } from './events/index.js';
import { renderPage } from './config/routes.js';
import { getState, subscribe } from './state/store.js';
import { authFormContent, authView } from './views/auth-view.js';
import { shellView } from './views/shell-view.js';
import { mount, queryRequired, replaceElement } from './utils/dom.js';

const root = queryRequired('#root');

function renderApp() {
  const state = getState();
  mount(root, state.authenticated ? shellView(state) : authView(state));
}

function renderAuthForm() {
  mount(queryRequired('.auth-form', root), authFormContent(getState()));
}

/** Troca somente a área da página, preservando topbar, sidebar e posição de rolagem. */
function renderPageContent() {
  replaceElement(queryRequired('main > .page', root), renderPage(getState()));
}

function updateNavigation({ page }) {
  root.querySelectorAll('.sidebar nav button').forEach((button) => {
    const isActive = button.dataset.page === page;
    button.classList.toggle('active', isActive);
    if (isActive) button.setAttribute('aria-current', 'page');
    else button.removeAttribute('aria-current');
  });
}

/** Alterna classes nos elementos existentes para manter a transição CSS da sidebar. */
function updateMenu({ menuOpen }) {
  queryRequired('.sidebar', root).classList.toggle('open', menuOpen);
  queryRequired('.sidebar-overlay', root).classList.toggle('show', menuOpen);
}

function updateVariety() {
  const hadFocus = document.activeElement?.matches('select[data-action="change-variety"]');
  renderPageContent();
  if (hadFocus) root.querySelector('select[data-action="change-variety"]')?.focus({ preventScroll: true });
}

subscribe((state, changedKeys) => {
  const has = (key) => changedKeys.includes(key);

  if (has('authenticated')) return renderApp();
  if (!state.authenticated) return has('authMode') ? renderAuthForm() : undefined;

  if (has('page')) {
    updateNavigation(state);
    renderPageContent();
  } else if (has('variety')) {
    updateVariety();
  }
  if (has('menuOpen')) updateMenu(state);
  return undefined;
});

bindEvents(root);
renderApp();
