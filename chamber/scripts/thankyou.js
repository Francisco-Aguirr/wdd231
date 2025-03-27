document.addEventListener('DOMContentLoaded', function() {
    // Actualizar el año y la fecha de última modificación en el footer
    const yearElement = document.querySelector('footer p:first-of-type');
    const currentYear = new Date().getFullYear();
    yearElement.textContent = `© ${currentYear} Chamber of Commerce | Francisco Aguirre`;

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
    
    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Display submitted data
    document.getElementById('display-name').textContent = 
        `${urlParams.get('firstName')} ${urlParams.get('lastName')}`;
    document.getElementById('display-email').textContent = urlParams.get('email');
    document.getElementById('display-phone').textContent = urlParams.get('phone');
    document.getElementById('display-org').textContent = urlParams.get('orgName');
    
    const membershipLevels = {
        'np': 'NP Membership',
        'bronze': 'Bronze Membership',
        'silver': 'Silver Membership',
        'gold': 'Gold Membership'
    };
    document.getElementById('display-membership').textContent = 
        membershipLevels[urlParams.get('membership')];
    
    const timestamp = new Date(urlParams.get('timestamp'));
    document.getElementById('display-date').textContent = 
        timestamp.toLocaleString();
});