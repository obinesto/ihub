const nairasymbol = "\u20A6";
const VALID_COUPON_CODE = "DISCOUNT10";
const COUPON_DISCOUNT_PERCENT = 10;

// Show or hide the intro discount modal with its overlay.
function showDiscountModal(show) {
    const modal = document.getElementById("discount-message");
    const overlay = document.getElementById("overlay");
    if (modal) modal.style.display = show ? "block" : "none";
    if (overlay) overlay.style.display = show ? "block" : "none";
}

// Checkout page load: hide the preloader and show the discount modal.
// The modal offers two actions: apply the promo code now, or dismiss it.
document.addEventListener("DOMContentLoaded", function () {
    // On full load, hide the preloader and show the main content.
    window.addEventListener("load", function () {
        // Introduce a delay before hiding the preloader and showing the main content
        setTimeout(function () {
            // Hide the preloader
            const preloader = document.getElementById("preloader");
            preloader.style.display = "none";

            // Show the main content with full opacity
            const mainContent = document.getElementById("main-content");
            mainContent.classList.add("visible");

            // Present the one-time discount offer modal.
            showDiscountModal(true);
        }, 1000); // Delay in milliseconds (1000ms = 1 seconds)

        // Apply the promo code straight from the modal.
        document
            .getElementById("apply-discount-code")
            .addEventListener("click", function () {
                const couponInput = document.getElementById("coupon-code");
                if (couponInput) couponInput.value = VALID_COUPON_CODE;
                showDiscountModal(false);

                // Route through the real coupon button so totals and toasts stay in sync.
                const applyButton = document.getElementById("apply-coupon-button");
                if (applyButton) applyButton.click();
            });

        // Dismiss the modal and continue to main content; no code is applied.
        document
            .getElementById("close-discount")
            .addEventListener("click", function () {
                showDiscountModal(false);
            });

        // The X icon dismisses the modal as well.
        document
            .getElementById("close-icon")
            .addEventListener("click", function () {
                showDiscountModal(false);
            });
    });
});

