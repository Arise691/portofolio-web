'use strict';
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* ---------- Scroll reveal ---------- */
(function scrollReveal() {
  const items = $$('.reveal');
  if (!items.length) return;
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('in-view'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  items.forEach(el => io.observe(el));
})();

/* ---------- Footer year ---------- */
(function footerYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ---------- Custom cursor: orbit signature trail ---------- */
(function customCursor() {
  const dot = $('#cursorDot');
  const ring = $('#cursorRing');
  if (!dot || !ring || window.matchMedia('(hover: none)').matches) return;

  let ringX = 0, ringY = 0;
  const ringTarget = { x: 0, y: 0 };

  window.addEventListener('pointermove', (e) => {
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
    dot.classList.add('active');
    ring.classList.add('active');
    ringTarget.x = e.clientX;
    ringTarget.y = e.clientY;
  });

  window.addEventListener('pointerleave', () => {
    dot.classList.remove('active');
    ring.classList.remove('active');
  });

  function animateRing() {
    ringX += (ringTarget.x - ringX) * 0.18;
    ringY += (ringTarget.y - ringY) * 0.18;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  $$('a, button, .tilt-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring.style.transform = 'translate(-50%,-50%) scale(1.6)');
    el.addEventListener('mouseleave', () => ring.style.transform = 'translate(-50%,-50%) scale(1)');
  });
})();

/* ---------- Typewriter hero subtitle ---------- */
(function typewriter() {
  const el = $('#typewriter');
  if (!el) return;
  const phrases = [
    'Landing page modern.',
    'Template UMKM siap pakai.',
    'Progressive Web App.',
    'Website cepat & ringan.'
  ];
  let phraseIndex = 0, charIndex = 0, deleting = false;

  function tick() {
    const current = phrases[phraseIndex];
    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1400);
        return;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? 35 : 55);
  }
  tick();
})();

/* ---------- Magnetic buttons ---------- */
(function magneticButtons() {
  if (window.matchMedia('(hover: none)').matches) return;
  $$('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0,0)';
    });
  });
})();

/* ---------- Tilt cards ---------- */
(function tiltCards() {
  if (window.matchMedia('(hover: none)').matches) return;
  $$('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${px * 8}deg) rotateX(${py * -8}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateY(0)';
    });
  });
})();
