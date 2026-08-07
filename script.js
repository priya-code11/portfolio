// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Terminal typewriter — types out a "whoami" style response
const output = document.getElementById('typed-output');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const lines = [
  { k: 'name', v: '"Priya Prajapati"' },
  { k: 'role', v: '"Backend & Full-Stack Developer"' },
  { k: 'education', v: '"B.Tech CSE, Indus University"' },
  { k: 'stack', v: '["Node.js", "Prisma", "Django", "WebSockets"]' },
  { k: 'status', v: '"open_to_opportunities"' },
];

function renderStatic() {
  output.innerHTML = lines
    .map(l => `<span class="k">${l.k}</span>: <span class="v">${l.v}</span>`)
    .join('<br>');
}

function typeLines() {
  let lineIndex = 0;
  let charIndex = 0;
  let html = '';

  function step() {
    if (lineIndex >= lines.length) {
      output.innerHTML = html + '<span class="term-cursor"></span>';
      return;
    }

    const line = lines[lineIndex];
    const full = `<span class="k">${line.k}</span>: <span class="v">${line.v}</span>`;
    const plain = `${line.k}: ${line.v}`;

    if (charIndex <= plain.length) {
      output.innerHTML = html + plain.slice(0, charIndex) + '<span class="term-cursor"></span>';
      charIndex++;
      setTimeout(step, 18);
    } else {
      html += full + '<br>';
      lineIndex++;
      charIndex = 0;
      setTimeout(step, 220);
    }
  }

  step();
}

if (output) {
  if (prefersReducedMotion) {
    renderStatic();
  } else {
    typeLines();
  }
}

// Cursor-reactive ambient background glow
if (!prefersReducedMotion) {
  const root = document.documentElement;
  let rafId = null;
  let pendingX = 50;
  let pendingY = 35;

  window.addEventListener('mousemove', (e) => {
    pendingX = (e.clientX / window.innerWidth) * 100;
    pendingY = (e.clientY / window.innerHeight) * 100;
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      root.style.setProperty('--mx', pendingX + '%');
      root.style.setProperty('--my', pendingY + '%');
      rafId = null;
    });
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    if (!t) return;
    root.style.setProperty('--mx', (t.clientX / window.innerWidth) * 100 + '%');
    root.style.setProperty('--my', (t.clientY / window.innerHeight) * 100 + '%');
  }, { passive: true });
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}
// Dynamic Mouse Position & Avatar Eye Tracking
document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;

  // 1. Update background glow position percentages
  const px = (x / window.innerWidth) * 100;
  const py = (y / window.innerHeight) * 100;
  document.documentElement.style.setProperty('--mx', `${px}%`);
  document.documentElement.style.setProperty('--my', `${py}%`);

  // 2. Make Avatar Pupils Follow Cursor
  const pupils = document.querySelectorAll('.eye-pupil');
  pupils.forEach((pupil) => {
    const rect = pupil.getBoundingClientRect();
    const pupilX = rect.left + rect.width / 2;
    const pupilY = rect.top + rect.height / 2;

    const angle = Math.atan2(y - pupilY, x - pupilX);
    const maxDistance = 5; // Movement radius limit in pixels

    const offsetX = Math.cos(angle) * maxDistance;
    const offsetY = Math.sin(angle) * maxDistance;

    pupil.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });
});