// Checkout form: summary, coupons, delivery fee, city-state sync, and submit routing.
document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Price pieces kept in sync for the coupon, delivery fee, and payment amount.
    let subtotal = 0; // items only
    let discount = 0; // coupon amount, off the subtotal
    let deliveryFee = 0; // chosen city + delivery method

    // Call renderCart on page load to display items in the cart
    renderCartsummary();

    // Render the order summary rows; the team keeps tax-free prices.
    function renderCartsummary() {
        const cartItemsContainer = document.getElementById("shoppingcart-items");
        cartItemsContainer.innerHTML = "";

        subtotal = 0;

        cart.forEach((item) => {
            const itemTotalRaw = item.price.replace(/,/g, ""); // remove commas to aid summation
            const itemTotal = parseInt(itemTotalRaw, 10) * item.quantity;
            subtotal += itemTotal;

            const itemRow = document.createElement("div");
            itemRow.className = "handleDivStyling";
            itemRow.innerHTML = `
                <p> <img src='${storeImg(item.image)}' width='40px'> ${item.name}</p>
                <hr/>
                <p> Quantity: ${item.quantity} </p>
                <hr/>
                 <p> Unit Price ₦ ${item.price}</p>
                <hr/>
               <p> Set Price: ${nairasymbol} ${itemTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>

            `;

            cartItemsContainer.appendChild(itemRow);
        });

        // Each visit starts without a coupon so re-entry is possible.
        localStorage.removeItem("couponApplied");
        discount = 0;

        syncDeliveryFee();
    }

    // Read the chosen delivery method as its human-readable label.
    function selectedDeliveryMethod() {
        const selected = document.querySelector('input[name="deliveryMethod"]:checked');
        const label = selected
            ? selected.closest(".city-pill")
            : null;
        if (selected && label) return label.textContent.trim();
        return "Door delivery";
    }

    // Recompute the fee from the chosen city pills and delivery method plates.
    function syncDeliveryFee() {
        const city = document.querySelector('input[name="city"]:checked');
        const method = document.querySelector('input[name="deliveryMethod"]:checked');
        const rate = getDeliveryRate(city ? city.value : "Lagos");
        deliveryFee = rate[method && method.value === "pickup" ? "pickup" : "door"];
        updateTotalsUI();
    }

    // Repaint the summary money lines and publish the payable amount.
    function updateTotalsUI() {
        const naira = (amount) =>
            amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        const subtotalElement = document.getElementById("cart-subtotal");
        if (subtotalElement) subtotalElement.textContent = naira(subtotal);

        const discountLine = document.getElementById("discount-line");
        const discountElement = document.getElementById("cart-discount");
        if (discountElement) discountElement.textContent = naira(discount);
        if (discountLine) discountLine.hidden = discount <= 0;

        const feeElement = document.getElementById("delivery-fee");
        if (feeElement) feeElement.textContent = naira(deliveryFee);

        const total = subtotal - discount + deliveryFee;
        const cartTotalElement = document.getElementById("cart-total");
        if (cartTotalElement) cartTotalElement.textContent = naira(total);

        // Publish the order money pieces for payment and the saved order.
        localStorage.setItem("totalAmount", String(total));
        localStorage.setItem("subtotal", String(subtotal));
        localStorage.setItem("discountAmount", String(discount));
        localStorage.setItem("deliveryFee", String(deliveryFee));
        localStorage.setItem("deliveryMethodLabel", selectedDeliveryMethod());
    }

    // Function to update the item count in the checkout Summary
    function updateItemCount() {
        const CartitemCount = document.getElementById("cart-numberofitems");
        if (!CartitemCount) return;
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        CartitemCount.textContent = itemCount;
    }
    updateItemCount();

    // Function to apply coupon code and deduct a fixed percentage
    function applyCouponCode(couponCode) {
        // Check if the coupon has already been used for the current order
        if (localStorage.getItem("couponApplied") === "true") {
            showToast("Coupon code has already been used for this order.", "info");
            return;
        }

        if (couponCode === VALID_COUPON_CODE) {
            discount = (subtotal * COUPON_DISCOUNT_PERCENT) / 100;
            localStorage.setItem("couponApplied", "true"); // Set flag indicating coupon has been applied
            showToast(
                `Coupon applied! ${COUPON_DISCOUNT_PERCENT}% has been deducted from your total.`,
                "success",
            );
            updateTotalsUI();
        } else {
            showToast("Invalid coupon code.", "error");
        }
    }

    // Function to get the coupon code from the input field and apply it
    function applyCoupon() {
        const couponCode = document.getElementById("coupon-code").value.trim();
        applyCouponCode(couponCode);
    }

    // Attach event listener for applying coupon
    document
        .getElementById("apply-coupon-button")
        .addEventListener("click", applyCoupon);

    // Apply the coupon on Enter in the input instead of submitting the form.
    document.getElementById("coupon-code").addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            applyCoupon();
        }
    });

    // City pills auto-fill the (read-only) state field and refresh the fee.
    const cityStateMap = {
        Lagos: "Lagos State",
        Ibadan: "Oyo State",
        Abeokuta: "Ogun State",
        Abuja: "Federal Capital Territory",
        "Port Harcourt": "Rivers State",
        "Benin City": "Edo State",
        Enugu: "Enugu State",
        Kano: "Kano State",
    };
    // Copy the chosen city's state into the read-only state field.
    function syncStateWithCity() {
        const selected = document.querySelector('input[name="city"]:checked');
        const stateInput = document.getElementById("state");
        if (selected && stateInput) {
            stateInput.value = cityStateMap[selected.value] || "";
        }
    }
    // Refresh fee, method label, and state whenever a choice changes.
    function syncDeliveryChoices() {
        syncStateWithCity();
        syncDeliveryFee();
    }
    document.querySelectorAll('input[name="city"]').forEach((pill) => {
        pill.addEventListener("change", syncDeliveryChoices);
    });
    document.querySelectorAll('input[name="deliveryMethod"]').forEach((pill) => {
        pill.addEventListener("change", syncDeliveryFee);
    });
    syncDeliveryChoices();

    // Checkout functionality
    document.getElementById("form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Check if user is logged in
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
            showToast("Please log in to proceed with the checkout.", "info");
            window.location.href = "../../../pages/member/member_login.html"; // Redirect to login page
            return;
        }

        // Stop an empty cart from reaching payment
        if (cart.length === 0) {
            showToast("Your cart is empty!", "error");
            return;
        }

        // Process the customer details
        const customerName = document.getElementById("name").value.trim();
        const customerAddress = document.getElementById("address").value.trim();
        const customerCountry = "Nigeria";
        const selectedCity = document.querySelector('input[name="city"]:checked');
        const customerState = document.getElementById("state").value.trim();
        const customerCity = selectedCity ? selectedCity.value : "";
        const customerPhone = document.getElementById("phone").value.trim();
        const customerAlternatePhone = document
            .getElementById("altPhone")
            .value.trim();

        // Check if all required form fields are filled
        if (
            !customerName ||
            !customerAddress ||
            !customerState ||
            !customerCity ||
            !customerPhone ||
            !customerAlternatePhone
        ) {
            showToast("Please fill out all required fields.", "error");
            return;
        }

        // Retrieve the selected payment method from localStorage
        const selectedPaymentMethod = localStorage.getItem("paymentMethod");

        // Store customer details in localStorage
        localStorage.setItem("customerName", customerName);
        localStorage.setItem("customerAddress", customerAddress);
        localStorage.setItem("customerCountry", customerCountry);
        localStorage.setItem("customerState", customerState);
        localStorage.setItem("customerCity", customerCity);
        localStorage.setItem("customerPhone", customerPhone);
        localStorage.setItem("customerAlternatePhone", customerAlternatePhone);

        // Keep the order money pieces at the exact submitted values.
        updateTotalsUI();

        // Retrieve customer Email from localStorage
        const customerEmail = localStorage.getItem("userEmail");

        // Depending on the selected payment method, route accordingly
        if (selectedPaymentMethod === "card") {
            // Process card payment through Paystack
            makePayment();
        } else if (selectedPaymentMethod === "delivery") {
            // Handle pay on delivery option
            handlePayOnDelivery(
                customerName,
                customerEmail,
                customerAddress,
                customerCountry,
                customerState,
                customerCity,
                customerPhone,
                customerAlternatePhone,
            );
        }
    });
});

