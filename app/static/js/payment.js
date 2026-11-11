function payNow(){

    fetch("/payments", {

        method:"POST"

    })

    .then(response => response.json())

    .then(data => {

        alert("✅ Payment Successful");

    })

    .catch(error => {

        console.log(error);

    });

}