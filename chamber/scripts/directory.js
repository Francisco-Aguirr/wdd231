// Fetch member data from JSON
async function fetchMembers() {
    const response = await fetch('data/members.json');
    const data = await response.json();
    return data;
}

// Display members in grid or list view
function displayMembers(members, view = 'grid') {
    const container = document.getElementById('member-container');
    container.innerHTML = ''; // Clear existing content
    container.className = view === 'grid' ? 'grid-view' : 'list-view';

    members.forEach(member => {
        const card = document.createElement('div');
        card.className = view === 'grid' ? 'member-card' : 'member-card list-view-item';
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" width="${member.width}" height="${member.height}">
            <div>
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p><a href="${member.website}" target="_blank">Visit Website</a></p>
                <p>Membership Level: ${member.membershipLevel}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// Toggle between grid and list view
document.getElementById('grid-view').addEventListener('click', () => {
    fetchMembers().then(members => displayMembers(members, 'grid'));
});

document.getElementById('list-view').addEventListener('click', () => {
    fetchMembers().then(members => displayMembers(members, 'list'));
});

// Initialize page
fetchMembers().then(members => displayMembers(members));

// Update footer with current year and last modified date
document.getElementById('copyright-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// Toggle the hamburger menu
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close the menu when a link is clicked (optional)
navMenu.addEventListener('click', () => {
    if (window.innerWidth <= 767) {
        navMenu.classList.remove('active');
    }
});