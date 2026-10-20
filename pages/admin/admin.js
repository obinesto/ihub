// Admin dashboard: catalog editor, product list management, and admin session.
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("product-form");
    const list = document.getElementById("product-list");
    if (!form || !list) return;
    const notice = document.getElementById("admin-notice");
    const search = document.getElementById("catalog-search");
    const filter = document.getElementById("catalog-category");
    const dialog = document.getElementById("delete-product-dialog");
    const editor = document.querySelector(".admin-editor");
    const newProduct = document.getElementById("new-product");
    const heading = document.querySelector(".admin-heading");
    if (window.ResizeObserver) {
        new ResizeObserver(() => {
            document.documentElement.style.setProperty(
                "--admin-heading-height",
                heading.getBoundingClientRect().height + "px",
            );
        }).observe(heading);
    }
    const categories = {
        iphone: "iPhone",
        ipad: "iPad",
        mac: "Mac",
        accessories: "Accessories",
    };
    const currency = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
    });
    const fields = Object.fromEntries(
        ["name", "price", "description", "quantity", "image", "category"].map(
            (key) => [key, document.getElementById("product-" + key)],
        ),
    );
    let products = [];
    let editingIndex = null;
    let deleteIndex = null;

    // Show a status message banner at the top of the dashboard.
    function showNotice(message, kind = "success") {
        notice.textContent = message;
        notice.dataset.kind = kind;
        notice.hidden = false;
    }

    // Shorthand for creating a DOM node with an optional class and text.
    function element(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    }

    // Create a feather icon node for the given icon name.
    function icon(name) {
        const node = element("i");
        node.dataset.feather = name;
        node.setAttribute("aria-hidden", "true");
        return node;
    }

    // Re-render feather icons after the DOM changes.
    function refreshIcons() {
        if (window.feather) window.feather.replace();
    }

    // Render the product list with search, category filter, and stat counts.
    function renderProducts() {
        const query = search.value.trim().toLowerCase();
        const fragment = document.createDocumentFragment();
        let shown = 0;
        products.forEach((product, index) => {
            if (filter.value && product.category !== filter.value) return;
            if (query && !String(product.name).toLowerCase().includes(query)) return;
            shown++;
            const row = element("article", "admin-product");
            const info = element("div", "admin-product-info");
            const image = element("img", "admin-product-image");
            image.src =
                typeof storeImg === "function"
                    ? storeImg(product.image)
                    : product.image;
            image.alt = "";
            image.loading = "lazy";
            // Hide product images that fail to load.
            image.addEventListener(
                "error",
                () => {
                    image.hidden = true;
                },
                { once: true },
            );
            const body = element("div");
            body.append(
                element("h3", "", product.name),
                element(
                    "p",
                    "admin-product-category",
                    (categories[product.category] || "Uncategorised") +
                    " · ID " +
                    product.id,
                ),
            );
            const details = element("details");
            details.append(
                element("summary", "", "Description"),
                element("p", "", product.description || "No description provided."),
            );
            body.append(details);
            info.append(image, body);
            const price = Number(String(product.price).replace(/,/g, ""));
            const actions = element("div", "admin-actions");
            for (const [action, glyph, label] of [
                ["edit", "edit-2", "Edit"],
                ["delete", "trash-2", "Delete"],
            ]) {
                const button = element("button");
                button.type = "button";
                button.dataset.action = action;
                button.dataset.index = index;
                button.setAttribute("aria-label", label + " " + product.name);
                button.title = label + " product";
                button.append(icon(glyph));
                actions.append(button);
            }
            row.append(
                info,
                element(
                    "span",
                    "admin-product-price",
                    Number.isFinite(price) ? currency.format(price) : "Price unavailable",
                ),
                element(
                    "span",
                    "admin-product-stock",
                    String(Number(product.quantity) || 0),
                ),
                actions,
            );
            fragment.append(row);
        });
        if (!shown)
            fragment.append(
                element(
                    "p",
                    "admin-empty",
                    products.length
                        ? "No products match your search. Try another name or category."
                        : "No products yet. Add your first product using the form.",
                ),
            );
        list.replaceChildren(fragment);
        document.getElementById("catalog-count").textContent =
            shown + " of " + products.length + " products";
        document.getElementById("product-count").textContent = products.length;
        document.getElementById("stock-count").textContent = products
            .reduce((total, product) => total + (Number(product.quantity) || 0), 0)
            .toLocaleString("en-NG");
        document.getElementById("unavailable-count").textContent = products.filter(
            (product) => Number(product.quantity) <= 0,
        ).length;
        refreshIcons();
    }

    // Clear the editor form back to add-a-new-product mode.
    function resetEditor() {
        editingIndex = null;
        form.reset();
        document.getElementById("product-id").value = "";
        document.getElementById("editor-title").textContent = "Add product";
        document.getElementById("editor-caption").textContent =
            "Enter the product details below.";
        document
            .getElementById("save-product")
            .replaceChildren(icon("plus"), element("span", "", "Add product"));
        document.getElementById("cancel-edit").hidden = true;
        editor.classList.remove("is-open");
        if (window.matchMedia("(max-width: 760px)").matches) newProduct.focus();
        refreshIcons();
    }

    // Save the catalog to storage, re-render the list, and report the result.
    function saveProducts(nextProducts, message) {
        try {
            localStorage.setItem("products", JSON.stringify(nextProducts));
        } catch {
            showNotice(
                "Your changes could not be saved. Allow site storage or free some browser storage, then try again.",
                "error",
            );
            return false;
        }
        products = nextProducts;
        renderProducts();
        showNotice(message);
        return true;
    }
    try {
        if (typeof seedStoreProducts === "function") seedStoreProducts();
        const stored = JSON.parse(localStorage.getItem("products") || "[]");
        if (
            !Array.isArray(stored) ||
            stored.some((product) => !product || typeof product !== "object")
        )
            throw new Error("Invalid catalog");
        // Normalize inventory counts so legacy entries get the seeded count.
        products = typeof normalizeStoreProduct === "function"
            ? stored.map(normalizeStoreProduct)
            : stored;
    } catch {
        showNotice(
            "The saved catalog could not be opened. Check your browser storage settings and reload this page.",
            "error",
        );
        document.getElementById("save-product").disabled = true;
    }

    renderProducts();

    // Re-render the list as the search text changes.
    search.addEventListener("input", renderProducts);

    // Re-render the list as the category filter changes.
    filter.addEventListener("change", renderProducts);

    // Cancel editing and reset the editor.
    document.getElementById("cancel-edit").addEventListener("click", resetEditor);
    // Open the editor in add-new-product mode.
    newProduct.addEventListener("click", () => {
        resetEditor();
        editor.classList.add("is-open");
        document.getElementById("cancel-edit").hidden = false;
        document.getElementById("cancel-edit").textContent = "Cancel";
        fields.name.focus();
        editor.scrollIntoView({ block: "start" });
    });
    // Keep the editor open while the admin types.
    form.addEventListener("input", () => editor.classList.add("is-open"));
    Object.values(fields).forEach((input) =>
        // Clear a field's validity error once it is edited.
        input.addEventListener("input", () => input.setCustomValidity("")),
    );

    // Validate and save a new or edited product.
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        for (const key of ["name", "image", "description"]) {
            if (!fields[key].value.trim()) {
                fields[key].setCustomValidity("Enter a " + key + ".");
                fields[key].reportValidity();
                return;
            }
        }
        if (!form.reportValidity()) return;
        // New items must ship with a hosted image URL: uploaded files and
        // local paths cannot be shared with shoppers, so only URLs resolve.
        const imageReference = fields.image.value.trim();
        const validImage =
            editing ||
            /^https?:\/\/\S+/i.test(imageReference);
        if (!validImage) {
            fields.image.setCustomValidity(
                "Kindly paste an image URL.",
            );
            fields.image.reportValidity();
            return;
        }
        const values = {
            name: fields.name.value.trim(),
            price: Number(fields.price.value).toLocaleString("en-NG", {
                maximumFractionDigits: 0,
            }),
            description: fields.description.value.trim(),
            quantity: Number(fields.quantity.value),
            image: fields.image.value.trim(),
            category: fields.category.value,
        };
        const nextProducts = products.slice();
        const editing = editingIndex !== null;
        if (editing)
            nextProducts[editingIndex] = { ...nextProducts[editingIndex], ...values };
        else {
            const maxId = products.reduce(
                (highest, product) => Math.max(highest, Number(product.id) || 0),
                0,
            );
            nextProducts.push({
                id: maxId + 1,
                ...values,
                beforeprice: values.price,
                discountprice: "",
                line: null,
            });
        }
        if (
            saveProducts(
                nextProducts,
                editing ? "Product updated." : "Product added.",
            )
        )
            resetEditor();
    });

    // Handle edit and delete actions chosen from the product list.
    list.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-action]");
        if (!button) return;
        const index = Number(button.dataset.index);
        const product = products[index];
        if (!product) return;
        if (button.dataset.action === "edit") {
            editor.classList.add("is-open");
            editingIndex = index;
            document.getElementById("product-id").value = index;
            for (const [key, input] of Object.entries(fields)) {
                input.setCustomValidity("");
                input.value =
                    key === "price"
                        ? String(product.price).replace(/,/g, "")
                        : (product[key] ?? "");
            }
            document.getElementById("editor-title").textContent = "Edit product";
            document.getElementById("editor-caption").textContent =
                "Editing product #" + product.id;
            document
                .getElementById("save-product")
                .replaceChildren(icon("check"), element("span", "", "Save changes"));
            document.getElementById("cancel-edit").hidden = false;
            document.getElementById("cancel-edit").textContent = "Cancel edit";
            refreshIcons();
            fields.name.focus();
            document
                .querySelector(".admin-editor")
                .scrollIntoView({ block: "start" });
        } else {
            deleteIndex = index;
            document.getElementById("delete-description").textContent =
                "Remove “" + product.name + "” from the store? This cannot be undone.";
            dialog.showModal();
        }
    });

    // Close the delete dialog without removing anything.
    document
        .getElementById("cancel-delete")
        .addEventListener("click", () => dialog.close());
    // Forget the pending delete when the dialog closes.
    dialog.addEventListener("close", () => {
        deleteIndex = null;
    });

    // Remove the product and settle any open edit state.
    document.getElementById("confirm-delete").addEventListener("click", () => {
        if (deleteIndex === null) return;
        const index = deleteIndex;
        if (
            !saveProducts(
                products.filter((_, productIndex) => productIndex !== index),
                "Product deleted.",
            )
        )
            return;
        if (editingIndex === index) resetEditor();
        else if (editingIndex !== null && editingIndex > index) {
            editingIndex--;
            document.getElementById("product-id").value = editingIndex;
        }
        dialog.close();
        search.focus();
    });

    // Sign the admin out and return to the login page.
    document.getElementById("logoutButton").addEventListener("click", () => {
        try {
            localStorage.removeItem("isAdminLoggedIn");
            localStorage.removeItem("adminEmail");
            localStorage.removeItem("adminDetails");
            window.location.href = "admin_login.html";
        } catch {
            showNotice(
                "We could not sign you out. Allow site storage and try again.",
                "error",
            );
        }
    });
});
