/**
 * script.js
 * Cinematic Wedding Invitation Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const envelopeContainer = document.getElementById('envelope-container');
    const envelopeScreen = document.getElementById('envelope-screen');
    const invitationScreen = document.getElementById('invitation-screen');
    const openBtn = document.getElementById('open-btn');
    const lightDimmer = document.getElementById('light-dimmer');
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');

    let isMusicPlaying = false;

    // Opening Sequence
    const startOpening = () => {
        // 1. Dim the lights
        lightDimmer.classList.add('dimmed');
        
        // 2. Play opening sound/music
        tryToPlayMusic();

        // 3. Start 3D animation sequence
        envelopeContainer.classList.add('active-open');

        // 4. Final reveal transition
        setTimeout(() => {
            envelopeContainer.classList.add('open');
            
            setTimeout(() => {
                envelopeScreen.classList.remove('active');
                invitationScreen.classList.add('active');
                lightDimmer.classList.remove('dimmed');

                // Trigger entry animations for the cover
                setTimeout(() => {
                    document.querySelectorAll('#invitation-screen .fade-up').forEach((el, i) => {
                        setTimeout(() => el.classList.add('visible'), i * 200);
                    });
                }, 300);

                initScrollObserver();
                initCountdown();
                initPetals();
            }, 1000);
        }, 1500);
    };

    envelopeContainer.addEventListener('click', startOpening);
    openBtn.addEventListener('click', startOpening);

    // Accessibility (Enter/Space)
    window.addEventListener('keydown', (e) => {
        if (envelopeScreen.classList.contains('active') && (e.key === 'Enter' || e.key === ' ')) {
            startOpening();
        }
    });

    // Music Logic
    function tryToPlayMusic() {
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            musicBtn.classList.remove('hidden');
        }).catch(() => {
            musicBtn.classList.remove('hidden');
        });
    }

    musicBtn.addEventListener('click', () => {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>';
        } else {
            bgMusic.play();
            musicBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>';
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // Dust Particles (Cinematic floating effect)
    function initDust() {
        const container = document.getElementById('dust-container');
        for (let i = 0; i < 40; i++) {
            const dust = document.createElement('div');
            dust.classList.add('dust');
            const size = Math.random() * 3 + 1;
            dust.style.width = `${size}px`;
            dust.style.height = `${size}px`;
            dust.style.left = `${Math.random() * 100}vw`;
            dust.style.top = `${Math.random() * 100}vh`;
            dust.style.animationDuration = `${Math.random() * 20 + 10}s`;
            dust.style.animationDelay = `${Math.random() * 5}s`;
            container.appendChild(dust);
        }
    }
    initDust();

    // Scroll Observer
    function initScrollObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    }

    // Countdown
    function initCountdown() {
        const target = new Date('October 15, 2026 17:00:00').getTime();
        const update = () => {
            const now = new Date().getTime();
            const diff = target - now;
            if (diff < 0) return;

            document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
            document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
            document.getElementById('minutes').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            document.getElementById('seconds').innerText = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
        };
        setInterval(update, 1000);
        update();
    }

    // Petals (Very subtle)
    function initPetals() {
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '0'; container.style.left = '0';
        container.style.width = '100%'; container.style.height = '100%';
        container.style.pointerEvents = 'none'; container.style.zIndex = '5';
        document.body.appendChild(container);

        for (let i = 0; i < 15; i++) {
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.style.left = `${Math.random() * 100}vw`;
            petal.style.animationDuration = `${Math.random() * 15 + 15}s`;
            petal.style.animationDelay = `-${Math.random() * 20}s`;
            container.appendChild(petal);
        }
    }
});
