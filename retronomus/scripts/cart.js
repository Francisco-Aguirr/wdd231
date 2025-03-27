// Load cart items from localStorage
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    cartItemsContainer.innerHTML = '';  // Clear the cart items first
    let total = 0;

    cart.forEach(product => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        
        itemDiv.innerHTML = `
            <h4>${product.name}</h4>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
        `;

        cartItemsContainer.appendChild(itemDiv);
        total += product.price;
    });

    totalPriceElement.textContent = total.toFixed(2); // Update the total
}

// Handle contact form submission
document.getElementById('contact-form-element').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for reaching out! We will get back to you soon.');
    document.getElementById('contact-form-element').reset();
});

// Load cart when the page is loaded
window.onload = loadCart;
