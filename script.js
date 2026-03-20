// ==============================
// NAVBAR SCROLL EFFECT
// ==============================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
});

// ==============================
// HAMBURGER MENU
// ==============================
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
    }
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ==============================
// ACTIVE NAV LINK
// ==============================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (correspondingLink) {
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                correspondingLink.classList.add('active');
            }
        }
    });
}

// ==============================
// TYPED TEXT ANIMATION
// ==============================
const phrases = [
    'Network Technical Leader',
    'Protocol Testing Expert',
    'Python Automation Engineer',
    'BGP/MPLS Specialist',
    'AI-Driven Tester'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed-text');

function typeText() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        charIndex--;
        typedEl.textContent = currentPhrase.substring(0, charIndex);

        if (charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeText, 400);
            return;
        }
        setTimeout(typeText, 50);
    } else {
        charIndex++;
        typedEl.textContent = currentPhrase.substring(0, charIndex);

        if (charIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(typeText, 2000);
            return;
        }
        setTimeout(typeText, 80);
    }
}

setTimeout(typeText, 1200);

// ==============================
// COUNTER ANIMATION
// ==============================
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 1500;
    const start = performance.now();

    function update(timestamp) {
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target;
    }

    requestAnimationFrame(update);
}

// ==============================
// INTERSECTION OBSERVER
// ==============================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe AOS elements
document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.1}s`;
    observer.observe(item);
});

// Observe edu cards
document.querySelectorAll('.edu-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.15}s`;
    observer.observe(card);
});

// Counter observer (trigger when hero stats visible)
const heroStats = document.querySelector('.hero-stats');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.stat-value[data-target]').forEach(animateCounter);
            counterObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

if (heroStats) counterObserver.observe(heroStats);

// ==============================
// SMOOTH SCROLL (BACKUP)
// ==============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ==============================
// MOUSE PARALLAX ON ORBS
// ==============================
const orbs = document.querySelectorAll('.orb');
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    orbs.forEach((orb, i) => {
        const factor = (i + 1) * 15;
        orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
}, { passive: true });

// ==============================
// PAGE LOAD
// ==============================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});
