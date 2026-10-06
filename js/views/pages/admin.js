import { html } from '../../utils/html.js';
import { icon } from '../../components/icons.js';
import { badge, button, card, chartCard, metricsGrid, sectionHead, selectField } from '../../components/ui.js';
import { barChart, donutChart } from '../../components/charts.js';
import { pageHeader } from '../../components/page-header.js';
import { tableWrapper } from '../../components/tables.js';
import { page } from './page-layout.js';

const hiddenVarietyHeader = (title, subtitle) => pageHeader({ title, subtitle, varietyMode: 'hidden' });

const SERVICES = [
  { name: 'API AgroClima', status: 'Online', detail: '99,99%', icon: 'server' },
  { name: 'Banco de dados', status: 'Online', detail: '99,97%', icon: 'database' },
  { name: 'ThingSpeak', status: 'Conectado', detail: 'há 15s', icon: 'cloud' },
  { name: 'Processamento', status: 'Operacional', detail: '1,8s', icon: 'activity' },
];

const RECENT_ACTIVITY = [
  { title: 'Novo usuário cadastrado', author: 'por Mariana Costa', time: 'há 12 min', tone: 'green', icon: 'users' },
  { title: 'Permissões do perfil Analista atualizadas', author: 'por Administrador', time: 'há 38 min', tone: 'blue', icon: 'lock' },
  { title: 'Sincronização ThingSpeak concluída', author: '12.458 registros processados', time: 'há 1h', tone: 'purple', icon: 'cloud' },
  { title: 'Política de senha revisada', author: 'por Carlos Almeida', time: 'ontem, 16:40', tone: 'orange', icon: 'shield' },
];

function serviceCards() {
  return html`<div class="services">${SERVICES.map(
    (service) => card(
      html`<div class="service-icon">${icon(service.icon)}</div><div><span>${service.name}</span><strong>${service.status}</strong></div>${badge(service.detail)}`,
      'service-card',
    ),
  )}</div>`;
}

function recentActivity() {
  const items = RECENT_ACTIVITY.map(
    (activity) => html`<div><span class="activity-symbol tone-${activity.tone}">${icon(activity.icon)}</span><div><strong>${activity.title}</strong><span>${activity.author}</span></div><time>${activity.time}</time></div>`,
  );
  return card(
    html`${sectionHead({ title: 'Atividade recente', subtitle: 'Eventos relevantes de administração', action: button('Ver todos os logs', { variant: 'ghost' }) })}<div class="activity-list">${items}</div>`,
    'table-card',
  );
}

export function adminDashboardPage() {
  return page(
    hiddenVarietyHeader('Dashboard Administrativo', 'Governança, segurança e disponibilidade do sistema'),
    metricsGrid(
      [
        { icon: 'users', label: 'Usuários ativos', value: '248', meta: '+12 este mês' },
        { icon: 'lock', label: 'Usuários bloqueados', value: '3', meta: 'Requer revisão', tone: 'orange' },
        { icon: 'activity', label: 'Acessos hoje', value: '1.429', meta: '+8,2% vs. ontem', tone: 'blue' },
        { icon: 'shield', label: 'Incidentes', value: '0', meta: 'Últimos 30 dias', tone: 'purple' },
      ],
      'four',
    ),
    serviceCards(),
    html`<div class="grid-2">${chartCard({ title: 'Acessos ao sistema', subtitle: 'Sessões autenticadas · últimos 7 dias', content: barChart() })}${chartCard({
      title: 'Usuários por perfil',
      subtitle: 'Distribuição de 251 contas',
      content: donutChart({
        modifier: 'admin',
        total: '251',
        caption: 'usuários',
        legend: [
          { tone: 'green', label: 'Produtores', value: '164' },
          { tone: 'blue', label: 'Analistas', value: '68' },
          { tone: 'gold', label: 'Administradores', value: '19' },
        ],
      }),
    })}</div>`,
    recentActivity(),
  );
}

const USERS = [
  { name: 'Mariana Costa', email: 'mariana@valeexport.com', role: 'Produtor/Exportador', status: 'Ativo' },
  { name: 'Rafael Nunes', email: 'rafael@agrodata.com', role: 'Analista de Dados', status: 'Ativo' },
  { name: 'Carlos Almeida', email: 'carlos@agroclima.com', role: 'Administrador', status: 'Ativo' },
  { name: 'Luciana Freire', email: 'luciana@frutasul.com', role: 'Produtor/Exportador', status: 'Bloqueado' },
];

