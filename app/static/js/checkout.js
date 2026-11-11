function placeOrder(){

    fetch("/orders", {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            user_id:1
        })

    })

    .then(response => response.json())

    .then(data => {

        alert("✅ Order Placed Successfully");

        window.location.href =
        "/payment-page";

    })

    .catch(error => {

        console.log(error);

        alert("❌ Failed");

    });

}