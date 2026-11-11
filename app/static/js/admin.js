loadDashboard();

function loadDashboard(){

    fetch("/admin/stats")

    .then(response => response.json())

    .then(data => {

        document.getElementById(
            "users-count"
        ).innerText = data.users;

        document.getElementById(
            "products-count"
        ).innerText = data.products;

        document.getElementById(
            "orders-count"
        ).innerText = data.orders;

        document.getElementById(
            "revenue"
        ).innerText =
        "₹" + data.revenue;

    })

    .catch(error => console.log(error));

}