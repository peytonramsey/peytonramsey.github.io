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

// ─── Scroll spy + progress bar ───
const sections    = document.querySelectorAll('section[id]');
const navLinks    = document.querySelectorAll('.nav-links a');
const progressBar = document.getElementById('scroll-progress');

function updateScroll() {
  const scrollY = window.scrollY;

  // Nav highlight — last section whose top is above current scroll position
  let current = '';
  sections.forEach(section => {
    if (scrollY >= section.offsetTop - 120) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });

  // Progress bar
  if (progressBar) {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = total > 0 ? (scrollY / total * 100) + '%' : '0%';
  }
}

window.addEventListener('scroll', updateScroll, { passive: true });
updateScroll();

// ─── Metric counters (hero credential panel) ───
function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 800;
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
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

// ─── Scroll reveal ───
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

document.querySelectorAll('.proj-card, .also-built-item, #projects .section-head, #about .section-head').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});
