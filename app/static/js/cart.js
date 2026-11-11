loadCart();

function loadCart(){

    fetch("/cart")

    .then(response => response.json())

    .then(showCart)

    .catch(error => console.log(error));

}

function showCart(data){

    let cartHTML = "";

    let total = 0;

    data.forEach(item => {

        total += item.price * item.quantity;

        cartHTML += `
        <div class="cart-item">

            <img src="${item.image_url}">

            <div class="product-details">

                <h3>${item.product_name}</h3>

                <p>Quantity: ${item.quantity}</p>

                <div class="price">
                    ₹${item.price}
                </div>

            </div>

            <button class="remove-btn">
                Remove
            </button>

        </div>
        `;
    });

    document.getElementById("cart-items").innerHTML = cartHTML;

    document.getElementById("total-price").innerText =
        "Total : ₹" + total;
}