const paystackPublicKey = "pk_test_75c72b15bb57b4cc03f594976fab92cb685fcc6f";

// Build a unique Paystack reference from the clock and a random number.
function generateTransactionReference() {
    const timestamp = new Date().getTime(); // Current timestamp in milliseconds
    const randomNumber = Math.floor(Math.random() * 1000000); // Random number between 0 and 999999
    return `TX-${timestamp}-${randomNumber}`;
}

// Read an integer amount from storage, tolerating thousands separators.
function readStoredAmount(key) {
    const stored = (localStorage.getItem(key) || "0").replace(/,/g, "");
    const amount = parseInt(stored, 10);
    return Number.isFinite(amount) ? amount : 0;
}

// Open the Paystack modal; on success, save the order and go to the receipt.
function makePayment() {
    // Read the payable amount now, so the coupon and delivery fee are included.
    const amountInKobo = readStoredAmount("totalAmount") * 100; // 100 kobo = 1 NGN
    const customerReference = generateTransactionReference();
    const customerEmail = localStorage.getItem("userEmail");
    const customerName = localStorage.getItem("customerName");
    const customerPhone = localStorage.getItem("customerPhone");

    const handler = PaystackPop.setup({
        key: paystackPublicKey,
        email: customerEmail,
        amount: amountInKobo,
        currency: "NGN",
        ref: customerReference,
        metadata: {
            custom_fields: [
                {
                    display_name: "Customer Name",
                    variable_name: "customer_name",
                    value: customerName,
                },
                {
                    display_name: "Phone Number",
                    variable_name: "customer_phone",
                    value: customerPhone,
                },
            ],
        },
        callback: function (response) {
            // This function is called when the payment is successful
            alert("Payment successful! Transaction reference: " + response.reference);

            const cartItems = getCartItems();
            // Save the order after successful payment
            const orderDetailsForCard = {
                orderId: Date.now(), // Unique order ID
                customerName: customerName,
                customerEmail: customerEmail,
                customerAddress: localStorage.getItem("customerAddress"),
                customerCountry: localStorage.getItem("customerCountry"),
                customerState: localStorage.getItem("customerState"),
                customerCity: localStorage.getItem("customerCity"),
                customerPhone: customerPhone,
                customerAlternatePhone: localStorage.getItem("customerAlternatePhone"),
                paymentMethod: "Card",
                transactionReference: response.reference, // Save the transaction reference
                subtotal: readStoredAmount("subtotal"),
                discount: readStoredAmount("discountAmount"),
                deliveryFee: readStoredAmount("deliveryFee"),
                deliveryMethod: localStorage.getItem("deliveryMethodLabel") || "Door delivery",
                total: readStoredAmount("totalAmount"),
                cart: cartItems, // Get items from the cart
            };
            saveOrderLocally(orderDetailsForCard);
            localStorage.setItem("currentOrderId", orderDetailsForCard.orderId); // Save current order ID

            // Successful payment ships the units: reduce the stock now.
            reduceStockForProducts(cartItems);

            const newUpdatedMessage = {
                id: "Order ID:" + " " + orderDetailsForCard.orderId + " " + "Paid",
                sender: "Admin",
                subject: "Congratulations your order has been shipped!",
                body: "Thank you for purchasing our product, your order has been shipped successfully, you will get a message from our admin when the product arrive our pickup station close to your address!",
            };

            storeUserMessage(customerEmail, newUpdatedMessage);

            clearCart();

            window.location.href = "../confirmation/confirmation.html"; // Redirect to confirmation page
        },
        onClose: function () {
            // This function is called when the user closes the payment modal without completing the payment
            showToast("Payment process was not completed.", "error");
        },
    });

    // Open the Paystack payment modal
    handler.openIframe();
}

