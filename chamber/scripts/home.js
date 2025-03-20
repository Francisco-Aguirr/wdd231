document.addEventListener('DOMContentLoaded', function () {
    // Actualizar el año y la fecha de última modificación en el footer
    const yearElement = document.querySelector('footer p:first-of-type');
    const currentYear = new Date().getFullYear();
    yearElement.textContent = `© ${currentYear} Chamber of Commerce | Francisco Aguirre`;

    // hamburguer menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active'); // Alternar la clase 'active'
    });

    const lastModifiedElement = document.querySelector('footer p:last-of-type');
    const lastModifiedDate = new Date(document.lastModified);
    const formattedDate = lastModifiedDate.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    lastModifiedElement.textContent = `Last Modified: ${formattedDate}`;

    // Cargar datos del clima actual y pronóstico
    const apiKey = '66a337a51d78b27c19d884cdbbb4b229'; 
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Timbuktu&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Timbuktu&units=metric&appid=${apiKey}`;

    // Cargar datos del clima actual
    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            const weatherData = document.getElementById('weather-data');
            weatherData.innerHTML = `
                <p>Temperature: <b>${data.main.temp}</b>°C</p>
                <p>Description: ${data.weather[0].description}</p>
                <p>Humity: ${data.main.humidity}%</p>
            `;
        })
        .catch(error => console.error('Error cargando el clima actual:', error));

    // Cargar pronóstico del clima (3 días)
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            const forecast = data.list.filter((item, index) => index % 8 === 0).slice(0, 3); // Filtra para obtener un pronóstico por día
            const forecastHtml = forecast.map(item => `
                <p>${new Date(item.dt_txt).toLocaleDateString()}: <b>${item.main.temp}</b>°C</p>
            `).join('');
            document.getElementById('forecast-data').innerHTML = forecastHtml;
        })
        .catch(error => console.error('Error cargando el pronóstico del clima:', error));

    // Cargar miembros destacados desde el archivo JSON
    fetch('data/members.json')
        .then(response => response.json())
        .then(members => {
            const spotlightMembers = members.filter(member =>
                member.membershipLevel === 'Gold' || member.membershipLevel === 'Silver'
            );
            const selectedMembers = spotlightMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

            const spotlightCards = document.getElementById('spotlight-cards');
            selectedMembers.forEach(member => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <h3>${member.name}</h3>
                    <img src="images/${member.image}" alt="${member.name}" width="${member.width}" height="${member.height}">
                    <p>Phone: ${member.phone}</p>
                    <p>Addres: ${member.address}</p>
                    <p>Website: <a href="${member.website}" target="_blank">${member.website}</a></p>
                    <p>Membership: ${member.membershipLevel}</p>
                `;
                spotlightCards.appendChild(card);
            });
        })
        .catch(error => console.error('Error cargando miembros:', error));
});