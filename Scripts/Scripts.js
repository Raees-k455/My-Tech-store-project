// --- PRODUCT DATA (REMAINS THE SAME) ---
const products = [
    { id: 1, name: "Optical fibre cable CST 3", price: 20, image: "Images/Products/optical-fibre-cable-CST-3.png", category: "cabling" },
    { id: 2, name: "BenQ EX3501R monitor", price: 10999, oldPrice: 14000, image: "Images/monitor for sale.jpg", category: "monitors" },
    { id: 3, name: "Samsung T5 portable SSD", price: 3000, image: "Images/Products/samsung t5 portable ssd.jpg", category: "hardware" },
    { id: 4, name: "Gaming Keyboard", price: 899, image: "Images/Products/Gaming keyboard.jpg", category: "accessories" },
    { id: 5, name: "Wireless Mouse", price: 299, image: "Images/Products/Wireless mouse.jpeg", category: "accessories" },
    { id: 6, name: "USB-C Cable", price: 150, image: "Images/Products/USB C.png", category: "cabling" },
    { id: 7, name: "27\" IPS Monitor", price: 4500, image: "Images/Products/ips monitor.jpeg", category: "monitors" },
    { id: 8, name: "Smartphone X", price: 8999, image: "Images/Products/s20 ultra.jpg", category: "phones" },
    { id: 9, name: "Tablet Pro", price: 6500, image: "Images/Products/tab s7+.jpg", category: "tablets" },
    { id: 10, name: "Gaming Headset", price: 1200, image: "Images/headphone.jpg", category: "headphones" }
];
// Note: You should define the 'categories' array here if you use initCategories().


// --- GLOBAL PRODUCT RENDERING FUNCTIONS (FOR REUSE) ---

// 1. For Compact/List Views (Used by index.html features and offers)
function createCompactProductHTML(product) {
    const oldPriceHtml = product.oldPrice 
        ? `<br /><strike class="oldprice">R${product.oldPrice}</strike>` 
        : '';
        
    return `
        <div class="productcontainer" data-id="${product.id}">
            <figure>
                <img src="${product.image}" height="80" width="80" alt="${product.name}" class="imagefloat"> 
                <span class="productdetails">${product.name} ${oldPriceHtml} <br />
                    <strong class="price"> R${product.price} </strong>
                </span>
            </figure>
            <button class="buy-btn" data-product="${product.id}">Add to cart</button> 
            <button class="wishlist-btn">Add to wishlist</button><br/> 
            <a href="product-details.html?id=${product.id}" class="prdinfo">More info></a>
        </div>
    `;
}

// 2. For Grid Views (Used by shop.html)
function createShopCardHTML(product) {
    const oldPriceHtml = product.oldPrice 
        ? `<br /><strike class="oldprice">R${product.oldPrice}</strike>` 
        : '';
        
    return `
        <div class="product-card-shop" data-id="${product.id}">
            <figure>
                <img src="${product.image}" alt="${product.name}"> 
                <span class="productdetails">${product.name} ${oldPriceHtml} <br />
                    <strong class="price"> R${product.price} </strong>
                </span>
            </figure>
            <div>
                <button class="buy-btn" data-product="${product.id}">Add to cart</button> 
                <button class="wishlist-btn">Add to wishlist</button>
                <a href="product-details.html?id=${product.id}" class="prdinfo">More info</a>
            </div>
        </div>
    `;
}


// --- HOME PAGE INITIALIZATIONS (MODIFIED to use compact function) ---

