/**
 * Contact Page JavaScript
 * Handles form validation, submission, and user interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact page functionality
    initContactForm();
    initNavigation();
    initAnimations();
});

/**
 * Contact Form Management
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formSuccess = document.getElementById('formSuccess');
    
    if (!form) return;
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Show loading state
        showLoadingState();
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Hide form and show success message
            form.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Reset loading state
            hideLoadingState();
            
            // Scroll to success message
            formSuccess.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            
        }, 1500);
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
    
    function validateForm() {
        let isValid = true;
        
        // Required fields validation
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                showFieldError(field, 'This field is required');
                isValid = false;
            }
        });
        
        // Email validation
        const emailField = form.querySelector('#email');
        if (emailField.value && !isValidEmail(emailField.value)) {
            showFieldError(emailField, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Phone validation (if provided)
        const phoneField = form.querySelector('#phone');
        if (phoneField.value && !isValidPhone(phoneField.value)) {
            showFieldError(phoneField, 'Please enter a valid phone number');
            isValid = false;
        }
        
        return isValid;
    }
    
    function validateField(e) {
        const field = e.target;
        clearFieldError(field);
        
        if (field.required && !field.value.trim()) {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
        
        if (field.type === 'tel' && field.value && !isValidPhone(field.value)) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
        
        return true;
    }
    
    function showFieldError(field, message) {
        clearFieldError(field);
        
        field.style.borderColor = '#ff3b30';
        field.style.boxShadow = '0 0 0 3px rgba(255, 59, 48, 0.1)';
        
        const errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #ff3b30;
            font-size: 0.875rem;
            margin-top: 0.5rem;
            display: block;
        `;
        
        field.parentNode.appendChild(errorElement);
    }
    
    function clearFieldError(field) {
        if (typeof field === 'object' && field.target) {
            field = field.target;
        }
        
        field.style.borderColor = '';
        field.style.boxShadow = '';
        
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    function showLoadingState() {
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
    }
    
    function hideLoadingState() {
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        return phoneRegex.test(cleanPhone);
    }
}

/**
 * Navigation Management
 */
function initNavigation() {
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Mobile menu toggle (if needed in future)
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
}

/**
 * Animations and Visual Effects
 */
function initAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe contact cards for stagger animation
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe info cards
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Form container animation
    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
        formContainer.style.opacity = '0';
        formContainer.style.transform = 'translateY(30px)';
        formContainer.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';
        observer.observe(formContainer);
    }
}

/**
 * Utility Functions
 */

// Copy to clipboard functionality (for contact info)
function copyToClipboard(text, element) {
    navigator.clipboard.writeText(text).then(function() {
        showCopyFeedback(element);
    }).catch(function(err) {
        console.error('Failed to copy text: ', err);
    });
}

function showCopyFeedback(element) {
    const originalText = element.textContent;
    element.textContent = 'Copied!';
    element.style.color = '#34c759';
    
    setTimeout(() => {
        element.textContent = originalText;
        element.style.color = '';
    }, 2000);
}

// Add copy functionality to contact values
document.addEventListener('DOMContentLoaded', function() {
    const contactValues = document.querySelectorAll('.contact-value');
    contactValues.forEach(value => {
        value.style.cursor = 'pointer';
        value.title = 'Click to copy';
        
        value.addEventListener('click', function() {
            copyToClipboard(this.textContent, this);
        });
    });
});

// Form auto-save (optional feature)
function initAutoSave() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const formData = {};
    const inputs = form.querySelectorAll('input, select, textarea');
    
    // Load saved data
    const savedData = localStorage.getItem('contactFormData');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        inputs.forEach(input => {
            if (parsedData[input.name]) {
                input.value = parsedData[input.name];
            }
        });
    }
    
    // Save data on input
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            formData[this.name] = this.value;
            localStorage.setItem('contactFormData', JSON.stringify(formData));
        });
    });
    
    // Clear saved data on successful submission
    form.addEventListener('submit', function() {
        localStorage.removeItem('contactFormData');
    });
}

// Initialize auto-save if needed
// initAutoSave();
