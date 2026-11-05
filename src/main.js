import './style.css'

let username, email
const form = document.getElementById("user-form");

form.addEventListener('submit', (event) => {
    const data = new FormData(form);
    username = data.get("username");
    email = data.get("email");

    console.log(username + " - " + email);
})
