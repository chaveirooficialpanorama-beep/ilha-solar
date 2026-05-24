// --- LOADER ---
const loader = document.getElementById('loader');
const loaderBar = document.getElementById('loader-bar');
const loaderPct = document.getElementById('loader-pct');
let pct = 0;
const loaderInterval = setInterval(() => {
  pct += Math.random() * 18;
  if (pct >= 100) {
    pct = 100;
    clearInterval(loaderInterval);
    setTimeout(() => {
      loader.classList.add('hidden');
      initPage();
    }, 400);
  }
  loaderBar.style.width = pct + '%';
  loaderPct.textContent = Math.floor(pct) + '%';
}, 100);

function initPage() {
  // GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // HERO ANIMATIONS
  gsap.to('#hero-eyebrow', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 });
  gsap.to('#hero-title',   { opacity: 1, y: 0, duration: 1,   ease: 'power3.out', delay: 0.35 });
  gsap.to('#hero-sub',     { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.6 });
  gsap.to('#hero-ctas',    { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.8 });

  // PARALLAX
  gsap.to('#hero-parallax', {
    yPercent: 25,
    ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
  });
  gsap.to('#visual-parallax', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: { trigger: '#visual-impact', start: 'top bottom', end: 'bottom top', scrub: true }
  });

  // REVEAL ELEMENTS
  gsap.utils.toArray('.reveal').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });
  });

  // COUNTERS
  gsap.utils.toArray('.counter').forEach((el) => {
    const target = parseInt(el.dataset.target);
    const decimal = el.dataset.decimal || '';
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: function () {
            const v = Math.floor(this.targets()[0].val);
            el.textContent = v === target ? target + decimal : v;
          }
        });
        // Animate bar fill if inside brasil-card
        const card = el.closest('.brasil-card');
        if (card) {
          const fill = card.querySelector('.brasil-bar-fill');
          if (fill) setTimeout(() => fill.classList.add('animated'), 200);
        }
      }
    });
  });

  // Animate bars for cards without counters (safety)
  document.querySelectorAll('.brasil-bar-fill').forEach(fill => {
    ScrollTrigger.create({
      trigger: fill,
      start: 'top 90%',
      onEnter: () => fill.classList.add('animated')
    });
  });
}

// --- CURSOR ---
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

function animateCursor() {
  fx += (mx - fx) * 0.1;
  fy += (my - fy) * 0.1;
  follower.style.left = fx + 'px';
  follower.style.top  = fy + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .benefit-card, .gallery-item, .testimonial-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform   = 'translate(-50%, -50%) scale(2)';
    follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    follower.style.borderColor = 'rgba(232,170,53,0.7)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform   = 'translate(-50%, -50%) scale(1)';
    follower.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.borderColor = 'rgba(144,168,197,0.45)';
  });
});

// --- NAVBAR SCROLL ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// --- PARTICLES ---
const particleContainer = document.getElementById('particles');
for (let i = 0; i < 18; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.left              = Math.random() * 100 + '%';
  p.style.animationDuration = (8 + Math.random() * 12) + 's';
  p.style.animationDelay    = (Math.random() * 10) + 's';
  p.style.width = p.style.height = (1 + Math.random() * 2) + 'px';
  p.style.opacity = 0.3 + Math.random() * 0.5;
  particleContainer.appendChild(p);
}

// --- SMOOTH SCROLL ---
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
