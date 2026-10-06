import { html } from '../utils/html.js';
import { ACCOUNTS, NAVIGATION } from '../config/roles.js';
import { renderPage } from '../config/routes.js';
import { icon } from '../components/icons.js';
import { logo } from '../components/ui.js';

function navigationItems(role, activePage) {
  return NAVIGATION[role].map((item) => {
    const isActive = item.label === activePage;
    return html`<button type="button" class="${isActive ? 'active' : ''}"${isActive ? html` aria-current="page"` : ''} data-action="navigate" data-page="${item.label}">${icon(item.icon)}<span>${item.label}</span>${item.label === 'Alertas' && html`<em>4</em>`}</button>`;
  });
}

function sidebar({ role, page, menuOpen }) {
  const account = ACCOUNTS[role];
  return html`<div class="sidebar-overlay ${menuOpen ? 'show' : ''}" data-action="close-menu"></div><aside class="sidebar ${menuOpen ? 'open' : ''}" aria-label="Menu lateral"><div class="sidebar-top">${logo({ light: true })}<button type="button" class="mobile-close" data-action="close-menu" aria-label="Fechar menu">${icon('close')}</button></div><div class="role-pill"><span>${account.badge}</span><div><small>Ambiente</small><strong>${role}</strong></div></div><nav aria-label="Navegação principal"><span class="nav-label">Navegação</span>${navigationItems(role, page)}</nav><div class="sidebar-bottom"><button type="button">${icon('help')}<span>Central de ajuda</span></button><div class="system-mini"><span><i></i>Sistema operacional</span><small>v1.0.0 · 99,9% uptime</small></div></div></aside>`;
}

function topbar(role) {
  const account = ACCOUNTS[role];
  return html`<header class="topbar"><button type="button" class="menu-btn" data-action="open-menu" aria-label="Abrir menu">${icon('menu')}</button><div class="topbar-status"><span><i></i>Plataforma operacional</span><small>Petrolina / Juazeiro · 09:42</small></div><div class="topbar-actions"><button type="button" class="icon-btn" aria-label="Buscar">${icon('search')}</button><button type="button" class="icon-btn notification" aria-label="Notificações">${icon('bell')}<i></i></button><div class="access-scope">${icon('lock', 15)}<span>Acesso ${account.scope}</span></div><div class="profile"><span>${account.initials}</span><div><strong>${account.name}</strong><small>${role}</small></div></div><button type="button" class="icon-btn" data-action="logout" title="Sair" aria-label="Sair">${icon('logout')}</button></div></header>`;
}

const footer = html`<footer class="app-footer"><span>AgroClima Cloud · Projeto Integrador 4º módulo ADS</span><span>Dados demonstrativos para apresentação acadêmica</span></footer>`;

export function shellView(state) {
  return html`<div class="app-shell">${sidebar(state)}<main>${topbar(state.role)}${renderPage(state)}${footer}</main></div>`;
}
