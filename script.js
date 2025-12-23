// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Setup tab functionality
    setupTabs();

    // Add fade-in animation to elements
    const animatedElements = document.querySelectorAll('.program-card, .timeline-item, .topic, .model-card, .framework-card, .safety-card, .coming-soon-card');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(el);
    });

    // Stagger animation for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    // Stagger animation for topics
    const topics = document.querySelectorAll('.topic');
    topics.forEach((topic, index) => {
        topic.style.transitionDelay = `${index * 0.1}s`;
    });

    // Stagger animation for program cards
    const programCards = document.querySelectorAll('.program-card');
    programCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });

    // Create floating particles effect
    createParticles();

    // Add parallax effect to hero
    addParallaxEffect();

    // Add smooth scroll behavior to internal links
    addSmoothScroll();

    // Add counter animation to stats
    animateStats();

    // Add hover effect to timeline items
    setupTimelineHover();

    // Add interactive card tilt effect
    setupCardTilt();

    // Add dynamic gradient animation to hero text
    animateGradientText();

    // Add scroll progress indicator
    addScrollProgress();

    // Add notify button functionality
    setupNotifyButtons();
});

// Tab switching functionality
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const navButtons = document.querySelectorAll('.nav-btn');

    // Function to switch to a specific tab
    function switchToTab(targetTab) {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked button and corresponding content
        const targetButton = document.querySelector(`.tab-btn[data-tab="${targetTab}"]`);
        if (targetButton) {
            targetButton.classList.add('active');
        }
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
            targetContent.classList.add('active');
        }

        // Scroll to top of tab content smoothly
        const courseSection = document.getElementById('ai-beginners');
        if (courseSection) {
            courseSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Tab button click handlers
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            switchToTab(targetTab);
        });
    });

    // Navigation button click handlers
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const prevDay = button.getAttribute('data-prev');
            const nextDay = button.getAttribute('data-next');

            if (prevDay) {
                switchToTab(prevDay);
            } else if (nextDay) {
                switchToTab(nextDay);
            }
        });
    });
}

// Create floating particles in background
function createParticles() {
    const hero = document.querySelector('.hero-background');
    if (!hero) return;

    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 4 + 2;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(102, 126, 234, 0.6), transparent);
            border-radius: 50%;
            left: ${startX}%;
            top: ${startY}%;
            pointer-events: none;
            animation: float ${duration}s ease-in-out ${delay}s infinite;
        `;

        hero.appendChild(particle);
    }

    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            50% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.5);
            }
        }
    `;
    document.head.appendChild(style);
}

// Add parallax scrolling effect
function addParallaxEffect() {
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero-content');
                const background = document.querySelector('.neural-network');

                if (hero) {
                    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
                    hero.style.opacity = 1 - (scrolled / 800);
                }

                if (background) {
                    background.style.transform = `translateY(${scrolled * 0.5}px)`;
                }

                ticking = false;
            });

            ticking = true;
        }
    });
}

// Smooth scroll for internal links
function addSmoothScroll() {
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
}

// Animate statistics numbers
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');

    stats.forEach(stat => {
        const text = stat.textContent.trim();
        const isNumber = !isNaN(parseInt(text));

        if (isNumber) {
            const finalNumber = parseInt(text);
            let currentNumber = 0;
            const increment = finalNumber / 50;
            const duration = 1500;
            const stepTime = duration / 50;

            const updateNumber = () => {
                currentNumber += increment;
                if (currentNumber < finalNumber) {
                    stat.textContent = Math.floor(currentNumber);
                    setTimeout(updateNumber, stepTime);
                } else {
                    stat.textContent = text;
                }
            };

            // Start animation when stat comes into view
            const statObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateNumber();
                        statObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            statObserver.observe(stat);
        }
    });
}

// Add hover effect to timeline items
function setupTimelineHover() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach(item => {
        const content = item.querySelector('.timeline-content');
        const marker = item.querySelector('.timeline-marker');

        if (content && marker) {
            content.addEventListener('mouseenter', () => {
                marker.style.transform = 'translateX(-50%) scale(1.3)';
                marker.style.transition = 'transform 0.3s ease';
            });

            content.addEventListener('mouseleave', () => {
                marker.style.transform = 'translateX(-50%) scale(1)';
            });
        }
    });
}

// Add interactive card tilt effect
function setupCardTilt() {
    const cards = document.querySelectorAll('.program-card, .topic, .model-card, .framework-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Add dynamic gradient animation to hero text
function animateGradientText() {
    const gradientText = document.querySelector('.gradient-text');

    if (gradientText) {
        let hue = 0;
        setInterval(() => {
            hue = (hue + 1) % 360;
            gradientText.style.filter = `hue-rotate(${hue * 0.2}deg)`;
        }, 50);
    }
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 9999;
        transition: width 0.1s ease;
        width: 0%;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Setup notify button functionality
function setupNotifyButtons() {
    const notifyButtons = document.querySelectorAll('.notify-button');

    notifyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const originalText = button.textContent;
            button.textContent = 'Thank You!';
            button.style.background = 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';

            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            }, 2000);
        });
    });
}

// Console message for developers
console.log('%c🤖 AI Training Workshop Series', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cBuilt with modern web technologies', 'font-size: 12px; color: #a0aec0;');
console.log('%cExplore AI from fundamentals to advanced applications!', 'font-size: 12px; color: #a0aec0;');
