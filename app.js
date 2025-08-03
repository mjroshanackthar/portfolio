// Enhanced Glassmorphism Portfolio JavaScript with Complete Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const contactForm = document.getElementById('contactForm');
    const resumeBtn = document.querySelector('.btn-resume');
    
    // Create mobile menu toggle button
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.appendChild(mobileMenuToggle);
    
    const sidebar = document.querySelector('.sidebar');

    // Mobile menu toggle functionality
    mobileMenuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
        const icon = this.querySelector('i');
        if (sidebar.classList.contains('open')) {
            icon.className = 'fas fa-times';
            this.style.background = 'rgba(0, 212, 170, 0.2)';
        } else {
            icon.className = 'fas fa-bars';
            this.style.background = '';
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                sidebar.classList.remove('open');
                mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
                mobileMenuToggle.style.background = '';
            }
        }
    });

    // Enhanced section navigation with smooth transitions
    function showSection(targetSectionId) {
        // Hide all sections with fade out effect
        sections.forEach(section => {
            if (section.classList.contains('active-section')) {
                section.style.opacity = '0';
                section.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    section.classList.remove('active-section');
                }, 300);
            }
        });
        
        // Show target section with fade in effect
        setTimeout(() => {
            const targetSection = document.querySelector(targetSectionId);
            if (targetSection) {
                targetSection.classList.add('active-section');
                
                setTimeout(() => {
                    targetSection.style.opacity = '1';
                    targetSection.style.transform = 'translateY(0)';
                    
                    // Trigger animations for the section
                    const fadeElements = targetSection.querySelectorAll('.fade-in');
                    fadeElements.forEach((element, index) => {
                        element.classList.remove('visible');
                        setTimeout(() => {
                            element.classList.add('visible');
                        }, 100 + (index * 150));
                    });
                    
                    // Special handling for travel section stats
                    if (targetSectionId === '#travel') {
                        setTimeout(() => {
                            animateFixedTravelStats();
                        }, 500);
                    }
                }, 100);
            }
        }, 300);
    }

    // Navigation link handling with enhanced effects
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav links with animation
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
                navLink.style.transform = 'translateX(0)';
            });
            
            // Add active class to clicked link with animation
            this.classList.add('active');
            this.style.transform = 'translateX(10px)';
            
            // Get target section
            const targetSectionId = this.getAttribute('href');
            
            // Show target section
            showSection(targetSectionId);
            
            // Close mobile menu after navigation
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
                mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
                mobileMenuToggle.style.background = '';
            }
        });
    });

    // Enhanced glassmorphism scroll effects
    function updateGlassEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        // Parallax effect for glass background
        const glassBg = document.querySelector('.glass-bg');
        if (glassBg) {
            glassBg.style.transform = `translateY(${rate}px)`;
        }
        
        // Dynamic blur and lighting effects based on scroll position
        const glassCards = document.querySelectorAll('.glass-card');
        glassCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const distanceFromCenter = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
            const maxDistance = window.innerHeight / 2;
            const blurAmount = Math.min(distanceFromCenter / maxDistance * 8, 15);
            const brightness = Math.max(1 - (distanceFromCenter / maxDistance * 0.3), 0.7);
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                card.style.backdropFilter = `blur(${15 + blurAmount}px) brightness(${brightness})`;
                card.style.webkitBackdropFilter = `blur(${15 + blurAmount}px) brightness(${brightness})`;
            }
        });
        
        // Update navigation blur effect
        const nav = document.querySelector('.glass-nav');
        if (nav) {
            const navBlur = Math.min(scrolled / 10 + 20, 30);
            nav.style.backdropFilter = `blur(${navBlur}px)`;
            nav.style.webkitBackdropFilter = `blur(${navBlur}px)`;
        }
    }

    // Enhanced scroll reveal animation with stagger effects
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.fade-in:not(.visible)');
        
        reveals.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 100;
            
            if (elementTop < window.innerHeight - elementVisible) {
                setTimeout(() => {
                    element.classList.add('visible');
                }, index * 100);
            }
        });
    }

    // Advanced glass card interactions with 3D effects
    function initAdvancedGlassCardEffects() {
        const glassCards = document.querySelectorAll('.glass-card');
        
        glassCards.forEach(card => {
            // Enhanced mouse move effect for glass cards
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 15;
                const rotateY = (centerX - x) / 15;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
                
                // Enhanced light effect with multiple layers
                const lightEffect = `
                    radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at ${x}px ${y}px, rgba(0, 212, 170, 0.1) 0%, transparent 70%)
                `;
                this.style.backgroundImage = lightEffect;
                
                // Dynamic border glow
                const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
                const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
                const glowIntensity = 1 - (distance / maxDistance);
                this.style.borderColor = `rgba(0, 212, 170, ${0.2 + glowIntensity * 0.3})`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
                this.style.backgroundImage = 'none';
                this.style.borderColor = '';
                this.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                
                setTimeout(() => {
                    this.style.transition = '';
                }, 500);
            });
            
            card.addEventListener('mouseenter', function() {
                this.style.transition = 'none';
            });
            
            // Enhanced click ripple effect
            card.addEventListener('click', function(e) {
                const ripple = document.createElement('div');
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(0, 212, 170, 0.4) 0%, rgba(83, 52, 131, 0.2) 50%, transparent 70%);
                    left: ${x - 75}px;
                    top: ${y - 75}px;
                    pointer-events: none;
                    animation: enhancedRipple 0.8s ease-out forwards;
                    z-index: 2;
                `;
                
                this.style.position = 'relative';
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 800);
            });
        });
        
        // Add enhanced ripple animation
        if (!document.querySelector('#enhancedRippleStyle')) {
            const style = document.createElement('style');
            style.id = 'enhancedRippleStyle';
            style.textContent = `
                @keyframes enhancedRipple {
                    from {
                        transform: scale(0);
                        opacity: 1;
                    }
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Enhanced contact form handling with advanced validation
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('.glass-input');
        
        // Add real-time validation effects
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.borderColor = 'rgba(0, 212, 170, 0.5)';
                this.style.boxShadow = '0 0 0 3px rgba(0, 212, 170, 0.2)';
            });
            
            input.addEventListener('blur', function() {
                if (this.value.trim() === '') {
                    this.style.borderColor = 'rgba(255, 84, 89, 0.5)';
                } else {
                    this.style.borderColor = 'rgba(0, 212, 170, 0.3)';
                }
                this.style.boxShadow = '';
            });
            
            input.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    this.style.borderColor = 'rgba(0, 212, 170, 0.4)';
                }
            });
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const subject = formData.get('subject').trim();
            const message = formData.get('message').trim();
            
            // Enhanced validation
            let isValid = true;
            const errors = [];
            
            if (!name) {
                errors.push('Name is required');
                isValid = false;
            }
            
            if (!email) {
                errors.push('Email is required');
                isValid = false;
            } else if (!isValidEmail(email)) {
                errors.push('Please enter a valid email address');
                isValid = false;
            }
            
            if (!subject) {
                errors.push('Subject is required');
                isValid = false;
            }
            
            if (!message) {
                errors.push('Message is required');
                isValid = false;
            }
            
            if (!isValid) {
                showAdvancedNotification(errors.join('<br>'), 'error');
                return;
            }
            
            // Enhanced form submission animation
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Message...';
            submitBtn.disabled = true;
            submitBtn.style.background = 'rgba(0, 212, 170, 0.2)';
            submitBtn.style.transform = 'scale(0.95)';
            
            // Animate entire form
            this.style.opacity = '0.6';
            this.style.transform = 'scale(0.98)';
            this.style.filter = 'blur(1px)';
            
            // Simulate form submission
            setTimeout(() => {
                showAdvancedNotification(`Thank you, ${name}! Your message has been received. I'll get back to you soon at ${email}.`, 'success');
                this.reset();
                
                // Reset form styles
                formInputs.forEach(input => {
                    input.style.borderColor = '';
                });
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                submitBtn.style.transform = '';
                
                // Reset form
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
                this.style.filter = '';
            }, 2500);
        });
    }

    // Enhanced email validation
    function isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return emailRegex.test(email);
    }

    // Advanced notification system with enhanced styling
    function showAdvancedNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.advanced-notification');
        existingNotifications.forEach(notification => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });
        
        const notification = document.createElement('div');
        notification.className = `advanced-notification advanced-notification--${type}`;
        
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle',
            warning: 'fas fa-exclamation-circle'
        };
        
        const colors = {
            success: {
                bg: 'rgba(0, 212, 170, 0.15)',
                border: 'rgba(0, 212, 170, 0.4)',
                text: '#00d4aa'
            },
            error: {
                bg: 'rgba(255, 84, 89, 0.15)',
                border: 'rgba(255, 84, 89, 0.4)',
                text: '#ff5459'
            },
            info: {
                bg: 'rgba(59, 130, 246, 0.15)',
                border: 'rgba(59, 130, 246, 0.4)',
                text: '#3b82f6'
            },
            warning: {
                bg: 'rgba(245, 158, 11, 0.15)',
                border: 'rgba(245, 158, 11, 0.4)',
                text: '#f59e0b'
            }
        };
        
        const colorSet = colors[type] || colors.info;
        
        notification.style.cssText = `
            position: fixed;
            top: 30px;
            right: 30px;
            padding: 20px 25px;
            border-radius: 15px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            max-width: 450px;
            min-width: 300px;
            transform: translateX(100%);
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            background: ${colorSet.bg};
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 2px solid ${colorSet.border};
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
            font-family: var(--font-family-base);
            line-height: 1.5;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 15px;">
                <i class="${icons[type] || icons.info}" style="color: ${colorSet.text}; font-size: 24px; margin-top: 2px; text-shadow: 0 0 10px ${colorSet.text}50;"></i>
                <div style="flex: 1;">
                    <div style="color: ${colorSet.text}; font-weight: 600; margin-bottom: 5px; text-transform: capitalize;">${type}</div>
                    <div style="color: white; font-size: 14px;">${message}</div>
                </div>
                <button onclick="this.parentElement.parentElement.style.transform='translateX(100%)'; setTimeout(() => this.parentElement.parentElement.remove(), 300);" 
                        style="background: none; border: none; color: white; font-size: 20px; cursor: pointer; padding: 0; opacity: 0.7;">×</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 6 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 500);
            }
        }, 6000);
    }

    // Enhanced resume download functionality
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const btn = this;
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing Resume...';
            btn.disabled = true;
            btn.style.transform = 'scale(0.95)';
            btn.style.background = 'rgba(0, 212, 170, 0.3)';
            
            setTimeout(() => {
                showAdvancedNotification('Resume download would be available here. Please contact me directly at mjroshanackthar@gmail.com for my latest resume.', 'info');
                btn.innerHTML = originalText;
                btn.disabled = false;
                btn.style.transform = '';
                btn.style.background = '';
            }, 2000);
        });
    }

    // Enhanced typing animation for the main title
    function advancedTypeWriter(element, text, speed = 60) {
        let i = 0;
        element.textContent = '';
        element.style.borderRight = '3px solid rgba(0, 212, 170, 0.8)';
        element.style.animation = 'cursorBlink 1s infinite';
        
        // Add cursor blink animation
        if (!document.querySelector('#cursorBlinkStyle')) {
            const style = document.createElement('style');
            style.id = 'cursorBlinkStyle';
            style.textContent = `
                @keyframes cursorBlink {
                    0%, 50% { border-right-color: rgba(0, 212, 170, 0.8); }
                    51%, 100% { border-right-color: transparent; }
                }
            `;
            document.head.appendChild(style);
        }
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed + Math.random() * 40); // Add slight variation
            } else {
                // Remove cursor after typing with fade effect
                setTimeout(() => {
                    element.style.animation = 'none';
                    element.style.borderRight = 'none';
                }, 1500);
            }
        }
        
        type();
    }

    // Enhanced social link effects with advanced animations
    function initAdvancedSocialLinks() {
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach((link, index) => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.15) rotate(5deg)';
                this.style.boxShadow = '0 15px 35px rgba(0, 212, 170, 0.4)';
                this.style.background = 'linear-gradient(135deg, rgba(0, 212, 170, 0.3), rgba(83, 52, 131, 0.2))';
                
                // Add pulse effect
                this.style.animation = 'socialPulse 0.6s ease-out';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                this.style.boxShadow = '';
                this.style.background = '';
                this.style.animation = '';
            });
            
            // Staggered entrance animation
            link.style.opacity = '0';
            link.style.transform = 'translateY(30px) scale(0.8)';
            setTimeout(() => {
                link.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                link.style.opacity = '1';
                link.style.transform = 'translateY(0) scale(1)';
            }, 2500 + (index * 300));
        });
        
        // Add social pulse animation
        if (!document.querySelector('#socialPulseStyle')) {
            const style = document.createElement('style');
            style.id = 'socialPulseStyle';
            style.textContent = `
                @keyframes socialPulse {
                    0% { box-shadow: 0 0 0 0 rgba(0, 212, 170, 0.4); }
                    70% { box-shadow: 0 0 0 15px rgba(0, 212, 170, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(0, 212, 170, 0); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Advanced skill tags animation with wave effect
    function animateAdvancedSkillTags() {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        skillTags.forEach((tag, index) => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(30px) scale(0.8) rotateX(45deg)';
            tag.style.filter = 'blur(5px)';
            
            setTimeout(() => {
                tag.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
                tag.style.filter = 'blur(0px)';
                
                // Add hover glow effect
                tag.addEventListener('mouseenter', function() {
                    this.style.boxShadow = '0 0 20px rgba(0, 212, 170, 0.5)';
                    this.style.textShadow = '0 0 10px rgba(0, 212, 170, 0.8)';
                });
                
                tag.addEventListener('mouseleave', function() {
                    this.style.boxShadow = '';
                    this.style.textShadow = '';
                });
            }, 800 + (index * 120));
        });
    }

    // Enhanced destination cards with advanced interactions
    function initAdvancedDestinationCards() {
        const destinationCards = document.querySelectorAll('.destination-card');
        
        destinationCards.forEach((card, index) => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.03)';
                this.style.filter = 'brightness(1.1)';
                
                // Enhanced glow effect for highlights
                const highlights = this.querySelectorAll('.highlight-tag');
                highlights.forEach((highlight, i) => {
                    setTimeout(() => {
                        highlight.style.background = 'linear-gradient(135deg, rgba(0, 212, 170, 0.3), rgba(83, 52, 131, 0.2))';
                        highlight.style.boxShadow = '0 0 20px rgba(0, 212, 170, 0.4)';
                        highlight.style.transform = 'scale(1.05)';
                    }, i * 50);
                });
                
                // Add destination state highlight
                const state = this.querySelector('.destination-state');
                if (state) {
                    state.style.textShadow = '0 0 15px rgba(0, 212, 170, 0.8)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.filter = '';
                
                const highlights = this.querySelectorAll('.highlight-tag');
                highlights.forEach(highlight => {
                    highlight.style.background = '';
                    highlight.style.boxShadow = '';
                    highlight.style.transform = '';
                });
                
                const state = this.querySelector('.destination-state');
                if (state) {
                    state.style.textShadow = '';
                }
            });
            
            // Add click effect for mobile
            card.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    this.style.animation = 'cardPulse 0.6s ease-out';
                    setTimeout(() => {
                        this.style.animation = '';
                    }, 600);
                }
            });
        });
        
        // Add card pulse animation
        if (!document.querySelector('#cardPulseStyle')) {
            const style = document.createElement('style');
            style.id = 'cardPulseStyle';
            style.textContent = `
                @keyframes cardPulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Updated travel destinations array with Varkala added
    const updatedDestinations = [
        // ... your existing 14 destinations ...
        {
            name: "Varkala",
            state: "Kerala",
            type: "Cliff Beach",
            nickname: "Pearl of Arabian Sea",
            description: "Unique cliff beach with red sandstone cliffs, pristine golden sands, and spectacular sunsets over Arabian Sea",
            highlights: ["Varkala Cliff", "Papanasam Beach", "Janardhana Swamy Temple", "Natural Springs", "Sunset Views"],
            coordinates: [8.7379, 76.7163],
            experience: "A bohemian paradise where ancient cliffs meet the Arabian Sea - perfect blend of spirituality, adventure, and relaxation"
        }
    ];

    // Updated travel stats
    const updatedTravelStats = {
        placesVisited: 15, // Updated from 14 to 15
        statesCovered: 4,  // Still 4 states (Kerala already included)
        favoriteType: "Hill stations, Waterfalls & Cliff Beaches",
        travelStyle: "Adventure & Spiritual Tourism"
    };

    // Advanced particle system with multiple types
    function createAdvancedParticleSystem() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        document.body.appendChild(particlesContainer);
        
        // Create different types of particles
        const particleTypes = [
            { color: 'rgba(0, 212, 170, 0.6)', size: 2, count: 30 },
            { color: 'rgba(83, 52, 131, 0.4)', size: 3, count: 20 },
            { color: 'rgba(255, 255, 255, 0.3)', size: 1, count: 40 }
        ];
        
        particleTypes.forEach(type => {
            for (let i = 0; i < type.count; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                const duration = Math.random() * 15 + 10;
                const delay = Math.random() * 8;
                const startX = Math.random() * 100;
                const startY = Math.random() * 100;
                
                particle.style.cssText = `
                    position: absolute;
                    width: ${type.size}px;
                    height: ${type.size}px;
                    background: ${type.color};
                    border-radius: 50%;
                    left: ${startX}%;
                    top: ${startY}%;
                    animation: advancedFloat ${duration}s ease-in-out infinite;
                    animation-delay: ${delay}s;
                    pointer-events: none;
                    box-shadow: 0 0 ${type.size * 3}px ${type.color};
                `;
                
                particlesContainer.appendChild(particle);
            }
        });
        
        // Add advanced floating animation
        if (!document.querySelector('#advancedFloatStyle')) {
            const style = document.createElement('style');
            style.id = 'advancedFloatStyle';
            style.textContent = `
                @keyframes advancedFloat {
                    0%, 100% { 
                        transform: translate(0px, 0px) rotate(0deg); 
                        opacity: 0.3; 
                    }
                    25% { 
                        transform: translate(-50px, -100px) rotate(90deg); 
                        opacity: 0.8; 
                    }
                    50% { 
                        transform: translate(100px, -50px) rotate(180deg); 
                        opacity: 1; 
                    }
                    75% { 
                        transform: translate(-30px, -80px) rotate(270deg); 
                        opacity: 0.6; 
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Fixed travel stats animation to prevent placeholder display
    function animateFixedTravelStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        const expectedValues = ['14', '4', 'Hill Stations', 'Adventure'];
        
        statNumbers.forEach((target, index) => {
            const expectedValue = expectedValues[index];
            const isNumber = /^\d+/.test(expectedValue);
            
            // Set initial correct value immediately
            target.textContent = expectedValue;
            target.style.color = 'rgba(0, 212, 170, 0.5)';
            target.style.transform = 'scale(0.8)';
            
            // Animate to final state
            setTimeout(() => {
                if (isNumber) {
                    // For numbers, do a quick count animation
                    const finalValue = parseInt(expectedValue);
                    let currentValue = 0;
                    const increment = finalValue / 20;
                    
                    const counter = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= finalValue) {
                            target.textContent = expectedValue;
                            target.style.color = '';
                            target.style.textShadow = '0 0 20px rgba(0, 212, 170, 0.8)';
                            target.style.transform = 'scale(1.1)';
                            
                            setTimeout(() => {
                                target.style.transform = 'scale(1)';
                                target.style.textShadow = '0 0 20px rgba(0, 212, 170, 0.5)';
                            }, 300);
                            
                            clearInterval(counter);
                        } else {
                            target.textContent = Math.floor(currentValue);
                        }
                    }, 50);
                } else {
                    // For text values, just animate the appearance
                    target.style.color = '';
                    target.style.textShadow = '0 0 20px rgba(0, 212, 170, 0.5)';
                    target.style.transform = 'scale(1.1)';
                    
                    setTimeout(() => {
                        target.style.transform = 'scale(1)';
                    }, 300);
                }
            }, index * 200);
        });
    }

    // Enhanced scroll to top button functionality
    function initAdvancedScrollTopButton() {
        const scrollTopBtn = document.createElement('button');
        scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollTopBtn.className = 'scroll-top-btn';
        document.body.appendChild(scrollTopBtn);
        
        scrollTopBtn.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                showSection('#about');
                // Update nav link with animation
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    link.style.transform = 'translateX(0)';
                });
                const aboutLink = document.querySelector('[href="#about"]');
                if (aboutLink) {
                    aboutLink.classList.add('active');
                    aboutLink.style.transform = 'translateX(10px)';
                }
            }
        });
        
        // Enhanced hover effects
        scrollTopBtn.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, rgba(0, 212, 170, 0.3), rgba(83, 52, 131, 0.2))';
            this.style.transform = 'scale(1.15) rotate(-5deg)';
            this.style.boxShadow = '0 8px 25px rgba(0, 212, 170, 0.4)';
        });
        
        scrollTopBtn.addEventListener('mouseleave', function() {
            this.style.background = '';
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '';
        });
    }

    function updateAdvancedScrollTopButton() {
        const scrollTopBtn = document.querySelector('.scroll-top-btn');
        const activeSection = document.querySelector('.section.active-section');
        if (scrollTopBtn && activeSection && activeSection.id !== 'about') {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
            scrollTopBtn.style.transform = 'translateY(0)';
        } else if (scrollTopBtn) {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
            scrollTopBtn.style.transform = 'translateY(20px)';
        }
    }

    // Enhanced glass button effects
    function initAdvancedGlassButtons() {
        const glassButtons = document.querySelectorAll('.glass-btn');
        
        glassButtons.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.background = 'linear-gradient(135deg, rgba(0, 212, 170, 0.2), rgba(83, 52, 131, 0.1))';
                this.style.boxShadow = '0 10px 40px rgba(0, 212, 170, 0.3)';
                this.style.borderColor = 'rgba(0, 212, 170, 0.5)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.background = '';
                this.style.boxShadow = '';
                this.style.borderColor = '';
            });
            
            btn.addEventListener('mousedown', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            btn.addEventListener('mouseup', function() {
                this.style.transform = '';
            });
        });
    }

    // Advanced mouse cursor trail effect
    function initAdvancedCursorTrail() {
        const trail = [];
        const trailLength = 12;
        
        for (let i = 0; i < trailLength; i++) {
            const dot = document.createElement('div');
            dot.className = 'cursor-trail';
            dot.style.cssText = `
                position: fixed;
                width: ${6 - i * 0.3}px;
                height: ${6 - i * 0.3}px;
                background: rgba(0, 212, 170, ${(1 - i / trailLength) * 0.8});
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: all 0.1s ease-out;
                box-shadow: 0 0 ${10 - i}px rgba(0, 212, 170, ${(1 - i / trailLength) * 0.5});
            `;
            document.body.appendChild(dot);
            trail.push(dot);
        }
        
        let mouseX = 0, mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function updateTrail() {
            trail.forEach((dot, index) => {
                setTimeout(() => {
                    dot.style.left = mouseX + 'px';
                    dot.style.top = mouseY + 'px';
                }, index * 30);
            });
            
            requestAnimationFrame(updateTrail);
        }
        
        updateTrail();
    }

    // Initialize all advanced features
    function initializeAdvancedPortfolio() {
        initAdvancedGlassCardEffects();
        initAdvancedSocialLinks();
        initAdvancedDestinationCards();
        initAdvancedGlassButtons();
        initAdvancedScrollTopButton();
        createAdvancedParticleSystem();
        initAdvancedCursorTrail();
        
        // Initialize enhanced typing animation for main title
        const mainTitle = document.querySelector('#about h1');
        if (mainTitle) {
            const originalText = mainTitle.textContent;
            setTimeout(() => {
                advancedTypeWriter(mainTitle, originalText, 50);
            }, 1200);
        }
        
        // Delayed animations
        setTimeout(animateAdvancedSkillTags, 2500);
        
        // Initial state updates
        updateAdvancedScrollTopButton();
        revealOnScroll();
        updateGlassEffects();
        
        // Trigger initial animations for visible section
        setTimeout(() => {
            const activeSection = document.querySelector('.section.active-section');
            if (activeSection) {
                const fadeElements = activeSection.querySelectorAll('.fade-in');
                fadeElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add('visible');
                    }, index * 150);
                });
            }
        }, 800);
    }

    // Window resize handler
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('open');
            mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
            mobileMenuToggle.style.background = '';
        }
    });

    // Enhanced scroll event listener
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateGlassEffects();
                updateAdvancedScrollTopButton();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initialize everything
    initializeAdvancedPortfolio();

    // Enhanced loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 1s ease-out';
        document.body.style.background = 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
            
            // Add welcome animation
            setTimeout(() => {
                showAdvancedNotification('Welcome to my enhanced portfolio! Explore my journey in backend development, creativity, and travel.', 'info');
            }, 2000);
        }, 200);
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
                mobileMenuToggle.style.background = '';
            }
        }
    });
});