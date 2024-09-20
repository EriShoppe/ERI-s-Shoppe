document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.slide-section');
    let currentIndex = 0;
    let touchStartY = 0;

    // Function to scroll to a specific section
    function scrollToSection(index) {
        if (index >= 0 && index < sections.length) {
            sections[index].scrollIntoView({ behavior: 'smooth' });
            localStorage.setItem('currentSlide', index); // Store current slide index
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

    // Load current slide from local storage on page load
    const currentSlide = localStorage.getItem('currentSlide');
    if (currentSlide) {
        currentIndex = parseInt(currentSlide, 10);
        scrollToSection(currentIndex); // Navigate to the stored slide index
    }

    // Push a new state to avoid going back to the previous page
    window.history.pushState(null, null, window.location.href);

});

///////////////////////////////////////////////////////////////////////////////////////////////////////

// Ensure this script runs after the DOM has loaded
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute('href'));
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
});


///////////////////////////////////////////////////////////////////////////////////////////////////////

document.getElementById('servicesBtn').addEventListener('click', function() {
    // Smooth scroll to the next section (contact section)
    document.querySelector('.services-section').scrollIntoView({
        behavior: 'smooth'
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////

const servicesSection = document.querySelector('.services-section');

servicesSection.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = servicesSection;

    // If scrolled to the top
    if (scrollTop === 0) {
        scrollToSection(currentIndex - 1); // Scroll to the previous section
    }
    
    // If scrolled to the bottom
    if (scrollTop + clientHeight >= scrollHeight) {
        scrollToSection(currentIndex + 1); // Scroll to the next section
    }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////

// Get the video
var video = document.getElementById("myVideo");

// Get the button
var btn = document.getElementById("myBtn");

// Pause and play the video, and change the button text
function myFunction() {
  if (video.paused) {
    video.play();
    btn.innerHTML = "Pause";
  } else {
    video.pause();
    btn.innerHTML = "Play";
  }
}
