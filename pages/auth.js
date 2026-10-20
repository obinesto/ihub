// Auth pages (member login, signup, admin login): validate inputs, manage accounts, and route sessions.
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("[data-auth-form]");
    if (!form) return;

    const status = document.getElementById("auth-status");
    const submit = form.querySelector('[type="submit"]');
    const mode = form.dataset.authForm;
    const email = form.elements.email;
    const password = form.elements.password;

    // A matching active session has no business on a sign-in page: bounce to
    // the matching dashboard straight away. (A member may still open the
    // admin login to switch accounts, and vice versa.)
    if (mode !== "admin" && localStorage.getItem("isLoggedIn") === "true") {
        window.location.replace("member.html");
        return;
    }
    if (mode === "admin" && localStorage.getItem("isAdminLoggedIn") === "true") {
        window.location.replace("admin.html");
        return;
    }

    // Show a form-level status message above the submit button.
    function showStatus(message, kind = "error") {
        status.textContent = message;
        status.dataset.kind = kind;
        status.hidden = false;
    }

    // Flag one input with an inline error message.
    function showFieldError(input, message) {
        input.setAttribute("aria-invalid", "true");
        const error = document.getElementById(input.id + "-error");
        error.textContent = message;
        error.hidden = false;
    }

    // Clear a field's inline error state.
    function clearFieldError(input) {
        input.removeAttribute("aria-invalid");
        const error = document.getElementById(input.id + "-error");
        if (error) {
            error.textContent = "";
            error.hidden = true;
        }
    }

    // Read a saved list from storage, insisting on an array.
    function readList(key) {
        const value = JSON.parse(localStorage.getItem(key) || "[]");
        if (!Array.isArray(value)) throw new Error("Invalid account data");
        return value;
    }

    form.querySelectorAll("input").forEach((input) => {
        // Clear errors while the user types again.
        input.addEventListener("input", () => {
            clearFieldError(input);
            status.hidden = true;
        });
    });

    document.querySelectorAll("[data-password-toggle]").forEach((button) => {
        // Show or hide the password with the eye toggle.
        button.addEventListener("click", () => {
            const input = document.getElementById(
                button.getAttribute("aria-controls"),
            );
            const visible = input.type === "password";
            input.type = visible ? "text" : "password";
            button.innerHTML =
                '<i data-feather="' +
                (visible ? "eye-off" : "eye") +
                '" aria-hidden="true"></i>';
            if (window.feather) window.feather.replace();
            button.setAttribute("aria-pressed", String(visible));
            button.setAttribute(
                "aria-label",
                visible ? "Hide password" : "Show password",
            );
        });
    });

    if (
        mode === "login" &&
        new URLSearchParams(window.location.search).get("created") === "1"
    ) {
        showStatus(
            "Your account is ready. Sign in with your email and password.",
            "success",
        );
    }

    // Validate the sign-in or sign-up form and route to the next page.
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (submit.disabled) return;
        status.hidden = true;
        let firstInvalid;
        for (const input of form.querySelectorAll("input")) {
            clearFieldError(input);
            let message = "";
            if (!input.value.trim())
                message = "Enter your " + input.dataset.label + ".";
            else if (input.validity.typeMismatch)
                message = "Enter a valid email address.";
            else if (
                mode === "signup" &&
                input === password &&
                !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9\s]).{8,}$/.test(
                    input.value,
                )
            ) {
                message =
                    "Use at least 8 characters with uppercase and lowercase letters, a number, and a symbol.";
            }
            if (message) {
                showFieldError(input, message);
                firstInvalid ||= input;
            }
        }
        if (firstInvalid) {
            showStatus("Check the highlighted fields and try again.");
            firstInvalid.focus();
            return;
        }

        try {
            const address = email.value.trim().toLowerCase();
            if (mode === "signup") {
                const users = readList("users");
                if (users.some((user) => user.email.toLowerCase() === address)) {
                    showFieldError(
                        email,
                        "An account with this email already exists. Sign in instead.",
                    );
                    email.focus();
                    return;
                }
                users.push({
                    firstName: form.elements.firstName.value.trim(),
                    lastName: form.elements.lastName.value.trim(),
                    email: address,
                    password: password.value,
                });
                storeUserMessage(address, {
                    id: Date.now(),
                    sender: "Admin",
                    subject: "Welcome to iHub Nigeria!",
                    body: "Your account is ready. Explore our Apple products and support services.",
                });
                localStorage.setItem("users", JSON.stringify(users));
                complete(
                    "Account created. Opening sign in…",
                    "member_login.html?created=1",
                );
                return;
            }

            const isAdmin = mode === "admin";
            // Preserve the existing local demo administrator account.
            if (isAdmin && !localStorage.getItem("adminDetails")) {
                localStorage.setItem(
                    "adminDetails",
                    JSON.stringify([
                        { email: "admin@ihubnigeria.com", password: "ihubadmin" },
                    ]),
                );
            }
            const accounts = readList(isAdmin ? "adminDetails" : "users");
            const account = accounts.find(
                (user) =>
                    user.email.toLowerCase() === address &&
                    user.password === password.value,
            );
            if (!account) {
                showStatus(
                    "The email or password is incorrect. Check your details and try again.",
                );
                password.focus();
                return;
            }
            if (isAdmin) {
                localStorage.setItem("adminEmail", account.email);
                localStorage.setItem("isAdminLoggedIn", "true");
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("createProfile");
                localStorage.removeItem("userEmail");
            } else {
                localStorage.setItem("userEmail", account.email);
                localStorage.setItem("createProfile", JSON.stringify(account));
                localStorage.setItem("isLoggedIn", "true");
                localStorage.removeItem("isAdminLoggedIn");
                localStorage.removeItem("adminEmail");
            }
            complete(
                "Signed in. Opening " +
                (isAdmin ? "your dashboard" : "the store") +
                "…",
                isAdmin ? "admin.html" : "../../index.html",
            );
        } catch {
            showStatus(
                "We could not access your saved account. Allow site storage in your browser and try again. If this continues, contact support.",
            );
        }
    });

    // Disable the form, show the outcome, then redirect.
    function complete(message, destination) {
        submit.disabled = true;
        submit.setAttribute("aria-busy", "true");
        submit.textContent = "Please wait…";
        showStatus(message, "success");
        window.setTimeout(() => {
            window.location.href = destination;
        }, 600);
    }
});
