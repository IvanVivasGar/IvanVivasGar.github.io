/**
 * Services Page JavaScript
 * Handles animations, interactions, and service-specific functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize services page functionality
    initScrollAnimations();
    initServiceCardInteractions();
    initProcessStepAnimations();
    initPriceAnimations();
});

/**
 * Initialize scroll-based animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special handling for service cards
                if (entry.target.classList.contains('service-card')) {
                    animateServiceCard(entry.target);
                }
                
                // Special handling for process steps
                if (entry.target.classList.contains('process-step')) {
                    animateProcessStep(entry.target);
                }
                
                // Special handling for benefit items
                if (entry.target.classList.contains('benefit-item')) {
                    animateBenefitItem(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
        observer.observe(card);
    });
    
    // Observe process steps
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(step);
    });
    
    // Observe benefit items
    const benefitItems = document.querySelectorAll('.benefit-item');
    benefitItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        observer.observe(item);
    });
}

/**
 * Animate service card elements when they come into view
 */
function animateServiceCard(card) {
    const features = card.querySelectorAll('.features-list li');
    const techTags = card.querySelectorAll('.tech-tag, .coverage-tag');
    
    // Animate feature list items
    features.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            feature.style.opacity = '1';
            feature.style.transform = 'translateX(0)';
            feature.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        }, 200 + (index * 50));
    });
    
    // Animate tech tags
    techTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'scale(1)';
            tag.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        }, 400 + (index * 100));
    });
}

/**
 * Animate process steps with number counter effect
 */
function animateProcessStep(step) {
    const stepNumber = step.querySelector('.step-number');
    
    if (stepNumber) {
        stepNumber.style.transform = 'scale(0)';
        stepNumber.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        setTimeout(() => {
            stepNumber.style.transform = 'scale(1)';
        }, 200);
    }
}

/**
 * Animate benefit items with staggered effect
 */
function animateBenefitItem(item) {
    const icon = item.querySelector('.benefit-icon');
    const content = item.querySelector('.benefit-content');
    
    if (icon) {
        icon.style.transform = 'scale(0) rotate(180deg)';
        icon.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        setTimeout(() => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }, 100);
    }
    
    if (content) {
        content.style.opacity = '0';
        content.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            content.style.opacity = '1';
            content.style.transform = 'translateX(0)';
            content.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        }, 300);
    }
}

/**
 * Initialize service card interactions
 */
function initServiceCardInteractions() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Add hover effects for service icons
        const serviceIcon = card.querySelector('.service-icon');
        
        if (serviceIcon) {
            card.addEventListener('mouseenter', () => {
                serviceIcon.style.transform = 'scale(1.1) rotate(5deg)';
                serviceIcon.style.transition = 'transform 0.3s ease';
            });
            
            card.addEventListener('mouseleave', () => {
                serviceIcon.style.transform = 'scale(1) rotate(0deg)';
            });
        }
        
        // Add click effects for service buttons
        const serviceButtons = card.querySelectorAll('.service-btn');
        serviceButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Add ripple effect
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    });
}

/**
 * Initialize price animations when they come into view
 */
function initPriceAnimations() {
    const priceAmounts = document.querySelectorAll('.price-amount');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                
                // Extract numeric value
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                
                if (!isNaN(numericValue)) {
                    animatePriceCounter(target, 0, numericValue, 1500, finalValue);
                }
                
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    priceAmounts.forEach(price => observer.observe(price));
}

/**
 * Animate price counter effect
 */
function animatePriceCounter(element, start, end, duration, originalText) {
    const startTime = performance.now();
    const prefix = originalText.replace(/[\d]/g, '').split(/\d/)[0] || '';
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeOutCubic);
        
        element.textContent = prefix + current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = originalText;
        }
    }
    
    requestAnimationFrame(update);
}

/**
 * Add smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Add parallax effect to hero section
 */
function initParallaxEffect() {
    const hero = document.querySelector('.services-hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });
    }
}

/**
 * Initialize all functionality when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initParallaxEffect();
});

/**
 * Add CSS for enhanced animations
 */
const enhancedCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
}

@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.service-btn {
    position: relative;
    overflow: hidden;
}

.service-icon {
    transition: transform 0.3s ease;
}

.benefit-icon {
    transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.benefit-content {
    transition: opacity 0.4s ease, transform 0.4s ease;
}

.step-number {
    transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.tech-tag,
.coverage-tag {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.features-list li {
    transition: opacity 0.3s ease, transform 0.3s ease;
}
`;

// Inject enhanced CSS
const style = document.createElement('style');
style.textContent = enhancedCSS;
document.head.appendChild(style);
