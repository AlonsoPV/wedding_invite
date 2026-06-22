document.addEventListener('DOMContentLoaded', () => {
    // Envelope Logic
    const envelopeWrapper = document.getElementById('envelope');
    const envelopeScreen = document.getElementById('envelope-screen');
    const invitationScreen = document.getElementById('invitation-screen');

    if (envelopeWrapper && envelopeScreen && invitationScreen) {
        envelopeWrapper.addEventListener('click', () => {
            envelopeWrapper.classList.add('open');
            
            // Wait for letter to slide up, then expand it
            setTimeout(() => {
                envelopeWrapper.classList.add('expand');
                
                // Switch screens while expanding
                setTimeout(() => {
                    envelopeScreen.classList.remove('active');
                    invitationScreen.classList.add('active');
                    
                    // Trigger hero animations after envelope disappears
                    setTimeout(() => {
                        const heroElements = document.querySelectorAll('.hero .stagger-1, .hero .stagger-2, .hero .stagger-3, .hero .stagger-4, .hero .stagger-5');
                        heroElements.forEach(el => {
                            el.style.animationPlayState = 'running';
                        });
                    }, 100);
                }, 800);
            }, 800);
        });
    }

    // Pause hero animations initially if envelope is present
    if (envelopeScreen) {
        const heroElements = document.querySelectorAll('.hero .stagger-1, .hero .stagger-2, .hero .stagger-3, .hero .stagger-4, .hero .stagger-5');
        heroElements.forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    }

    // Nav Scroll
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight - 100) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }
    });

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            navToggle.classList.toggle('open', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
        });

        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.setAttribute('aria-label', 'Abrir menú');
            });
        });

        document.addEventListener('click', (event) => {
            if (!navbar.contains(event.target)) {
                navLinks.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.setAttribute('aria-label', 'Abrir menú');
            }
        });
    }

    // Fade Up Observer
    const fadeElements = document.querySelectorAll('.fade-up');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // Countdown Timer
    // Target: November 7, 2026 at 11:00 AM Mexico City time
    // We will use standard time (-06:00)
    const targetDate = new Date('2026-11-07T11:00:00-06:00').getTime();

    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minutesEl = document.getElementById('cd-minutes');
    const secondsEl = document.getElementById('cd-seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            // Event passed
            if (daysEl) daysEl.innerText = '00';
            if (hoursEl) hoursEl.innerText = '00';
            if (minutesEl) minutesEl.innerText = '00';
            if (secondsEl) secondsEl.innerText = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (daysEl) daysEl.innerText = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.innerText = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.innerText = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.innerText = seconds.toString().padStart(2, '0');
    }

    if (daysEl && hoursEl && minutesEl && secondsEl) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
});