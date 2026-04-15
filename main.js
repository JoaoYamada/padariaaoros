/* ============================================================
   MAIN.JS — Navegação, Mobile Menu, Tabs, Reveal, Histórias
   ============================================================ */

'use strict';

/* ── Aguarda DOM ── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initTabs();
  initScrollReveal();
  initChapters();
  initActiveNavLinks();
});


/* ══════════════════════════════════════════
   NAVBAR — scroll opacity + active link
   ══════════════════════════════════════════ */
function initNavbar() {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 50);
  }, { passive: true });
}


/* ══════════════════════════════════════════
   MOBILE MENU
   Usa classe .is-open em vez de style.display
   Sincroniza aria-expanded / aria-hidden
   Fecha com Escape e devolve foco ao botão
   ══════════════════════════════════════════ */
function initMobileMenu() {
  const toggle    = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (!toggle || !mobileNav) return;

  /* Abre / fecha */
  toggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    mobileNav.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  /* Fecha ao clicar em link interno */
  mobileNav.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* Fecha com Escape */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      closeMenu();
      toggle.focus(); /* devolve foco ao botão de hambúrguer */
    }
  });

  function closeMenu() {
    mobileNav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}


/* ══════════════════════════════════════════
   TABS — Rankings (role="tablist" acessível)
   ══════════════════════════════════════════ */
function initTabs() {
  const tabLists = document.querySelectorAll('[role="tablist"]');

  tabLists.forEach(tabList => {
    const tabs   = tabList.querySelectorAll('[role="tab"]');
    const panels = tabList.closest('.rank-card')?.querySelectorAll('[role="tabpanel"]');
    if (!tabs.length || !panels?.length) return;

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => activateTab(tabs, panels, i));

      /* Navegação por teclado: setas ← → */
      tab.addEventListener('keydown', e => {
        let newIndex;
        if (e.key === 'ArrowRight') newIndex = (i + 1) % tabs.length;
        if (e.key === 'ArrowLeft')  newIndex = (i - 1 + tabs.length) % tabs.length;
        if (e.key === 'Home')       newIndex = 0;
        if (e.key === 'End')        newIndex = tabs.length - 1;
        if (newIndex !== undefined) {
          activateTab(tabs, panels, newIndex);
          tabs[newIndex].focus();
          e.preventDefault();
        }
      });
    });
  });
}

function activateTab(tabs, panels, index) {
  tabs.forEach((tab, i) => {
    const isActive = i === index;
    tab.setAttribute('aria-selected', String(isActive));
    tab.classList.toggle('tab--active', isActive);
  });
  panels.forEach((panel, i) => {
    if (i === index) {
      panel.removeAttribute('hidden');
    } else {
      panel.setAttribute('hidden', '');
    }
  });
}


/* ══════════════════════════════════════════
   SCROLL REVEAL — IntersectionObserver
   ══════════════════════════════════════════ */
function initScrollReveal() {
  /* Respeita prefers-reduced-motion */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}


/* ══════════════════════════════════════════
   ACTIVE NAV LINKS — highlight pelo scroll
   ══════════════════════════════════════════ */
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.site-nav__link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach(link => {
          const isActive = link.getAttribute('href') === `#${id}`;
          link.classList.toggle('site-nav__link--active', isActive);
          link.setAttribute('aria-current', isActive ? 'true' : 'false');
        });
      });
    },
    { rootMargin: '-20% 0px -70% 0px' }
  );

  sections.forEach(section => observer.observe(section));
}


/* ══════════════════════════════════════════
   CHAPTERS — História do Mundo
   ══════════════════════════════════════════ */
const chaptersData = [
  {
    label: 'Capítulo I',
    title: 'O Início da Ruína e o Chamado',
    body: `
      <p>As fendas rasgadas no céu já não eram meros sinais… eram portais. O mal já havia atravessado e agora caminhava livremente pelo universo de Priston.</p>
      <p>Sheep-Ankh, a Grande Esfinge — esculpida pelo próprio Aorus, metade carne, metade pedra — vigia as ruínas do Deserto Esquecido, julgando alma por alma. Ao seu lado caminha Amon-Khepri, O Eterno. Seu nome significa O Oculto. O Invisível.</p>
      <blockquote>"Levantem-se, protetores de Priston. A batalha final se aproxima."</blockquote>
      <p>Dois portais se abrem diariamente — um ao meio-dia, exatamente às 12:00, e outro quando as sombras dominam, às 20:00. É ali que os generais caem. Ou… os guerreiros caem.</p>
    `
  },
  {
    label: 'Capítulo II',
    title: 'O Choque de Mundos e a Invasão',
    body: `
      <p>O solo de Priston tremia há dias, como se o próprio mundo pressentisse a aproximação de algo impossível de conter. Em um único instante, o céu se rompeu pela primeira vez desde a criação dos Quatro Reinos.</p>
      <p>Um clarão roxo atravessou o firmamento, rasgando as nuvens como lâminas. O ar ficou pesado, quase sólido.</p>
      <blockquote>"Eu sou Aorus, o Rei do Vácuo Eterno. Aquele que Consome Mundos e Reescreve a Existência."</blockquote>
      <p>Quando seus pés tocaram o solo de Priston, o chão rachou em uma explosão silenciosa. Nuvens negras se torceram acima dele, formando um imenso trono flutuante de cristal quebrado e energia viva.</p>
    `
  },
  {
    label: 'Capítulo III',
    title: 'A Chama da Resistência',
    body: `
      <p>Das terras arruinadas e fronteiras devastadas, pequenos brilhos surgiram — luzes pulsando como antigos corações reacendendo. Era a chama da resistência.</p>
      <blockquote>"Heróis de Priston… não importa o tamanho da escuridão, um único guerreiro de pé é mais forte que um rei sentado."</blockquote>
      <p>As armas vibraram. As armaduras despertaram. E os guerreiros se ergueram com uma força que jamais imaginaram possuir.</p>
      <p>A guerra será brutal. Lendária. Eterna. A história não termina aqui. Ela começa agora — com você.</p>
      <blockquote>"Levantem-se, guerreiros. Defendam Priston."</blockquote>
    `
  }
];

function initChapters() {
  const buttons   = document.querySelectorAll('.chapter-btn');
  const card      = document.getElementById('story-card');
  const labelEl   = document.getElementById('story-label');
  const titleEl   = document.getElementById('story-title');
  const bodyEl    = document.getElementById('story-body');

  if (!buttons.length || !card) return;

  buttons.forEach((btn, i) => {
    btn.addEventListener('click', () => showChapter(i));
  });

  function showChapter(index) {
    /* Atualiza botões */
    buttons.forEach((btn, i) => {
      const isActive = i === index;
      btn.classList.toggle('chapter-btn--active', isActive);
      btn.setAttribute('aria-current', String(isActive));
    });

    /* Transição do card — fade out */
    card.classList.add('is-transitioning');

    setTimeout(() => {
      const chapter = chaptersData[index];
      labelEl.textContent  = chapter.label;
      titleEl.textContent  = chapter.title;
      bodyEl.innerHTML     = chapter.body;

      /* Fade in */
      card.classList.remove('is-transitioning');
    }, 280);
  }
}
