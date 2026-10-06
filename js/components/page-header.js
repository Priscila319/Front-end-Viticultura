import { html } from '../utils/html.js';
import { findVariety, VARIETIES } from '../data/varieties.js';
import { selectField } from './ui.js';

const PERIOD_OPTIONS = ['Últimas 24 horas', 'Últimos 7 dias', 'Últimos 30 dias'];

function varietySelector(varietyName, { locked }) {
  const current = findVariety(varietyName);
  return html`<div class="variety-selector"><div class="grape-dot grape-${current.color}"></div>${selectField({
    label: 'Variedade analisada',
    value: varietyName,
    options: VARIETIES.map((variety) => variety.name),
    action: locked ? undefined : 'change-variety',
  })}<div class="variety-type">${current.type}</div></div>`;
}

/**
 * Cabeçalho padrão das páginas.
 * `varietyMode`: 'hidden' (sem seletor), 'live' (altera a variedade global) ou 'locked' (seletor fixo).
 */
export function pageHeader({ title, subtitle, variety, varietyMode = 'live' }) {
  return html`<header class="page-heading"><div><div class="eyebrow">AgroClima Cloud <span>/</span> ${title}</div><h1>${title}</h1><p>${subtitle}</p></div><div class="page-filters">${
    varietyMode !== 'hidden' && varietySelector(variety, { locked: varietyMode === 'locked' })
  }${selectField({ label: 'Período', value: PERIOD_OPTIONS[0], options: PERIOD_OPTIONS })}</div></header>`;
}
