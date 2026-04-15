# Aorus Tale — Landing Page

Site institucional do servidor Aorus Tale de Priston Tale.

## Estrutura do projeto

```
aorus-tale/
├── index.html
├── styles/
│   ├── base.css         → Reset, variáveis CSS, tipografia
│   ├── layout.css       → Container, hero, sections, grids
│   ├── components.css   → Navbar, botões, cards, tabs, calendar, footer
│   ├── utilities.css    → Animações, scroll reveal, helpers
│   └── responsive.css   → Todas as media queries centralizadas
├── scripts/
│   └── main.js          → Navbar, mobile menu, tabs, reveal, capítulos
├── images/
│   ├── hero-bg.jpg       → Background do hero (da pasta do servidor)
│   ├── bg-rankings.jpg   → Background da seção rankings
│   └── bg-calendar.jpg   → Background do calendário
└── README.md
```

## Melhorias aplicadas vs versão anterior

### HTML Semântico
- Removidos todos os `<a>` envolvendo `<button>` (HTML inválido)
- Botões da navbar são agora `<a class="nav-btn">` diretos
- Cards de sistemas são `<a>` reais com `href`, navegáveis por teclado
- `<dl>` na stats bar para pares label/valor semânticos
- `<time datetime="...">` nos dias do calendário
- `<article>` nos rank cards
- `role="tablist"` / `role="tab"` / `role="tabpanel"` corretos nas tabs
- `aria-label` em todos os elementos de navegação e interação

### CSS / Arquitetura
- Separado em 5 arquivos com responsabilidade única
- `scroll-margin-top` aplicado em todas as `section[id]` para compensar navbar fixed
- Mobile menu usa classe `.is-open` em vez de `style.display` — permite animação CSS
- Variável `--nav-height` usada consistentemente
- `prefers-reduced-motion` respeitado nas animações

### JavaScript
- Mobile menu com `aria-expanded` / `aria-hidden` sincronizados
- Fechamento por tecla Escape com devolução de foco
- Tabs com navegação por teclado (setas ←→, Home, End)
- Scroll reveal respeita `prefers-reduced-motion`
- Active nav links via `IntersectionObserver` (sem scroll listener pesado)
- Chapters com transição CSS em vez de opacity inline

## Deploy — Vercel

1. Suba este repositório no GitHub
2. Acesse [vercel.com](https://vercel.com) → New Project → Import do GitHub
3. Framework Preset: **Other** (HTML estático)
4. Output Directory: `.` (raiz)
5. Clique em Deploy

## Deploy — GitHub Pages

1. Vá em Settings → Pages
2. Source: **Deploy from a branch**
3. Branch: `main` / `(root)`
4. Salve

## Imagens necessárias

Substitua os placeholders na pasta `images/` com as imagens reais do servidor:

| Arquivo            | Origem (site atual)              |
|--------------------|----------------------------------|
| `hero-bg.jpg`      | `/class_background.png`          |
| `bg-rankings.jpg`  | `/background-rankings.png`       |
| `bg-calendar.jpg`  | `/magic-calendar.png`            |

## Personalização

Todas as cores estão em `styles/base.css` nas variáveis CSS:

```css
:root {
  --color-gold:       #c9a84c;
  --color-gold-light: #e8c96b;
  --color-blood:      #8b1a1a;
  /* ... */
}
```

Alterar uma variável atualiza o site inteiro.
