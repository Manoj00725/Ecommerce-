/**
 * MANOJ Checkout Logic (Bootstrap Page)
 */

const CheckoutState = {
    cart: [],
    discountRate: 0.0,
    appliedPromoCode: ''
};

const DOM = {
    itemsList: document.getElementById('checkout-items-list'),
    checkoutSubtotal: document.getElementById('checkout-subtotal'),
    checkoutDiscount: document.getElementById('checkout-discount'),
    checkoutTotal: document.getElementById('checkout-total'),
    checkoutForm: document.getElementById('checkout-form'),
    successOverlay: document.getElementById('success-overlay'),
    countdownText: document.getElementById('countdown-text')
};

const parseCartCoupon = () => {
    try {
        const coupon = localStorage.getItem('aura_cart_coupon');
        if (coupon) {
            const parsed = JSON.parse(coupon);
            CheckoutState.discountRate = parsed.rate || 0.0;
            CheckoutState.appliedPromoCode = parsed.code || '';
        }
    } catch (e) {
        console.error('Failed to parse coupon from LocalStorage', e);
    }
};

const loadCheckout = () => {
    try {
        const saved = localStorage.getItem('aura_cart');
        CheckoutState.cart = saved ? JSON.parse(saved) : [];
    } catch (e) {
        CheckoutState.cart = [];
    }

    parseCartCoupon();

    if (CheckoutState.cart.length === 0) {
        alert('Your cart is empty. Redirecting to store...');
        window.location.href = 'index.html';
        return;
    }

    DOM.itemsList.innerHTML = '';
    let subtotal = 0;

    CheckoutState.cart.forEach(item => {
        subtotal += item.price * item.quantity;

        const div = document.createElement('div');
        div.className = 'd-flex align-items-center justify-content-between mb-3';
        div.innerHTML = `
            <div class="d-flex align-items-center gap-3">
                <img src="${item.image}" alt="${item.title}" class="summary-img">
                <div>
                    <h6 class="mb-0 fw-semibold small text-truncate" style="max-width: 180px;">${item.title}</h6>
                    <span class="text-muted text-xs" style="font-size: 0.7rem;">Qty: ${item.quantity} | Size: ${item.selectedSize}</span>
                </div>
            </div>
            <span class="fw-bold small text-slate-800">$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        DOM.itemsList.appendChild(div);
    });

    const discountAmount = subtotal * CheckoutState.discountRate;
    const finalTotal = Math.max(0, subtotal - discountAmount);

    DOM.checkoutSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    DOM.checkoutDiscount.textContent = `-$${discountAmount.toFixed(2)}`;
    DOM.checkoutTotal.textContent = `$${finalTotal.toFixed(2)}`;
};

const handleOrderSubmit = (e) => {
    e.preventDefault();

    // Show Success animation
    DOM.successOverlay.style.display = 'flex';

    // Clear cart indexes
    localStorage.removeItem('aura_cart');
    localStorage.removeItem('aura_cart_coupon');

    // Countdown redirection
    let secondsLeft = 3;
    const interval = setInterval(() => {
        secondsLeft -= 1;
        DOM.countdownText.textContent = `Redirecting to Homepage in ${secondsLeft} second${secondsLeft === 1 ? '' : 's'}...`;
        if (secondsLeft <= 0) {
            clearInterval(interval);
            window.location.href = 'index.html';
        }
    }, 1000);
};

window.addEventListener('DOMContentLoaded', () => {
    loadCheckout();
    DOM.checkoutForm.addEventListener('submit', handleOrderSubmit);
});
