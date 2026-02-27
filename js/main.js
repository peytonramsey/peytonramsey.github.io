// ─── Mobile nav toggle ───
const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
const menuIconOpen = document.getElementById('menu-icon-open');
const menuIconClose = document.getElementById('menu-icon-close');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const isOpen = !mobileNav.classList.contains('hidden');
    mobileNav.classList.toggle('hidden');
    menuIconOpen.classList.toggle('hidden', !isOpen);
    menuIconClose.classList.toggle('hidden', isOpen);
  });
}

// Close mobile nav when a link is clicked
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.add('hidden');
    menuIconOpen.classList.remove('hidden');
    menuIconClose.classList.add('hidden');
  });
});

// ─── Scroll spy for active nav link ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          link.style.color = '#8b949e';
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
            link.style.color = '#2dd4bf';
          }
        });
      }
    });
  },
  { threshold: 0.25, rootMargin: '-15% 0% -65% 0%' }
);

sections.forEach(section => observer.observe(section));

// ─── Project card hover border effect ───
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.borderColor = 'rgba(45,212,191,0.4)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.borderColor = '#30363d';
  });
});
