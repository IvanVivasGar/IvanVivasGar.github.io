/**
 * About Page JavaScript
 * Handles animations, skill bars, and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize about page functionality
    initScrollAnimations();
    initSkillBars();
    initProfilePhotoEffects();
    initTimelineAnimations();
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
                
                // Special handling for skill bars
                if (entry.target.classList.contains('skill-category')) {
                    animateSkillBars(entry.target);
                }
                
                // Special handling for timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    animateTimelineItem(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe education cards
    const educationCards = document.querySelectorAll('.education-card');
    educationCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        category.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(category);
    });
    
    // Observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
        observer.observe(item);
    });
    
    // Observe interest cards
    const interestCards = document.querySelectorAll('.interest-card');
    interestCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

/**
 * Initialize and animate skill bars
 */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = '0%';
        bar.style.transition = 'width 0s';
    });
}

/**
 * Animate skill bars when they come into view
 */
function animateSkillBars(skillCategory) {
    const skillBars = skillCategory.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        const level = bar.getAttribute('data-level');
        
        setTimeout(() => {
            bar.style.transition = 'width 1.5s ease-in-out';
            bar.style.width = level + '%';
        }, index * 200);
    });
}

/**
 * Initialize profile photo effects
 */
function initProfilePhotoEffects() {
    const profilePhoto = document.querySelector('.profile-photo');
    
    if (profilePhoto) {
        // Add parallax effect to profile photo
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.2;
            
            if (scrolled < window.innerHeight) {
                profilePhoto.style.transform = `translateY(${rate}px) scale(1)`;
            }
        });
        
        // Add click effect
        profilePhoto.addEventListener('click', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        });
    }
}

/**
 * Animate timeline items with staggered effect
 */
function animateTimelineItem(item) {
    const marker = item.querySelector('.timeline-marker');
    const content = item.querySelector('.timeline-content');
    
    // Animate marker
    setTimeout(() => {
        marker.style.transform = 'scale(1.2)';
        marker.style.background = 'var(--accent-blue)';
        
        setTimeout(() => {
            marker.style.transform = 'scale(1)';
        }, 200);
    }, 100);
    
    // Animate skill tags
    const skillTags = item.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
            tag.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        }, 300 + (index * 100));
    });
}

/**
 * Add interactive effects to education cards
 */
function initEducationCardEffects() {
    const educationCards = document.querySelectorAll('.education-card');
    
    educationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) rotateX(2deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg)';
        });
    });
}

/**
 * Add typing effect to hero stats
 */
function initHeroStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
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
                const numericValue = parseFloat(finalValue);
                
                if (!isNaN(numericValue)) {
                    animateNumber(target, 0, numericValue, 2000, finalValue);
                }
                
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => observer.observe(stat));
}

/**
 * Animate number counting effect
 */
function animateNumber(element, start, end, duration, originalText) {
    const startTime = performance.now();
    const suffix = originalText.replace(/[\d.]/g, '');
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * easeOutCubic;
        
        if (originalText.includes('.')) {
            element.textContent = current.toFixed(1) + suffix;
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
        
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
 * Add intersection observer for hero stats
 */
document.addEventListener('DOMContentLoaded', function() {
    initHeroStatsAnimation();
    initEducationCardEffects();
    initSmoothScrolling();
});

/**
 * Add CSS for enhanced animations
 */
const enhancedCSS = `
.skill-progress {
    position: relative;
    overflow: hidden;
}

.skill-progress::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    animation: skill-shimmer 2s infinite;
}

@keyframes skill-shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
}

.timeline-marker {
    transition: all 0.3s ease;
}

.skill-tag {
    transition: all 0.3s ease;
}

.profile-photo {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
}

.education-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.stat-number {
    transition: all 0.3s ease;
}
`;

// Inject enhanced CSS
const style = document.createElement('style');
style.textContent = enhancedCSS;
document.head.appendChild(style);
