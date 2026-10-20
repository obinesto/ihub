// navbar logic
document.addEventListener("DOMContentLoaded", function () {
  var icon1 = document.getElementById("toggle1");
  var icon2 = document.getElementById("toggle2");
  const arrowDowns = document.querySelectorAll(".arrow-down i");

  if (!icon1 || !icon2) return;

  // Show the mobile menu and swap to the close icon.
  icon1.addEventListener("click", function () {
    icon1.style.display = "none";

    document.querySelector(".nav-links2").style.display = "block";
    icon2.style.display = "block";
  });

  // Hide the mobile menu and restore the open icon.
  icon2.addEventListener("click", function () {
    icon2.style.display = "none";
    document.querySelector(".nav-links2").style.display = "none";

    icon1.style.display = "block";
  });

  // Close the mobile menu when resizing up to desktop widths
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      var mobileNav = document.querySelector(".nav-links2");
      if (mobileNav) mobileNav.style.display = "";
      icon2.style.display = "";
      icon1.style.display = "";
    }
  });

  // Toggle the product-group sections inside the mobile menu.
  arrowDowns.forEach((arrowDown) => {
    arrowDown.addEventListener("click", function () {
      arrowDown.classList.toggle("fa-angle-down");
      arrowDown.classList.toggle("fa-angle-up");

      const content2a = document.getElementById("dropdown-content2a");
      const content2b = document.getElementById("dropdown-content2b");

      if (arrowDown.classList.contains("fa-angle-down")) {
        content2a.style.display = "none";
        content2b.style.display = "none";
      } else if (
        arrowDown.classList.contains("dropA") &
        arrowDown.classList.contains("fa-angle-up")
      ) {
        content2a.style.display = "block";
        content2b.style.display = "none";
      } else if (
        arrowDown.classList.contains("dropB") &
        arrowDown.classList.contains("fa-angle-up")
      ) {
        content2a.style.display = "none";
        content2b.style.display = "block";
      }
    });
  });
});

// Site search: live product results shown under the search bar.
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  if (!searchInput || !searchButton) return;

  // Resolve site-root-relative targets from any page depth.
  const depth = Math.max(
    0,
    window.location.pathname.split("/").filter(Boolean).length - 1,
  );
  const rootPrefix = "../".repeat(depth);
  const naira = "₦";

  const panel = document.createElement("div");
  panel.className = "handleSearchResults";
  panel.hidden = true;
  document.body.appendChild(panel);

  // Keep the results panel lined up under the search bar.
  function positionPanel() {
    const bar = searchInput.closest(".search-bar") || searchInput;
    const rect = bar.getBoundingClientRect();
    const width = Math.min(Math.max(rect.width * 2, 280), 420);
    panel.style.width = width + "px";
    panel.style.left =
      Math.max(8, Math.min(rect.left, window.innerWidth - width - 8)) + "px";
    panel.style.top = rect.bottom + 8 + "px";
  }

  // Close the results panel and clear its list.
  function hidePanel() {
    panel.hidden = true;
    panel.innerHTML = "";
  }

  // Search the catalog for the text and render up to eight result cards.
  function searchProducts(rawQuery) {
    const query = (rawQuery || "").trim().toLowerCase();
    if (!query) {
      hidePanel();
      return;
    }
    const catalog =
      typeof getStoreCatalog === "function" ? getStoreCatalog() : [];
    const filtered = catalog.filter(
      (product) =>
        product && product.name && product.name.toLowerCase().includes(query),
    );
    positionPanel();
    panel.hidden = false;
    if (!filtered.length) {
      panel.innerHTML =
        '<p class="search-empty">No products found. Try "iphone", "ipad" or "mac".</p>';
      return;
    }
    const shown = filtered.slice(0, 8);
    panel.innerHTML =
      `<div class="search-head"><span>${filtered.length} result${filtered.length === 1 ? "" : "s"}</span><button type="button" class="search-close" aria-label="Close search results">×</button></div>` +
      shown
        .map(
          (product) => `
        <div class="search-result-item">
          <a href="${rootPrefix}pages/public/collections/collections.html?id=${product.id}">
            <img src="${storeImg(product.image)}" alt="${product.name}" loading="lazy">
            <span class="search-meta">
              <span class="search-name">${product.name}</span>
              <span class="search-price">${naira}${product.price}</span>
            </span>
          </a>
        </div>`,
        )
        .join("") +
      (filtered.length > shown.length
        ? `<p class="search-more">+${filtered.length - shown.length} more — keep typing to narrow down</p>`
        : "");
    // Close the panel with its X button as well.
    panel.querySelector(".search-close").addEventListener("click", hidePanel);
  }

  // Show live results while the user types.
  searchInput.addEventListener("input", function () {
    searchProducts(searchInput.value);
  });

  // Event listener for the search button
  searchButton.addEventListener("click", function () {
    searchProducts(searchInput.value);
    searchInput.focus();
  });

  // Close the results with the Escape key.
  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      hidePanel();
      searchInput.blur();
    }
  });

  // Hide the search panel when clicking anywhere outside it.
  document.addEventListener("click", function (event) {
    if (
      !panel.hidden &&
      !panel.contains(event.target) &&
      event.target !== searchInput &&
      !searchButton.contains(event.target)
    ) {
      hidePanel();
    }
  });

  // Reposition the search panel as the viewport changes.
  window.addEventListener("resize", function () {
    if (!panel.hidden) positionPanel();
  });
});

