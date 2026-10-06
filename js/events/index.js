import { NAVIGATION } from '../config/roles.js';
import { resolveRole } from '../modules/auth.js';
import { getState, resetState, setState } from '../state/store.js';

/**
 * Camada de eventos: usa delegação a partir do contêiner raiz, de modo que as
 * telas possam ser renderizadas novamente sem perder os listeners.
 */

function fillDemoEmail(email) {
  setState({ email });
  const emailInput = document.querySelector('#login-email');
  if (emailInput) emailInput.value = email;
}

function login() {
  const role = resolveRole(getState().email);
  setState({ authenticated: true, role, page: NAVIGATION[role][0].label });
}

const clickActions = {
  navigate: (element) => setState({ page: element.dataset.page, menuOpen: false }),
  'open-menu': () => setState({ menuOpen: true }),
  'close-menu': () => setState({ menuOpen: false }),
  logout: () => resetState(),
  'auth-mode': (element) => setState({ authMode: element.dataset.mode }),
  'demo-login': (element) => fillDemoEmail(element.dataset.email),
};

const submitActions = {
  login,
  signup: () => setState({ authMode: 'login' }),
  forgot: () => setState({ authMode: 'login' }),
};

function handleClick(event) {
  const element = event.target.closest('[data-action]');
  clickActions[element?.dataset.action]?.(element);
}

function handleChange({ target }) {
  if (target.matches('select[data-action="change-variety"]')) {
    setState({ variety: target.value });
  } else if (target.matches('select[data-locked-value]')) {
    target.value = target.dataset.lockedValue;
  }
}

function handleInput({ target }) {
  if (target.matches('#login-email')) setState({ email: target.value });
}

function handleSubmit(event) {
  const form = event.target.closest('form[data-form]');
  if (!form) return;
  event.preventDefault();
  submitActions[form.dataset.form]?.();
}

export function bindEvents(root) {
  root.addEventListener('click', handleClick);
  root.addEventListener('change', handleChange);
  root.addEventListener('input', handleInput);
  root.addEventListener('submit', handleSubmit);
}
