document.addEventListener("DOMContentLoaded", () => {

    const productForm = document.getElementById("productForm");

    productForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const productData = {

            name: document.getElementById("name").value,

            description:
            document.getElementById("description").value,

            price: parseFloat(
                document.getElementById("price").value
            ),

            stock: parseInt(
                document.getElementById("stock").value
            ),

            image_url:
            document.getElementById("image_url").value
        };

        try {

            const response = await fetch(
                "/products",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(productData)
                }
            );

            if (response.ok) {

                alert("✅ Product Added Successfully");

                productForm.reset();

            } else {

                const error =
                    await response.text();

                console.log(error);

                alert("❌ Failed To Add Product");
            }

        } catch (error) {

            console.error(error);

            alert("❌ Server Error");
        }

    });

});