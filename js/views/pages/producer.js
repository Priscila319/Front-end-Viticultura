import { html } from '../../utils/html.js';
import { findVariety } from '../../data/varieties.js';
import { HUMIDITY_SERIES, TEMPERATURE_SERIES } from '../../data/series.js';
import { icon } from '../../components/icons.js';
import { badge, button, card, chartCard, metricsGrid, sectionHead } from '../../components/ui.js';
import { barChart, chartLegend, lineChart } from '../../components/charts.js';
import { pageHeader } from '../../components/page-header.js';
import { comparisonTable, readingsTable } from '../../components/tables.js';
import { page } from './page-layout.js';

function syncStrip() {
  return html`<div class="sync-strip"><div>${icon('wifi', 17)}<strong>ThingSpeak conectado</strong><span>Dados via API REST · sincronizado há 15s</span></div>${badge('Todos os serviços operacionais')}</div>`;
}

function harvestRecommendation(varietyName) {
  return card(
    html`<div class="recommend-icon">${icon('leaf')}</div><div class="recommend-main"><span class="overline">Recomendação de colheita</span><h3>Janela favorável identificada</h3><div class="recommend-date">18 a 20 de setembro</div><p>Condições climáticas atuais, histórico da variedade e tendência prevista indicam o melhor ponto para colher ${varietyName}.</p><div class="confidence"><span>Confiança da previsão</span><strong>87%</strong><div><i style="width:87%"></i></div></div></div>${button('Ver análise', { variant: 'soft' })}`,
    'recommend harvest',
  );
}

function logisticsRecommendation() {
  return card(
    html`<div class="recommend-icon">${icon('truck')}</div><div class="recommend-main"><span class="overline">Recomendação logística</span><h3>Exportação recomendada</h3><div class="recommend-date">19 a 21 de setembro</div><p>Demanda alta e baixo risco climático no trajeto. Preço estimado 8,4% acima da média.</p><div class="recommend-tags">${badge('Risco baixo')}${badge('Demanda alta', 'info')}</div></div>${button('Ver mercado', { variant: 'soft' })}`,
    'recommend logistics',
  );
}

export function overviewPage({ variety }) {
  const current = findVariety(variety);
  return page(
    pageHeader({ title: 'Visão Geral', subtitle: 'Monitoramento da produção e exportação de uvas', variety }),
    syncStrip(),
    metricsGrid([
      { icon: 'thermo', label: 'Temperatura atual', value: current.temp, meta: 'Na faixa ideal', tone: 'orange' },
      { icon: 'drop', label: 'Umidade atual', value: current.humid, meta: 'Estável nas últimas 2h', tone: 'blue' },
      { icon: 'leaf', label: 'Condição atual', value: 'Favorável', meta: 'Índice agronômico 91/100' },
      { icon: 'truck', label: 'Janela de exportação', value: '18–21 Set', meta: 'Demanda internacional alta', tone: 'purple' },
      { icon: 'warning', label: 'Risco climático', value: current.risk, meta: 'Sem alertas críticos', tone: 'green' },
    ]),
    html`<div class="grid-2">${chartCard({ title: 'Temperatura nas últimas 24 horas', subtitle: 'Leituras processadas a cada 15 minutos', legend: '28,4 °C agora', content: lineChart() })}${chartCard({ title: 'Umidade relativa', subtitle: 'Faixa recomendada: 60%–72%', legend: '67% agora', content: lineChart({ data: HUMIDITY_SERIES, color: 'blue' }) })}</div>`,
    html`<div class="recommend-grid">${harvestRecommendation(variety)}${logisticsRecommendation()}</div>`,
    comparisonTable(),
  );
}

function integrationStatus() {
  return html`<div class="integration-status"><div class="thing-logo">${icon('cloud')}</div><div><span>Fonte de dados</span><strong>ThingSpeak · Channel Feeds</strong></div>${badge('Conectado')}<div class="status-detail"><span>Última sincronização</span><strong>09:42:15 · há 15s</strong></div><div class="status-detail"><span>Sensor ativo</span><strong>THS-ESP32-04</strong></div></div>`;
}

export function monitoringPage({ variety }) {
  return page(
    pageHeader({ title: 'Monitoramento Climático', subtitle: 'Dados dos sensores recebidos e processados via ThingSpeak', variety }),
    integrationStatus(),
    metricsGrid(
      [
        { icon: 'thermo', label: 'Temperatura', value: '28,4 °C', meta: 'Máx. 30,2 °C', tone: 'orange' },
        { icon: 'drop', label: 'Umidade', value: '67%', meta: 'Mín. 61%', tone: 'blue' },
        { icon: 'activity', label: 'Leituras hoje', value: '1.284', meta: '99,7% válidas' },
        { icon: 'wifi', label: 'Conexão', value: 'Estável', meta: 'Latência 1,8s', tone: 'purple' },
      ],
      'four',
    ),
    html`<div class="grid-2">${chartCard({ title: 'Temperatura por hora', subtitle: 'Hoje · °C', content: lineChart() })}${chartCard({ title: 'Umidade por hora', subtitle: 'Hoje · %', content: lineChart({ data: HUMIDITY_SERIES, color: 'blue' }) })}</div>`,
    readingsTable(),
  );
}

