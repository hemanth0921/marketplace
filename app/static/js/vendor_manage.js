console.log("vendor_manage.js loaded");

window.onload = function () {
    console.log("Vendor Dashboard Ready");
};

function showDashboard() {
    document.getElementById("content-area").innerHTML = `
        <h2>Dashboard Overview</h2>
        <p>Welcome to Vendor Dashboard 🚀</p>
    `;
}

async function loadProducts() {

    console.log("Products Clicked");

    try {

        const response = await fetch("/products/");
        const products = await response.json();

        console.log(products);

        let html = `
            <h2 style="color:white; margin-bottom:20px;">
                📦 Products Management
            </h2>

            <div style="
                background:white;
                padding:20px;
                border-radius:15px;
                overflow:auto;
            ">

            <table style="
                width:100%;
                border-collapse:collapse;
                color:black;
            ">
                <thead>
                    <tr style="
                        background:#667eea;
                        color:white;
                    ">
                        <th style="padding:12px;">Image</th>
                        <th style="padding:12px;">Name</th>
                        <th style="padding:12px;">Price</th>
                        <th style="padding:12px;">Stock</th>
                        <th style="padding:12px;">Category</th>
                        <th style="padding:12px;">Actions</th>
                    </tr>
                </thead>

                <tbody>
        `;

        products.forEach(product => {

            html += `
                <tr style="border-bottom:1px solid #ddd;">

                    <td style="padding:10px;">
                        <img
                           src="${product.image_url ? product.image_url : 'https://via.placeholder.com/80'}" 
                            width="70"
                            height="70"
                            style="
                                border-radius:8px;
                                object-fit:cover;
                            "
                        >
                    </td>

                    <td>${product.name}</td>

                    <td>₹${product.price}</td>

                    <td>${product.stock}</td>

                    <td>${product.category || "N/A"}</td>

                    <td>

                        <button
                            onclick="editProduct(${product.id})"
                            style="
                                background:#ffc107;
                                border:none;
                                padding:8px 12px;
                                border-radius:6px;
                                cursor:pointer;
                                margin-right:5px;
                            "
                        >
                            Edit
                        </button>

                        <button
                            onclick="deleteProduct(${product.id})"
                            style="
                                background:#dc3545;
                                color:white;
                                border:none;
                                padding:8px 12px;
                                border-radius:6px;
                                cursor:pointer;
                            "
                        >
                            Delete
                        </button>

                    </td>

                </tr>
            `;
        });

        html += `
                </tbody>
            </table>

            </div>
        `;

        document.getElementById("content-area").innerHTML = html;

    } catch (error) {

        console.error(error);

        document.getElementById("content-area").innerHTML = `
            <h3 style="color:red;">
                Failed To Load Products
            </h3>
        `;
    }
}

async function editProduct(productId) {

    try {

        const response =
            await fetch(`/products/${productId}`);

        const product =
            await response.json();

        const newName =
            prompt(
                "Enter Product Name",
                product.name
            );

        if (!newName) return;

        const updatedProduct = {
            name: newName,
            description: product.description,
            price: product.price,
            stock: product.stock,
            category: product.category,
            image_url: product.image_url
        };

        const updateResponse = await fetch(
            `/products/${productId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type":
                    "application/json"
                },
                body: JSON.stringify(
                    updatedProduct
                )
            }
        );

        if (updateResponse.ok) {

            alert("✅ Product Updated");
            loadProducts();

        } else {

            alert("❌ Update Failed");
        }

    } catch (error) {

        console.error(error);
        alert("❌ Update Failed");
    }
}

function deleteProduct(productId) {

    if (!confirm(
        "Delete this product?"
    )) {
        return;
    }

    fetch(`/products/${productId}`, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {

        alert("✅ Product Deleted");

        loadProducts();
    })
    .catch(error => {

        console.error(error);

        alert("❌ Delete Failed");
    });
}

function loadOrders() {

    document.getElementById("content-area").innerHTML = `
        <h2>📦 Orders</h2>
        <p>Orders section coming soon.</p>
    `;
}

function loadRevenue() {

    document.getElementById("content-area").innerHTML = `
        <h2>💰 Revenue Analytics</h2>
        <p>Total Revenue: ₹2,45,000</p>
    `;
}

function loadReviews() {

    document.getElementById("content-area").innerHTML = `
        <h2>⭐ Customer Reviews</h2>
        <p>Reviews section coming soon.</p>
    `;
}

function loadSettings() {

    document.getElementById("content-area").innerHTML = `
        <h2>⚙️ Settings</h2>
        <p>Vendor settings page.</p>
    `;
}