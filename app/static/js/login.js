const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const showPassword = document.getElementById("showPassword");
const loginBtn = document.getElementById("loginBtn");
const loginMessage = document.getElementById("loginMessage");
const rememberMe = document.getElementById("rememberMe");

/* Show Password */

if (showPassword) {

    showPassword.addEventListener("change", () => {

        if (showPassword.checked) {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }

    });

}

/* Remember Email */

window.addEventListener("load", () => {

    const savedEmail =
        localStorage.getItem("remember_email");

    if (savedEmail) {

        emailInput.value = savedEmail;

        if (rememberMe) {
            rememberMe.checked = true;
        }

    }

});

/* Login */

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    loginBtn.disabled = true;
    loginBtn.innerHTML = "Logging In...";

    loginMessage.innerHTML = "";

    const data = {

        email: emailInput.value.trim(),
        password: passwordInput.value

    };

    try {

        const response = await fetch("/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });

        const result = await response.json();

        if (response.ok) {

            if (rememberMe.checked) {

                localStorage.setItem(
                    "remember_email",
                    emailInput.value
                );

            } else {

                localStorage.removeItem(
                    "remember_email"
                );

            }

            localStorage.setItem(
                "token",
                result.access_token
            );

            loginMessage.innerHTML =
                "✅ Login Successful";

            loginMessage.style.color =
                "#22c55e";

            setTimeout(() => {

                window.location.href =
                    "/";

            }, 1000);

        } else {

            loginMessage.innerHTML =
                "❌ Invalid Email or Password";

            loginMessage.style.color =
                "#ef4444";

        }

    } catch (error) {

        console.error(error);

        loginMessage.innerHTML =
            "❌ Server Error";

        loginMessage.style.color =
            "#ef4444";

    }

    loginBtn.disabled = false;
    loginBtn.innerHTML = "Login";

});

/* Google Login Button */

const googleBtn =
document.getElementById("googleLogin");

if (googleBtn) {

    googleBtn.addEventListener("click", () => {

        alert(
            "🚀 Google Login Integration Coming Soon"
        );

    });

}

/* GitHub Login Button */

const githubBtn =
document.getElementById("githubLogin");

if (githubBtn) {

    githubBtn.addEventListener("click", () => {

        alert(
            "🚀 GitHub Login Integration Coming Soon"
        );

    });

}