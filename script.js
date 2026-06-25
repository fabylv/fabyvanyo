// ============================================================
// FABY VANYO — Portfolio JS
// ============================================================

/* ---- THEME TOGGLE ---- */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle?.querySelector('.theme-icon');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (themeIcon) themeIcon.textContent = theme === 'light' ? '☀️' : '🌙';
}

// Load saved preference or default dark
const savedTheme = localStorage.getItem('fv-theme') || 'dark';
applyTheme(savedTheme);

themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('fv-theme', next);
  applyTheme(next);
});

/* ---- MOBILE NAV ---- */
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

toggle?.addEventListener('click', () => navLinks?.classList.toggle('open'));
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ---- ACTIVE NAV ON SCROLL ---- */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(item => {
        item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' }).observe(...sections.length ? sections : [document.body]);

/* ---- SCROLL ANIMATIONS ---- */
// Mark elements with .anim class + optional direction
function setupAnimations() {
  // Hero cascade
  const heroParts = document.querySelectorAll('.hero-eyebrow, .hero-text h1, .hero-sub, .hero-cta, .hero-badge');
  heroParts.forEach((el, i) => {
    el.classList.add('anim');
    el.style.transitionDelay = `${i * 0.13}s`;
    // Trigger after a tick
    requestAnimationFrame(() => setTimeout(() => el.classList.add('visible'), 80));
  });

  // Stat cards — pop in
  document.querySelectorAll('.stat-card').forEach((el, i) => {
    el.classList.add('anim', 'pop');
    el.style.transitionDelay = `${i * 0.09}s`;
  });

  // Project cards — alternating left/right
  document.querySelectorAll('.project-card').forEach((el, i) => {
    el.classList.add('anim', i % 2 === 0 ? 'from-left' : 'from-right');
    el.style.transitionDelay = `${i * 0.1}s`;
  });

  // Exp blocks — bottom up with stagger
  document.querySelectorAll('.exp-block').forEach((el, i) => {
    el.classList.add('anim');
    el.style.transitionDelay = `${i * 0.1}s`;
  });

  // Contact cards — pop
  document.querySelectorAll('.contact-card').forEach((el, i) => {
    el.classList.add('anim', 'pop');
    el.style.transitionDelay = `${i * 0.1}s`;
  });

  // About text blocks
  document.querySelectorAll('.about-text p').forEach((el, i) => {
    el.classList.add('anim', 'from-left');
    el.style.transitionDelay = `${i * 0.1}s`;
  });
}

// Intersection observer for all .anim elements
function observeAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.anim').forEach(el => observer.observe(el));
}

setupAnimations();
// Short delay so hero cascade fires first, then observe everything else
setTimeout(observeAnimations, 200);

/* ---- CARD TILT EFFECT (desktop) ---- */
if (window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-8px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) scale(1.01)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ---- TYPING CURSOR ON HERO TITLE ---- */
const heroName = document.querySelector('.hero-text h1 .accent');
if (heroName) {
  heroName.style.borderRight = '3px solid transparent';
  setTimeout(() => { heroName.style.borderRight = 'none'; }, 2000);
}
