const nairaSymbol = "\u20A6";

// Read the remaining stock for a product, or null when unknown.
function stockForProduct(productId) {
  const product = typeof findStoreProduct === "function"
    ? findStoreProduct(productId)
    : null;
  if (!product) return null;
  return Math.max(0, Number(product.quantity) || 0);
}

// Toast warnings about stock limits.
function showStockToast(text) {
  showToast(text, "error", 3500);
}

// Cart page: render items and totals, and handle quantity, remove, and clear.
document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Call renderCart on page load to display items in the cart
  renderCart();

  // Render the cart rows and total, then rebind the row controls.
  function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");
    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      const emptyRow = document.createElement("tr");
      emptyRow.className = "cart-empty-row";
      emptyRow.innerHTML = `<td colspan="5">Your cart is empty. <a href="../../../index.html">Continue shopping</a></td>`;
      cartItemsContainer.appendChild(emptyRow);
    }

    cart.forEach((item) => {
      const itemTotalRaw = item.price.replace(/,/g, ""); // remove commas to aid summation
      const itemTotal = parseInt(itemTotalRaw, 10) * item.quantity;
      total += itemTotal;
      const stock = stockForProduct(item.id);

      const itemRow = document.createElement("tr");
      itemRow.innerHTML = `
        <td data-label="Product"><span class="cart-product"><img src='${storeImg(item.image)}' alt=''> <span>${item.name}</span></span></td>
        <td data-label="Price">${nairaSymbol} ${item.price}</td>
        <td data-label="Quantity">
          <input type="number" value="${item.quantity}" min="1"${stock !== null ? ` max="${stock}"` : ""} data-id="${item.id}" class="quantity-input">
        </td>
        <td data-label="Total">${nairaSymbol} ${itemTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
        <td>
          <button class="remove-btn" data-id="${item.id}">Remove</button>
        </td>
      `;
      cartItemsContainer.appendChild(itemRow);
    });

    const totalAmountFormatted = total
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    cartTotalElement.innerHTML = `Total Amount: ${nairaSymbol}${totalAmountFormatted}`;
    localStorage.setItem("totalAmount", total);

    // Add event listeners for quantity changes and remove buttons
    document.querySelectorAll(".quantity-input").forEach((input) => {
      // Apply a quantity change; below one removes the item, beyond stock clamps.
      input.addEventListener("change", (event) => {
        const productId = parseInt(event.target.getAttribute("data-id"));
        const newQuantity = parseInt(event.target.value, 10);
        if (!Number.isFinite(newQuantity) || newQuantity < 1) {
          removeItemFromCart(productId);
          return;
        }
        const stock = stockForProduct(productId);
        if (stock !== null && newQuantity > stock) {
          if (stock === 0) {
            removeItemFromCart(productId);
            showStockToast("This item sold out and was removed from your cart.");
          } else {
            updateQuantity(productId, stock);
            showStockToast(`Only ${stock} ${stock === 1 ? "unit" : "units"} of this item remain in stock.`);
          }
          return;
        }
        updateQuantity(productId, newQuantity);
      });
    });

    document.querySelectorAll(".remove-btn").forEach((button) => {
      // Remove the chosen item from the cart.
      button.addEventListener("click", (event) => {
        const productId = parseInt(event.target.getAttribute("data-id"));
        removeItemFromCart(productId);
      });
    });
  }

  // Add one unit of a product to the stored cart (kept for parity).
  function addItemToCart(productId) {
    let product = products.find((product) => product.id == productId);

    if (product) {
      let cartItem = cart.find((item) => item.id == productId);
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      updateItemCount();
    }
  }

  // Drop an item from the cart and refresh the views.
  function removeItemFromCart(productId) {
    cart = cart.filter((item) => item.id != productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateItemCount();
  }

  // Set a product's quantity and refresh the views.
  function updateQuantity(productId, quantity) {
    for (let product of cart) {
      if (product.id == productId) {
        product.quantity = quantity;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateItemCount();
  }

  // Sum the cart line totals.
  function getTotal() {
    let total = cart.reduce(
      (sum, item) => sum + parseFloat(item.price) * item.quantity,
      0,
    );
    return total.toFixed(2);
  }

  // Function to update the item count in the circle
  function updateItemCount() {
    const itemCountCircle = document.getElementById("item-count-circle");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    itemCountCircle.textContent = itemCount;
  }

  // Call the function on page load to set the initial count
  updateItemCount();

  // ClearCart functionality
  document.getElementById("clearcart-button").addEventListener("click", () => {
    clearCart();
  });

  // Empty the stored cart after confirming it has items, then toast.
  function clearCart() {
    if (cart.length === 0) {
      showToast("Your cart is empty!", "info");
      return;
    }

    // Clear the cart
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();

    showToast("Your Cart is Cleared Successfully!", "success");
  }

  // Checkout functionality
  document
    .getElementById("checkout-button")
    .addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default form submission
      handleCartcheck();
    });

  // Route to checkout when the cart has items; warn otherwise.
  function handleCartcheck() {
    if (cart.length === 0) {
      showToast("Your cart is empty!", "error");
    } else {
      // Check which radio button is selected
      const selectedPaymentMethod = document.querySelector(
        'input[name="recommend"]:checked',
      ).value;

      // Store the selected payment method in localStorage
      localStorage.setItem("paymentMethod", selectedPaymentMethod);

      // Redirect to the customer details form page
      window.location.href = "../check-out/checkout.html"; // Replace with the actual URL of your form page
    }
  }
});
