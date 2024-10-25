// Back Button //
function goToMain() {
    window.location.href = 'https://erishoppe.github.io/ERI-s-Shoppe/';
}

// Intercept back button press
window.addEventListener("popstate", function(event) {
    window.location.href = 'main.html';
});

// Function to open the modal and dynamically change the description
function openModal(modalId, title, description) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';

    // Update the description dynamically
    const modalDescription = modal.querySelector('.modal-description');
    if (modalDescription) {
        modalDescription.querySelector('h2').textContent = title;
        modalDescription.querySelector('p').textContent = description;
    }
}

// Function to close the modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Function to open the full-screen modal with the clicked image and description
function openFullScreen(imageSrc, descriptionText) {
    const fullScreenModal = document.getElementById('fullScreenModal');
    const fullScreenImage = document.getElementById('fullScreenImage');
    const fullScreenDescription = document.getElementById('fullScreenDescription');

    // Set the image source and description text dynamically
    fullScreenImage.src = imageSrc;
    fullScreenDescription.innerText = descriptionText;  // Set the description

    // Show the full-screen modal
    fullScreenModal.style.display = 'block';

    // Add event listener to close the modal when Escape is pressed
    document.addEventListener('keydown', handleEscape);
}

// Add click event listener to modal images
document.querySelectorAll('.modal-gallery img').forEach(img => {
    img.addEventListener('click', function() {
        // Get the image source and description from the clicked image
        const imageSrc = this.src;
        const descriptionText = this.getAttribute('data-description') || 'No description available'; // Fallback if description is missing
        openFullScreen(imageSrc, descriptionText);
    });
});


// Function to close the full-screen modal
function closeFullScreen() {
    document.getElementById('fullScreenModal').style.display = 'none';
    document.removeEventListener('keydown', handleEscape);
}

// Function to handle Escape key press
function handleEscape(event) {
    if (event.key === 'Escape' || event.keyCode === 27) {
        closeFullScreen();
    }
}

// Add click event listener to modal images for full-screen functionality
document.querySelectorAll('.modal-gallery img').forEach(img => {
    img.addEventListener('click', function () {
        openFullScreen(this.src);
    });
});
