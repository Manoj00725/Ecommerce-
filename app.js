/**
 * MANOJ E-Commerce Application State Management
 * Pure Vanilla ES6+ implementation with LocalStorage persistence.
 */

// 1. Initial Product Catalog Data
const PRODUCTS_CATALOG = [
    {
        id: 'aura-watch',
        title: 'Manoj Minimalist Watch',
        category: 'accessories',
        price: 189.00,
        description: 'A masterpiece of sleek styling. Featuring a fine-brushed steel bezel, scratch-resistant sapphire crystal glass, and a supple vegetable-tanned leather strap. Built for understated luxury.',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
        colors: ['#0f172a', '#cbd5e1'],
        colorNames: ['Midnight Black', 'Metallic Silver'],
        sizes: ['40mm Standard']
    },
    {
        id: 'nova-sneakers',
        title: 'Nova Running Sneakers',
        category: 'footwear',
        price: 145.00,
        description: 'Engineered performance meets street aesthetic. Designed with a circular knit seamless upper, responsive nitrogen-infused foam midsole, and durable rubber traction grips.',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
        colors: ['#ef4444', '#0f172a', '#3b82f6'],
        colorNames: ['Hyper Red', 'Carbon Black', 'Neon Blue'],
        sizes: ['US 8', 'US 9', 'US 10', 'US 11']
    },
    {
        id: 'eclipse-sunglasses',
        title: 'Eclipse Polarized Sunglasses',
        category: 'accessories',
        price: 95.00,
        description: 'Classically shaped sunglasses constructed from light titanium wire and impact-resistant polarized lenses. Offering 100% UV protection and exceptional glare reduction.',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=80',
        colors: ['#0f172a', '#d97706'],
        colorNames: ['Matte Black', 'Amber Gold'],
        sizes: ['Standard Fit']
    },
    {
        id: 'terra-backpack',
        title: 'Terra Canvas Backpack',
        category: 'accessories',
        price: 78.00,
        description: 'Tough, spacious, urban-ready utility. Handcrafted from heavy wax-coated canvas with full-grain leather buckles, a padded 16" laptop sleeve, and quick-access utility side pockets.',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
        colors: ['#78350f', '#0f172a'],
        colorNames: ['Chestnut Brown', 'Stealth Black'],
        sizes: ['20 Litre']
    },
    {
        id: 'zen-hoodie',
        title: 'Zen Heavyweight Hoodie',
        category: 'apparel',
        price: 120.00,
        description: 'A premium staple item. Crafted using 450GSM organic combed cotton Loopback fleece. Features clean drop shoulders, double-lined hood, and reinforced flat-lock flat seam stitching.',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80',
        colors: ['#64748b', '#0f172a', '#1e293b'],
        colorNames: ['Slate Grey', 'Classic Black', 'Deep Navy'],
        sizes: ['S', 'M', 'L', 'XL']
    },
    {
        id: 'knit-beanie',
        title: 'Classic Wool Knit Beanie',
        category: 'apparel',
        price: 29.00,
        description: 'Warmth and styling combined. Knitted in a classic 2x2 rib structure using ultra-soft ethical merino wool. Designed with a wide fold-up cuff that adjusts to your desired fit.',
        image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&auto=format&fit=crop&q=80',
        colors: ['#f59e0b', '#64748b'],
        colorNames: ['Mustard Gold', 'Stone Grey'],
        sizes: ['One Size Fits All']
    },
    {
        id: 'apex-jacket',
        title: 'Apex Waterproof Shell Jacket',
        category: 'apparel',
        price: 249.00,
        description: 'Constructed from a triple-layered GORE-inspired shell fabric with fully taped inner seams. Highly breathable, windproof, and styled with tactical utility zipper compartments.',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80',
        colors: ['#0f172a', '#1e40af'],
        colorNames: ['Obsidian Black', 'Royal Blue'],
        sizes: ['S', 'M', 'L', 'XL']
    },
    {
        id: 'metro-wallet',
        title: 'Metro RFID Leather Wallet',
        category: 'accessories',
        price: 55.00,
        description: 'Elegant bifold card holder crafted from premium full-grain Italian leather. Specially lined with advanced metal composites to secure your RFID chips from scan theft.',
        image: 'https://images.unsplash.com/photo-1627124765135-5652a9ec0458?w=600&auto=format&fit=crop&q=80',
        colors: ['#78350f', '#0f172a'],
        colorNames: ['Tan Leather', 'Bespoke Black'],
        sizes: ['Slim Fit']
    }
];

