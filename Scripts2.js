
// Back Button //
function goToMain() {
    window.location.href = 'index.html';  // Redirects to your main HTML page
}

   // Intercept back button press
   window.addEventListener("popstate", function(event) {
    window.location.href = 'main.html';  // Force redirect to main page
});

// Push a new state to avoid going back to the previous page
window.history.pushState(null, null, window.location.href);

// Function to open the modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

// Function to close the modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Function to open the full-screen modal with the clicked image
function openFullScreen(imageSrc) {
    const fullScreenModal = document.getElementById('fullScreenModal');
    const fullScreenImage = document.getElementById('fullScreenImage');
    fullScreenImage.src = imageSrc; // Set clicked image's source to modal image
    fullScreenModal.style.display = 'block'; // Show the full-screen modal

    // Add event listener to close the modal when Escape is pressed
    document.addEventListener('keydown', handleEscape);
}

// Function to close the full-screen modal
function closeFullScreen() {
    document.getElementById('fullScreenModal').style.display = 'none';

    // Remove the event listener when the modal is closed
    document.removeEventListener('keydown', handleEscape);
}

// Function to handle Escape key press
function handleEscape(event) {
    if (event.key === 'Escape' || event.keyCode === 27) {
        closeFullScreen();
    }
}

// Add click event listener to modal images
document.querySelectorAll('.modal-gallery img').forEach(img => {
    img.addEventListener('click', function() {
        openFullScreen(this.src);
    });
});