// Function to handle Pay on Delivery option
function handlePayOnDelivery(
    name,
    email,
    address,
    country,
    state,
    city,
    phone,
    alternatePhone,
) {
    const cartItems = getCartItems();
    const orderDetails = {
        orderId: Date.now(), // Unique order ID
        customerName: name,
        customerEmail: email,
        customerAddress: address,
        customerCountry: country,
        customerState: state,
        customerCity: city,
        customerPhone: phone,
        customerAlternatePhone: alternatePhone,
        paymentMethod: "Pay on Delivery",
        subtotal: readStoredAmount("subtotal"),
        discount: readStoredAmount("discountAmount"),
        deliveryFee: readStoredAmount("deliveryFee"),
        deliveryMethod: localStorage.getItem("deliveryMethodLabel") || "Door delivery",
        total: readStoredAmount("totalAmount"),
        cart: cartItems, // Get items from the cart
    };
    saveOrderLocally(orderDetails);
    localStorage.setItem("currentOrderId", orderDetails.orderId); // Save current order ID

    // The order is placed: reserve the stock for this order now.
    reduceStockForProducts(cartItems);

    const newUpdatedMsg = {
        id: "Order ID:" + " " + orderDetails.orderId + " " + "Pending-Payment",
        sender: "Admin",
        subject: "Congratulations your order has been shipped!",
        body: "Hello, we reecived your order... you have chosen to pay on delivery, kindly get your money ready... your order has been shipped successfully, you will get a message from our admin when the product arrive our pickup station close to your address!",
    };

    storeUserMessage(email, newUpdatedMsg);

    clearCart();

    window.location.href = "../confirmation/confirmation.html"; // Redirect to confirmation page
}

// fuction that create orders and save orders to local storage
function saveOrderLocally(orderDetails) {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(orderDetails);
    localStorage.setItem("orders", JSON.stringify(orders));
}

// Read the current cart from local storage.
function getCartItems() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Remove the cart from local storage.
function clearCart() {
    localStorage.removeItem("cart");
}
