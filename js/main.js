(() => {
  const LOADER_HOLD_MS = 1400;
  const HEADER_SCROLL_THRESHOLD = 40;
  const HERO_SCROLL_CUE_HIDE_THRESHOLD = 80;

  document.body.style.overflow = 'hidden';

  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    window.setTimeout(() => {
      if (loader) loader.classList.add('done');
      document.body.style.overflow = '';
    }, LOADER_HOLD_MS);
  });

  // ---------- scroll reveal ----------
  const revealTargets = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealTargets.forEach((el) => revealObserver.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('in'));
  }

  // ---------- header background on scroll ----------
  const header = document.getElementById('siteHeader');
  const updateHeaderState = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > HEADER_SCROLL_THRESHOLD);
  };
  window.addEventListener('scroll', updateHeaderState, { passive: true });
  updateHeaderState();

  // ---------- hide hero scroll cue once the user starts scrolling ----------
  // (keeps it from ever being visible as a stray fragment near the hero's own
  // bottom edge once the user has scrolled most of the way through it)
  const heroScroll = document.querySelector('.hero-scroll');
  const updateHeroScrollCue = () => {
    if (!heroScroll) return;
    heroScroll.classList.toggle('is-hidden', window.scrollY > HERO_SCROLL_CUE_HIDE_THRESHOLD);
  };
  window.addEventListener('scroll', updateHeroScrollCue, { passive: true });
  updateHeroScrollCue();

  // ---------- mobile menu ----------
  const menuBtn = document.getElementById('menuBtn');
  const mainNav = document.getElementById('mainNav');

  const closeMenu = () => {
    if (!menuBtn || !mainNav) return;
    menuBtn.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('open');
    header?.classList.remove('menu-open');
    document.body.style.overflow = '';
  };

  const toggleMenu = () => {
    if (!menuBtn || !mainNav) return;
    const isOpen = mainNav.classList.toggle('open');
    menuBtn.classList.toggle('open', isOpen);
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    header?.classList.toggle('menu-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  menuBtn?.addEventListener('click', toggleMenu);
  mainNav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // ---------- contact form (static, no real submission) ----------
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!formNote) return;
    formNote.textContent = 'お問い合わせありがとうございます。メッセージを受け付けました。';
    contactForm.reset();
  });
})();
