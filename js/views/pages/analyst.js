import { html } from '../../utils/html.js';
import { icon } from '../../components/icons.js';
import { badge, button, card, chartCard, metricsGrid, sectionHead } from '../../components/ui.js';
import { barChart, chartLegend, donutChart, lineChart } from '../../components/charts.js';
import { pageHeader } from '../../components/page-header.js';
import { readingsTable, tableWrapper } from '../../components/tables.js';
import { page } from './page-layout.js';

const PIPELINES = [
  { name: 'Ingestão ThingSpeak', detail: '1.284 registros hoje', tone: 'blue', icon: 'cloud', status: 'Operacional' },
  { name: 'Validação e limpeza', detail: '98,7% de aprovação', tone: 'green', icon: 'quality', status: 'Operacional' },
  { name: 'Dados de mercado', detail: 'Atualizado há 34 min', tone: 'purple', icon: 'market', status: 'Operacional' },
  { name: 'Motor preditivo AC-Predict', detail: 'Última execução há 2h', tone: 'orange', icon: 'model', status: 'Modelo ativo' },
];

function pipelineHealth() {
  const items = PIPELINES.map(
    (pipeline) => html`<div><div class="pipe-icon tone-${pipeline.tone}">${icon(pipeline.icon)}</div><div><strong>${pipeline.name}</strong><span>${pipeline.detail}</span></div>${badge(pipeline.status)}</div>`,
  );
  return card(
    html`${sectionHead({ title: 'Saúde dos pipelines', subtitle: 'Processos de ingestão e modelagem em nuvem' })}<div class="pipeline-list">${items}</div>`,
    'table-card',
  );
}

export function analyticsDashboardPage({ variety }) {
  const predictedVsActual = chartCard({
    title: 'Previsão x Resultado Real',
    subtitle: 'Desempenho do modelo ativo · últimos 30 dias',
    content: html`${chartLegend([
      { tone: 'green', label: 'Observado' },
      { tone: 'blue', label: 'Previsto' },
    ])}${lineChart({ secondary: [23, 24, 24, 23, 25, 27, 28, 29, 30, 28, 29, 28, 27] })}`,
  });
  const dataIntegrity = chartCard({
    title: 'Integridade dos dados',
    subtitle: 'Distribuição dos registros',
    content: donutChart({
      total: '98,7%',
      caption: 'válidos',
      legend: [
        { tone: 'green', label: 'Válidos', value: '12.296' },
        { tone: 'gold', label: 'Outliers', value: '118' },
        { tone: 'red', label: 'Ausentes', value: '44' },
      ],
    }),
  });
  return page(
    pageHeader({ title: 'Dashboard Analítico', subtitle: 'Qualidade, modelos e desempenho dos dados', variety }),
    metricsGrid([
      { icon: 'database', label: 'Registros processados', value: '12.458', meta: '+1.284 hoje' },
      { icon: 'cloud', label: 'Dados recebidos hoje', value: '1.284', meta: 'Último há 15s', tone: 'blue' },
      { icon: 'quality', label: 'Qualidade dos dados', value: '98,7%', meta: '+0,6% no período' },
      { icon: 'model', label: 'Modelo ativo', value: 'AC-Predict v3.2', meta: 'Executado há 2h', tone: 'purple' },
      { icon: 'trend', label: 'Precisão', value: '91,4%', meta: 'Meta: ≥ 88%', tone: 'orange' },
    ]),
    html`<div class="grid-main">${predictedVsActual}${dataIntegrity}</div>`,
    pipelineHealth(),
  );
}

