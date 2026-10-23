import"./modulepreload-polyfill-B5Qt9EMX.js";const a={cart:[],discountRate:0,appliedPromoCode:""},t={itemsWrapper:document.getElementById("cart-items-wrapper"),cartWorkspace:document.getElementById("cart-workspace"),cartEmptyView:document.getElementById("cart-empty-view"),summarySubtotal:document.getElementById("summary-subtotal"),summaryDiscount:document.getElementById("summary-discount"),summaryTotal:document.getElementById("summary-total"),promoForm:document.getElementById("promo-form"),promoInput:document.getElementById("promo-input"),promoFeedback:document.getElementById("promo-feedback"),clearCartBtn:document.getElementById("clear-cart-btn"),toastContainer:document.getElementById("toast-container")},i=(e,o=!0)=>{const s=document.createElement("div");s.className=`toast align-items-center text-white ${o?"bg-dark":"bg-danger"} border-0 show mb-2`,s.role="alert",s.ariaLive="assertive",s.ariaAtomic="true",s.innerHTML=`
        <div class="d-flex">
            <div class="toast-body font-semibold">
                ${e}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `,t.toastContainer.appendChild(s),setTimeout(()=>{s.classList.remove("show"),s.addEventListener("transitionend",()=>s.remove())},3e3)},p=()=>{try{const e=localStorage.getItem("aura_cart");a.cart=e?JSON.parse(e):[]}catch(e){console.error(e),a.cart=[]}},l=()=>{localStorage.setItem("aura_cart",JSON.stringify(a.cart))},d=()=>{if(p(),t.itemsWrapper.innerHTML="",a.cart.length===0){t.cartWorkspace.classList.add("d-none"),t.cartEmptyView.classList.remove("d-none");return}t.cartWorkspace.classList.remove("d-none"),t.cartEmptyView.classList.add("d-none");let e=0;a.cart.forEach((n,r)=>{e+=n.price*n.quantity;const c=document.createElement("div");c.className="row py-4 item-row align-items-center",c.innerHTML=`
            <!-- Product detail cell -->
            <div class="col-md-6 d-flex align-items-center gap-3 mb-3 mb-md-0">
                <img src="${n.image}" alt="${n.title}" class="product-img">
                <div>
                    <h5 class="fw-semibold mb-1 small">${n.title}</h5>
                    <div class="d-flex gap-2 text-muted xsmall" style="font-size: 0.75rem;">
                        <span class="badge bg-light text-dark border">${n.colorName}</span>
                        <span class="badge bg-light text-dark border">${n.selectedSize}</span>
                    </div>
                </div>
            </div>

            <!-- Price and adjustments cell -->
            <div class="col-md-6 d-flex align-items-center justify-content-between">
                <!-- Quantity modifier -->
                <div class="quantity-control">
                    <button class="quantity-btn dec-qty-btn" data-index="${r}">&minus;</button>
                    <span class="qty-val">${n.quantity}</span>
                    <button class="quantity-btn inc-qty-btn" data-index="${r}">&plus;</button>
                </div>
                
                <!-- Display Sub total for detail -->
                <div class="text-end">
                    <span class="fw-bold fs-6">$${(n.price*n.quantity).toFixed(2)}</span>
                    <button class="btn btn-link btn-xs text-danger d-block ms-auto p-0 remove-item-btn" data-index="${r}" style="font-size: 0.75rem; text-decoration: none;">Remove</button>
                </div>
            </div>
        `,c.querySelector(".dec-qty-btn").addEventListener("click",()=>m(r,-1)),c.querySelector(".inc-qty-btn").addEventListener("click",()=>m(r,1)),c.querySelector(".remove-item-btn").addEventListener("click",()=>u(r)),t.itemsWrapper.appendChild(c)}),t.summarySubtotal.textContent=`$${e.toFixed(2)}`;const o=e*a.discountRate;t.summaryDiscount.textContent=`-$${o.toFixed(2)}`;const s=Math.max(0,e-o);t.summaryTotal.textContent=`$${s.toFixed(2)}`},m=(e,o)=>{a.cart[e].quantity+=o,a.cart[e].quantity<=0?u(e):(l(),d())},u=e=>{const o=a.cart[e];a.cart.splice(e,1),l(),d(),o&&i(`Removed "${o.title}" from bag.`,!1)},b=()=>{confirm("Clear all bag contents?")&&(a.cart=[],l(),d(),i("Cart cleared.",!1))},y=e=>{e.preventDefault();const o=t.promoInput.value.trim().toUpperCase();o&&(t.promoFeedback.classList.remove("d-none","text-success","text-danger"),o==="SAVE10"?(a.discountRate=.1,a.appliedPromoCode="SAVE10",t.promoFeedback.textContent="10% discount promo code applied successfully!",t.promoFeedback.classList.add("text-success"),i("Promo SAVE10 applied: 10% Off!")):o==="MANOJ20"?(a.discountRate=.2,a.appliedPromoCode="MANOJ20",t.promoFeedback.textContent="20% discount promo code applied successfully!",t.promoFeedback.classList.add("text-success"),i("Promo MANOJ20 applied: 20% Off!")):(t.promoFeedback.textContent="Invalid promo coupon code.",t.promoFeedback.classList.add("text-danger"),a.discountRate=0,a.appliedPromoCode=""),localStorage.setItem("aura_cart_coupon",JSON.stringify({code:a.appliedPromoCode,rate:a.discountRate})),t.promoInput.value="",d())};window.addEventListener("DOMContentLoaded",()=>{d(),t.promoForm.addEventListener("submit",y),t.clearCartBtn.addEventListener("click",b)});
