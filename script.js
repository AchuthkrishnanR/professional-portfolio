// Scroll animations with Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.pageYOffset;

    const updateNavbar = () => {
        const scrollY = window.pageYOffset;

        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollY = scrollY;
    };

    window.addEventListener('scroll', updateNavbar);
    // Initial call
    updateNavbar();

    // Scroll animations for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Add specific animation classes based on section
                if (entry.target.id === 'about') {
                    entry.target.classList.add('animate-fade-in-left');
                } else if (entry.target.id === 'skills') {
                    entry.target.classList.add('animate-fade-in-right');
                } else if (entry.target.id === 'projects') {
                    entry.target.classList.add('animate-fade-in-up');
                } else if (entry.target.id === 'contact') {
                    entry.target.classList.add('animate-fade-in-down');
                }

                // Animate skill cards on scroll
                if (entry.target.id === 'skills') {
                    const skillCards = entry.target.querySelectorAll('.skill-card');
                    skillCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)";
                        }, 100 * index);
                    });
                }

                // Animate project cards on scroll
                if (entry.target.id === 'projects') {
                    const projectCards = entry.target.querySelectorAll('.project-card');
                    projectCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)";
                        }, 150 * index);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        observer.observe(section);
    });

    // Enhanced typing effect with cursor removal (since we removed it earlier)
    const typingText = document.getElementById('typing-text');
    const textArray = [
        "Full-Stack Developer",
        "AI Enthusiast",
        "Open Source Contributor",
        "Problem Solver"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = textArray[textIndex];
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            // finished typing
            isDeleting = true;
            setTimeout(type, 1500); // pause before deleting
        } else if (isDeleting && charIndex === 0) {
            // finished deleting
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            setTimeout(type, 500); // pause before next word
        } else {
            setTimeout(type, isDeleting ? typingSpeed / 2 : typingSpeed);
        }
    }

    // start typing
    type();

    // Custom cursor enhancements
    const cursor = document.getElementById('custom-cursor');
    const links = document.querySelectorAll('a, button, .skill-card, .project-card, .nav-links a');

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            cursor.style.width = '32px';
            cursor.style.height = '32px';
        });

        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            cursor.style.width = '24px';
            cursor.style.height = '24px';
        });
    });

    // Add hover sound or visual feedback for interactive elements (visual only)
    document.addEventListener('mousedown', (e) => {
        if (e.target.matches('a, button, .skill-card, .project-card')) {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'translate(-50%, -50%) scale(0)';
            ripple.style.animation = 'rippleEffect 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            ripple.style.zIndex = '1000';

            const size = Math.max(e.target.clientWidth, e.target.clientHeight);
            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;

            e.target.style.position = 'relative';
            e.target.style.overflow = 'hidden';
            e.target.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleEffect {
            to {
                transform: translate(-50%, -50%) scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Matrix background enhancements - make it slightly more dynamic
    const matrixCanvas = document.getElementById('matrix');
    const ctx = matrixCanvas.getContext('2d');

    function resizeMatrix() {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeMatrix);
    resizeMatrix();

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()*&^%+-/~{[|`]}';
    const fontSize = 16;
    const columns = matrixCanvas.width / fontSize;
    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

        ctx.fillStyle = '#0F0'; // green
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = characters[Math.floor(Math.random() * characters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(drawMatrix, 33);
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
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                const navbar = document.querySelector('.navbar');
                navbar.classList.toggle('active');
            }
        }
    });
});

// Mobile menu toggle (if we decide to add a hamburger menu later)
// For now, just enhance the existing nav links on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && e.target.matches('.nav-links a')) {
        // Add a slight delay to see the click effect before navigating
        setTimeout(() => {
            // Close dropdown or menu if implemented
        }, 100);
    }
});

// Add entrance animations for elements on initial load
window.addEventListener('load', () => {
    // Hero content gets a slight delay
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
        }, 300);
    }

    // Animate nav links on load
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            link.style.opacity = '1';
            link.style.transform = 'translateX(0)';
            link.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        }, 100 * (index + 1));
    });
});