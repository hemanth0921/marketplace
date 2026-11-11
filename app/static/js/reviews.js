document
.getElementById("reviewForm")
.addEventListener("submit", submitReview);

function submitReview(e){

    e.preventDefault();

    fetch("/reviews", {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            user_id:1,
            product_id:1,

            rating:
            parseInt(
            document.getElementById("rating").value
            ),

            comment:
            document.getElementById("comment").value

        })

    })

    .then(response => response.json())

    .then(data => {

        alert("✅ Review Added");

        loadReviews();

    });

}

function loadReviews(){

    fetch("/reviews")

    .then(response => response.json())

    .then(data => {

        let html = "";

        data.forEach(review => {

            html += `
            <div class="review-card">

                <h3>⭐ ${review.rating}/5</h3>

                <p>${review.comment}</p>

            </div>
            `;

        });

        document.getElementById(
        "reviews-list"
        ).innerHTML = html;

    });

}

loadReviews();