/**
 * Estado global mínimo da aplicação, com notificação de mudanças.
 * `setState` informa aos assinantes quais chaves mudaram.
 */
import { DEFAULT_VARIETY } from '../data/varieties.js';
import { ROLES } from '../config/roles.js';

const initialState = () => ({
  authenticated: false,
  authMode: 'login', // 'login' | 'signup' | 'forgot'
  email: '',
  role: ROLES.PRODUCER,
  page: null,
  variety: DEFAULT_VARIETY,
  menuOpen: false,
});

let state = initialState();
const listeners = new Set();

export const getState = () => state;

export function setState(patch) {
  const changedKeys = Object.keys(patch).filter((key) => state[key] !== patch[key]);
  if (changedKeys.length === 0) return;
  state = { ...state, ...patch };
  listeners.forEach((listener) => listener(state, changedKeys));
}

export const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/** Volta ao estado inicial (usado no logout, como no desmonte dos componentes originais). */
export const resetState = () => setState({ ...initialState() });
