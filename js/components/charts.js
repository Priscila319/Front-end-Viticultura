import { html } from '../utils/html.js';
import { CHART_HOURS, DEFAULT_BARS, TEMPERATURE_SERIES, WEEKDAYS } from '../data/series.js';

/** Gráficos SVG/CSS feitos à mão (sem biblioteca de gráficos). */

const GRID_LINES_Y = [44, 84, 124, 164];
const CHART_LEFT = 18;
const CHART_WIDTH = 564;

function toSvgPoints(series) {
  const min = Math.min(...series) - 2;
  const max = Math.max(...series) + 2;
  return series
    .map((value, index) => {
      const x = CHART_LEFT + index * (CHART_WIDTH / (series.length - 1));
      const y = 164 - ((value - min) / (max - min)) * 120;
      return `${x},${y}`;
    })
    .join(' ');
}

export function lineChart({ data = TEMPERATURE_SERIES, secondary, color = 'green', labels = CHART_HOURS } = {}) {
  const points = toSvgPoints(data);
  return html`<div class="chart-wrap"><svg class="line-chart" viewBox="0 0 600 190" preserveAspectRatio="none">
    ${GRID_LINES_Y.map((y) => html`<line x1="18" y1="${y}" x2="582" y2="${y}" class="gridline"/>`)}
    <defs><linearGradient id="fill-${color}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="currentColor" stop-opacity=".18"/><stop offset="100%" stop-color="currentColor" stop-opacity="0"/></linearGradient></defs>
    <polygon points="${points} 582,170 18,170" class="area chart-${color}" fill="url(#fill-${color})"/>
    <polyline points="${points}" class="series chart-${color}"/>
    ${secondary && html`<polyline points="${toSvgPoints(secondary)}" class="series chart-blue dashed"/>`}
  </svg><div class="axis-labels">${labels.map((hour) => html`<span>${hour}</span>`)}</div></div>`;
}

export const barChart = (values = DEFAULT_BARS, labels = WEEKDAYS) =>
  html`<div class="bar-chart">${values.map(
    (value, index) => html`<div class="bar-col"><div class="bar-value">${value}</div><div class="bar" style="height:${value}%"></div><span>${labels[index]}</span></div>`,
  )}</div>`;

export const chartLegend = (items) =>
  html`<div class="chart-legend">${items.map(({ tone, label }) => html`<span><i class="legend-${tone}"></i>${label}</span>`)}</div>`;

export function donutChart({ modifier = '', total, caption, legend }) {
  return html`<div class="donut-wrap"><div class="donut ${modifier}"><div><strong>${total}</strong><span>${caption}</span></div></div><div class="donut-labels">${legend.map(
    ({ tone, label, value }) => html`<span><i class="${tone}"></i>${label} <strong>${value}</strong></span>`,
  )}</div></div>`;
}
