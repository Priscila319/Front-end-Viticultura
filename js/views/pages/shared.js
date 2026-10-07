import { html } from '../../utils/html.js';
import { findVariety, VARIETIES } from '../../data/varieties.js';
import { icon } from '../../components/icons.js';
import { badge, button, card, chartCard, metricsGrid, sectionHead } from '../../components/ui.js';
import { barChart, lineChart } from '../../components/charts.js';
import { pageHeader } from '../../components/page-header.js';
import { comparisonTable, tableWrapper } from '../../components/tables.js';
import { ROLES } from '../../config/roles.js';
import { page } from './page-layout.js';

/* ------------------------------ Comparação ------------------------------ */

const RANKING_ORDER = [3, 1, 0, 4, 2];

export function comparisonPage() {
  const ranking = RANKING_ORDER.map((varietyIndex, position) => {
    const variety = VARIETIES[varietyIndex];
    return html`<div${position === 0 ? html` class="winner"` : ''}><b>${position + 1}º</b><span class="grape-dot grape-${variety.color}"></span><strong>${variety.name}</strong><div><i style="width:${variety.score}%"></i></div><em>${variety.score}</em></div>`;
  });
  return page(
    pageHeader({ title: 'Análise Comparativa', subtitle: 'Compare clima, mercado e potencial de exportação das cinco variedades', varietyMode: 'hidden' }),
    card(
      html`<div><span class="overline">Ranking preditivo</span><h2>Qual variedade apresenta o melhor cenário para exportação?</h2><p>Score combinado de clima, preço, demanda e risco logístico.</p></div><div class="ranking-list">${ranking}</div>`,
      'ranking',
    ),
    html`<div class="grid-2">${chartCard({ title: 'Score por dimensão', subtitle: 'Comparação multicritério', content: barChart([89, 93, 74, 96, 85, 90, 81], ['Clima', 'Preço', 'Demanda', 'Risco', 'Logística', 'Qualidade', 'Exportação']) })}${chartCard({ title: 'Tendência de preço', subtitle: 'Comparação das variedades', content: lineChart({ secondary: [22, 23, 24, 26, 25, 27, 28, 29, 28, 30, 29, 31, 32], labels: ['Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set'] }) })}</div>`,
    comparisonTable(),
  );
}

/* -------------------------------- Alertas -------------------------------- */

const ALERTS = [
  { category: 'Colheita', message: 'Condições favoráveis para colheita da Uva Itália.', level: 'Informativo', tone: 'info', icon: 'leaf', subject: findVariety('Uva Itália').name },
  { category: 'Climático', message: 'Umidade acima da faixa para Thompson Seedless.', level: 'Atenção', tone: 'warning', icon: 'cloud', subject: findVariety('Thompson Seedless').name },
  { category: 'Logística', message: 'Janela de exportação favorável para Crimson nas próximas 48h.', level: 'Importante', tone: 'orange', icon: 'truck', subject: findVariety('Crimson Seedless').name },
  { category: 'Sistema', message: 'Falha temporária de sincronização resolvida.', level: 'Informativo', tone: 'info', icon: 'settings', subject: 'Integração' },
];

const ALERT_FILTERS = ['Climático', 'Colheita', 'Logística', 'Mercado', 'Sistema'];

export function alertsPage() {
  const filters = html`<div class="alert-filters">${button(html`Todos <span class="count">12</span>`)}${ALERT_FILTERS.map((filter) => button(filter, { variant: 'secondary' }))}</div>`;
  const rows = ALERTS.map((alert, index) =>
    card(
      html`<div class="alert-icon">${icon(alert.icon)}</div><div><div>${badge(alert.level, alert.tone)}<span>${alert.category} · ${alert.subject}</span></div><h3>${alert.message}</h3><p>Confira os detalhes e as recomendações disponíveis para tomar a melhor decisão.</p></div><div class="alert-time"><span>${index + 1}h atrás</span>${button('Ver detalhes', { variant: 'ghost' })}</div>`,
      `alert-row alert-${alert.tone}`,
    ),
  );
  return page(
    pageHeader({ title: 'Central de Alertas', subtitle: 'Priorize eventos climáticos, logísticos e operacionais', varietyMode: 'hidden' }),
    filters,
    html`<div class="alerts-list">${rows}</div>`,
  );
}

/* ------------------------------ Configurações ------------------------------ */

const SETTINGS_SECTIONS = [
  ['Geral', 'settings'], ['Perfil', 'users'], ['Notificações', 'bell'], ['Segurança', 'shield'],
  ['Aparência', 'eye'], ['Integrações', 'link'], ['Variedades', 'leaf'], ['Sensores', 'wifi'],
];

