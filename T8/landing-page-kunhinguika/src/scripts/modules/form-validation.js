// ============================================================================
// MÓDULO DE VALIDAÇÃO DE FORMULÁRIO
// ============================================================================

/**
 * Inicializa a validação do formulário de contacto
 */
export function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    // Elementos do formulário
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const serviceSelect = document.getElementById('service');
    const messageTextarea = document.getElementById('message');
    
    // Expressões regulares para validação
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,50}$/;
    
    // Objeto para armazenar erros
    const errors = {
        name: '',
        email: '',
        service: '',
        message: ''
    };
    
    // Inicializar validação em tempo real
    initRealTimeValidation();
    
    // Configurar submissão do formulário
    contactForm.addEventListener('submit', handleFormSubmit);
    
    /**
     * Inicializa validação em tempo real
     */
    function initRealTimeValidation() {
        // Validação do nome
        nameInput?.addEventListener('blur', () => {
            validateName();
            updateFieldStatus(nameInput, errors.name);
        });
        
        nameInput?.addEventListener('input', () => {
            clearError(nameInput);
        });
        
        // Validação do email
        emailInput?.addEventListener('blur', () => {
            validateEmail();
            updateFieldStatus(emailInput, errors.email);
        });
        
        emailInput?.addEventListener('input', () => {
            clearError(emailInput);
        });
        
        // Validação do serviço
        serviceSelect?.addEventListener('change', () => {
            validateService();
            updateFieldStatus(serviceSelect, errors.service);
        });
        
        // Validação da mensagem
        messageTextarea?.addEventListener('blur', () => {
            validateMessage();
            updateFieldStatus(messageTextarea, errors.message);
        });
        
        messageTextarea?.addEventListener('input', () => {
            clearError(messageTextarea);
        });
    }
    
    /**
     * Valida o campo de nome
     */
    function validateName() {
        const value = nameInput.value.trim();
        
        if (!value) {
            errors.name = 'O nome é obrigatório.';
            return false;
        }
        
        if (!nameRegex.test(value)) {
            errors.name = 'Nome deve conter apenas letras e espaços (2-50 caracteres).';
            return false;
        }
        
        errors.name = '';
        return true;
    }
    
    /**
     * Valida o campo de email
     */
    function validateEmail() {
        const value = emailInput.value.trim();
        
        if (!value) {
            errors.email = 'O email é obrigatório.';
            return false;
        }
        
        if (!emailRegex.test(value)) {
            errors.email = 'Por favor, insira um email válido.';
            return false;
        }
        
        errors.email = '';
        return true;
    }
    
    /**
     * Valida o campo de serviço
     */
    function validateService() {
        const value = serviceSelect.value;
        
        if (!value) {
            errors.service = 'Por favor, selecione um serviço.';
            return false;
        }
        
        errors.service = '';
        return true;
    }
    
    /**
     * Valida o campo de mensagem
     */
    function validateMessage() {
        const value = messageTextarea.value.trim();
        
        if (!value) {
            errors.message = 'A mensagem é obrigatória.';
            return false;
        }
        
        if (value.length < 10) {
            errors.message = 'A mensagem deve ter pelo menos 10 caracteres.';
            return false;
        }
        
        if (value.length > 1000) {
            errors.message = 'A mensagem não pode exceder 1000 caracteres.';
            return false;
        }
        
        errors.message = '';
        return true;
    }
    
    /**
     * Atualiza o estado do campo (erro/sucesso)
     */
    function updateFieldStatus(field, error) {
        // Remover estados anteriores
        field.parentElement.classList.remove('error', 'success');
        
        // Limpar mensagens de erro anteriores
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        if (error) {
            // Adicionar estado de erro
            field.parentElement.classList.add('error');
            
            // Adicionar mensagem de erro
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = error;
            errorElement.style.cssText = `
                color: #dc2626;
                font-size: 0.875rem;
                margin-top: 0.5rem;
            `;
            
            field.parentElement.appendChild(errorElement);
        } else if (field.value.trim()) {
            // Adicionar estado de sucesso se houver valor
            field.parentElement.classList.add('success');
        }
    }
    
    /**
     * Limpa o erro do campo
     */
    function clearError(field) {
        errors[field.id] = '';
        updateFieldStatus(field, '');
    }
    
    /**
     * Valida todo o formulário
     */
    function validateForm() {
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isServiceValid = validateService();
        const isMessageValid = validateMessage();
        
        // Atualizar status de todos os campos
        updateFieldStatus(nameInput, errors.name);
        updateFieldStatus(emailInput, errors.email);
        updateFieldStatus(serviceSelect, errors.service);
        updateFieldStatus(messageTextarea, errors.message);
        
        return isNameValid && isEmailValid && isServiceValid && isMessageValid;
    }
    
    /**
     * Manipula a submissão do formulário
     */
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        // Validar formulário
        if (!validateForm()) {
            showNotification('Por favor, corrija os erros no formulário.', 'error');
            return;
        }
        
        // Coletar dados do formulário
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            service: serviceSelect.value,
            message: messageTextarea.value.trim(),
            timestamp: new Date().toISOString()
        };
        
        // Desabilitar botão de envio
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        const originalState = submitBtn.disabled;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        try {
            // Simular envio (substituir por API real)
            await submitForm(formData);
            
            // Sucesso
            showNotification('Mensagem enviada com sucesso! Entraremos em contacto em breve.', 'success');
            
            // Resetar formulário
            contactForm.reset();
            
            // Resetar estados dos campos
            [nameInput, emailInput, serviceSelect, messageTextarea].forEach(field => {
                updateFieldStatus(field, '');
            });
            
        } catch (error) {
            // Erro
            console.error('Erro ao enviar formulário:', error);
            showNotification('Erro ao enviar mensagem. Por favor, tente novamente.', 'error');
            
        } finally {
            // Restaurar botão
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = originalState;
        }
    }
    
    /**
     * Simula o envio do formulário (substituir por fetch real)
     */
    function submitForm(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulação: 90% de chance de sucesso
                if (Math.random() < 0.9) {
                    console.log('Formulário enviado:', data);
                    resolve();
                } else {
                    reject(new Error('Falha na rede'));
                }
            }, 1500);
        });
    }
    
    /**
     * Mostra notificação
     */
    function showNotification(message, type) {
        // Remover notificações anteriores
        const existingNotification = document.querySelector('.form-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Criar notificação
        const notification = document.createElement('div');
        notification.className = `form-notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Estilos
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        `;
        
        // Botão de fechar
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0.25rem;
            margin-left: 0.5rem;
        `;
        
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        // Adicionar ao DOM
        document.body.appendChild(notification);
        
        // Remover automaticamente após 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
    
    // Inicializar estilos CSS para validação
    initValidationStyles();
}

/**
 * Inicializa estilos CSS para validação
 */
function initValidationStyles() {
    if (!document.querySelector('#validation-styles')) {
        const style = document.createElement('style');
        style.id = 'validation-styles';
        style.textContent = `
            .form-group.error input,
            .form-group.error textarea,
            .form-group.error select {
                border-color: #dc2626 !important;
                background-color: rgba(220, 38, 38, 0.05);
            }
            
            .form-group.success input,
            .form-group.success textarea,
            .form-group.success select {
                border-color: #10b981 !important;
                background-color: rgba(16, 185, 129, 0.05);
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
}