// check login status
// Resolved right away: this script loads at the end of the body with the
// header already parsed, so the signed-in chip replaces the generic login
// menu before later paints (avoids a flash, especially on the home page).
// The DOMContentLoaded hookup is a safety net; the chip guard below keeps
// double runs from creating two chips.
function resolveLoggedInHeader() {
  const getProfile = JSON.parse(localStorage.getItem("createProfile"));
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";

  if (isLoggedIn || isAdminLoggedIn) {
    const userAccount = document.querySelector(".user-account");
    const userStates = document.querySelector(".handleUserStates");
    if (!userAccount || !userStates) return;
    userAccount.style.display = "none";

    // On the home page the chip is pre-rendered by an inline header script
    // before the first paint; take that chip over instead of adding a second
    // one. Everywhere else the chip is created here.
    const displayName =
      isLoggedIn && getProfile && getProfile.firstName
        ? getProfile.firstName
        : "Admin";
    let profileAccount = userStates.querySelector(".profileAccount");
    if (profileAccount) {
      const chipName = profileAccount.querySelector(".profileAccountName");
      if (chipName) chipName.textContent = displayName;
    } else {
      profileAccount = document.createElement("div");
      profileAccount.className = "profileAccount";
      profileAccount.innerHTML = `<span>Hi <span class="profileAccountName">${displayName}</span></span>`;
      userStates.appendChild(profileAccount);
    }
    if (profileAccount.dataset.resolved === "true") return; // already finished
    profileAccount.dataset.resolved = "true";

    // Notification count is per account (keyed by email) and counts unread
    // messages only; admins have no inbox badge.
    if (!isAdminLoggedIn) {
      const accountEmail = isLoggedIn && getProfile ? getProfile.email : "";
      const unreadCount = getUserMessages(accountEmail).filter(
        (msg) => msg && msg.read !== true,
      ).length;
      if (unreadCount > 0) {
        const messageCount = document.createElement("div");
        messageCount.className = "user-msg-count";
        messageCount.textContent = unreadCount;
        profileAccount.appendChild(messageCount);
      }
    }

    // Clicking the chip routes admin sessions to the dashboard, members to their account page.
    profileAccount.addEventListener("click", () => {
      if (isAdminLoggedIn) {
        handleAdminDashboard();
        return;
      }
      if (/pages\/member\/member\.html$/.test(window.location.pathname)) {
        window.location.reload();
      } else {
        handleProfile();
      }
    });
  }
}
resolveLoggedInHeader();
document.addEventListener("DOMContentLoaded", resolveLoggedInHeader);

// Send admin sessions straight to the dashboard.
function handleAdminDashboard() {
  const prefix = typeof storeRootPrefix === "function" ? storeRootPrefix() : "";
  window.location.href = prefix + "pages/admin/admin.html";
}

// Send member sessions to their account page.
function handleProfile() {
  const prefix = typeof storeRootPrefix === "function" ? storeRootPrefix() : "";
  window.location.href = prefix + "pages/member/member.html";
}

// Admin sessions have no shopping cart: hide the header cart icon and its
// item count badge on every page. This script loads at the end of the body
// with the header already parsed, so the call runs before later paints;
// index.html additionally hides it inline in the header markup.
function hideAdminCart() {
  if (localStorage.getItem("isAdminLoggedIn") !== "true") return;
  document.querySelectorAll(".cart").forEach((node) => {
    node.style.display = "none";
  });
}
hideAdminCart();
document.addEventListener("DOMContentLoaded", hideAdminCart);

// Function to update the item count in the circle
function updateItemCount() {
  const itemCountCircle = document.getElementById("item-count-circle");
  if (!itemCountCircle) return;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  itemCountCircle.textContent = itemCount;
}

// Call the function on page load to set the initial count
document.addEventListener("DOMContentLoaded", updateItemCount);

// Footer copy logic
document.addEventListener("DOMContentLoaded", () => {
  const copyYear = document.getElementById("copyright-year");
  if (copyYear) copyYear.innerText = new Date().getFullYear();
});

// Publish the fixed navbar's real height on --nav-h so hero content (home
// slider, product banners) can sit flush under the header on every screen.
function syncNavHeight() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;
  const height = Math.round(navbar.getBoundingClientRect().height);
  document.documentElement.style.setProperty("--nav-h", height + "px");
}
document.addEventListener("DOMContentLoaded", syncNavHeight);
window.addEventListener("load", syncNavHeight);
window.addEventListener("resize", syncNavHeight);

// Hide floating contact buttons while the footer is on screen
document.addEventListener("DOMContentLoaded", () => {
  const floats = document.querySelectorAll(".whatsapp-float, .call-float");
  const footer = document.querySelector("footer");
  if (!floats.length || !footer || !("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver(
    (entries) => {
      const hide = entries.some((entry) => entry.isIntersecting);
      floats.forEach((el) => {
        el.style.display = hide ? "none" : "";
      });
    },
    { threshold: 0 },
  );
  observer.observe(footer);
});

// Footer newsletter forms: validate the email and toast the result on submit
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".newsletter-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = form.querySelector("input");
      const email = input ? input.value.trim() : "";
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFooterToast(
          "Thanks for subscribing! The latest on sales and new releases is headed to " + email + ".",
          true,
          form,
        );
        form.reset();
        if (input) input.blur();
      } else {
        showFooterToast("Enter a valid email address to subscribe.", false, form);
      }
    });
  });
});

// Show the subscribe result toast next to the form that was submitted. On
// desktop it sits inline below the Sign Up button; on mobile the CSS pins it
// to the bottom of the viewport.
function showFooterToast(text, isGoodNews, form) {
  const toast = document.createElement("div");
  toast.className = "footer-toast" + (isGoodNews ? "" : " footer-toast--error");
  toast.textContent = text;
  if (form && form.parentNode) form.insertAdjacentElement("afterend", toast);
  else document.body.appendChild(toast);
  window.setTimeout(() => toast.remove(), 4000);
}
