# AgroClima Cloud

Dashboard de clima e mercado para a fruticultura do Vale do São Francisco (Projeto Integrador ADS).
Refatorado de React + Vite + TypeScript para **HTML, CSS e JavaScript puros (módulos ES)**, sem frameworks,
sem bibliotecas e sem etapa de build. Visual e comportamento são os mesmos da versão original.

## Como executar

Módulos ES não funcionam via `file://`; sirva a pasta com qualquer servidor estático:

```bash
python3 -m http.server 8080      # ou: npx serve .
# abra http://localhost:8080
```

Acessos de demonstração (também há botões na tela de login): `produtor@…`, `analista@…` e `admin@…`.
O perfil é deduzido do e-mail (contém "admin" → Administrador; "analista" → Analista; senão Produtor).

## Estrutura

```text
index.html            Documento base: fontes, folhas de estilo (na ordem da cascata) e <script type="module">
css/
  reset.css           Reset (equivalente ao preflight que o projeto original recebia do Tailwind), em @layer
  variables.css       Design tokens (cores e sombra)
  base.css            box-sizing, body e tipografia dos títulos
  layout.css          Shell da aplicação, sidebar, logo e topbar
  components.css      Cabeçalho de página, campos, cards, métricas, gráficos, badges, botões, tabelas
  pages.css           Blocos específicos de páginas (integrações, modelos, admin, alertas, configurações…)
  auth.css            Login, cadastro e recuperação de senha
  responsive.css      Breakpoints 1200 / 900 / 640 / 390px
  utilities.css       Utilitários (ver "Decisões de fidelidade")
js/
  main.js             Ponto de entrada: assina o estado e decide o que renderizar
  config/             roles.js (perfis, menus, contas) e routes.js (página → função de renderização)
  data/               Dados demonstrativos (variedades e séries dos gráficos)
  state/store.js      Estado global mínimo com notificação das chaves alteradas
  modules/auth.js     Regra de negócio: perfil a partir do e-mail
  events/index.js     Eventos por delegação (data-action / data-form)
  components/         icons, ui (botão, badge, card, métrica…), charts (SVG/CSS), tables, page-header
  views/              auth-view, shell-view e pages/ (producer, analyst, admin, shared)
  utils/              html.js (template tag com escape automático) e dom.js (montagem no DOM)
```

## Como funciona

```text
evento do usuário → events/index.js → setState (store) → main.js (assinante) → views/* → DOM
```

* **HTML** gerado por funções com a template tag `html`, que escapa todo valor interpolado (proteção contra XSS).
  `innerHTML` é usado apenas em `utils/dom.js`, sempre com marcação produzida por `html`.
* **Eventos** são registrados uma única vez no contêiner `#root`; os elementos usam `data-action`/`data-form`
  (não há `onclick` no HTML).
* **Renderização parcial**: trocar de página substitui apenas a área `.page`; abrir/fechar o menu só alterna classes
  (mantendo a transição CSS da sidebar); trocar a variedade preserva foco e rolagem.

### Adicionar uma página

1. Crie a função em `js/views/pages/…` retornando `page(…)` (use os componentes de `js/components`).
2. Registre o rótulo em `js/config/routes.js` e, se for item de menu, em `NAVIGATION` (`js/config/roles.js`).

## Decisões de fidelidade (nada de redesign)

* Os valores de CSS são os originais: o `index.css` foi dividido por script em arquivos contíguos e a concatenação
  em ordem reproduz exatamente as mesmas regras (a cascata não muda).
* `reset.css` substitui `@import 'tailwindcss'`: o original usava só o reset do Tailwind (as classes são todas
  customizadas). Ele foi escrito em CSS puro, em `@layer`, para manter o mesmo peso na cascata.
* `utilities.css`: a classe `.overline` coincidia com um utilitário do Tailwind que desenhava uma linha acima dos
  rótulos em caixa-alta. O efeito foi preservado; para removê-lo, apague essa regra.
* Seletores que no original eram controlados e não alteravam nada (ex.: "Período") continuam travados.
* O `index.html` original não foi enviado: título, `lang` e `viewport` foram definidos como padrão do Vite.
