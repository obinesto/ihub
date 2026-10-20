// Order receipt: build the branded confirmation from the saved order.
document.addEventListener("DOMContentLoaded", function () {
    const currentOrderId = localStorage.getItem("currentOrderId");
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const currentOrder = orders.find((order) => order.orderId == currentOrderId);

    const statusEl = document.getElementById("confirmation-message");
    const detailsEl = document.getElementById("confirmation-details");

    if (!currentOrder) {
        statusEl.textContent = "No order found.";
        return;
    }

    statusEl.innerHTML = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <span>Order placed successfully!</span>`;

    const detailRows = [
        ["Name", currentOrder.customerName],
        ["Order ID", currentOrderId],
        ["Date", formatDate(currentOrderId)],
        ["Email", currentOrder.customerEmail],
        ["Address", currentOrder.customerAddress],
        ["State", currentOrder.customerState],
        ["City", currentOrder.customerCity],
        ["Phone", currentOrder.customerPhone],
        ["Alt Phone", currentOrder.customerAlternatePhone],
        ["Payment method", currentOrder.paymentMethod],
    ];
    if (currentOrder.deliveryMethod) {
        detailRows.push(["Delivery", currentOrder.deliveryMethod]);
    }
    if (currentOrder.paymentMethod === "Card") {
        detailRows.push(["Payment", "Paid in full"]);
        detailRows.push(["Transaction ref", currentOrder.transactionReference]);
    } else if (currentOrder.paymentMethod === "Pay on Delivery") {
        detailRows.push(["Payment", "You will pay on delivery"]);
    }

    const money = orderMoney(currentOrder);
    detailsEl.innerHTML = `
        <div class="receipt-section">
            <h4 class="receipt-section-title">Order summary</h4>
            ${orderItemsRows(currentOrder.cart)}
            <div class="receipt-total">
                <span>Subtotal</span>
                <strong>${priceText(money.subtotal)}</strong>
            </div>
            ${money.discount > 0 ? discountRow(money.discount) : ""}
            ${(currentOrder.deliveryMethod || money.deliveryFee > 0) ? deliveryRow(currentOrder, money.deliveryFee) : ""}
            <div class="receipt-total">
                <span>Total</span>
                <strong>${priceText(money.total)}</strong>
            </div>
        </div>
        <div class="receipt-section">
            <h4 class="receipt-section-title">Customer details</h4>
            ${detailRows.map(([label, value]) => rowHtml(label, value)).join("")}
        </div>`;
});

// Read an order's money pieces, falling back to items-only data for orders
// saved before delivery fees and discounts were tracked.
function orderMoney(currentOrder) {
    const items = Array.isArray(currentOrder.cart) ? currentOrder.cart : [];
    const itemsTotal = items.reduce(
        (sum, item) =>
            sum +
            (Number(String(item.price).replace(/,/g, "")) || 0) * (item.quantity || 1),
        0,
    );
    const stored = (key, fallback) => {
        const value = Number(currentOrder[key]);
        return Number.isFinite(value) ? value : fallback;
    };
    const subtotal = stored("subtotal", itemsTotal);
    const discount = stored("discount", 0);
    const deliveryFee = stored("deliveryFee", 0);
    return { subtotal, discount, deliveryFee, total: subtotal - discount + deliveryFee };
}

// Render the coupon discount line of the receipt.
function discountRow(discount) {
    return `
        <div class="receipt-row">
            <span class="receipt-row-label">Coupon discount</span>
            <span class="receipt-row-value">−${priceText(discount)}</span>
        </div>`;
}

// Render the delivery fee line; the method sits with the fee on one row.
function deliveryRow(currentOrder, deliveryFee) {
    return `
        <div class="receipt-row">
            <span class="receipt-row-label">Delivery fee${currentOrder.deliveryMethod ? " (" + currentOrder.deliveryMethod + ")" : ""}</span>
            <span class="receipt-row-value">${priceText(deliveryFee)}</span>
        </div>`;
}

// Render one line per cart item with its quantity and line total.
function orderItemsRows(cart) {
    const items = Array.isArray(cart) ? cart : [];
    if (!items.length) return '<p class="receipt-item">No items recorded.</p>';
    return items
        .map(
            (item) => `
        <div class="receipt-item">
            <span class="receipt-item-name">${item.name} &times; ${item.quantity || 1}</span>
            <span class="receipt-item-price">${priceText((Number(String(item.price).replace(/,/g, "")) || 0) * (item.quantity || 1))}</span>
        </div>`,
        )
        .join("");
}

// Format an amount in naira.
function priceText(amount) {
    return "\u20A6 " + amount.toLocaleString("en-NG");
}

// Turn the order id timestamp into a readable date.
function formatDate(orderId) {
    const ts = Number(orderId);
    return Number.isFinite(ts)
        ? new Date(ts).toLocaleString("en-NG", {
            dateStyle: "medium",
            timeStyle: "short",
        })
        : "&#8212;";
}

// Render one label/value row of the receipt.
function rowHtml(label, value) {
    const shown = value ? String(value) : "&#8212;";
    return [
        `<div class="receipt-row">`,
        `<span class="receipt-row-label">${label}</span>`,
        `<span class="receipt-row-value">${shown}</span>`,
        `</div>`,
    ].join("");
}

// Print the receipt.
document.getElementById("print-button").addEventListener("click", function () {
    window.print();
});

// Celebration ribbons: splash the brand palette at page load.
document.addEventListener("DOMContentLoaded", () => {
    const ribbonContainer = document.getElementById("ribbon-container");

    // Brand palette keeps the celebration on-brand
    const palette = ["#cbf802", "#171b13", "#bce600", "#ffffff"];

    // Create one ribbon strip at a random spot.
    function createRibbon() {
        const ribbon = document.createElement("div");
        ribbon.classList.add("ribbon");

        const shapes = ["circle", "square", "rectangle", "triangle"];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        ribbon.classList.add(shape);
        const color = palette[Math.floor(Math.random() * palette.length)];

        if (shape === "triangle") {
            ribbon.style.borderBottomColor = color;
        } else {
            ribbon.style.backgroundColor = color;
        }

        let width, height;
        if (shape === "circle" || shape === "square") {
            width = height = Math.random() * 10 + 5 + "px";
        } else if (shape === "rectangle") {
            width = Math.random() * 20 + 10 + "px";
            height = Math.random() * 10 + 5 + "px";
        } else if (shape === "triangle") {
            width = height = "0";
        }

        ribbon.style.width = width;
        ribbon.style.height = height;
        ribbon.style.left = Math.random() * 100 + "vw";
        ribbon.style.top = Math.random() * -10 + "vh";
        ribbon.style.animationDuration = Math.random() * 1.5 + 1.5 + "s";
        ribbon.style.opacity = Math.random() * 0.6 + 0.2;

        ribbonContainer.appendChild(ribbon);

        setTimeout(() => {
            ribbon.remove();
        }, 3000);
    }

    setInterval(() => {
        for (let i = 0; i < 10; i++) {
            createRibbon();
        }
    }, 300);
});
