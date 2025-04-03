document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartShipping = document.getElementById('cart-shipping');
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
            return;
        }

        cartItemsContainer.innerHTML = '';
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image.src}" alt="${item.name}" loading="lazy">
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

        // Calculate totals
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = 10.00; // Flat rate shipping
        const total = subtotal + shipping;
        
        cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        cartTotal.textContent = `$${total.toFixed(2)}`;
        
        // Update cart count in header
        if (typeof updateCartCount === 'function') {
            updateCartCount();
        }
    }

    // Event delegation for quantity buttons
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

    // Initial render
    renderCart();
});