const FORECAST_TIMELINE = [
  { state: 'done', when: 'Hoje', what: 'Monitoramento' },
  { state: 'active', when: '18–20 Set', what: 'Colheita ideal' },
  { state: '', when: '20 Set', what: 'Pré-resfriamento' },
  { state: '', when: '21–22 Set', what: 'Embarque' },
  { state: '', when: '02 Out', what: 'Destino' },
];

const FORECAST_REASONS = ['Temperatura dentro da faixa', 'Umidade com tendência estável', 'Demanda internacional em alta'];

function forecastInsight() {
  return card(
    html`<div class="insight-mark">${icon('model')}</div><span class="overline">Explicação da previsão</span><h3>Por que essa janela?</h3><p>Com base nos dados climáticos históricos, condições atuais e indicadores de mercado, o modelo identificou uma janela favorável para esta variedade.</p><ul>${FORECAST_REASONS.map((reason) => html`<li>${icon('check', 16)} ${reason}</li>`)}</ul>${button('Ver dados utilizados')}`,
    'insight-card',
  );
}

export function forecastsPage({ variety }) {
  const observedVsForecast = chartCard({
    title: 'Previsão x Dados Observados',
    subtitle: 'Temperatura projetada com intervalo de confiança',
    content: html`${chartLegend([
      { tone: 'green', label: 'Observado' },
      { tone: 'blue', label: 'Previsão' },
      { tone: 'soft', label: 'Intervalo de confiança' },
    ])}${lineChart({ data: TEMPERATURE_SERIES, secondary: [23, 24, 23, 24, 25, 26, 27, 28, 29, 29, 28, 27, 27] })}`,
  });
  const timeline = card(
    html`${sectionHead({ title: 'Linha do tempo recomendada', subtitle: `Plano preditivo para ${variety}` })}<div class="timeline">${FORECAST_TIMELINE.map(
      ({ state, when, what }) => html`<div${state ? html` class="${state}"` : ''}><i></i><strong>${when}</strong><span>${what}</span></div>`,
    )}</div>`,
    'timeline-card',
  );
  return page(
    pageHeader({ title: 'Previsões', subtitle: 'Modelos preditivos climáticos, agronômicos e logísticos', variety }),
    metricsGrid(
      [
        { icon: 'quality', label: 'Confiança do modelo', value: '87%', meta: '+2,4% nesta versão' },
        { icon: 'clock', label: 'Janela prevista', value: '18–20 Set', meta: '3 dias favoráveis', tone: 'purple' },
        { icon: 'warning', label: 'Risco projetado', value: 'Baixo', meta: 'Próximas 72 horas' },
        { icon: 'trend', label: 'Tendência', value: 'Estável', meta: 'Clima e mercado', tone: 'blue' },
      ],
      'four',
    ),
    html`<div class="grid-main">${observedVsForecast}${forecastInsight()}</div>`,
    timeline,
  );
}

export function marketPage({ variety }) {
  return page(
    pageHeader({ title: 'Mercado e Exportação', subtitle: 'Inteligência comercial para maximizar valor e oportunidade', variety }),
    metricsGrid(
      [
        { icon: 'market', label: 'Preço atual', value: 'R$ 8,42/kg', meta: '+6,8% vs. mês anterior' },
        { icon: 'trend', label: 'Preço médio', value: 'R$ 7,89/kg', meta: 'Média de 30 dias', tone: 'blue' },
        { icon: 'activity', label: 'Demanda', value: 'Alta', meta: 'Mercado europeu', tone: 'purple' },
        { icon: 'truck', label: 'Volume estimado', value: '428 t', meta: '+12% neste ciclo', tone: 'orange' },
      ],
      'four',
    ),
    html`<div class="grid-2">${chartCard({ title: 'Evolução de preços', subtitle: 'R$/kg · últimos 30 dias', legend: '+6,8%', content: lineChart({ data: [68, 70, 69, 72, 74, 73, 77, 79, 78, 81, 83, 82, 86] }) })}${chartCard({ title: 'Demanda por mercado', subtitle: 'Participação estimada nos embarques', content: barChart([88, 73, 61, 48, 37, 30, 24]) })}</div>`,
    comparisonTable(),
  );
}
