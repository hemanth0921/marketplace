document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputs = document.querySelectorAll("input");

    const data = {
        full_name: inputs[0].value,
        email: inputs[1].value,
        password: inputs[3].value,
        role: "customer"
    };

    try {
        const response = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            alert("✅ Registration Successful!");
            window.location.href = "/login";
        } else {
            alert(result.detail || "Registration Failed");
        }

    } catch (error) {
        alert("Server Error");
        console.error(error);
    }
});
