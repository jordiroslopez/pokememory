import { loginUser } from "../services/userService.js";

export function initializeLogin() {
    const form = document.getElementById("user-form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const username = formData.get("username");
        const email = formData.get("email");

        try {
            const userId = await loginUser(username, email);

            // GUARDAR IDENTIFICADOR DEL USUARIO
            sessionStorage.setItem("user", userId);

            window.location.reload();
        } catch (error) {
            console.error("Error iniciando sesión:", error);
        }
    });
}

export function initializeLogout() {
    const formLogout = document.getElementById("logout-form");

    formLogout.addEventListener("submit", (event) => {
        event.preventDefault();

        sessionStorage.removeItem("user"); // BORRAR USER DE SESSIONSTORAGE
        window.location.reload();
    });
}