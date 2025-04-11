document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM fully loaded');

    class ProductLoader {
        constructor() {
            this.products = [];
        }

        async loadProducts() {
            try {
                const response = await fetch('data/products.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                this.products = await response.json();
                console.log('Products loaded:', this.products.length);
                return this.products;
            } catch (error) {
                console.error('Error loading products:', error);
                return [];
            }
        }

        sortProducts(products, sortMethod) {
            switch (sortMethod) {
                case 'price-asc':
                    return [...products].sort((a, b) => a.price - b.price);
                case 'price-desc':
                    return [...products].sort((a, b) => b.price - a.price);
                case 'name-asc':
                    return [...products].sort((a, b) => a.name.localeCompare(b.name));
                case 'name-desc':
                    return [...products].sort((a, b) => b.name.localeCompare(a.name));
                default:
                    return products;
            }
        }

        createProductCard(product) {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-image">
                    <img 
                        src="${product.image.src}" 
                        alt="${product.image.alt}" 
                        width="${product.image.width}" 
                        height="${product.image.height}"
                        loading="lazy"
                        decoding="async"
                    >
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <span class="product-condition">${product.condition} Condition</span>
                    <div class="product-actions">
                        <button class="btn btn-details" data-id="${product.id}">Details</button>
                        <button class="btn btn-add-to-cart" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            `;
            return card;
        }

        addProductEventListeners() {
            document.querySelectorAll('.btn-details').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = e.target.dataset.id;
                    this.showProductModal(productId);
                });
            });

            document.querySelectorAll('.btn-add-to-cart').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = e.target.dataset.id;
                    const product = this.products.find(p => p.id === productId);
                    if (product) {
                        window.cart.addItem(product);
                        this.showToast(`${product.name} added to cart!`);
                    }
                });
            });
        }

        async showProductModal(productId) {
            try {
                const product = this.products.find(p => p.id === productId);
                if (!product) return;

                const modal = document.getElementById('productModal');
                const modalBody = document.getElementById('modal-body');
                
                modalBody.innerHTML = `
                    <span class="close-modal">&times;</span>
                    <div class="modal-product">
                        <div class="modal-product-image">
                            <img 
                                src="${product.image.src}" 
                                alt="${product.image.alt}" 
                                width="${product.image.width}" 
                                height="${product.image.height}"
                                loading="lazy"
                                decoding="async"
                            >
                        </div>
                        <div class="modal-product-info">
                            <h2>${product.name}</h2>
                            <div class="modal-product-price">$${product.price.toFixed(2)}</div>
                            <span class="product-condition">${product.condition} Condition</span>
                            <div class="modal-product-description">
                                <p>${product.description}</p>
                            </div>
                            <div class="modal-product-details">
                                <h3>Details</h3>
                                <ul>
                                    ${Object.entries(product.specs).map(([key, value]) => `
                                        <li><span>${key}:</span> <span>${value}</span></li>
                                    `).join('')}
                                </ul>
                            </div>
                            <button class="btn btn-add-to-cart" data-id="${product.id}" style="width: 100%; margin-top: 1rem;">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                `;

                // Show modal
                modal.style.display = 'block';

                // Close modal function
                const closeModal = () => {
                    console.log("Cerrando modal");
                    modal.style.display = 'none';
                    document.removeEventListener('keydown', handleEscape);
                };

                // Handle escape key
                const handleEscape = (e) => {
                    if (e.key === 'Escape') closeModal();
                };
                
                
                // Close when clicking X
                modal.addEventListener('click', (e) => {
                    if (e.target.classList.contains('close-modal')) {
                        closeModal();
                    }
                });
                // Close when clicking outside modal content
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) closeModal();
                });
                
                // Close with Escape key
                document.addEventListener('keydown', handleEscape);

                // Add to cart button in modal
                modal.querySelector('.btn-add-to-cart').addEventListener('click', () => {
                    window.cart.addItem(product);
                    this.showToast(`${product.name} added to cart!`);
                    closeModal();
                });

            } catch (error) {
                console.error('Error showing product modal:', error);
            }
        }

        showToast(message) {
            const toast = document.createElement('div');
            toast.className = 'toast-notification';
            toast.textContent = message;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        }

        displayProducts(containerId, filter = 'all', sort = 'price-asc', limit = 0) {
            console.log(`Displaying products in ${containerId}`);
            const container = document.getElementById(containerId);
            
            if (!container) {
                console.error(`Container #${containerId} not found`);
                return;
            }

            try {
                let filteredProducts = this.products;
                if (filter !== 'all') {
                    filteredProducts = this.products.filter(p => p.category === filter);
                }

                filteredProducts = this.sortProducts(filteredProducts, sort);
                
                if (limit > 0) {
                    filteredProducts = filteredProducts.slice(0, limit);
                }

                container.innerHTML = '';

                if (filteredProducts.length === 0) {
                    container.innerHTML = '<p class="no-products">No products found</p>';
                    return;
                }

                filteredProducts.forEach(product => {
                    const productCard = this.createProductCard(product);
                    container.appendChild(productCard);
                });

                this.addProductEventListeners();
            } catch (error) {
                console.error('Error displaying products:', error);
                container.innerHTML = '<p class="error">Error loading products</p>';
            }
        }
    }

    // Initialize product loader
    const productLoader = new ProductLoader();
    window.productLoader = productLoader;

    // Load and display products
    try {
        await productLoader.loadProducts();
        
        if (document.getElementById('featured-products')) {
            productLoader.displayProducts('featured-products', 'all', 'price-asc', 6);
        }
        
        if (document.getElementById('all-products')) {
            productLoader.displayProducts('all-products');
            
            const categoryFilter = document.getElementById('category-filter');
            const sortBy = document.getElementById('sort-by');
            
            if (categoryFilter && sortBy) {
                categoryFilter.addEventListener('change', () => {
                    productLoader.displayProducts(
                        'all-products', 
                        categoryFilter.value, 
                        sortBy.value
                    );
                });
                
                sortBy.addEventListener('change', () => {
                    productLoader.displayProducts(
                        'all-products', 
                        categoryFilter.value, 
                        sortBy.value
                    );
                });
            }
        }
    } catch (error) {
        console.error('Error initializing products:', error);
    }
    
});