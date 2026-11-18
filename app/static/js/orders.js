loadOrders();

function loadOrders(){

    fetch("/orders")
    .then(response => response.json())
    .then(showOrders)
    .catch(error => console.log(error));

}

function showOrders(data){

    let html = "";

    data.forEach(order => {

        html += `
        <div class="order-card">

            <h3>Order ID: ${order.id}</h3>

            <p>Product: ${order.product_name}</p>

            <p>Quantity: ${order.quantity}</p>

            <p>Total: ₹${order.total_price}</p>

            <p class="status">
                Status: ${order.status}
            </p>

        </div>
        `;

    });

    document.getElementById("orders-list").innerHTML = html;
}