// 2. Global State Variable
const AppState = {
    products: PRODUCTS_CATALOG,
    cart: [], // Contains: { id, title, price, image, selectedColor, selectedSize, colorName, quantity }
    activeCategory: 'all',
    searchQuery: '',
    
    // Model Selection States (for currently viewed detail product modal)
    selectedProduct: null,
    selectedColorIndex: 0,
    selectedSize: ''
};

// 3. UI Selectors
const DOM = {
    productGrid: document.getElementById('product-grid'),
    emptyState: document.getElementById('empty-state'),
    resultsCount: document.getElementById('results-count'),
    clearSearchBtn: document.getElementById('clear-search-btn'),
    searchBar: document.getElementById('search-bar'),
    
    // Cart elements
    cartButton: document.getElementById('cart-button'),
    cartCount: document.getElementById('cart-count'),
    cartSidebar: document.getElementById('cart-sidebar'),
    cartSidebarBackdrop: document.getElementById('cart-sidebar-backdrop'),
    cartCloseBtn: document.getElementById('cart-close-btn'),
    cartItemsContainer: document.getElementById('cart-items-container'),
    cartEmptyLayout: document.getElementById('cart-empty-layout'),
    cartSummary: document.getElementById('cart-summary'),
    cartSubtotal: document.getElementById('cart-subtotal'),
    clearCartBtn: document.getElementById('clear-cart-btn'),
    checkoutBtn: document.getElementById('checkout-btn'),
    cartGoShoppingBtn: document.getElementById('cart-go-shopping-btn'),
    
    // Product Detail Modal elements
    detailModal: document.getElementById('detail-modal'),
    detailModalBackdrop: document.getElementById('detail-modal-backdrop'),
    detailModalClose: document.getElementById('detail-modal-close'),
    detailModalCloseDesktop: document.getElementById('detail-modal-close-desktop'),
    detailModalImg: document.getElementById('detail-modal-img'),
    detailModalTag: document.getElementById('detail-modal-tag'),
    detailModalTitle: document.getElementById('detail-modal-title'),
    detailModalPrice: document.getElementById('detail-modal-price'),
    detailModalDesc: document.getElementById('detail-modal-desc'),
    colorOptionsContainer: document.getElementById('color-options-container'),
    sizeOptionsContainer: document.getElementById('size-options-container'),
    detailModalAddBtn: document.getElementById('detail-modal-add-btn'),
    
    // Nav elements
    header: document.getElementById('main-header'),
    categoryPills: document.querySelectorAll('.cat-pill'),
    navLinks: document.querySelectorAll('.nav-link'),
    
    // Miscellaneous
    newsletterForm: document.getElementById('newsletter-form'),
    toastContainer: document.getElementById('toast-container')
};

// 4. Persistence Controller
const Persistence = {
    saveCart() {
        localStorage.setItem('aura_cart', JSON.stringify(AppState.cart));
    },
    loadCart() {
        try {
            const saved = localStorage.getItem('aura_cart');
            AppState.cart = saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error('Failed to load cart from LocalStorage', e);
            AppState.cart = [];
        }
    }
};

