// ─── Mobile nav toggle ───
const menuToggle = document.getElementById('menu-toggle');
const mobileNav  = document.getElementById('mobile-nav');
const iconOpen   = document.getElementById('icon-open');
const iconClose  = document.getElementById('icon-close');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    iconOpen.style.display  = isOpen ? 'none' : '';
    iconClose.style.display = isOpen ? ''     : 'none';
  });
}

document.querySelectorAll('#mobile-nav a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    iconOpen.style.display  = '';
    iconClose.style.display = 'none';
  });
});

// ─── Scroll spy ───
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('active', active);
        });
      }
    });
  },
  { threshold: 0.2, rootMargin: '-10% 0% -60% 0%' }
);

sections.forEach(section => observer.observe(section));

// ─── Project filter tabs ───
const filterBtns = document.querySelectorAll('.proj-filter-btn');
const projCards  = document.querySelectorAll('.proj-card[data-role]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projCards.forEach(card => {
      if (filter === 'all') {
        card.classList.remove('hidden');
      } else {
        const roles = card.dataset.role.split(' ');
        card.classList.toggle('hidden', !roles.includes(filter));
      }
    });
  });
});

// ─── Metric counters (hero credential panel) ───
function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 800;
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

const credPanel = document.querySelector('.hero-cred');
if (credPanel) {
  const countEls = credPanel.querySelectorAll('.cred-num[data-target]');
  let animated = false;

  const credObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !animated) {
        animated = true;
        countEls.forEach(el => animateCount(el));
      }
    },
    { threshold: 0.5 }
  );

  credObserver.observe(credPanel);
}
