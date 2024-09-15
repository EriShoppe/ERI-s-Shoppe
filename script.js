let currentIndex = 0;
const sections = document.querySelectorAll('.slide-section');

// Function to scroll to the next section
function scrollToSection(index) {
    sections[index].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add event listener to detect scroll
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

// Function to reveal sections on scroll
function revealOnScroll() {
    const sections = document.querySelectorAll('.slide-section');
    const serviceItems = document.querySelectorAll('.service-item');

    sections.forEach(section => {
        const windowHeight = window.innerHeight;
        const sectionTop = section.getBoundingClientRect().top;
        const revealPoint = 150;

        if (sectionTop < windowHeight - revealPoint) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });

    serviceItems.forEach(item => {
        const windowHeight = window.innerHeight;
        const itemTop = item.getBoundingClientRect().top;
        const revealPoint = 150;

        if (itemTop < windowHeight - revealPoint) {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }
    });
}

// Event listener for scroll event
window.addEventListener('scroll', revealOnScroll);

// Initial check in case sections are already in view
revealOnScroll();

document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scroll behavior to navigation links
    const links = document.querySelectorAll('nav ul li a');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor click behavior
            const targetId = link.getAttribute('href').substring(1); // Get the target section ID
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth', // Smooth scroll
                    block: 'start' // Align to the start of the section
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.scroll-link');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor link behavior
            const targetId = link.getAttribute('href').substring(1); // Get the target section id
            const targetElement = document.getElementById(targetId);

            // Smoothly scroll to the target section
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });
});


// Hamburger Menu for Mobile

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    hamburgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
});

// Disable scroll restoration
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
