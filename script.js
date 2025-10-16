// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Service buttons click handler
document.addEventListener('DOMContentLoaded', function() {
    const serviceButtons = document.querySelectorAll('.service-card .btn');
    
    serviceButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            console.log('Service button clicked:', this.href);
            // Allow default behavior (navigation)
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
  e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Credit Calculator
function calculateCredit() {
    const income = parseFloat(document.getElementById('income').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const term = parseInt(document.getElementById('term').value);
    const type = document.getElementById('type').value;

    if (!income || !rate || !term) {
        alert('Пожалуйста, заполните все поля');
        return;
    }

    // Calculate maximum loan amount based on income (typically 30-40% of income)
    let maxLoanAmount;
    switch(type) {
        case 'mortgage':
            maxLoanAmount = income * 40; // 40% of income for mortgage
            break;
        case 'auto':
            maxLoanAmount = income * 35; // 35% of income for auto loan
            break;
        default:
            maxLoanAmount = income * 30; // 30% of income for consumer loan
    }

    // Calculate monthly payment using the formula
    const monthlyRate = rate / 100 / 12;
    const monthlyPayment = maxLoanAmount * (monthlyRate * Math.pow(1 + monthlyRate, term)) / 
                          (Math.pow(1 + monthlyRate, term) - 1);
    
    const totalAmount = monthlyPayment * term;
    const totalOverpayment = totalAmount - maxLoanAmount;

    // Display results
    document.getElementById('creditAmount').textContent = formatNumber(maxLoanAmount) + ' тг';
    document.getElementById('monthlyPayment').textContent = formatNumber(Math.round(monthlyPayment)) + ' тг';
    document.getElementById('totalOverpayment').textContent = formatNumber(Math.round(totalOverpayment)) + ' тг';
    
    document.getElementById('result').style.display = 'block';
    
    // Scroll to result
    document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
}

// Format number with spaces
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Open consultation form
function openConsultationForm() {
    document.getElementById('contacts').scrollIntoView({ behavior: 'smooth' });
    // Focus on the form
    setTimeout(() => {
        document.getElementById('name').focus();
    }, 500);
}

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    if (!name || !phone || !service) {
        alert('Пожалуйста, заполните обязательные поля');
    return;
  }
    
    // Create WhatsApp message
    const whatsappMessage = `🏦 AYA CONSULTING

Здравствуйте! Меня зовут ${name}. 
📞 Телефон: ${phone}
💼 Услуга: ${service}
${message ? `💬 Сообщение: ${message}` : ''}

Хочу получить консультацию по услугам AYA CONSULTING.

🌐 ayaconsulting.kz
📍 Караганда, Казахстан`;
    
    const whatsappUrl = `https://wa.me/77716126334?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    this.reset();
    
    // Show success message
    alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.principle-card, .service-card, .review-card, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'white';
        header.style.backdropFilter = 'none';
    }
});

// Preload calculator with default values
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('income').value = '300000';
    document.getElementById('rate').value = '18';
    document.getElementById('term').value = '36';
});

// Add click handlers for service cards
document.querySelectorAll('.service-card .btn-outline').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Allow default behavior (navigation to service pages)
        // No preventDefault() - let the link work normally
    });
});

// Add floating WhatsApp button
function createFloatingWhatsApp() {
    const floatingBtn = document.createElement('div');
    floatingBtn.innerHTML = `
        <a href="https://wa.me/77716126334" target="_blank" class="floating-whatsapp">
            <i class="fab fa-whatsapp"></i>
        </a>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .floating-whatsapp {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background: #25D366;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            font-size: 24px;
            box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
            transition: all 0.3s ease;
            z-index: 1000;
        }
        .floating-whatsapp:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 25px rgba(37, 211, 102, 0.6);
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(floatingBtn);
}

// Initialize floating WhatsApp button
document.addEventListener('DOMContentLoaded', createFloatingWhatsApp);

// Add loading animation for form submissions
function showLoading(element) {
    const originalText = element.textContent;
    element.textContent = 'Отправка...';
    element.disabled = true;
    
    setTimeout(() => {
        element.textContent = originalText;
        element.disabled = false;
    }, 2000);
}

// Enhanced form validation
function validatePhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Add phone validation to contact form
document.getElementById('phone').addEventListener('input', function() {
    const phone = this.value;
    if (phone && !validatePhone(phone)) {
        this.style.borderColor = '#e74c3c';
    } else {
        this.style.borderColor = '#e1e5e9';
    }
});

// Add number formatting for income input
document.getElementById('income').addEventListener('input', function() {
    let value = this.value.replace(/\D/g, '');
    this.value = value;
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus on calculator
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('calculator').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            document.getElementById('income').focus();
        }, 500);
    }
});

// Add success animation for calculator
function showSuccessAnimation() {
    const result = document.getElementById('result');
    result.style.animation = 'pulse 0.6s ease-in-out';
    setTimeout(() => {
        result.style.animation = '';
    }, 600);
}

// Add pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(pulseStyle);

// Update calculateCredit function to include success animation
const originalCalculateCredit = calculateCredit;
calculateCredit = function() {
    originalCalculateCredit();
    showSuccessAnimation();
};

// FAQ functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
  });
});

// Newsletter form
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
  e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (!email) {
                alert('Пожалуйста, введите email');
                return;
            }
            
            // Show success message
            alert('Спасибо за подписку! Мы будем отправлять вам полезные материалы о кредитах и финансах.');
            
            // Reset form
            this.reset();
        });
    }
});

// Load more articles functionality
document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.querySelector('.load-more button');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more articles
            this.textContent = 'Загрузка...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = 'Загрузить еще статьи';
                this.disabled = false;
                alert('Все статьи загружены!');
            }, 2000);
        });
    }
});

// Active navigation link highlighting
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Form validation enhancements
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Real-time validation
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
    });
  });
});

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error styling
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Это поле обязательно для заполнения';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Введите корректный email адрес';
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Введите корректный номер телефона';
        }
    }
    
    // Number validation
    if (field.type === 'number' && value) {
        const num = parseFloat(value);
        if (isNaN(num) || num < 0) {
            isValid = false;
            errorMessage = 'Введите корректное число';
        }
    }
    
    if (!isValid) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        field.parentNode.appendChild(errorDiv);
    }
    
    return isValid;
}

// Add error styling to CSS
const errorStyles = document.createElement('style');
errorStyles.textContent = `
    .error {
        border-color: #e74c3c !important;
        box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2) !important;
    }
`;
document.head.appendChild(errorStyles);
