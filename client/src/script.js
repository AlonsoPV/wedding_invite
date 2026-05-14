document.addEventListener('DOMContentLoaded', () => {
    // Nav Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight - 100) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }
    });

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