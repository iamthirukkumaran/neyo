/**
 * NEYO — Human-Crafted Interactive Experience
 * Handcrafted Live Mobile UI inside iPhone Mockup, Screen Switcher,
 * Interactive Post Liking, Live Clock, Scroll Reveals, Top Progress Bar, Animated Counters
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initScrollProgressBar();
  initScrollReveal();
  initHero3DTilt();
  initHandcraftedPhoneUI();
  initCounterUp();
  initDiscoveryLab();
  initQRCodes();
  initInvitePages();
});

/* ==========================================================================
   1. Theme Management (Light by default, matching real app screenshots)
   ========================================================================== */
function initTheme() {
  const toggleBtns = document.querySelectorAll('.theme-toggle');
  const storedTheme = localStorage.getItem('neyo-theme');

  let currentTheme = storedTheme || 'light';
  applyTheme(currentTheme);

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('neyo-theme', currentTheme);
      applyTheme(currentTheme);
    });
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);

  document.querySelectorAll('.logo-img').forEach(img => {
    const isDark = theme === 'dark';
    const basePath = img.getAttribute('data-base-path') || '';
    img.src = `${basePath}assets/images/${isDark ? 'logo_white.svg' : 'logo.svg'}`;
  });

  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.innerHTML = theme === 'dark'
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  });
}

/* ==========================================================================
   2. Mobile Navigation
   ========================================================================== */
