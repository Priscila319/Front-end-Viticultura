import { overviewPage, monitoringPage, forecastsPage, marketPage } from '../views/pages/producer.js';
import { analyticsDashboardPage, qualityPage, modelsPage } from '../views/pages/analyst.js';
import { adminDashboardPage, usersPage, integrationsPage } from '../views/pages/admin.js';
import { alertsPage, comparisonPage, designSystemPage, genericPage, settingsPage } from '../views/pages/shared.js';

/** Associa o rótulo do menu à função que renderiza a página. Rótulos ausentes usam a página genérica. */
const PAGE_RENDERERS = {
  'Visão Geral': overviewPage,
  'Monitoramento': monitoringPage,
  'Dados Climáticos': monitoringPage,
  'Previsões': forecastsPage,
  'Mercado e Exportação': marketPage,
  'Dados de Mercado': marketPage,
  'Dashboard Analítico': analyticsDashboardPage,
  'Qualidade dos Dados': qualityPage,
  'Modelos Preditivos': modelsPage,
  'Dashboard Admin': adminDashboardPage,
  'Usuários': usersPage,
  'Integrações': integrationsPage,
  'Comparação': comparisonPage,
  'Análise Comparativa': comparisonPage,
  'Alertas': alertsPage,
  'Configurações': settingsPage,
  'Design System': designSystemPage,
};

export function renderPage({ page, role, variety }) {
  const renderer = PAGE_RENDERERS[page] ?? genericPage;
  return renderer({ title: page, role, variety });
}
