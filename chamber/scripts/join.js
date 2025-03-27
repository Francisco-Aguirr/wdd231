document.addEventListener('DOMContentLoaded', function() {
    // Set timestamp when page loads
    document.getElementById('timestamp').value = new Date().toISOString();

    // Modal functionality
    const modalLinks = document.querySelectorAll('.modal-link');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');

    modalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('href').substring(1);
            document.getElementById(modalId).style.display = 'block';
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Actualizar el año y la fecha de última modificación en el footer
    const yearElement = document.querySelector('footer p:first-of-type');
    const currentYear = new Date().getFullYear();
    yearElement.textContent = `© ${currentYear} Join - Chamber of Commerce | Francisco Aguirre`;

    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');

    menuToggle.addEventListener('click', function() {
        // Alternar clases
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Opcional: Cerrar menú al hacer clic en un enlace
        if (navMenu.classList.contains('active')) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    hamburger.classList.remove('active');
                });
            });
        }
    });


    // Form validation for organization title
    const titleInput = document.getElementById('title');
    if (titleInput) {
        titleInput.addEventListener('input', function() {
            if (this.validity.patternMismatch) {
                this.setCustomValidity('Only letters, hyphens, and spaces (min 7 characters)');
            } else {
                this.setCustomValidity('');
            }
        });
    }
});