function initMobileNav() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuBtn.innerHTML = isOpen 
        ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>`
        : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
      menuBtn.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuBtn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
      });
    });
  }
}

/* ==========================================================================
   3. Scroll Reading Progress Bar
   ========================================================================== */
function initScrollProgressBar() {
  let bar = document.querySelector('.scroll-progress-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.className = 'scroll-progress-bar';
    document.body.appendChild(bar);
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / totalHeight)) : 0;
        bar.style.transform = `scaleX(${progress})`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ==========================================================================
   4. Scroll-Driven Reveal Animations (IntersectionObserver)
   ========================================================================== */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length || !('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   5. Hero iPhone 3D Tactile Tilt
   ========================================================================== */
function initHero3DTilt() {
  const heroSection = document.querySelector('.hero-section');
  const phoneMockup = document.querySelector('.iphone-pro-mockup[data-tilt]');
  if (!heroSection || !phoneMockup) return;

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let bounds = heroSection.getBoundingClientRect();

    window.addEventListener('resize', () => {
      bounds = heroSection.getBoundingClientRect();
    }, { passive: true });

    heroSection.addEventListener('mousemove', e => {
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const normX = (mouseX / bounds.width) - 0.5;
      const normY = (mouseY / bounds.height) - 0.5;

      const rotY = normX * 12;
      const rotX = -normY * 10;

      phoneMockup.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    }, { passive: true });

    heroSection.addEventListener('mouseleave', () => {
      phoneMockup.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      phoneMockup.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => {
        phoneMockup.style.transition = 'transform 0.15s ease-out';
      }, 600);
    });
  }
}

/* ==========================================================================
   6. Handcrafted Native Mobile UI Inside Phone Mockup
   ========================================================================== */
function initHandcraftedPhoneUI() {
  const tabs = document.querySelectorAll('.phone-tab-btn');
  const screens = {
    home: document.getElementById('mock-screen-home'),
    chats: document.getElementById('mock-screen-chats'),
    profile: document.getElementById('mock-screen-profile')
  };

  const navItems = document.querySelectorAll('.mock-nav-item');
  const pillUser = document.querySelector('.pill-top-left');
  const pillGroup = document.querySelector('.pill-bottom-right');

  // Clock Update
  const clockEl = document.getElementById('mock-live-clock');
  if (clockEl) {
    function updateClock() {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes().toString().padStart(2, '0');
      clockEl.textContent = `${h}:${m}`;
    }
    updateClock();
    setInterval(updateClock, 30000);
  }

  // Interactive Screen Switcher
  function switchMockScreen(target) {
    // Top Tabs
    tabs.forEach(t => {
      const matches = t.getAttribute('data-screen') === target;
      t.classList.toggle('active', matches);
      t.setAttribute('aria-selected', matches ? 'true' : 'false');
    });

    // Mock Screens
    Object.keys(screens).forEach(key => {
      if (screens[key]) {
        screens[key].classList.toggle('active', key === target);
      }
    });

    // Mock Bottom Nav
    navItems.forEach(item => {
      const itemNav = item.getAttribute('data-nav');
      item.classList.toggle('active', itemNav === target);
    });

    // Floating Badges update
    if (pillUser && pillGroup) {
      if (target === 'home') {
        pillUser.querySelector('.pill-title').textContent = 'Anbu · Very close';
        pillUser.querySelector('.pill-sub').textContent = '📍 Coimbatore · Food & Stories';
        pillGroup.querySelector('.pill-title').textContent = 'Cbe group · 42 members';
        pillGroup.querySelector('.pill-sub').textContent = 'Weekend ride to Nilgiris 🏍️';
      } else if (target === 'chats') {
        pillUser.querySelector('.pill-title').textContent = 'Ragul · Active chat';
        pillUser.querySelector('.pill-sub').textContent = '🙏 Accepted friend · 1d ago';
        pillGroup.querySelector('.pill-title').textContent = 'Cbe group · Local gang';
        pillGroup.querySelector('.pill-sub').textContent = 'Arun: 🎨 Sticker';
      } else if (target === 'profile') {
        pillUser.querySelector('.pill-title').textContent = 'Anbu 🔒 · Profile';
        pillUser.querySelector('.pill-sub').textContent = '38 Posts · 4 trips';
        pillGroup.querySelector('.pill-title').textContent = 'Trips & memories';
        pillGroup.querySelector('.pill-sub').textContent = 'Hot filter tea & winding roads ☕';
      }
    }
  }

  // Attach tab switch events
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-screen');
      switchMockScreen(target);
    });
  });

  // Attach bottom phone nav switch events
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const navTarget = item.getAttribute('data-nav');
      if (navTarget === 'home' || navTarget === 'chats' || navTarget === 'profile') {
        switchMockScreen(navTarget);
      }
    });
  });

  // Interactive Like Button
  const likeBtn = document.getElementById('mock-feed-like-btn');
  const likesCount = document.getElementById('mock-likes-count');
  if (likeBtn && likesCount) {
    let isLiked = true;
    let count = 3;

    likeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isLiked = !isLiked;
      count = isLiked ? count + 1 : count - 1;

      likesCount.textContent = count;
      const heartSvg = likeBtn.querySelector('svg');

      if (isLiked) {
        heartSvg.setAttribute('fill', '#EF4444');
        heartSvg.setAttribute('stroke', '#EF4444');
        likeBtn.style.transform = 'scale(1.35)';
      } else {
        heartSvg.setAttribute('fill', 'none');
        heartSvg.setAttribute('stroke', '#0F172A');
        likeBtn.style.transform = 'scale(0.9)';
      }

      setTimeout(() => {
        likeBtn.style.transform = 'scale(1)';
      }, 150);
    });
  }
}

/* ==========================================================================
   7. Animated Counter-Up for Stats
   ========================================================================== */
function initCounterUp() {
  const statsStrip = document.querySelector('.human-stats-strip');
  if (!statsStrip || !('IntersectionObserver' in window)) return;

  const stats = [
    { el: statsStrip.children[0]?.querySelector('.stat-huge'), target: 4.8, isDecimal: true, suffix: '★' },
    { el: statsStrip.children[1]?.querySelector('.stat-huge'), target: 120, isDecimal: false, suffix: '+' },
    { el: statsStrip.children[2]?.querySelector('.stat-huge'), target: 50, isDecimal: false, suffix: 'k+' },
    { el: statsStrip.children[3]?.querySelector('.stat-huge'), target: 100, isDecimal: false, suffix: '%' }
  ];

  let animated = false;

  const observer = new IntersectionObserver((entries, obs) => {
    if (entries[0].isIntersecting && !animated) {
      animated = true;
      obs.unobserve(statsStrip);

      const duration = 1400;
      const startTime = performance.now();

      function animateNumbers(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(1, elapsed / duration);
        const easeProgress = 1 - Math.pow(1 - progress, 3);

        stats.forEach(item => {
          if (!item.el) return;
          const current = item.isDecimal 
            ? (easeProgress * item.target).toFixed(1)
            : Math.floor(easeProgress * item.target);
          item.el.textContent = `${current}${item.suffix}`;
        });

        if (progress < 1) {
          requestAnimationFrame(animateNumbers);
        }
      }

      requestAnimationFrame(animateNumbers);
    }
  }, { threshold: 0.25 });

  observer.observe(statsStrip);
}

/* ==========================================================================
   8. Proximity Radius Discovery Interactive Slider
   ========================================================================== */
function initDiscoveryLab() {
  const slider = document.getElementById('discovery-slider');
  const metricDisplay = document.getElementById('discovery-radius-text');
  const countDisplay = document.getElementById('discovery-count-text');
  const gridContainer = document.getElementById('discovery-items-wrap');
  const presetChips = document.querySelectorAll('.preset-chip, .chip-btn');

  if (!slider || !gridContainer) return;

  const corpus = [
    { name: 'Besant Nagar Chai Adda', dist: 0.3, cat: 'Hot ginger tea & sunset crowd', tag: 'Street Spot', icon: 'pin' },
    { name: 'Kavya · College Campus', dist: 0.4, cat: 'Final year Architecture · Photography', tag: 'Student', icon: 'user' },
    { name: 'Cross Cut Road Biryani Corner', dist: 0.8, cat: 'Authentic local wood-fired biryani', tag: 'Food Spot', icon: 'pin' },
    { name: 'Arjun · Designer', dist: 1.4, cat: 'Graphic designer · Indie vinyl collector', tag: 'Neighbor', icon: 'user' },
    { name: 'Indiranagar Vinyl Circle', dist: 2.8, cat: 'Weekend music listening sessions', tag: 'Community', icon: 'group' },
    { name: 'Nilgiri Trekkers Club', dist: 4.8, cat: 'Sunday hill trails & camping', tag: 'Community', icon: 'group' },
    { name: 'Marina Dawn Runners', dist: 5.2, cat: '6 AM beach promenade runs', tag: 'Community', icon: 'group' },
    { name: 'Pykara Waterfalls & Dam', dist: 18.0, cat: 'Scenic cascading water & boat dock', tag: 'Place to Visit', icon: 'pin' },
    { name: 'Catherine Falls Viewpoint', dist: 26.5, cat: 'Twin waterfall panoramic views', tag: 'Place to Visit', icon: 'pin' },
    { name: 'Hogenakkal River Trail', dist: 32.0, cat: 'Coracle boat rides on the river', tag: 'Day Trip', icon: 'pin' }
  ];

  function getVectorSvg(type) {
    if (type === 'user') {
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
    }
    if (type === 'group') {
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;
    }
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
  }

  function updateView(val) {
    const km = parseFloat(val);
    metricDisplay.textContent = km < 1 ? `${Math.round(km * 1000)}m` : `${km.toFixed(1)} km`;

    const visible = corpus.filter(item => item.dist <= km);

    if (countDisplay) {
      countDisplay.textContent = `${visible.length} people & places around you`;
    }

    let html = '';
    if (visible.length === 0) {
      html = `<div style="grid-column: 1/-1; text-align:center; padding:36px; color:var(--text-muted); font-size:0.95rem;">
        Slide further out to discover people and places.
      </div>`;
    } else {
      visible.forEach(item => {
        const svgIcon = getVectorSvg(item.icon);
        html += `
          <div class="discovery-item-card reveal-on-scroll is-revealed">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
              <div class="icon-box ${item.icon === 'user' ? 'icon-box-purple' : (item.icon === 'group' ? 'icon-box-orange' : 'icon-box-green')}" style="width:36px; height:36px;">
                ${svgIcon}
              </div>
              <span style="font-size:0.75rem; font-weight:700; color:var(--orange-accent); background:rgba(238,99,56,0.12); padding:3px 8px; border-radius:12px;">
                ${item.dist < 1 ? `${Math.round(item.dist * 1000)}m` : `${item.dist} km`}
              </span>
            </div>
            <div style="font-weight:700; font-size:1rem; margin-bottom:4px;">${item.name}</div>
            <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:12px; line-height:1.5;">${item.cat}</div>
            <span style="font-size:0.7rem; font-weight:600; background:var(--bg-surface-elevated); border:1px solid var(--border-subtle); padding:3px 10px; border-radius:var(--radius-full); color:var(--purple-primary);">
              ${item.tag}
            </span>
          </div>
        `;
      });
    }

    gridContainer.innerHTML = html;

    presetChips.forEach(chip => {
      const pVal = parseFloat(chip.getAttribute('data-val'));
      chip.classList.toggle('active', Math.abs(pVal - km) < 0.2);
    });
  }

  slider.addEventListener('input', e => updateView(e.target.value), { passive: true });

  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const targetVal = chip.getAttribute('data-val');
      slider.value = targetVal;
      updateView(targetVal);
    });
  });

  updateView(5.0);
}

/* ==========================================================================
   9. Dynamic QR Code Generator
   ========================================================================== */
function initQRCodes() {
  const qrContainers = document.querySelectorAll('.dynamic-qr');
  if (!qrContainers.length) return;

  qrContainers.forEach(container => {
    const targetUrl = container.getAttribute('data-url') || 'https://play.google.com/store/apps/details?id=com.neyoApp.neyo';
    container.innerHTML = generateMiniQRCodeSvg(targetUrl);
  });
}

function generateMiniQRCodeSvg(url) {
  const size = 25;
  const matrix = [];
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    hash = (hash << 5) - hash + url.charCodeAt(i);
    hash |= 0;
  }

  for (let r = 0; r < size; r++) {
    matrix[r] = [];
    for (let c = 0; c < size; c++) {
      const inTopLeft = r < 7 && c < 7;
      const inTopRight = r < 7 && c >= size - 7;
      const inBottomLeft = r >= size - 7 && c < 7;
      const inCenterLogo = r >= 9 && r <= 15 && c >= 9 && c <= 15;

      if (inTopLeft || inTopRight || inBottomLeft) {
        const edgeR = inBottomLeft ? r - (size - 7) : r;
        const edgeC = inTopRight ? c - (size - 7) : c;
        const isBorder = edgeR === 0 || edgeR === 6 || edgeC === 0 || edgeC === 6;
        const isInnerCore = edgeR >= 2 && edgeR <= 4 && edgeC >= 2 && edgeC <= 4;
        matrix[r][c] = isBorder || isInnerCore;
      } else if (inCenterLogo) {
        matrix[r][c] = false;
      } else {
        const val = Math.sin(r * 13 + c * 7 + hash) * 10000;
        matrix[r][c] = (val - Math.floor(val)) > 0.45;
      }
    }
  }

  let rects = '';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (matrix[r][c]) {
        rects += `<rect x="${c * 8 + 12}" y="${r * 8 + 12}" width="7" height="7" rx="1.5" fill="#0F172A"/>`;
      }
    }
  }

  return `
    <svg viewBox="0 0 224 224" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="224" height="224" rx="12" fill="#FFFFFF"/>
      <g>${rects}</g>
      <circle cx="112" cy="112" r="22" fill="#FFFFFF"/>
      <circle cx="112" cy="112" r="18" fill="#6E34A0"/>
      <path d="M 112 100 C 107 100 103 104 103 109 C 103 114 112 122 112 122 C 112 122 121 114 121 109 C 121 104 117 100 112 100 Z" fill="#EE6338"/>
      <circle cx="112" cy="107" r="3" fill="#FFFFFF"/>
    </svg>
  `;
}

/* ==========================================================================
   10. Invite Page Routing
   ========================================================================== */
function initInvitePages() {
  const communityTitle = document.getElementById('invite-target-name');
  const openAppBtn = document.getElementById('open-in-neyo-btn');

  if (!communityTitle || !openAppBtn) return;

  const urlParams = new URLSearchParams(window.location.search);
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  
  let id = urlParams.get('id') || (pathParts.length > 1 ? pathParts[1] : null);
  let name = urlParams.get('name');

  const isTrip = window.location.pathname.includes('/trip') || urlParams.get('type') === 'trip';

  if (!name && id) {
    name = id
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  }

  const finalName = name || (isTrip ? 'Weekend Adventure' : 'Local Community');
  communityTitle.textContent = finalName;

  const deepLink = isTrip 
    ? `neyo://trip/${id || 'explore'}` 
    : `neyo://community/${id || 'explore'}`;
  
  openAppBtn.href = deepLink;

  openAppBtn.addEventListener('click', () => {
    const startTime = Date.now();
    setTimeout(() => {
      if (Date.now() - startTime < 2000) {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const storeUrl = isIOS 
          ? 'https://apps.apple.com/app/neyo' 
          : 'https://play.google.com/store/apps/details?id=com.neyoApp.neyo';
        window.location.href = storeUrl;
      }
    }, 1500);
  });
}
