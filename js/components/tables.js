import { html } from '../utils/html.js';
import { VARIETIES } from '../data/varieties.js';
import { badge, button, card, sectionHead } from './ui.js';

const tableWrapper = (head, body) =>
  html`<div class="table-scroll"><table><thead><tr>${head.map((column) => html`<th>${column}</th>`)}</tr></thead><tbody>${body}</tbody></table></div>`;

export function comparisonTable() {
  const rows = VARIETIES.map((variety) => {
    const isLowRisk = variety.risk === 'Baixo';
    const tone = isLowRisk ? 'success' : 'warning';
    return html`<tr><td><div class="variety-cell"><span class="grape-dot grape-${variety.color}"></span><div><strong>${variety.name}</strong><small>${variety.type}</small></div></div></td><td>${variety.temp}</td><td>${variety.humid}</td><td>${badge(variety.risk, tone)}</td><td>${isLowRisk ? 'Favorável' : 'Atenção'}</td><td><strong>${variety.score}/100</strong></td><td>${badge(isLowRisk ? 'Ideal' : 'Monitorar', tone)}</td></tr>`;
  });
  return card(
    html`${sectionHead({
      title: 'Comparativo de Variedades',
      subtitle: 'Cenário consolidado para tomada de decisão',
      action: button('Comparar em detalhes', { variant: 'ghost', iconName: 'compare' }),
    })}${tableWrapper(['Variedade', 'Temperatura', 'Umidade', 'Risco', 'Previsão', 'Score', 'Status'], rows)}`,
    'table-card',
  );
}

const RECENT_READINGS = [
  ['09:42:15', '28,4 °C', '67%'],
  ['09:27:15', '28,1 °C', '68%'],
  ['09:12:15', '27,8 °C', '69%'],
  ['08:57:15', '27,3 °C', '70%'],
];

export function readingsTable() {
  const rows = RECENT_READINGS.map(
    ([time, temperature, humidity]) => html`<tr><td>16/09/2026 · ${time}</td><td>${temperature}</td><td>${humidity}</td><td>THS-ESP32-04</td><td>Uva Itália</td><td>${badge('Validado')}</td></tr>`,
  );
  return card(
    html`${sectionHead({
      title: 'Leituras recentes',
      subtitle: 'Registros validados pela camada de processamento',
      action: button('Exportar CSV', { variant: 'ghost', iconName: 'download' }),
    })}${tableWrapper(['Data / hora', 'Temperatura', 'Umidade', 'Sensor', 'Variedade', 'Status'], rows)}`,
    'table-card',
  );
}

export { tableWrapper };
