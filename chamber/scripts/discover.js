// Cargar datos de places.json y generar tarjetas
fetch('data/places.json')
    .then(response => response.json())
    .then(places => {
        const gallery = document.querySelector('.gallery');
        
        places.forEach((place, index) => {
            const card = document.createElement('article');
            card.className = 'card';
            
            // Asigna un layout especial a ciertas tarjetas (ej: primera, última o una específica)
            if (index === 0) {
                card.classList.add('featured'); // Tarjeta destacada (área especial)
            } else if (index === places.length - 1) {
                card.classList.add('wide'); // Última tarjeta (ocupa más espacio)
            }

            card.innerHTML = `
                <h2>${place.name}</h2>
                <figure>
                    <img src="${place.image}" 
                         alt="${place.name}" 
                         loading="lazy" 
                         width="${place.width}" 
                         height="${place.height}">
                </figure>
                <address>${place.address}</address>
                <p>${place.description}</p>
                <a href="${place.website}" target="_blank" rel="noopener noreferrer">
                    <button>Visit Web</button>
                </a>
            `;
            gallery.appendChild(card);
        });
    })
    .catch(error => console.error('Error loading places data:', error));
    // nav hamburguer
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

    // Update footer with current year and last modified date
document.getElementById('copyright-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;


// Mostrar mensaje de última visita
function showVisitMessage() {
    const messageDiv = document.getElementById('visit-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = new Date();

    if (!lastVisit) {
        messageDiv.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastDate = new Date(lastVisit);
        const daysDiff = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));

        if (daysDiff === 0) {
            messageDiv.textContent = "Back so soon! Awesome!";
        } else {
            messageDiv.textContent = `You last visited ${daysDiff} ${daysDiff === 1 ? 'day' : 'days'} ago.`;
        }
    }
    localStorage.setItem('lastVisit', now.toString());
}

document.addEventListener('DOMContentLoaded', showVisitMessage);