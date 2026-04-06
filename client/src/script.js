/**
 * script.js
 * Lógica principal de la invitación interactiva
 */

document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos del DOM
    const envelopeWrapper = document.getElementById('envelope');
    const envelopeScreen = document.getElementById('envelope-screen');
    const invitationScreen = document.getElementById('invitation-screen');
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    const rsvpBtn = document.getElementById('rsvp-btn');

    let isMusicPlaying = false;

    // 1. Lógica del Sobre y Transición Inicial
    envelopeWrapper.addEventListener('click', () => {
        // Añadir clase para activar la animación de apertura del sobre en CSS
        envelopeWrapper.classList.add('open');
        
        // Intentar reproducir música suave
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            musicBtn.classList.remove('hidden');
        }).catch(err => {
            // El autoplay puede ser bloqueado por el navegador, mostramos el botón de todos modos
            console.log("Autoplay prevenido por el navegador:", err);
            musicBtn.classList.remove('hidden');
        });

        // Esperar a que termine la animación del sobre (1.5 segundos) antes de cambiar de pantalla
        setTimeout(() => {
            envelopeScreen.classList.remove('active');
            invitationScreen.classList.add('active');
            
            // Disparar las animaciones de la portada
            setTimeout(() => {
                const firstElements = invitationScreen.querySelectorAll('.cover .animate-on-scroll');
                firstElements.forEach(el => el.classList.add('is-visible'));
            }, 100);

            // Inicializar el resto de componentes interactivos
            initScrollObserver();
            initCountdown();
            initPetals();
        }, 1500);
    });

    // 2. Control de Música (Botón Play/Pausa)
    musicBtn.addEventListener('click', () => {
        if (isMusicPlaying) {
            bgMusic.pause();
            // Icono de Mute (Volumen apagado)
            musicBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>';
        } else {
            bgMusic.play();
            // Icono de Play (Música activa)
            musicBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>';
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // 3. Animaciones al hacer Scroll con IntersectionObserver
    function initScrollObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Opcional: si queremos que la animación ocurra solo la primera vez, descomentamos:
                    // observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1, // Se activa cuando el 10% del elemento es visible
            rootMargin: "0px 0px -50px 0px" // Margen para que se active justo antes de estar completamente en pantalla
        });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    // 4. Cuenta Regresiva Dinámica
    function initCountdown() {
        // Fecha objetivo: 07 de Noviembre de 2026, 19:30 HRS
        const eventDate = new Date('November 07, 2026 19:30:00').getTime();
        
        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = eventDate - now;

            // Si la fecha ya pasó
            if (distance < 0) {
                document.getElementById('timer').innerHTML = "<h3>¡Llegó el gran día!</h3>";
                return;
            }

            // Cálculos de tiempo
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Actualizar el DOM
            document.getElementById('days').innerText = days.toString().padStart(2, '0');
            document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
            document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
        };

        updateTimer(); // Ejecución inicial
        setInterval(updateTimer, 1000); // Actualizar cada segundo
    }

    // 5. Efecto de Pétalos Cayendo (Generación Dinámica)
    function initPetals() {
        const container = document.getElementById('petals-container');
        const numPetals = 25; // Número de pétalos simultáneos

        for (let i = 0; i < numPetals; i++) {
            createPetal(container);
        }
    }

    function createPetal(container) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        // Propiedades aleatorias para movimiento natural
        const size = Math.random() * 15 + 10; // Tamaño: 10px a 25px
        const left = Math.random() * 100; // Posición X: 0% a 100% de la pantalla
        const duration = Math.random() * 10 + 12; // Duración caída: 12s a 22s
        const delay = Math.random() * 10; // Retraso inicial para que no caigan todos juntos

        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left = `${left}vw`;
        petal.style.animationDuration = `${duration}s`;
        petal.style.animationDelay = `-${delay}s`; // Negativo para que ya haya pétalos en pantalla

        container.appendChild(petal);
    }

    // 6. Botón Copiar Datos (Mesa de Regalos)
    const copyBtn = document.getElementById('copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const bankData = `Banco: BBVA\nCuenta: 0123456789\nCLABE: 012345678901234567\nBeneficiario: Carlos & Viviana`;
            navigator.clipboard.writeText(bankData).then(() => {
                const originalContent = copyBtn.innerHTML;
                copyBtn.innerHTML = '<span>¡Datos copiados!</span>';
                copyBtn.classList.add('success');
                copyBtn.classList.remove('outline');
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalContent;
                    copyBtn.classList.remove('success');
                    copyBtn.classList.add('outline');
                }, 3000);
            });
        });
    }

    // 7. Botón de Confirmación (RSVP)
    if (rsvpBtn) {
        rsvpBtn.addEventListener('click', () => {
            alert('¡Gracias por tu interés! La funcionalidad de confirmación de asistencia estará disponible pronto.');
        });
    }
});
