console.log("Auth Page Loaded");
document
.getElementById("loginForm")
.addEventListener("submit", loginUser);

function loginUser(e){

    e.preventDefault();

    let email =
        document.getElementById("email").value;

    let password =
        document.getElementById("password").value;

    fetch("/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email: email,
            password: password
        })

    })

    .then(response => response.json())

    .then(data => {

        alert("✅ Login Successful");

        console.log(data);

        window.location.href = "/";

    })

    .catch(error => {

        console.log(error);

        alert("❌ Login Failed");

    });

}

// REGISTER

const registerForm = document.getElementById("registerForm");

if(registerForm){

    registerForm.addEventListener("submit", registerUser);

}

function registerUser(e){

    e.preventDefault();

    let username =
        document.getElementById("username").value;

    let email =
        document.getElementById("email").value;

    let password =
        document.getElementById("password").value;

    fetch("/register", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })

    })

    .then(response => response.json())

    .then(data => {

        alert("✅ Registration Successful");

        console.log(data);

        window.location.href = "/login";

    })

    .catch(error => {

        console.log(error);

        alert("❌ Registration Failed");

    });

}