import { html } from '../utils/html.js';
import { DEMO_ACCESSES, ROLES } from '../config/roles.js';
import { icon } from '../components/icons.js';
import { badge, button, logo } from '../components/ui.js';

const GRAPE_COUNT = 10;
const AUTH_POINTS = ['Monitoramento via ThingSpeak', 'Previsões de colheita e exportação', 'Análise das cinco variedades'];

const backToLogin = html`<button type="button" class="back-link" data-action="auth-mode" data-mode="login">← Voltar ao login</button>`;

const textField = ({ label, placeholder, type = 'text' }) =>
  html`<label class="field"><span>${label}</span><input${type === 'text' ? '' : html` type="${type}"`} required placeholder="${placeholder}"></label>`;

function loginForm(email) {
  const demoButtons = DEMO_ACCESSES.map(
    (access) => html`<button type="button" data-action="demo-login" data-email="${access.email}"><strong>${access.label}</strong><small>${access.email}</small></button>`,
  );
  return html`<div class="auth-heading"><span class="overline">Acesso à plataforma</span><h1>Bem-vindo ao AgroClima Cloud</h1><p>Monitoramento inteligente para produção e exportação de uvas.</p></div><form data-form="login"><label class="field"><span>E-mail</span><input id="login-email" type="email" value="${email}" placeholder="nome@empresa.com" required></label><label class="field"><span>Senha</span><div class="input-icon"><input type="password" placeholder="Digite sua senha" required>${icon('eye')}</div></label><div class="form-meta"><label><input type="checkbox" checked>Lembrar de mim</label><button type="button" data-action="auth-mode" data-mode="forgot">Esqueci minha senha</button></div>${button('Entrar na plataforma', { type: 'submit' })}</form><div class="demo-access"><span>Acessos independentes para demonstração</span>${demoButtons}</div><div class="signup-link">Ainda não tem uma conta? <button type="button" data-action="auth-mode" data-mode="signup">Criar uma conta</button></div>`;
}

function signupForm() {
  const roleOptions = Object.values(ROLES).map((role) => html`<option>${role}</option>`);
  return html`${backToLogin}<div class="auth-heading"><h1>Crie sua conta</h1><p>Preencha seus dados para solicitar acesso.</p></div><form data-form="signup"><div class="form-grid">${textField({ label: 'Nome completo', placeholder: 'Seu nome' })}${textField({ label: 'E-mail', placeholder: 'nome@empresa.com', type: 'email' })}${textField({ label: 'Telefone', placeholder: '(87) 99999-0000' })}${textField({ label: 'Empresa', placeholder: 'Nome da empresa' })}${textField({ label: 'Cargo', placeholder: 'Seu cargo' })}<label class="field"><span>Perfil</span><select>${roleOptions}</select></label>${textField({ label: 'Senha', placeholder: 'Mínimo 8 caracteres', type: 'password' })}${textField({ label: 'Confirmar senha', placeholder: 'Repita a senha', type: 'password' })}</div><label class="terms"><input type="checkbox" required>Li e aceito os Termos de Uso e a Política de Privacidade.</label>${button('Criar conta', { type: 'submit' })}</form>`;
}

function forgotForm() {
  return html`${backToLogin}<div class="auth-heading"><div class="recover-icon">${icon('lock')}</div><h1>Esqueci minha senha</h1><p>Informe seu e-mail e enviaremos um link seguro para criar uma nova senha.</p></div><form data-form="forgot">${textField({ label: 'E-mail', placeholder: 'nome@empresa.com', type: 'email' })}${button('Enviar link de recuperação', { type: 'submit' })}</form>`;
}

/** Conteúdo interno do cartão de autenticação, conforme o modo atual. */
export function authFormContent({ authMode, email }) {
  if (authMode === 'signup') return signupForm();
  if (authMode === 'forgot') return forgotForm();
  return loginForm(email);
}

function visualPanel() {
  const grapes = Array.from({ length: GRAPE_COUNT }, () => html`<i></i>`);
  const points = AUTH_POINTS.map((point) => html`<span>${icon('check')}${point}</span>`);
  return html`<div class="auth-visual">${logo({ light: true })}<div class="auth-art"><div class="orbit orbit-a"><span>${icon('cloud')}</span></div><div class="orbit orbit-b"><span>${icon('thermo')}</span></div><div class="grape-cluster">${grapes}</div><div class="sensor-card">${icon('wifi')}<div><span>Sensor THS-04</span><strong>28,4 °C · 67%</strong></div>${badge('Online')}</div></div><div class="auth-message"><span>Inteligência para o Vale do São Francisco</span><h2>Do clima ao mercado.<br>Decisões no tempo certo.</h2><p>Dados de sensores, previsões e mercado em uma única plataforma de inteligência agrícola.</p><div class="auth-points">${points}</div></div></div>`;
}

export function authView(state) {
  return html`<div class="auth-shell">${visualPanel()}<main class="auth-form-wrap"><div class="mobile-logo">${logo()}</div><div class="auth-form">${authFormContent(state)}</div><p class="auth-footer">© 2026 AgroClima Cloud · Projeto Integrador ADS</p></main></div>`;
}
