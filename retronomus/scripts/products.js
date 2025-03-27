document.addEventListener("DOMContentLoaded", () => {
    const productsContainer = document.getElementById('products-container');
    const filterForm = document.getElementById('filter-form');
    let productsData = []; // Almacenará los productos cargados

    // Carga inicial de productos (fetch o localStorage)
    function loadProducts() {
        const savedProducts = JSON.parse(localStorage.getItem("products"));
        if (savedProducts) {
            productsData = savedProducts;
            renderProducts(productsData);
        } else {
            fetch('products.json')
                .then(response => response.json())
                .then(data => {
                    productsData = data;
                    localStorage.setItem("products", JSON.stringify(data));
                    renderProducts(data);
                })
                .catch(error => console.error('Error loading products:', error));
        }
    }

    // Renderiza productos
    function renderProducts(products) {
        productsContainer.innerHTML = '';
        if (products.length === 0) {
            productsContainer.innerHTML = '<p>No products found</p>';
        } else {
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');
                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>Price: $${product.price}</p>
                    <p>Year: ${product.year}</p>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                `;
                productsContainer.appendChild(productDiv);
            });

            // Agrega event listeners a los botones
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = e.target.getAttribute('data-id');
                    addToCart(productId, products);
                });
            });
        }
    }

    // Filtra productos
    function filterProducts(event) {
        event.preventDefault();
        const category = document.getElementById('category').value;
        const priceRange = document.getElementById('price-range').value;
        const year = document.getElementById('year').value;
    
        const filteredProducts = productsData.filter(product => {
            const categoryMatch = 
                !category || 
                (category === "walkman" && product.category === "Music") || 
                (category === "cassette" && product.category === "Music") ||  // <-- Faltaba esta coma
                (category === "camera" && product.category === "Photography") || 
                (category === "dvd" && product.category === "Movies") || 
                (category === "videogame" && product.category === "Gaming");
        
            const priceMatch = 
                !priceRange || 
                (priceRange === 'low' && product.price < 50) ||
                (priceRange === 'mid' && product.price >= 50 && product.price <= 100) ||
                (priceRange === 'high' && product.price > 100);
        
            const yearMatch = !year || product.year.includes(year);
        
            return categoryMatch && priceMatch && yearMatch;
        });
    
        renderProducts(filteredProducts);
    }

    // Eventos
    filterForm.addEventListener('submit', filterProducts);
    loadProducts(); // Carga inicial
});

// Función para añadir al carrito (sin cambios)
function addToCart(productId, products) {
    const product = products.find(p => p.id == productId);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
}