const getInitials = (fullName) => fullName.split(' ').map((part) => part[0]).join('').slice(0, 2);
const getLastAccess = (index) => (index === 3 ? '12/09/2026' : `Hoje, 09:${42 - index * 7}`);

export function usersPage() {
  const rows = USERS.map(
    (user, index) => html`<tr><td><div class="user-cell"><span>${getInitials(user.name)}</span><strong>${user.name}</strong></div></td><td>${user.email}</td><td>${user.role}</td><td>${badge(user.status, user.status === 'Ativo' ? 'success' : 'danger')}</td><td>${getLastAccess(index)}</td><td>${button('Editar', { variant: 'icon', iconName: 'settings' })}</td></tr>`,
  );
  const toolbar = card(
    html`<div class="searchbox">${icon('search')}<input placeholder="Buscar por nome ou e-mail" aria-label="Buscar por nome ou e-mail"></div>${selectField({ value: 'Todos os perfis', options: ['Todos os perfis'] })}${selectField({ value: 'Todos os status', options: ['Todos os status'] })}${button('Novo usuário', { iconName: 'plus' })}`,
    'toolbar',
  );
  return page(
    hiddenVarietyHeader('Usuários', 'Gerencie contas, perfis e acessos à plataforma'),
    toolbar,
    card(
      html`${sectionHead({ title: '251 usuários', subtitle: '248 ativos · 3 bloqueados' })}${tableWrapper(['Nome', 'E-mail', 'Perfil', 'Status', 'Último acesso', 'Ações'], rows)}`,
      'table-card',
    ),
  );
}

const ARCHITECTURE_STEPS = [
  { name: 'ESP32', detail: 'Coleta no campo', icon: 'wifi' },
  { name: 'ThingSpeak', detail: 'Recebe os dados', icon: 'cloud' },
  { name: 'API REST', detail: 'Channel Feeds', icon: 'link' },
  { name: 'Processamento', detail: 'Validação e regras', icon: 'activity' },
  { name: 'Banco em nuvem', detail: 'Persistência', icon: 'database' },
  { name: 'AgroClima Cloud', detail: 'Análise e decisão', icon: 'grid' },
];

const INTEGRATIONS = [
  { name: 'ThingSpeak', description: 'API REST · Channel Feeds', status: 'Conectado', updated: '12.458 registros', icon: 'cloud' },
  { name: 'Banco de Dados', description: 'PostgreSQL Cloud', status: 'Online', updated: '18 ms de latência', icon: 'database' },
  { name: 'Serviço de Mercado', description: 'Market Data API', status: 'Online', updated: 'há 34 min', icon: 'market' },
  { name: 'Serviço de Processamento', description: 'AgroClima Engine', status: 'Online', updated: '1,8s médio', icon: 'activity' },
];

function architectureFlow() {
  const steps = ARCHITECTURE_STEPS.map((step, index) => {
    const isFeatured = step.name === 'ThingSpeak';
    return html`<div class="arch-group"><div class="arch-step ${isFeatured ? 'featured' : ''}"><div>${icon(step.icon)}</div><strong>${step.name}</strong><span>${step.detail}</span>${isFeatured && badge('Recepção IoT')}</div>${index < ARCHITECTURE_STEPS.length - 1 && html`<span class="flow-arrow">→</span>`}</div>`;
  });
  return card(
    html`${sectionHead({ title: 'Fluxo de dados IoT', subtitle: 'A aplicação consulta os dados do ThingSpeak via API REST' })}<div class="architecture-flow">${steps}</div><div class="architecture-note">${icon('check')}<span><strong>Arquitetura correta:</strong> o ESP32 envia ao ThingSpeak; o dashboard nunca recebe dados diretamente do dispositivo.</span></div>`,
    'architecture',
  );
}

export function integrationsPage() {
  const cards = INTEGRATIONS.map((integration) =>
    card(
      html`<div class="integration-card-top"><div class="service-icon">${icon(integration.icon)}</div>${badge(integration.status)}</div><h3>${integration.name}</h3><p>${integration.description}</p><div><span>Última atualização</span><strong>${integration.updated}</strong></div>${button('Ver configuração', { variant: 'secondary' })}`,
      'integration-card',
    ),
  );
  return page(
    hiddenVarietyHeader('Integrações', 'Serviços, sincronizações e arquitetura de dados'),
    architectureFlow(),
    html`<div class="integration-grid">${cards}</div>`,
  );
}
