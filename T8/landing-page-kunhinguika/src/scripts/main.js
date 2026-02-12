// ============================================================================
// MAIN SCRIPT - KUNHINGUIKA.TECH
// ============================================================================

// Importação de Módulos
import { initNavigation } from './modules/navigation.js';
import { initAnimations } from './modules/animations.js';
import { initFormValidation } from './modules/form-validation.js';

// Inicialização da Aplicação
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Kunhinguika.tech - Carregando aplicação...');
    
    // Inicializar todos os módulos
    initNavigation();
    initAnimations();
    initFormValidation();
    
    // Inicializar funcionalidades adicionais
    initTheme();
    initBackToTop();
    initCurrentYear();
    initStatsCounter();
    initTestimonialsSlider();
    
    console.log('✅ Aplicação carregada com sucesso!');
});

// ============================================================================
// FUNÇÕES PRINCIPAIS
// ============================================================================

/**
 * Inicializa o sistema de temas (claro/escuro)
 */
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    
    // Aplicar tema salvo ou detectar preferência do sistema
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    }
    
    // Alternar tema ao clicar no botão
    themeToggle?.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Feedback visual
        themeToggle.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0)';
        }, 300);
    });
    
    // Atualizar ícone do tema
    function updateThemeIcon(theme) {
        if (!themeToggle) return;
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

/**
 * Inicializa o botão "Voltar ao Topo"
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Atualiza o ano atual no footer
 */
function initCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Inicializa o contador animado das estatísticas
 */
function initStatsCounter() {
    const statElements = document.querySelectorAll('.stat h3[data-count]');
    
    if (!statElements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.getAttribute('data-count'));
                animateCount(element, target);
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });
    
    statElements.forEach(element => observer.observe(element));
    
    function animateCount(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 20);
    }
}

/**
 * Inicializa o slider de depoimentos
 */
function initTestimonialsSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    if (!testimonialCards.length) return;
    
    let currentIndex = 0;
    
    function showTestimonial(index) {
        // Esconder todos
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Mostrar o atual
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    // Event Listeners para botões
    prevBtn?.addEventListener('click', () => {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = testimonialCards.length - 1;
        showTestimonial(newIndex);
    });
    
    nextBtn?.addEventListener('click', () => {
        let newIndex = currentIndex + 1;
        if (newIndex >= testimonialCards.length) newIndex = 0;
        showTestimonial(newIndex);
    });
    
    // Event Listeners para dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });
    
    // Auto-rotacionar a cada 5 segundos
    setInterval(() => {
        let newIndex = currentIndex + 1;
        if (newIndex >= testimonialCards.length) newIndex = 0;
        showTestimonial(newIndex);
    }, 5000);
}

/**
 * Inicializa a validação de formulário
 */
function initForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Coletar dados do formulário
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        // Validação básica
        if (!formData.name || !formData.email || !formData.message) {
            showAlert('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }
        
        // Desabilitar botão de envio
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        try {
            // Simular envio (substituir por fetch real)
            await simulateFormSubmit(formData);
            
            showAlert('Mensagem enviada com sucesso! Entraremos em contacto em breve.', 'success');
            contactForm.reset();
            
            // Resetar labels dos campos
            const labels = contactForm.querySelectorAll('label');
            labels.forEach(label => {
                label.style.top = 'var(--space-lg)';
                label.style.fontSize = 'var(--font-size-base)';
            });
            
        } catch (error) {
            showAlert('Erro ao enviar mensagem. Por favor, tente novamente.', 'error');
            console.error('Erro no formulário:', error);
        } finally {
            // Reabilitar botão
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
    
    function simulateFormSubmit(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Dados do formulário:', data);
                resolve();
            }, 1500);
        });
    }
    
    function showAlert(message, type) {
        // Remover alertas anteriores
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) existingAlert.remove();
        
        // Criar novo alerta
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Inserir antes do formulário
        contactForm.parentNode.insertBefore(alert, contactForm);
        
        // Remover após 5 segundos
        setTimeout(() => alert.remove(), 5000);
    }
}

/**
 * Inicializa animações ao scroll
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (!animatedElements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Animar elementos filhos com delay
                const children = entry.target.querySelectorAll('.animate-delay');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animated');
                    }, index * 200);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => observer.observe(element));
}

/**
 * Inicializa efeitos de hover avançados
 */
function initHoverEffects() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/**
 * Inicializa a navegação suave entre seções
 */
function initSmoothNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Atualizar link ativo
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
}

// ============================================================================
// UTILITÁRIOS
// ============================================================================

/**
 * Debounce function para otimizar performance
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function para limitar a frequência de execução
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Formatar número para exibição
 */
function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

/**
 * Verificar se elemento está visível na viewport
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ============================================================================
// INICIALIZAÇÃO FINAL
// ============================================================================

// Adicionar funcionalidades extras
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar funções adicionais
    initForm();
    initScrollAnimations();
    initHoverEffects();
    initSmoothNavigation();
    
    // Otimizar imagens para lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });
    
    // Adicionar classe de carregamento ao body
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Log de performance
    window.addEventListener('load', () => {
        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`📊 Tempo de carregamento: ${loadTime}ms`);
    });
});

// ============================================================================
// EXPORTAÇÕES (para uso em módulos)
// ============================================================================

export {
    debounce,
    throttle,
    formatNumber,
    isElementInViewport
};