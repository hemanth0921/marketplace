loadWishlist();

function loadWishlist(){

    fetch("/wishlist")

    .then(response => response.json())

    .then(showWishlist)

    .catch(error => console.log(error));

}

function showWishlist(data){

    let html = "";

    data.forEach(item => {

        html += `
        <div class="wishlist-card">

            <img src="${item.image_url}">

            <h3>${item.product_name}</h3>

            <p>₹${item.price}</p>

            <button
                class="remove-btn"
            >
                Remove
            </button>

        </div>
        `;
    });

    document.getElementById(
        "wishlist-items"
    ).innerHTML = html;
}