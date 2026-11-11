loadProducts();

function loadProducts(){

    fetch("/products")

    .then(response => response.json())

    .then(showProducts)

    .catch(error => console.log(error));

}

function showProducts(data){

    let html = "";

    data.forEach(product => {

        html += `
        <div class="dashboard-card">

            <h3>${product.name}</h3>

            <p>${product.description}</p>

            <p>₹${product.price}</p>

            <button onclick="deleteProduct(${product.id})">
                Delete
            </button>

        </div>
        `;
    });

    document.getElementById(
        "products-list"
    ).innerHTML = html;
}

function deleteProduct(productId){

    fetch(`/products/${productId}`, {

        method: "DELETE"

    })

    .then(response => response.json())

    .then(data => {

        alert("✅ Product Deleted");

        loadProducts();

    })

    .catch(error => {

        console.log(error);

    });

}