// 5. Toast Notification System
const Toast = {
    show(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `flex items-center gap-3 bg-white border border-gray-100 px-5 py-4 rounded-2xl shadow-xl animate-toast-in pointer-events-auto min-w-[280px] max-w-sm`;
        
        let iconColor = type === 'success' ? 'text-green-500 bg-green-50' : 'text-blue-500 bg-blue-50';
        let svgIcon = type === 'success' 
            ? `<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0" /></svg>`
            : `<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0" /></svg>`;

        toast.innerHTML = `
            <div class="p-1.5 rounded-lg ${iconColor}">
                ${svgIcon}
            </div>
            <div class="flex-grow">
                <p class="text-sm font-semibold text-brand-500">${message}</p>
            </div>
        `;
        
        DOM.toastContainer.appendChild(toast);
        
        // Remove toast automatically after 3 seconds
        setTimeout(() => {
            toast.classList.replace('animate-toast-in', 'animate-toast-out');
            toast.addEventListener('animationend', () => {
                toast.remove();
            });
        }, 3000);
    }
};

// 6. UI Renderers
const Render = {
    // Renders the main catalog product grid
    products() {
        DOM.productGrid.innerHTML = '';
        
        // Apply filter category and live search queries
        const filtered = AppState.products.filter(product => {
            const matchesCategory = AppState.activeCategory === 'all' || product.category === AppState.activeCategory;
            const matchesSearch = product.title.toLowerCase().includes(AppState.searchQuery.toLowerCase()) ||
                                  product.description.toLowerCase().includes(AppState.searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        // Update counts
        const cnt = filtered.length;
        DOM.resultsCount.textContent = `Showing ${cnt} product${cnt === 1 ? '' : 's'}`;

        if (cnt === 0) {
            DOM.productGrid.classList.add('hidden');
            DOM.emptyState.classList.remove('hidden');
            DOM.emptyState.classList.add('flex');
            return;
        }

        DOM.productGrid.classList.remove('hidden');
        DOM.emptyState.classList.add('hidden');
        DOM.emptyState.classList.replace('flex', 'hidden');

        filtered.forEach(product => {
            const card = document.createElement('article');
            card.className = 'product-card bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:cursor-pointer flex flex-col justify-between';
            card.dataset.id = product.id;
            
            // Set up catalog display
            card.innerHTML = `
                <div class="relative bg-gray-50 overflow-hidden aspect-square flex items-center justify-center">
                    <img src="${product.image}" alt="${product.title}" class="img-zoom w-full h-full object-cover">
                    <div class="absolute top-3 right-3 bg-white/70 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 text-slate-800 rounded-full border border-white/20">
                        ${product.category}
                    </div>
                </div>
                <div class="p-5 flex-grow flex flex-col justify-between">
                    <div>
                        <h3 class="text-base font-semibold text-brand-500 hover:text-black line-clamp-1">${product.title}</h3>
                        <p class="text-sm font-bold text-slate-800 mt-1">$${product.price.toFixed(2)}</p>
                    </div>
                    <div class="mt-4 flex gap-2">
                        <button class="view-detail-btn flex-grow py-2.5 border border-gray-200 text-slate-700 text-xs font-semibold rounded-full hover:bg-slate-50 transition-all">
                            View Details
                        </button>
                        <button class="quick-add-btn p-2.5 bg-brand-500 text-white rounded-full hover:bg-brand-accent transition-all shrink-0" aria-label="Quick Add to Cart">
                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </div>
                </div>
            `;
            
            // Event listener: click background to open details modal
            card.addEventListener('click', (e) => {
                if (e.target.closest('.quick-add-btn')) {
                    // Quick add chooses default first color and size
                    Actions.addToCart(product.id, 1, product.colors[0], product.colorNames[0], product.sizes[0]);
                    window.location.href = 'cart.html';
                } else {
                    Actions.openProductDetail(product.id);
                }
            });

            DOM.productGrid.appendChild(card);
        });
    },

    // Renders the items inside the slide-over Cart panel
    cart() {
        DOM.cartItemsContainer.innerHTML = '';
        
        let totalCount = 0;
        let subtotal = 0;

        if (AppState.cart.length === 0) {
            DOM.cartEmptyLayout.classList.remove('hidden');
            DOM.cartEmptyLayout.classList.add('flex');
            DOM.cartSummary.classList.add('hidden');
            // Hide Badge
            DOM.cartCount.classList.add('scale-0');
            DOM.cartSubtotal.textContent = `$0.00`;
            return;
        }

        DOM.cartEmptyLayout.classList.add('hidden');
        DOM.cartEmptyLayout.classList.replace('flex', 'hidden');
        DOM.cartSummary.classList.remove('hidden');

        AppState.cart.forEach((item, index) => {
            totalCount += item.quantity;
            subtotal += item.price * item.quantity;

            const cartItem = document.createElement('div');
            cartItem.className = 'flex items-center gap-4 py-4 border-b border-gray-100 hover:bg-slate-50/50 p-2 rounded-xl transition-all';
            
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="w-16 h-16 object-cover rounded-xl bg-gray-50 border border-gray-100 shrink-0">
                <div class="flex-grow min-w-0">
                    <h4 class="text-sm font-semibold text-brand-500 line-clamp-1">${item.title}</h4>
                    <div class="flex flex-wrap gap-2 items-center text-xs text-gray-500 mt-1">
                        <span class="px-2 py-0.5 bg-gray-100 rounded-full font-medium" style="color: ${item.selectedColor === '#cbd5e1' ? '#475569' : item.selectedColor}; opacity: 0.85">${item.colorName}</span>
                        <span class="px-2 py-0.5 bg-gray-100 rounded-full font-medium">${item.selectedSize}</span>
                    </div>
                    <div class="flex items-center justify-between mt-3 font-semibold text-sm">
                        <!-- Quantity modifiers -->
                        <div class="flex items-center border border-gray-200 rounded-full bg-white select-none">
                            <button class="qty-minus min-w-8 h-8 flex items-center justify-center text-gray-400 hover:text-brand-500 focus:outline-none transition-colors" data-index="${index}">-</button>
                            <span class="text-xs text-brand-500 px-1 font-bold">${item.quantity}</span>
                            <button class="qty-plus min-w-8 h-8 flex items-center justify-center text-gray-400 hover:text-brand-500 focus:outline-none transition-colors" data-index="${index}">+</button>
                        </div>
                        <span class="text-slate-800">$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                </div>
                <!-- Trash trigger -->
                <button class="remove-cart-item-btn p-2 text-gray-400 hover:text-rose-500 rounded-full hover:bg-rose-50 transition-all shrink-0" data-index="${index}" aria-label="Remove item">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            `;

            // Quantity control events
            cartItem.querySelector('.qty-minus').addEventListener('click', () => Actions.updateQuantity(index, -1));
            cartItem.querySelector('.qty-plus').addEventListener('click', () => Actions.updateQuantity(index, 1));
            cartItem.querySelector('.remove-cart-item-btn').addEventListener('click', () => Actions.removeFromCart(index));

            DOM.cartItemsContainer.appendChild(cartItem);
        });

        // Update subtotal
        DOM.cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;

        // Update cart badge dynamically
        DOM.cartCount.textContent = totalCount;
        if (totalCount > 0) {
            DOM.cartCount.classList.remove('scale-0');
            DOM.cartCount.classList.add('scale-100');
        } else {
            DOM.cartCount.classList.add('scale-0');
            DOM.cartCount.classList.remove('scale-100');
        }
    },

    // Renders custom selections into the detail view modal
    detailModal() {
        const prod = AppState.selectedProduct;
        if (!prod) return;

        DOM.detailModalImg.src = prod.image;
        DOM.detailModalImg.alt = prod.title;
        DOM.detailModalTag.textContent = prod.category;
        DOM.detailModalTitle.textContent = prod.title;
        DOM.detailModalPrice.textContent = `$${prod.price.toFixed(2)}`;
        DOM.detailModalDesc.textContent = prod.description;

        // Render Color Buttons
        DOM.colorOptionsContainer.innerHTML = '';
        prod.colors.forEach((color, idx) => {
            const activeClass = idx === AppState.selectedColorIndex 
                ? 'ring-2 ring-brand-500 scale-110 border-white' 
                : 'hover:scale-105 border-gray-100';
            
            const btn = document.createElement('button');
            btn.className = `w-8 h-8 rounded-full border-2 transition-all focus:outline-none ${activeClass}`;
            btn.style.backgroundColor = color;
            btn.title = prod.colorNames[idx];
            
            btn.addEventListener('click', () => {
                AppState.selectedColorIndex = idx;
                Render.detailModal();
            });
            DOM.colorOptionsContainer.appendChild(btn);
        });

        // Render Size Pills
        DOM.sizeOptionsContainer.innerHTML = '';
        prod.sizes.forEach(size => {
            const activeClass = size === AppState.selectedSize
                ? 'border-brand-500 bg-brand-500 text-white font-bold'
                : 'border-gray-200 text-gray-500 hover:border-gray-400 hover:text-brand-500 font-medium';

            const btn = document.createElement('button');
            btn.className = `px-5 py-2.5 text-xs rounded-full border-2 transition-all focus:outline-none uppercase ${activeClass}`;
            btn.textContent = size;
            
            btn.addEventListener('click', () => {
                AppState.selectedSize = size;
                Render.detailModal();
            });
            DOM.sizeOptionsContainer.appendChild(btn);
        });
    }
};

// 7. Interaction Actions & Handlers
const Actions = {
    // Add items to bag, tracking custom sizing, color metrics
    addToCart(productId, quantity, color, colorName, size) {
        const product = AppState.products.find(p => p.id === productId);
        if (!product) return;

        // Verify if product parameters match existing cart entries
        const existingIndex = AppState.cart.findIndex(item => 
            item.id === productId && 
            item.selectedColor === color && 
            item.selectedSize === size
        );

        if (existingIndex > -1) {
            AppState.cart[existingIndex].quantity += quantity;
        } else {
            AppState.cart.push({
                id: productId,
                title: product.title,
                price: product.price,
                image: product.image,
                selectedColor: color,
                colorName: colorName,
                selectedSize: size,
                quantity: quantity
            });
        }

        Persistence.saveCart();
        Render.cart();
        Toast.show(`Added "${product.title}" (${colorName} / ${size}) to cart.`);
    },

    removeFromCart(index) {
        const item = AppState.cart[index];
        AppState.cart.splice(index, 1);
        Persistence.saveCart();
        Render.cart();
        if (item) {
            Toast.show(`Removed "${item.title}" from cart.`);
        }
    },

    updateQuantity(index, delta) {
        AppState.cart[index].quantity += delta;
        if (AppState.cart[index].quantity <= 0) {
            Actions.removeFromCart(index);
        } else {
            Persistence.saveCart();
            Render.cart();
        }
    },

    clearAllCart() {
        if (AppState.cart.length === 0) return;
        if (confirm('Are you sure you want to clear your cart?')) {
            AppState.cart = [];
            Persistence.saveCart();
            Render.cart();
            Toast.show('Cart cleared successfully.');
        }
    },

    // Triggers detail modal
    openProductDetail(productId) {
        const prod = AppState.products.find(p => p.id === productId);
        if (!prod) return;

        AppState.selectedProduct = prod;
        AppState.selectedColorIndex = 0;
        AppState.selectedSize = prod.sizes[0];
        
        Render.detailModal();

        DOM.detailModalBackdrop.classList.add('modal-active');
        document.body.classList.add('overflow-hidden'); // Disable background scrolling
    },

    closeProductDetail() {
        DOM.detailModalBackdrop.classList.remove('modal-active');
        document.body.classList.remove('overflow-hidden');
        AppState.selectedProduct = null;
    },

    openCart() {
        DOM.cartSidebarBackdrop.classList.add('sidebar-active');
        document.body.classList.add('overflow-hidden');
    },

    closeCart() {
        DOM.cartSidebarBackdrop.classList.remove('sidebar-active');
        document.body.classList.remove('overflow-hidden');
    },

    // Category navigation filter click handler
    setCategory(category) {
        AppState.activeCategory = category;
        
        // Update Pills UI active states
        DOM.categoryPills.forEach(pill => {
            if (pill.dataset.category === category) {
                pill.classList.add('active');
            } else {
                pill.classList.remove('active');
            }
        });

        // Sync header nav links active border
        DOM.navLinks.forEach(link => {
            if (link.dataset.category === category) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        Render.products();
    }
};

// 8. Bootstrap Application Event Listeners
const InitApp = () => {
    // 1. Initial State Persistence
    Persistence.loadCart();
    Render.products();
    Render.cart();

    // 2. Navigation Actions
    DOM.categoryPills.forEach(pill => {
        pill.addEventListener('click', () => {
            Actions.setCategory(pill.dataset.category);
            // Auto scroll down to catalog viewing area on small screens
            if (window.innerWidth < 768) {
                document.getElementById('shop-section').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    DOM.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            Actions.setCategory(link.dataset.category);
            document.getElementById('shop-section').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // 3. Live search query logic
    DOM.searchBar.addEventListener('input', (e) => {
        AppState.searchQuery = e.target.value;
        Render.products();
    });

    DOM.clearSearchBtn.addEventListener('click', () => {
        DOM.searchBar.value = '';
        AppState.searchQuery = '';
        Actions.setCategory('all');
    });

    // 4. Cart Sidebar Toggle Triggers
    DOM.cartButton.addEventListener('click', () => {
        Actions.openCart();
    });
    DOM.cartCloseBtn.addEventListener('click', () => {
        Actions.closeCart();
    });
    DOM.cartGoShoppingBtn.addEventListener('click', () => {
        Actions.closeCart();
    });
    // Click outside cart drawer container closes it
    DOM.cartSidebarBackdrop.addEventListener('click', (e) => {
        if (e.target === DOM.cartSidebarBackdrop) {
            Actions.closeCart();
        }
    });

    // 5. Product Detail Modal close controls
    DOM.detailModalClose.addEventListener('click', () => {
        Actions.closeProductDetail();
    });
    DOM.detailModalCloseDesktop.addEventListener('click', () => {
        Actions.closeProductDetail();
    });
    DOM.detailModalBackdrop.addEventListener('click', (e) => {
        if (e.target === DOM.detailModalBackdrop) {
            Actions.closeProductDetail();
        }
    });

    // Modal Add in Bag button
    DOM.detailModalAddBtn.addEventListener('click', () => {
        const prod = AppState.selectedProduct;
        if (!prod) return;

        const color = prod.colors[AppState.selectedColorIndex];
        const colorName = prod.colorNames[AppState.selectedColorIndex];
        const size = AppState.selectedSize;

        Actions.addToCart(prod.id, 1, color, colorName, size);
        Actions.closeProductDetail();
        
        // Redirect to Cart page
        window.location.href = 'cart.html';
    });

    // 6. Action Triggers (Clear & Checkout simulations)
    DOM.clearCartBtn.addEventListener('click', () => {
        Actions.clearAllCart();
    });

    DOM.checkoutBtn.addEventListener('click', () => {
        window.location.href = 'checkout.html';
    });

    // 7. Newsletter subscription form
    DOM.newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input').value;
        Toast.show(`Subscribed with: ${email}. Discount code dispatched!`, 'info');
        e.target.reset();
    });

    // 8. Sticky Transparent Header background adaptation on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            DOM.header.classList.add('shadow-md', 'bg-white/95');
            DOM.header.classList.remove('bg-white/80');
        } else {
            DOM.header.classList.remove('shadow-md', 'bg-white/95');
            DOM.header.classList.add('bg-white/80');
        }
    });
};

// Run initialize script
window.addEventListener('DOMContentLoaded', InitApp);
