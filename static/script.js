const modal = document.getElementById("loginModal");
const openLogin = document.getElementById("openLogin");
const closeLogin = document.getElementById("closeLogin");
const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");
const submitButton = document.getElementById("submitButton");
const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

function showModal() {
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    document.getElementById("username").focus();
}

function hideModal() {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    message.textContent = "";
}

openLogin.addEventListener("click", showModal);
closeLogin.addEventListener("click", hideModal);

modal.addEventListener("click", (event) => {
    if (event.target === modal) hideModal();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) hideModal();
});

togglePassword.addEventListener("click", () => {
    const isPassword = password.type === "password";
    password.type = isPassword ? "text" : "password";
    togglePassword.textContent = isPassword ? "Hide" : "Show";
});

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    message.textContent = "";
    submitButton.disabled = true;
    submitButton.textContent = "Signing in...";

    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: document.getElementById("username").value.trim(),
                password: password.value
            })
        });

        const result = await response.json();

        if (response.ok && result.success) {
            window.location.href = result.redirect;
        } else {
            message.textContent = result.message || "Login failed.";
        }
    } catch {
        message.textContent = "Could not connect to the server.";
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Sign in";
    }
});
