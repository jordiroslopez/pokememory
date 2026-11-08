import { DB_URL } from "../config/config.js";

export async function getData(path) {
    const [resource, query] = path.split("?");
    const url = `${DB_URL}/${resource}.json${query ? `?${query}` : ""}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error consultando Firebase: ${response.status}`);
    }

    return await response.json();
}

export async function postData(path, data) {
    const response = await fetch(`${DB_URL}/${path}.json`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`Error guardando datos: ${response.status}`);
    }

    return await response.json();
}

export async function patchData(path, data) {
    const response = await fetch(`${DB_URL}/${path}.json`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`Error actualizando datos: ${response.status}`);
    }

    return await response.json();
}