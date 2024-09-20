document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.slide-section');
    let currentIndex = 0;
    let touchStartY = 0;

    // Function to scroll to a specific section
    function scrollToSection(index) {
        if (index >= 0 && index < sections.length) {
            sections[index].scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Event listener for mouse scroll
    window.addEventListener('wheel', (event) => {
        if (event.deltaY > 0) {
            // Scroll down
            if (currentIndex < sections.length - 1) {
                currentIndex++;
                scrollToSection(currentIndex);
            }
        } else {
            // Scroll up
            if (currentIndex > 0) {
                currentIndex--;
                scrollToSection(currentIndex);
            }
        }
    });

    // Function to reveal sections and service items on scroll
    function revealOnScroll() {
        const revealPoint = 150;
        const windowHeight = window.innerHeight;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < windowHeight - revealPoint) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });

        const serviceItems = document.querySelectorAll('.service-item');
        serviceItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < windowHeight - revealPoint) {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }
        });
    }

    // Event listener for scroll to reveal sections
    window.addEventListener('scroll', revealOnScroll);

    // Initial check to reveal sections on page load
    revealOnScroll();

    // Smooth scroll behavior for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile handling for hamburger menu
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navbar = document.querySelector('.navbar');

    hamburgerBtn.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });

    // Swipe handling for mobile
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const touchDifference = touchStartY - touchEndY;

        if (Math.abs(touchDifference) > 50) {
            if (touchDifference > 0) {
                // Swipe up
                scrollToNextSection();
            } else {
                // Swipe down
                scrollToPreviousSection();
            }
        }
    });

    function scrollToNextSection() {
        if (currentIndex < sections.length - 1) {
            currentIndex++;
            scrollToSection(currentIndex);
        }
    }

    function scrollToPreviousSection() {
        if (currentIndex > 0) {
            currentIndex--;
            scrollToSection(currentIndex);
        }
    }

    // Disable scroll restoration to prevent scroll jumping
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // Home section swipe detection (using Hammer.js)
    if (typeof Hammer !== 'undefined') {
        const homeSection = document.getElementById('home');
        const mc = new Hammer(homeSection);
        mc.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });

        mc.on('swipeup', () => {
            scrollToNextSection();
        });
    }
});

// Push a new state to avoid going back to the previous page
window.history.pushState(null, null, window.location.href);