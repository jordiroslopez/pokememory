import './style.css'

const DB_URL = "https://pokememory-64550-default-rtdb.europe-west1.firebasedatabase.app";

const registro = document.getElementById("registro");
let userId = sessionStorage.getItem("user");

console.log(userId);

if (userId) {
    registro.innerHTML = `
        <h1>Bienvenido a PokeMemory</h1>
    `;
} else {
    const form = document.getElementById("user-form");

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const username = formData.get("username");
        const email = formData.get("email");

        try {
            // COMPROBAR SI EXISTE EL EMAIL

            const response = await fetch(
                `${DB_URL}/usuarios.json?orderBy="email"&equalTo="${encodeURIComponent(email)}"`
            );

            if (!response.ok) {
                throw new Error("Error consultando Firebase: " + response.status);
            }

            const usuarios = await response.json();

            if (usuarios && Object.keys(usuarios).length > 0) { // EL USUARIO YA EXISTE
                
                userId = Object.keys(usuarios)[0];

                // ACTUALIZAR USERNAME
                const updateResponse = await fetch(
                    `${DB_URL}/usuarios/${userId}.json`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            nickname: username
                        })
                    }
                );

                if (!updateResponse.ok) {
                    throw new Error("Error actualizando el usuario");
                }

                console.log("Usuario actualizado correctamente")

            } else { // REGISTRAR NUEVO USUARIO EN REALTIME DATABASE
                const registerResponse = await fetch(`${DB_URL}/usuarios.json`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        nickname: username
                    })
                });

                if (!registerResponse.ok) {
                    throw new Error("Error guardando el usuario");
                }

                const data = await registerResponse.json();

                userId = data.name;
            }

            sessionStorage.setItem("user", userId); // GUARDAR ID EN SESSION STORAGE
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    });
}