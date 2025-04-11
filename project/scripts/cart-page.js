document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');

    function renderCart() {
        const cart = JSON.parse(localStorage.getItem('retronomusCart')) || [];
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <p>Your cart is empty</p>
                    <a href="products.html" class="btn">Browse Products</a>
                </div>
            `;
            // Resetear los totales a 0 cuando el carrito está vacío
            cartSubtotal.textContent = '$0.00';
            cartTotal.textContent = '$0.00';
            
            // Actualizar contador del carrito si existe la función
            if (typeof updateCartCount === 'function') {
                updateCartCount();
            }
            return;
        }

        cartItemsContainer.innerHTML = '';

        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';

            // Primera imagen usa fetchpriority="high", el resto usa Intersection Observer
            const loadingAttribute = index === 0 || item.image.priority ? 'fetchpriority="high"' : '';

            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img data-src="${item.image.src}" alt="${item.image.alt}" width="${item.image.width}" height="${item.image.height}" ${loadingAttribute}>
                </div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Condition: ${item.condition}</p>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-id="${item.id}">−</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
                <div class="cart-item-remove">
                    <button class="remove-btn" data-id="${item.id}">×</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        // Cargar imágenes cuando entren en pantalla con Intersection Observer
        lazyLoadImages();

        // Calcular totales
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = 10.00; // Flat rate shipping
        const total = subtotal + shipping;

        cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        cartTotal.textContent = `$${total.toFixed(2)}`;

        // Actualizar contador del carrito si existe la función
        if (typeof updateCartCount === 'function') {
            updateCartCount();
        }
    }

    function lazyLoadImages() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => observer.observe(img));
    }

    // Delegación de eventos para los botones de cantidad y eliminación
    cartItemsContainer.addEventListener('click', (e) => {
        const target = e.target;
        const productId = target.dataset.id;

        if (target.classList.contains('minus')) {
            window.cart.updateQuantity(productId, Math.max(1, window.cart.cart.find(item => item.id === productId).quantity - 1));
            renderCart();
        } else if (target.classList.contains('plus')) {
            window.cart.updateQuantity(productId, window.cart.cart.find(item => item.id === productId).quantity + 1);
            renderCart();
        } else if (target.classList.contains('remove-btn')) {
            window.cart.removeItem(productId);
            renderCart();
        }
    });

    // Render inicial del carrito
    renderCart();
});