// Main application script
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const primaryNav = document.querySelector('.primary-nav');
    
    if (menuToggle && primaryNav) {
        menuToggle.addEventListener('click', () => {
            primaryNav.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.primary-nav a').forEach(link => {
            link.addEventListener('click', () => {
                primaryNav.classList.remove('active');
            });
        });
    }
    
    // Initialize cart count display
    updateCartCount();
    
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('retronomusCart')) || [];
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        }
    }
    
     // Form validation
     const contactForm = document.getElementById('contactForm');
     if (contactForm) {
         contactForm.addEventListener('submit', (e) => {
             const name = document.getElementById('name').value.trim();
             const email = document.getElementById('email').value.trim();
             const message = document.getElementById('message').value.trim();
             
             if (!name || !email || !message) {
                 e.preventDefault();
                 alert('Please fill in all fields');
                 return false;
             }
             
             if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                 e.preventDefault();
                 alert('Please enter a valid email address');
                 return false;
             }
             
             return true;
         });
     }
    // Export function to update cart count from other modules
    window.updateCartCount = updateCartCount;
});