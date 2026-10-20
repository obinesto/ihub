# iHub – Demo E-commerce Web Application

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

A fully responsive demo e-commerce application built with HTML5, CSS, Vanilla JavaScript and paystack API. Featuring both user and admin dashboard, this project showcases a complete front-end user flow, from browsing products to completing a purchase with a real payment gateway integration.

**[View Live Demo](https://ihub.obinestotech.com/)**
---

## ✨ Features

- **Fully Responsive Design:** Adapts seamlessly to desktops, tablets, and mobile devices.
- **User Authentication:** Secure sign-up and login functionality for users.
- **Product Catalog:** Dynamic product collection and details pages.
- **Shopping Cart:** Add, remove, and update items in the cart.
- **Payment Integration:** Real-world payment processing using the **Paystack** API.
- **Order Confirmation:** A confirmation page to summarize successful transactions.
- **User Profiles:** Dedicated section for users to view their information.
- **Admin Dashboard:** Basic interface for administrative tasks.
- **Live Inventory:** Product pages, cart, checkout, and admin share stock counts that drop as orders are placed.

---

## 🛠️ Tech Stack

- **HTML5:** For the structure and content of the web pages.
- **CSS3:** For styling, layout, and responsive design, including media queries.
- **Vanilla JavaScript (ES6+):** For all client-side logic, DOM manipulation, and interactivity.
- **Paystack API:** For handling secure online card payments.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You just need a modern web browser like Chrome, Firefox, or Safari.

## 📂 Project Structure

The project is organized with a clear separation of concerns, making it easy to navigate and maintain.

```
ihub/
├── index.html                # Landing page (home slider, product rails, services)
├── index.css                 # Store-wide header, footer, and page styling
├── index.js                  # Shared header logic: search, cart badge, login state, footer toasts
├── srcipt.js                 # Landing page product rails (top picks, iPhone/iPad/Mac/accessories)
├── products-data.js          # Catalog source of truth: products, delivery rates, stock, inbox, toasts
├── bootstrap-5.3.3-dist/     # Bundled Bootstrap CSS and JS (self-hosted)
├── assets/                   # Product images, icons, and banners
└── pages/
    ├── auth.js / auth.css    # Shared login and signup logic (member, signup, admin)
    ├── member/               # Customer dashboard, login, and signup pages
    │   ├── member.html       # Member dashboard: orders, inbox, account details
    │   ├── member_login.html
    │   └── member_signup.html
    ├── admin/                # Admin dashboard: catalog CRUD editor and product list
    │   ├── admin.html
    │   └── admin_login.html
    └── public/
        ├── Products/         # Category listings: iphone, ipad, mac, accessories
        ├── collections/      # Product detail page (with delivery fee options)
        ├── cart/             # Shopping cart page
        ├── check-out/        # Shipping form, coupon, delivery fee, Paystack payment flow
        ├── confirmation/     # Order receipt with print support
        ├── order/            # Order details views
        ├── contact/          # Contact page
        ├── Services/         # Repairs, trade-in, financing
        └── Policies/         # Terms, refunds, shipping, privacy
```

### How it works

- **Single catalog source:** `products-data.js` holds every product; admin edits, listings, search, cart, checkout, and receipts all read from it via `getStoreCatalog()`.
- **State in local storage:** cart, customer accounts, sessions, orders, and per-user inbox messages live in `localStorage` — the app is fully static.
- **Payments:** checkout routes to the Paystack modal for card payments, or records a pay-on-delivery order.
- **Shared feedback:** `showToast()` in `products-data.js` provides success, info, and error toast variants on every page.

---

## 📄 License

This project is distributed under the MIT License. See `LICENSE` for more information.
