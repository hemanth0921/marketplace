loadProfile();

function loadProfile(){

    fetch("/users/1")

    .then(response => response.json())

    .then(user => {

        document.getElementById("username").innerText =
            user.username;

        document.getElementById("email").innerText =
            user.email;

        document.getElementById("phone").innerText =
            user.phone || "Not Added";

        document.getElementById("address").innerText =
            user.address || "Not Added";

    })

    .catch(error => console.log(error));

}
