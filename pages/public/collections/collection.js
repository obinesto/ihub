const nairaSymbol = "\u20A6";
// Setting Global variables so that we can access them from inside the functions

if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", "[]");
}

let products = getStoreCatalog();
let cart = JSON.parse(localStorage.getItem("cart"));

// Admins browse the product view without buy actions; only shoppers see
// "Add to Cart" and the header cart.
const isAdminSession = localStorage.getItem("isAdminLoggedIn") === "true";

// Function to render product details
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get("id"), 10);

    // Ensure productId is obtained correctly
    console.log("Product ID:", productId);

    // Find the product by id
    const product = products.find((p) => p.id === productId);

    // Check if product is found
    console.log("Found Product:", product);

    if (product) {
        const productDetails = document.getElementById("product-details");
        // Inventory: show remaining count and disable buying when it is sold out.
        const stock = Number(product.quantity) || 0;
        const soldOut = stock === 0;
        // Admins see the stock but not the button; shoppers get the buy action.
        const buyButtonHtml = isAdminSession
            ? ""
            : `
              <button id="add-to-cart"${soldOut ? " disabled" : ""}>
                <img src="../../../assets/icons/shopping-cart.svg" alt="" class="btn-cart-icon">
                ${soldOut ? "Out of Stock" : "Add to Cart"}
              </button>`;

        productDetails.innerHTML = `
        <div class="product-details-2">
           <div class="container-img">
              <img src="${storeImg(product.image)}" alt="${product.name}">
           </div>
           <div class="product-name">
               <h2>${product.name}</h2>
             <div class='pricelist'>
               <h4 style='font-weight: 600;' class="current-price">Price:${nairaSymbol}${product.price}</h4>
               <h4 id="before-price">Before: <s>${nairaSymbol}${product.beforeprice}</s></h4>
               <h6 id="discount-percent">Discount: ${product.discountprice}</h6>
             </div>
             <p id="product-stock" class="stock-line${soldOut ? " stock-out" : ""}" aria-live="polite">
               <i data-feather="box" aria-hidden="true"></i>
               ${soldOut ? "Out of stock" : `In stock — ${stock} ${stock === 1 ? "item" : "items"} remaining`}
             </p>
             ${buyButtonHtml}

              <div class="row">
                <div class="col-3">
                    <span><i class="fa-solid fa-star" style="color: #f5b400;"></i></span>
                    <span><i class="fa-solid fa-star" style="color: #f5b400;"></i></span>
                    <span><i class="fa-solid fa-star" style="color: #f5b400;"></i></span>
                    <span><i class="fa-solid fa-star" style="color: #f5b400;"></i></span>
                    <span><i class="fa-solid fa-star" style="color: #f5b400;"></i></span>
                </div>
                <span>(verified rating)</span>
            </div>

               <div class="horizontal-line"></div>
           </div>
        
        </div>
            <h4 id="share-product">SHARE THIS PRODUCT</h4>

            <div id="social-media-share">
            <img id="twitter-share" src="../../../assets/icons/kisspng-social-media-computer-icons-tulane-university-face-drawing-vector-twitter-5ab02d6b50a397.8866567515214954033303.PNG" alt="twitter" width="40px" height="40px">
            <img id="facebook-share" src="../../../assets/icons/facebook-icon.png" alt="facebook" width="40px" height="40px">
            <img id="linkedin-share" src="../../../assets/icons/kisspng-linkedin-logo-computer-icons-business-symbol-linkedin-icon-5ab1765660baa8.1191823015215796063962.PNG" alt="linkedin" width="40px" height="40px">
            </div>
            
            <p class='description' id='product-desc'>${product.description}</p>
            <button id='desc-toggle' hidden>Read more</button>
        `;

        // The template is injected after the page's feather pass, so refresh icons here.
        if (window.feather) feather.replace();

        // Add the product to the cart and toast a confirmation.
        const addToCartButton = document.getElementById("add-to-cart");
        if (addToCartButton) {
            addToCartButton.addEventListener("click", () => {
                // Implement add to cart functionality here
                addItemToCart(productId);

                showToast(`${product.name} added to cart!`, "success");
            });
        }

        const desc = document.getElementById("product-desc");
        const descToggle = document.getElementById("desc-toggle");
        if (desc && descToggle) {
            const fullHeight = desc.scrollHeight;
            desc.classList.add("clamped");
            if (fullHeight > desc.clientHeight + 4) {
                descToggle.hidden = false;
                // Expand or re-clamp the long product description.
                descToggle.addEventListener("click", () => {
                    const clamped = desc.classList.toggle("clamped");
                    descToggle.textContent = clamped ? "Read more" : "Show less";
                });
            } else {
                desc.classList.remove("clamped");
            }
        }
    } else {
        document.getElementById("product-details").innerHTML =
            "<p>Product not found.</p>";
    }

    const relatedWrap = document.getElementById("related-products");
    if (relatedWrap) {
        const pool = products.filter((p) => p.id !== productId);
        const start =
            pool.length && Number.isFinite(productId)
                ? Math.abs(productId) % pool.length
                : 0;
        const picks = [];
        for (let i = 0; i < Math.min(4, pool.length); i++) {
            picks.push(pool[(start + i) % pool.length]);
        }
        relatedWrap.innerHTML = picks
            .map(
                (p) => `
            <div class="related-products-img">
                <a href="collections.html?id=${p.id}">
                    <img src="${storeImg(p.image)}" alt="${p.name}" loading="lazy">
                </a>
                <h6 class="related-products-type">${p.name}</h6>
            </div>`,
            )
            .join("");
    }
});

