import { getData, postData, patchData } from "./database.js";

export async function loginUser(username, email) {

    // BUSCAR USUARIO POR EMAIL
    const usuarios = await getData(
        `usuarios?orderBy="email"&equalTo="${encodeURIComponent(email)}"`
    );

    let userId;

    if (usuarios && Object.keys(usuarios).length > 0) {
        // EL USUARIO YA EXISTE
        userId = Object.keys(usuarios)[0];

        // ACTUALIZAR NICKNAME
        await patchData(`usuarios/${userId}`, {
            nickname: username
        });
        
    } else {

        // REGISTRAR NUEVO USUARIO
        const data = await postData("usuarios", {
            email: email,
            nickname: username
        });

        userId = data.name;
    }

    return userId;
}