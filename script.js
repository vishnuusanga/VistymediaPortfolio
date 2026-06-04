// =====================
// PAGE TRANSITION
// =====================

// =====================
// PARTICLES
// =====================
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 100; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 3 + 0.5;
    p.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random() * 100}%;
        background:${Math.random() > 0.5 ? 'rgba(255,255,255,0.8)' : 'rgba(150,180,255,0.8)'};
        animation-duration:${Math.random() * 25 + 15}s;
        animation-delay:-${Math.random() * 25}s;
        opacity:${Math.random() * 0.6 + 0.1};
    `;
    particlesContainer.appendChild(p);
}

// =====================
// FLOATING VIDEO ICONS
// =====================
const videoIcons = ['✂️','🎬','🎥','📽️','🎞️','▶️','⏸️','⏺️','🔊','🎵','🎶','📹','💡','⚡','🎯','✨','🔴','⏯️','🎤','🖥️'];
const floatingContainer = document.getElementById('floatingIcons');
for (let i = 0; i < 30; i++) {
    const icon = document.createElement('div');
    icon.classList.add('float-icon');
    icon.textContent = videoIcons[Math.floor(Math.random() * videoIcons.length)];
    icon.style.cssText = `
        left:${Math.random() * 100}%;
        font-size:${Math.random() * 16 + 10}px;
        animation-duration:${Math.random() * 20 + 12}s;
        animation-delay:-${Math.random() * 20}s;
        filter: grayscale(1) brightness(3) opacity(0.07);
    `;
    floatingContainer.appendChild(icon);
}

// =====================
// SMOOTH SCROLLING
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// =====================
// NAVBAR SCROLL
// =====================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0,0,160,0.92)';
        navbar.style.boxShadow = '0 10px 40px rgba(0,0,0,0.4)';
    } else {
        navbar.style.background = 'rgba(0,0,180,0.3)';
        navbar.style.boxShadow = 'none';
    }
});

// =====================
// MOUSE PARALLAX
// =====================
document.addEventListener('mousemove', (e) => {
    const mx = e.clientX / window.innerWidth;
    const my = e.clientY / window.innerHeight;
    document.querySelectorAll('.orb').forEach((orb, i) => {
        orb.style.transform = `translate(${(mx-0.5)*(i+1)*20}px,${(my-0.5)*(i+1)*20}px)`;
    });
    document.querySelectorAll('.geo').forEach((geo, i) => {
        geo.style.transform = `translate(${(mx-0.5)*(i+1)*8}px,${(my-0.5)*(i+1)*8}px)`;
    });
    const glow = document.querySelector('.hero-bg-glow');
    const hero = document.querySelector('.hero');
    if (glow && hero) {
        const rect = hero.getBoundingClientRect();
        if (e.clientY > rect.top && e.clientY < rect.bottom) {
            glow.style.left = (e.clientX - rect.left) + 'px';
            glow.style.top = (e.clientY - rect.top) + 'px';
            glow.style.transform = 'translate(-50%,-50%)';
        }
    }
});

// Cursor glow
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
    position:fixed; width:350px; height:350px; border-radius:50%;
    background:radial-gradient(circle,rgba(255,255,255,0.04) 0%,transparent 70%);
    pointer-events:none; z-index:1; transform:translate(-50%,-50%); transition:all 0.15s ease;
`;
document.body.appendChild(cursorGlow);
document.addEventListener('mousemove', e => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// =====================
// COUNTER ANIMATION
// =====================
function animateCounter(el, target) {
    let current = 0;
    const timer = setInterval(() => {
        current += target / 60;
        if (current >= target) { current = target; clearInterval(timer); }
        const label = el.getAttribute('data-label') || '';
el.textContent = Math.floor(current) + label + '+';
    }, 25);
}

const statObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            statObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });
document.querySelectorAll('.stat-number').forEach(el => statObs.observe(el));

// =====================
// SCROLL REVEAL SECTIONS
// =====================
const revealSections = ['.stats', '.services', '.portfolio', '.testimonials', '.contact', 'footer'];
revealSections.forEach(sel => {
    const el = document.querySelector(sel);
    if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(60px)';
        el.style.transition = 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)';
    }
});

const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.05 });

revealSections.forEach(sel => {
    const el = document.querySelector(sel);
    if (el) sectionObs.observe(el);
});

// =====================
// CARDS STAGGER
// =====================
const cardObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, i * 130);
            cardObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('.card, .video-card, .stat-item, .testi-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px) scale(0.95)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    cardObs.observe(el);
});

// =====================
// RIPPLE
// =====================
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        ripple.style.cssText = `
            position:absolute; width:8px; height:8px;
            background:rgba(255,255,255,0.5); border-radius:50%;
            left:${e.clientX-rect.left}px; top:${e.clientY-rect.top}px;
            transform:scale(0); animation:rippleAnim 0.7s ease-out forwards;
            pointer-events:none;
        `;
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 700);
    });
});

document.head.insertAdjacentHTML('beforeend', `<style>@keyframes rippleAnim{to{transform:scale(35);opacity:0}}</style>`);
// =====================
// HAMBURGER MENU
// =====================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
}