// Function to add item to cart
function addItemToCart(productId) {
    let product = products.find(function (product) {
        return product.id == productId;
    });

    if (product) {
        // Inventory guard: never more units than remain in stock.
        const stock = Number(product.quantity) || 0;
        const cartItem = cart.find((item) => item.id == productId);
        const inCart = cartItem ? cartItem.quantity : 0;
        if (stock === 0) {
            showStockToast("This item is out of stock.");
            return;
        }
        if (inCart >= stock) {
            showStockToast(`Only ${stock} ${stock === 1 ? "unit" : "units"} left in stock — ${inCart} ${inCart === 1 ? "is" : "are"} already in your cart.`);
            return;
        }
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateItemCount(); // Update item count after adding to cart
    }
}

// Toast warnings about stock limits, styled like this page's other notices.
function showStockToast(text) {
    showToast(text, "error", 3500);
}

// Function to update the item count in the circle
function updateItemCount() {
    const itemCountCircle = document.getElementById("item-count-circle");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    itemCountCircle.textContent = itemCount;
}

// Call the function on page load to set the initial count
document.addEventListener("DOMContentLoaded", updateItemCount);

// Site search lives in landing.js (single shared implementation).

// Social share: open the platform share windows.
document.addEventListener("DOMContentLoaded", function () {
    // Your existing code here...

    // Function to share on social media
    function shareOnSocialMedia(platform) {
        const url = window.location.href;
        let shareUrl = "";

        switch (platform) {
            case "facebook":
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case "twitter":
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
                break;
            case "linkedin":
                shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`;
                break;
        }

        window.open(shareUrl, "_blank");
    }

    // Add event listeners to social media icons
    if (!document.getElementById("facebook-share")) return;
    document
        .getElementById("facebook-share")
        .addEventListener("click", function () {
            shareOnSocialMedia("facebook");
        });
    document
        .getElementById("twitter-share")
        .addEventListener("click", function () {
            shareOnSocialMedia("twitter");
        });
    document
        .getElementById("linkedin-share")
        .addEventListener("click", function () {
            shareOnSocialMedia("linkedin");
        });
});

// Delivery fees and ETAs, shared with checkout through products-data.js.
document.addEventListener("DOMContentLoaded", () => {
    const pills = document.querySelectorAll('input[name="delivery-location"]');
    if (!pills.length) return;
    // Format an amount as naira with thousands separators.
    const formatNaira = (n) => "\u20A6 " + n.toLocaleString("en-NG");
    // Compute a date the given number of days away.
    const dateAfter = (days) => {
        const d = new Date();
        d.setDate(d.getDate() + days);
        return d.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
    };
    // Recalculate the delivery fee and ETA for the chosen location.
    function updateDelivery() {
        const checked = document.querySelector(
            'input[name="delivery-location"]:checked',
        );
        const city = checked ? checked.value : "Lagos";
        const rate = getDeliveryRate(city);
        const pickupFee = document.getElementById("pickup-fee");
        const doorFee = document.getElementById("door-fee");
        const pickupDates = document.getElementById("pickup-dates");
        const doorDates = document.getElementById("door-dates");
        if (pickupFee) pickupFee.textContent = formatNaira(rate.pickup);
        if (doorFee) doorFee.textContent = formatNaira(rate.door);
        const range = dateAfter(rate.minDays) + " & " + dateAfter(rate.maxDays);
        if (pickupDates) pickupDates.textContent = range;
        if (doorDates) doorDates.textContent = range;
        document.querySelectorAll(".delivery-city").forEach((el) => {
            el.textContent = city;
        });
    }
    // Update delivery details whenever a location pill changes.
    pills.forEach((pill) => pill.addEventListener("change", updateDelivery));
    updateDelivery();
});
