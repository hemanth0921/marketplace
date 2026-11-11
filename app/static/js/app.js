// Load Products

loadProducts();

// Toast Notification

function showToast(message){

    const toast =
    document.getElementById("toast");

    if(!toast) return;

    toast.innerText = message;

    toast.style.display = "block";

    setTimeout(() => {

        toast.style.display = "none";

    },3000);

}

// Load Products

function loadProducts() {

    fetch("/products")

        .then(response => response.json())

        .then(showProducts)

        .catch(error => {

            console.log(error);

            showToast("❌ Failed To Load Products");

        });

}

// Display Products

function showProducts(data) {

    let products = "";

    data.forEach(product => {

        products += `
        <div class="card">

            <img
                src="${product.image_url || 'https://via.placeholder.com/250'}"
                onerror="this.src='https://via.placeholder.com/250'"
                alt="Product"
            >

            <div class="card-content">

                <span class="badge">
                    Trending
                </span>

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <h4>₹${product.price}</h4>

                <button onclick="addToCart(${product.id})">
                    🛒 Add To Cart
                </button>

            </div>

        </div>
        `;

    });

    document.getElementById("products").innerHTML =
        products;

}

// Search Products

function searchProducts() {

    let searchValue =
        document.getElementById("search").value;

    fetch(`/products?search=${searchValue}`)

        .then(response => response.json())

        .then(showProducts)

        .catch(error => {

            console.log(error);

            showToast("❌ Search Failed");

        });

}

// Add To Cart

function addToCart(productId) {

    fetch("/cart", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            user_id: 1,

            product_id: productId,

            quantity: 1

        })

    })

    .then(response => response.json())

    .then(data => {

        console.log(data);

        updateCartCount();

        showToast("✅ Product Added To Cart");

    })

    .catch(error => {

        console.log(error);

        showToast("❌ Failed To Add Product");

    });

}

// Live Cart Counter

function updateCartCount(){

    let cartCount =
        document.getElementById("cart-count");

    if(!cartCount) return;

    let current =
        parseInt(cartCount.innerText);

    cartCount.innerText = current + 1;

}

// Dark Mode

function toggleDarkMode(){

    document.body.classList.toggle(
        "dark-mode"
    );

}