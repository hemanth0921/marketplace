function placeOrder() {

    fetch("/orders/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_id: 1,
            product_id: 1,
            quantity: 1
        })
    })

    .then(response => {
        if (!response.ok) {
            throw new Error("Order Failed");
        }
        return response.json();
    })

    .then(data => {

        console.log(data);

        alert("✅ Order Placed Successfully");

        window.location.href = "/payment-page";

    })

    .catch(error => {

        console.error(error);

        alert("❌ Failed To Place Order");

    });

}