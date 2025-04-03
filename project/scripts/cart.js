// Cart management module
document.addEventListener('DOMContentLoaded', () => {
    class Cart {
        constructor() {
            this.cart = JSON.parse(localStorage.getItem('retronomusCart')) || [];
        }
        
        addItem(product) {
            const existingItem = this.cart.find(item => item.id === product.id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.cart.push({
                    ...product,
                    quantity: 1
                });
            }
            
            this.save();
            if (typeof updateCartCount === 'function') {
                updateCartCount();
            }
        }
        
        removeItem(productId) {
            this.cart = this.cart.filter(item => item.id !== productId);
            this.save();
            if (typeof updateCartCount === 'function') {
                updateCartCount();
            }
        }
        
        updateQuantity(productId, quantity) {
            const item = this.cart.find(item => item.id === productId);
            if (item) {
                item.quantity = quantity;
                this.save();
            }
        }
        
        getTotalItems() {
            return this.cart.reduce((total, item) => total + item.quantity, 0);
        }
        
        getTotalPrice() {
            return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        }
        
        save() {
            localStorage.setItem('retronomusCart', JSON.stringify(this.cart));
        }
    }

    // Initialize cart and make it available globally
    window.cart = new Cart();
});