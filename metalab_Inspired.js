// Sticky header functionality
window.onscroll = function() {
    let header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
};
////////////////////////////////////////////////////////////////////////
// Smooth scroll for navigation links
document.querySelectorAll('.menu ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

/////////////////////////////////////////////////////////////////////////
// Add event listeners to each navigation link for hover-based scrolling
document.querySelectorAll('.menu ul li a').forEach(link => {
    // Get the target section from the 'data-target' attribute
    const targetSection = document.getElementById(link.getAttribute('data-target'));
    
    // Add hover event listener to the link
    link.addEventListener('mouseenter', () => {
        // Smooth scroll to the section when hovered
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

//////////////////////////////////////////////////////////////////////////

// Function to scroll to the saved section on page load
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Event listener for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (event) => {
        const sectionId = link.getAttribute('href').substring(1); // Get the section ID
        localStorage.setItem('activeSection', sectionId); // Save the section ID in localStorage
    });
});

// On page load, check if there's a saved section and scroll to it
window.addEventListener('load', () => {
    const activeSection = localStorage.getItem('activeSection');
    if (activeSection) {
        scrollToSection(activeSection);
    }
});

///////////////////////////////////////////////////////////////////////////////

document.querySelectorAll('.catalog-item').forEach(item => {
    item.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default link behavior

        const imageSrc = item.getAttribute('data-image'); // Get the image source
        const link = item.getAttribute('href'); // Get the link to the HTML file

        // Create an overlay for the fullscreen effect
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = `rgba(0, 0, 0, 0.8) url(${imageSrc}) no-repeat center center`;
        overlay.style.backgroundSize = 'cover';
        overlay.style.zIndex = '9999';
        overlay.style.transition = 'opacity 0.5s ease';
        overlay.style.opacity = '0';

        document.body.appendChild(overlay); // Add overlay to the body

        // Delay and then navigate to the linked HTML file
        setTimeout(() => {
            overlay.style.opacity = '1'; // Fade in the overlay
        }, 50); // Small delay before fading in

        setTimeout(() => {
            overlay.style.opacity = '0'; // Fade out the overlay
            setTimeout(() => {
                document.body.removeChild(overlay); // Remove overlay
                window.location.href = link; // Navigate to the linked HTML file
            }, 500); // Wait for fade out to finish before navigating
        }, 2000); // Show the overlay for 2 seconds
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////

// On page load, remove the fade-out class to ensure it starts fully visible
window.addEventListener('load', () => {
    document.body.classList.remove('fade-out');
});

////////////////////////////////////////////////////////////////////////////////////////////////

var swiper = new Swiper(".swiper-container", {
    direction: "horizontal", // Use 'horizontal' for horizontal swiping
    loop: false, // Set to 'true' if you want it to loop continuously
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    mousewheel: true, // Allows scrolling with mousewheel on desktops
    keyboard: {
      enabled: true,
    },
  });
  
  let startX = 0;
let endX = 0;

const container = document.querySelector('.horizontal-scroll-container');

container.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
});

container.addEventListener('touchmove', (event) => {
    endX = event.touches[0].clientX;
});

container.addEventListener('touchend', () => {
    if (startX > endX + 50) {
        // Swipe left
        container.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
    } else if (startX < endX - 50) {
        // Swipe right
        container.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
    }
});

function mousehandler(e) {
    var myevent = (isNS) ? e : event;
    var eventbutton = (isNS) ? myevent.which : myevent.button;
    if ((eventbutton == 2) || (eventbutton == 3)) return false;
}
document.oncontextmenu = mischandler;
document.onmousedown = mousehandler;
document.onmouseup = mousehandler;
function disableCtrlKeyCombination(e) {
    var forbiddenKeys = new Array("a", "s", "c", "x","u");
    var key;
    var isCtrl;
    if (window.event) {
        key = window.event.keyCode;
        //IE
        if (window.event.ctrlKey)
            isCtrl = true;
        else
            isCtrl = false;
    }
    else {
        key = e.which;
        //firefox
        if (e.ctrlKey)
            isCtrl = true;
        else
            isCtrl = false;
    }
    if (isCtrl) {
        for (i = 0; i < forbiddenKeys.length; i++) {
            //case-insensitive comparation
            if (forbiddenKeys[i].toLowerCase() == String.fromCharCode(key).toLowerCase()) {
                return false;
            }
        }
    }
    return true;
}