function initFeaturedProducts() {
    const featuredContainer = document.getElementById('featuredProducts');
    if (!featuredContainer) return;

    const featuredItems = products.slice(0, 5); 
    
    let htmlContent = '<h1 id="latest">Featured Products</h1>';

    featuredItems.forEach(product => {
        // *** FIX: Use the dedicated compact function here ***
        htmlContent += createCompactProductHTML(product);
    });
    
    featuredContainer.innerHTML = htmlContent;
}

 // Latest offers functionality (kept the same logic)
    function initOffers() {
        const offersScroll = document.getElementById('offersScroll');
        const scrollLeft = document.getElementById('scrollLeft');
        const scrollRight = document.getElementById('scrollRight');
        
        // Display all products in offers section
        products.forEach(product => {
            const offerItem = document.createElement('div');
            offerItem.className = 'offer-item';
            offerItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 3px;">
                <div style="margin-top: 10px; font-weight: bold;">${product.name}</div>
                ${product.oldPrice ? `<div class="oldprice">R${product.oldPrice}</div>` : ''}
                <div class="price">R${product.price}</div>
                <button class="buy-btn" data-product="${product.id}" id="buy" style="margin-top: 10px;">Add to Cart</button>
            `;
            offersScroll.appendChild(offerItem);
        });
        
        // Scroll controls
        if (scrollLeft) {
            scrollLeft.addEventListener('click', () => {
                offersScroll.scrollBy({ left: -250, behavior: 'smooth' });
            });
        }
        
        if (scrollRight) {
            scrollRight.addEventListener('click', () => {
                offersScroll.scrollBy({ left: 250, behavior: 'smooth' });
            });
        }
    }

// initSlider() and initCart() remain as they were in your provided code
 function initSlider() {
        const slider = document.getElementById('slider');
        const slides = document.querySelectorAll('#slideshowContainer .slide'); 
        const prevBtn = document.querySelector('#slideshowContainer .prev'); 
        const nextBtn = document.querySelector('#slideshowContainer .next'); 
        const dotsContainer = document.getElementById('sliderDots');
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        // Create dots
        if (dotsContainer) { 
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
        }
        
        const dots = document.querySelectorAll('.dot');
        
        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update active dot
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[currentSlide]) { 
                dots[currentSlide].classList.add('active');
            }
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            goToSlide(currentSlide);
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            goToSlide(currentSlide);
        }
        
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        
        // Auto-advance slides
        if (totalSlides > 1) {
             setInterval(nextSlide, 5000);
        }
    }

  // Cart functionality (kept the same)
    function initCart() {
        const buyButtons = document.querySelectorAll('.buy-btn'); 
        const cartNotification = document.getElementById('cartNotification');
        
        buyButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-product');
                addToCart(productId);
                
                // Show notification
                if (cartNotification) {
                    cartNotification.style.display = 'block';
                    setTimeout(() => {
                        cartNotification.style.display = 'none';
                    }, 2000);
                }
            });
        });
        
        function addToCart(productId) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const product = products.find(p => p.id == productId);
            
            if (product) {
                // Check if product already in cart
                const existingItem = cart.find(item => item.id == productId);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity: 1
                    });
                }
                
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
            }
        }
        
        function updateCartCount() {
            // Update cart count in navigation if needed
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
                // This is where you would update a cart icon number if one existed in the HTML.
        }
    }


// --- SHOP PAGE INITIALIZATION (NEW) ---

function initShopPage() {
    const grid = document.getElementById('productListingGrid');
    if (!grid) return;

    let htmlContent = '';
    
    // Use the dedicated SHOP CARD function to fill the grid
    products.forEach(product => {
        htmlContent += createShopCardHTML(product);
    });

    grid.innerHTML = htmlContent;
}


// --- CENTRAL INITIALIZATION DISPATCH (CORRECTED) ---

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. HOME PAGE LOGIC
    if (document.getElementById('slideshowContainer')) {
        initSlider();
        // Assuming initCategories exists: initCategories(); 
        initFeaturedProducts(); 
        initOffers();
    }
    
    // 2. SHOP PAGE LOGIC
    // This will only run if the element exists in shop.html
    if (document.getElementById('productListingGrid')) { 
        initShopPage();
    }
    
    // 3. CART/GLOBAL LOGIC (Always runs, but must be called *after* product content is added)
    initCart();
});