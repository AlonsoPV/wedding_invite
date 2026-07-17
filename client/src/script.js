document.addEventListener('DOMContentLoaded', () => {
    // Envelope Logic
    const envelopeWrapper = document.getElementById('envelope');
    const envelopeScreen = document.getElementById('envelope-screen');
    const invitationScreen = document.getElementById('invitation-screen');

    if (envelopeWrapper && envelopeScreen && invitationScreen) {
        envelopeWrapper.addEventListener('click', () => {
            envelopeWrapper.classList.add('open');
            
            // Wait for letter to rise and give time to read the message
            setTimeout(() => {
                envelopeWrapper.classList.add('expand');
                
                // Switch screens after the expand begins
                setTimeout(() => {
                    envelopeScreen.classList.remove('active');
                    invitationScreen.classList.add('active');
                    
                    setTimeout(() => {
                        const heroElements = document.querySelectorAll('.hero .stagger-1, .hero .stagger-2, .hero .stagger-3, .hero .stagger-4, .hero .stagger-5');
                        heroElements.forEach(el => {
                            el.style.animationPlayState = 'running';
                        });
                        initRice();
                    }, 100);
                }, 1200);
            }, 2800);
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
    // Target: November 7, 2026 at 18:45 Mexico City time (UTC-6)
    const targetDate = new Date('2026-11-07T18:45:00-06:00').getTime();

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

    // Falling rice (arrocitos)
    function initRice() {
        const container = document.getElementById('rice-container');
        if (!container || container.dataset.ready === 'true') return;
        container.dataset.ready = 'true';

        const count = 40;
        for (let i = 0; i < count; i++) {
            createRiceGrain(container);
        }
    }

    function createRiceGrain(container) {
        const grain = document.createElement('span');
        grain.className = 'rice-grain';

        const width = Math.random() * 4 + 3;
        const height = width * (1.8 + Math.random() * 0.8);
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 14;
        const delay = Math.random() * 12;
        const drift = (Math.random() * 60 - 30).toFixed(1);
        const spin = Math.random() > 0.5 ? 1 : -1;
        const tones = ['#F3F1E5', '#CFC8B5', '#E8E2D2', '#BDB5A0'];

        grain.style.width = `${width}px`;
        grain.style.height = `${height}px`;
        grain.style.left = `${left}vw`;
        grain.style.background = tones[Math.floor(Math.random() * tones.length)];
        grain.style.animationDuration = `${duration}s`;
        grain.style.animationDelay = `-${delay}s`;
        grain.style.setProperty('--drift', `${drift}vw`);
        grain.style.setProperty('--spin', String(spin));

        container.appendChild(grain);
    }

    // RSVP modal form
    const rsvpBtn = document.getElementById('rsvp-btn');
    const rsvpModal = document.getElementById('rsvp-modal');
    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpFormView = document.getElementById('rsvp-form-view');
    const rsvpThanksView = document.getElementById('rsvp-thanks-view');
    const allergyCheck = document.getElementById('rsvp-allergy-check');
    const allergyDetail = document.getElementById('rsvp-allergy-detail');
    const allergyText = document.getElementById('rsvp-allergy-text');
    const attendingFields = document.getElementById('rsvp-attending-fields');
    const companionDetail = document.getElementById('rsvp-companion-detail');
    const companionName = document.getElementById('rsvp-companion-name');

    function syncAttendanceFields() {
        const attendance = rsvpForm?.querySelector('input[name="attendance"]:checked')?.value;
        const isAttending = attendance !== 'no';
        if (attendingFields) attendingFields.hidden = !isAttending;

        if (!isAttending) {
            if (allergyDetail) allergyDetail.hidden = true;
            if (allergyText) {
                allergyText.required = false;
                allergyText.value = '';
            }
            if (allergyCheck) allergyCheck.checked = false;
            if (companionDetail) companionDetail.hidden = true;
            if (companionName) {
                companionName.required = false;
                companionName.value = '';
            }
            return;
        }

        syncCompanionFields();
    }

    function syncCompanionFields() {
        const withCompanion = rsvpForm?.querySelector('input[name="companion"]:checked')?.value === 'con';
        if (companionDetail) companionDetail.hidden = !withCompanion;
        if (companionName) {
            companionName.required = withCompanion;
            if (!withCompanion) companionName.value = '';
        }
    }

    function openRsvpModal() {
        if (!rsvpModal) return;
        rsvpModal.classList.add('is-open');
        rsvpModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('rsvp-open');
        if (rsvpFormView && rsvpThanksView) {
            rsvpFormView.hidden = false;
            rsvpThanksView.hidden = true;
        }
        syncAttendanceFields();
        document.getElementById('rsvp-fullname')?.focus();
    }

    function closeRsvpModal() {
        if (!rsvpModal) return;
        rsvpModal.classList.remove('is-open');
        rsvpModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('rsvp-open');
    }

    if (rsvpBtn) {
        rsvpBtn.addEventListener('click', openRsvpModal);
    }

    rsvpModal?.querySelectorAll('[data-rsvp-close]').forEach((el) => {
        el.addEventListener('click', closeRsvpModal);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && rsvpModal?.classList.contains('is-open')) {
            closeRsvpModal();
        }
    });

    rsvpForm?.querySelectorAll('input[name="attendance"]').forEach((el) => {
        el.addEventListener('change', syncAttendanceFields);
    });

    rsvpForm?.querySelectorAll('input[name="companion"]').forEach((el) => {
        el.addEventListener('change', syncCompanionFields);
    });

    allergyCheck?.addEventListener('change', () => {
        const enabled = allergyCheck.checked;
        if (allergyDetail) allergyDetail.hidden = !enabled;
        if (allergyText) {
            allergyText.required = enabled;
            if (!enabled) allergyText.value = '';
        }
    });

    rsvpForm?.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(rsvpForm);
        const attendance = formData.get('attendance');
        const companion = formData.get('companion');

        if (attendance === 'si' && companion === 'con' && companionName && !companionName.value.trim()) {
            companionName.focus();
            return;
        }

        if (attendance === 'si' && allergyCheck?.checked && allergyText && !allergyText.value.trim()) {
            allergyText.focus();
            return;
        }

        const diets = attendance === 'si' ? formData.getAll('diet') : [];
        const payload = {
            fullName: formData.get('fullName'),
            attendance,
            companion: attendance === 'si' ? companion : null,
            companionName: attendance === 'si' && companion === 'con' ? formData.get('companionName') : '',
            diets,
            allergyDetail: attendance === 'si' ? (formData.get('allergyDetail') || '') : '',
            submittedAt: new Date().toISOString(),
        };

        try {
            const existing = JSON.parse(localStorage.getItem('weddingRsvps') || '[]');
            existing.push(payload);
            localStorage.setItem('weddingRsvps', JSON.stringify(existing));
        } catch (_) {
            // Ignore storage errors
        }

        rsvpForm.reset();
        if (allergyDetail) allergyDetail.hidden = true;
        if (allergyText) allergyText.required = false;
        if (companionDetail) companionDetail.hidden = true;
        if (companionName) companionName.required = false;
        if (attendingFields) attendingFields.hidden = false;

        if (rsvpFormView && rsvpThanksView) {
            rsvpFormView.hidden = true;
            rsvpThanksView.hidden = false;
        }
    });
});