export function settingsPage() {
  const navigation = SETTINGS_SECTIONS.map(
    ([label, iconName], index) => html`<button type="button" class="${index === 0 ? 'active' : ''}">${icon(iconName)}${label}${icon('chevron', 16)}</button>`,
  );
  const content = html`${sectionHead({ title: 'Configurações Gerais', subtitle: 'Informações institucionais e padrões da plataforma' })}<div class="form-grid"><label class="field"><span>Nome do sistema</span><input value="AgroClima Cloud"></label><label class="field"><span>Região padrão</span><select><option>Petrolina / Juazeiro</option></select></label><label class="field full"><span>Informações institucionais</span><textarea>Projeto Integrador — Análise e Desenvolvimento de Sistemas</textarea></label><label class="field"><span>API Key ThingSpeak</span><input value="••••••••••••••••" readonly></label><label class="field"><span>Idioma</span><select><option>Português (Brasil)</option></select></label></div><div class="settings-divider"></div>${sectionHead({ title: 'Aparência', subtitle: 'Preferências visuais da interface' })}<div class="theme-options"><label class="selected"><input type="radio" checked name="theme"><div class="theme-preview light"></div><strong>Tema claro</strong></label><label><input type="radio" name="theme"><div class="theme-preview dark"></div><strong>Tema escuro</strong></label></div><div class="button-row end">${button('Cancelar', { variant: 'secondary' })}${button('Salvar alterações')}</div>`;
  return page(
    pageHeader({ title: 'Configurações', subtitle: 'Parâmetros gerais, integrações, variedades e segurança', varietyMode: 'hidden' }),
    html`<div class="settings-layout">${card(navigation, 'settings-nav')}${card(content, 'settings-content')}</div>`,
  );
}

/* ------------------------------ Design System ------------------------------ */

const SWATCHES = ['forest', 'emerald', 'blue', 'navy', 'wine', 'gold', 'danger', 'cloud'];
const SYSTEM_STATES = [
  ['activity', 'Carregando', 'Atualizando dados...'],
  ['warning', 'Sem dados', 'Nenhum dado no período'],
  ['wifi', 'Conexão perdida', 'Verifique o ThingSpeak'],
];

export function designSystemPage() {
  const colors = card(html`<h3>Cores do produto</h3><div class="swatches">${SWATCHES.map((name) => html`<div><i class="swatch-${name}"></i><span>${name}</span></div>`)}</div>`);
  const typography = card(html`<h3>Tipografia</h3><div class="type-samples"><b>Display / Semibold</b><strong>Dashboard de clima</strong><p>Interface / Regular — Dados claros para decisões melhores.</p></div>`);
  const components = card(html`<h3>Botões e badges</h3><div class="component-row">${button('Primário')}${button('Secundário', { variant: 'secondary' })}${button('Texto', { variant: 'ghost' })}${badge('Sucesso')}${badge('Atenção', 'warning')}</div>`);
  const states = card(html`<h3>Estados do sistema</h3><div class="state-grid">${SYSTEM_STATES.map(([iconName, title, description]) => html`<div>${icon(iconName)}<b>${title}</b><span>${description}</span></div>`)}</div>`);
  return page(
    pageHeader({ title: 'Design System', subtitle: 'Fundamentos e componentes do AgroClima Cloud', varietyMode: 'hidden' }),
    html`<div class="ds-grid">${colors}${typography}${components}${states}</div>`,
  );
}

/* ------------------------- Páginas genéricas (placeholders) ------------------------- */

const LOG_PAGE_TITLES = ['Segurança'];
const GENERIC_ROWS = [
  { time: '09:42:15', category: 'Atualização', logUser: 'Carlos Almeida' },
  { time: '09:27:04', category: 'Monitoramento', logUser: 'Mariana Costa' },
  { time: '08:58:31', category: 'Sincronização', logUser: 'Sistema' },
  { time: 'Ontem · 17:42', category: 'Relatório', logUser: 'Rafael Nunes' },
];

export function genericPage({ title, role }) {
  const isLogPage = title.includes('Logs') || LOG_PAGE_TITLES.includes(title);
  const rows = GENERIC_ROWS.map(
    (row, index) => html`<tr><td>16/09/2026 · ${row.time}</td><td>${isLogPage ? row.logUser : VARIETIES[index].name}</td><td>${row.category}</td><td>Processamento concluído sem inconsistências</td><td>${badge('Concluído')}</td></tr>`,
  );
  return page(
    pageHeader({
      title,
      subtitle: isLogPage ? 'Auditoria e rastreabilidade das atividades do sistema' : 'Informações consolidadas para análise e tomada de decisão',
      variety: VARIETIES[0].name,
      varietyMode: role === ROLES.ADMIN ? 'hidden' : 'locked',
    }),
    metricsGrid(
      [
        { icon: 'database', label: 'Registros no período', value: '12.458', meta: '+8,2% no período' },
        { icon: 'quality', label: 'Indicador principal', value: '98,7%', meta: 'Dentro da meta', tone: 'blue' },
        { icon: 'clock', label: 'Última atualização', value: 'há 15s', meta: 'Sincronização automática', tone: 'purple' },
        { icon: 'check', label: 'Status geral', value: 'Operacional', meta: 'Sem ocorrências', tone: 'green' },
      ],
      'four',
    ),
    html`<div class="grid-2">${chartCard({ title: `Evolução de ${title.toLowerCase()}`, subtitle: 'Últimos 7 dias', content: lineChart() })}${chartCard({ title: 'Distribuição por período', subtitle: 'Comparativo semanal', content: barChart() })}</div>`,
    card(
      html`${sectionHead({ title: isLogPage ? 'Eventos recentes' : 'Dados detalhados', subtitle: 'Atualizado automaticamente', action: button('Exportar', { variant: 'ghost', iconName: 'download' }) })}${tableWrapper(['Data / Hora', isLogPage ? 'Usuário' : 'Variedade', 'Categoria', 'Descrição', 'Status'], rows)}`,
      'table-card',
    ),
  );
}
