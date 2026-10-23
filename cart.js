/**
 * MANOJ Dedicated Cart Logic (Bootstrap Page)
 */

const CartState = {
    cart: [],
    discountRate: 0.0,
    appliedPromoCode: ''
};

const DOM = {
    itemsWrapper: document.getElementById('cart-items-wrapper'),
    cartWorkspace: document.getElementById('cart-workspace'),
    cartEmptyView: document.getElementById('cart-empty-view'),
    summarySubtotal: document.getElementById('summary-subtotal'),
    summaryDiscount: document.getElementById('summary-discount'),
    summaryTotal: document.getElementById('summary-total'),
    promoForm: document.getElementById('promo-form'),
    promoInput: document.getElementById('promo-input'),
    promoFeedback: document.getElementById('promo-feedback'),
    clearCartBtn: document.getElementById('clear-cart-btn'),
    toastContainer: document.getElementById('toast-container')
};

// Toast notification helper
const showNotification = (message, isSuccess = true) => {
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white ${isSuccess ? 'bg-dark' : 'bg-danger'} border-0 show mb-2`;
    toast.role = 'alert';
    toast.ariaLive = 'assertive';
    toast.ariaAtomic = 'true';
    
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body font-semibold">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    DOM.toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.remove('show');
        toast.addEventListener('transitionend', () => toast.remove());
    }, 3000);
};

// Persistence Loader
const loadCartState = () => {
    try {
        const saved = localStorage.getItem('aura_cart');
        CartState.cart = saved ? JSON.parse(saved) : [];
    } catch (e) {
        console.error(e);
        CartState.cart = [];
    }
};

const saveCartState = () => {
    localStorage.setItem('aura_cart', JSON.stringify(CartState.cart));
};

// Render Page Content
const renderCartPage = () => {
    loadCartState();
    DOM.itemsWrapper.innerHTML = '';

    if (CartState.cart.length === 0) {
        DOM.cartWorkspace.classList.add('d-none');
        DOM.cartEmptyView.classList.remove('d-none');
        return;
    }

    DOM.cartWorkspace.classList.remove('d-none');
    DOM.cartEmptyView.classList.add('d-none');

    let subtotal = 0;

    CartState.cart.forEach((item, index) => {
        subtotal += item.price * item.quantity;

        const row = document.createElement('div');
        row.className = 'row py-4 item-row align-items-center';
        
        row.innerHTML = `
            <!-- Product detail cell -->
            <div class="col-md-6 d-flex align-items-center gap-3 mb-3 mb-md-0">
                <img src="${item.image}" alt="${item.title}" class="product-img">
                <div>
                    <h5 class="fw-semibold mb-1 small">${item.title}</h5>
                    <div class="d-flex gap-2 text-muted xsmall" style="font-size: 0.75rem;">
                        <span class="badge bg-light text-dark border">${item.colorName}</span>
                        <span class="badge bg-light text-dark border">${item.selectedSize}</span>
                    </div>
                </div>
            </div>

            <!-- Price and adjustments cell -->
            <div class="col-md-6 d-flex align-items-center justify-content-between">
                <!-- Quantity modifier -->
                <div class="quantity-control">
                    <button class="quantity-btn dec-qty-btn" data-index="${index}">&minus;</button>
                    <span class="qty-val">${item.quantity}</span>
                    <button class="quantity-btn inc-qty-btn" data-index="${index}">&plus;</button>
                </div>
                
                <!-- Display Sub total for detail -->
                <div class="text-end">
                    <span class="fw-bold fs-6">$${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="btn btn-link btn-xs text-danger d-block ms-auto p-0 remove-item-btn" data-index="${index}" style="font-size: 0.75rem; text-decoration: none;">Remove</button>
                </div>
            </div>
        `;

        // Event hooks
        row.querySelector('.dec-qty-btn').addEventListener('click', () => updateItemQty(index, -1));
        row.querySelector('.inc-qty-btn').addEventListener('click', () => updateItemQty(index, 1));
        row.querySelector('.remove-item-btn').addEventListener('click', () => deleteItem(index));

        DOM.itemsWrapper.appendChild(row);
    });

    // Update Summary Details
    DOM.summarySubtotal.textContent = `$${subtotal.toFixed(2)}`;
    
    // Apply discount rate (from promo coupon)
    const discountAmount = subtotal * CartState.discountRate;
    DOM.summaryDiscount.textContent = `-$${discountAmount.toFixed(2)}`;
    
    // Final checkouts
    const orderTotal = Math.max(0, subtotal - discountAmount);
    DOM.summaryTotal.textContent = `$${orderTotal.toFixed(2)}`;
};

const updateItemQty = (index, delta) => {
    CartState.cart[index].quantity += delta;
    if (CartState.cart[index].quantity <= 0) {
        deleteItem(index);
    } else {
        saveCartState();
        renderCartPage();
    }
};

const deleteItem = (index) => {
    const item = CartState.cart[index];
    CartState.cart.splice(index, 1);
    saveCartState();
    renderCartPage();
    if (item) {
        showNotification(`Removed "${item.title}" from bag.`, false);
    }
};

const clearCart = () => {
    if (confirm('Clear all bag contents?')) {
        CartState.cart = [];
        saveCartState();
        renderCartPage();
        showNotification('Cart cleared.', false);
    }
};

// Coupon Promo codes management
const handlePromoCode = (e) => {
    e.preventDefault();
    const code = DOM.promoInput.value.trim().toUpperCase();
    
    if (!code) return;

    DOM.promoFeedback.classList.remove('d-none', 'text-success', 'text-danger');

    if (code === 'SAVE10') {
        CartState.discountRate = 0.10;
        CartState.appliedPromoCode = 'SAVE10';
        DOM.promoFeedback.textContent = '10% discount promo code applied successfully!';
        DOM.promoFeedback.classList.add('text-success');
        showNotification('Promo SAVE10 applied: 10% Off!');
    } else if (code === 'MANOJ20') {
        CartState.discountRate = 0.20;
        CartState.appliedPromoCode = 'MANOJ20';
        DOM.promoFeedback.textContent = '20% discount promo code applied successfully!';
        DOM.promoFeedback.classList.add('text-success');
        showNotification('Promo MANOJ20 applied: 20% Off!');
    } else {
        DOM.promoFeedback.textContent = 'Invalid promo coupon code.';
        DOM.promoFeedback.classList.add('text-danger');
        CartState.discountRate = 0.0;
        CartState.appliedPromoCode = '';
    }

    localStorage.setItem('aura_cart_coupon', JSON.stringify({
        code: CartState.appliedPromoCode,
        rate: CartState.discountRate
    }));

    DOM.promoInput.value = '';
    renderCartPage();
};

// Bootstrap listeners
window.addEventListener('DOMContentLoaded', () => {
    renderCartPage();

    DOM.promoForm.addEventListener('submit', handlePromoCode);
    DOM.clearCartBtn.addEventListener('click', clearCart);
});