export function qualityPage({ variety }) {
  return page(
    pageHeader({ title: 'Qualidade dos Dados', subtitle: 'Completude, consistência e confiabilidade das fontes', variety }),
    metricsGrid(
      [
        { icon: 'quality', label: 'Completude', value: '98,7%', meta: 'Meta ≥ 97%' },
        { icon: 'check', label: 'Consistência', value: '97,9%', meta: 'Dentro da meta', tone: 'blue' },
        { icon: 'warning', label: 'Dados ausentes', value: '44', meta: '0,35% do total', tone: 'orange' },
        { icon: 'activity', label: 'Outliers', value: '118', meta: '0,94% do total', tone: 'purple' },
      ],
      'four',
    ),
    html`<div class="grid-2">${chartCard({ title: 'Qualidade ao longo do tempo', subtitle: 'Percentual de registros válidos', content: lineChart({ data: [92, 94, 95, 94, 96, 97, 98, 97, 98, 99, 98, 99, 99] }) })}${chartCard({ title: 'Registros por fonte', subtitle: 'Volume validado nos últimos 7 dias', content: barChart([76, 82, 91, 88, 94, 97, 99]) })}</div>`,
    readingsTable(),
  );
}

const MODEL_STATS = [
  ['Precisão', '91,4%'],
  ['MAE', '1,28'],
  ['RMSE', '1,74'],
  ['Amostras', '48.2k'],
];

const MODEL_CONFIG_FIELDS = [
  ['Modelo', 'AC-Predict v3.2'],
  ['Variedade analisada', 'Todas as variedades'],
  ['Período histórico', 'Últimos 24 meses'],
  ['Nível de confiança', '95%'],
];

const MODEL_FEATURES = ['Temperatura', 'Umidade', 'Preço', 'Demanda', 'Histórico climático'];

const MODEL_COMPARISON = [
  ['AC-Predict', 'v3.2', '91,4%', '1,28', '1,74'],
  ['Random Forest', 'v2.8', '88,9%', '1,51', '1,93'],
  ['LSTM Climate', 'v1.7', '87,6%', '1,62', '2,04'],
];

function modelHero() {
  return card(
    html`<div class="model-badge">${icon('model', 28)}</div><div><span class="overline">Modelo em produção</span><h2>AC-Predict v3.2</h2><p>Previsão combinada de colheita e exportação · treinado em 12/09/2026</p></div><div class="model-stats">${MODEL_STATS.map(
      ([label, value]) => html`<div><span>${label}</span><strong>${value}</strong></div>`,
    )}</div><div class="button-row">${button('Testar modelo', { variant: 'secondary' })}${button('Executar treinamento', { iconName: 'activity' })}</div>`,
    'model-hero',
  );
}

function modelConfigForm() {
  const fields = MODEL_CONFIG_FIELDS.map(
    ([label, option]) => html`<label class="field"><span>${label}</span><select><option>${option}</option></select></label>`,
  );
  const features = MODEL_FEATURES.map((feature) => html`<label><input type="checkbox" checked><span>${feature}</span></label>`);
  return card(
    html`${sectionHead({ title: 'Configuração do Modelo', subtitle: 'Parâmetros da próxima execução' })}<div class="form-grid">${fields}</div><div class="checks">${features}</div><div class="button-row">${button('Salvar configuração', { variant: 'secondary' })}${button('Executar modelo')}</div>`,
    'form-card',
  );
}

export function modelsPage() {
  const rows = MODEL_COMPARISON.map(
    (columns, index) => html`<tr>${columns.map((value) => html`<td><strong>${value}</strong></td>`)}<td>${badge(index === 0 ? 'Ativo' : 'Disponível', index === 0 ? 'success' : 'neutral')}</td></tr>`,
  );
  return page(
    pageHeader({ title: 'Modelos Preditivos', subtitle: 'Treinamento, avaliação e governança dos modelos', varietyMode: 'hidden' }),
    modelHero(),
    html`<div class="grid-2">${chartCard({ title: 'Previsão x Real', subtitle: 'Validação da versão atual', content: lineChart({ secondary: [24, 24, 23, 24, 24, 26, 28, 28, 30, 29, 28, 28, 26] }) })}${modelConfigForm()}</div>`,
    card(
      html`${sectionHead({ title: 'Comparação de modelos', subtitle: 'Métricas de validação' })}${tableWrapper(['Modelo', 'Versão', 'Precisão', 'MAE', 'RMSE', 'Status'], rows)}`,
      'table-card',
    ),
  );
}
