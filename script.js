// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// ---------------------------------------------------------------
// Terminal typewriter — types out a "whoami" style response
// ---------------------------------------------------------------
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
    // type the plain-text version, then swap in styled spans once the line completes
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

// ---------------------------------------------------------------
// Scroll reveal (replaces AOS dependency)
// ---------------------------------------------------------------
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