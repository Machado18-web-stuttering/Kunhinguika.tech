// ============================================================================
// MÓDULO DE ANIMAÇÕES
// ============================================================================

import { debounce, isElementInViewport } from '../main.js';

/**
 * Inicializa todas as animações
 */
export function initAnimations() {
    initScrollAnimations();
    initParallaxEffect();
    initHoverAnimations();
    initLoadingAnimations();
    initTypewriterEffect();
}

/**
 * Animações baseadas em scroll
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    if (!animatedElements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.getAttribute('data-animate');
                
                element.classList.add('animate__animated', `animate__${animationType}`);
                
                // Remover observer após animação
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => observer.observe(element));
}

/**
 * Efeito parallax para elementos com data-parallax
 */
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (!parallaxElements.length) return;
    
    window.addEventListener('scroll', debounce(() => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
            const yPos = -(scrolled * speed);
            
            if (isElementInViewport(element)) {
                element.style.transform = `translateY(${yPos}px)`;
            }
        });
    }, 10));
}

/**
 * Animações de hover
 */
function initHoverAnimations() {
    // Cards com efeito de elevação
    const hoverCards = document.querySelectorAll('.card-hover');
    
    hoverCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '';
        });
    });
    
    // Botões com efeito de pulso
    const pulseButtons = document.querySelectorAll('.btn-pulse');
    
    pulseButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.classList.add('pulse');
        });
        
        button.addEventListener('mouseleave', () => {
            button.classList.remove('pulse');
        });
    });
    
    // Links com efeito de sublinhado
    const underlineLinks = document.querySelectorAll('.link-underline');
    
    underlineLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.backgroundImage = 'linear-gradient(to right, currentColor, currentColor)';
            link.style.backgroundSize = '100% 2px';
            link.style.backgroundPosition = '0 100%';
            link.style.backgroundRepeat = 'no-repeat';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.backgroundSize = '0% 2px';
        });
    });
}

/**
 * Animações de carregamento
 */
function initLoadingAnimations() {
    // Skeleton loading para imagens
    const images = document.querySelectorAll('img[data-src]');
    
    images.forEach(img => {
        const src = img.getAttribute('data-src');
        
        // Adicionar classe de loading
        img.classList.add('loading');
        
        // Carregar imagem
        const imageLoader = new Image();
        imageLoader.src = src;
        
        imageLoader.onload = () => {
            img.src = src;
            img.classList.remove('loading');
            img.classList.add('loaded');
        };
        
        imageLoader.onerror = () => {
            img.classList.remove('loading');
            img.classList.add('error');
        };
    });
    
    // Animar elementos com delay
    const staggeredElements = document.querySelectorAll('[data-stagger]');
    
    staggeredElements.forEach((element, index) => {
        const delay = index * 100;
        element.style.animationDelay = `${delay}ms`;
    });
}

/**
 * Efeito typewriter para textos
 */
function initTypewriterEffect() {
    const typewriterElements = document.querySelectorAll('[data-typewriter]');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        const speed = element.getAttribute('data-speed') || 50;
        
        function typeWriter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        
        // Iniciar quando elemento estiver visível
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(element);
                }
            });
        });
        
        observer.observe(element);
    });
}

/**
 * Inicializa animações de contador
 */
export function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-counter]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-counter'));
        const suffix = counter.getAttribute('data-suffix') || '';
        const prefix = counter.getAttribute('data-prefix') || '';
        const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
        
        let start = 0;
        const increment = target / (duration / 16); // 60fps
        
        const updateCounter = () => {
            start += increment;
            if (start < target) {
                counter.textContent = prefix + Math.floor(start) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = prefix + target + suffix;
            }
        };
        
        // Iniciar quando visível
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        });
        
        observer.observe(counter);
    });
}

/**
 * Efeito de revelação ao scroll
 */
export function initRevealOnScroll() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const reveal = () => {
        revealElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('revealed');
            }
        });
    };
    
    window.addEventListener('scroll', debounce(reveal, 10));
    reveal(); // Verificar inicialmente
}