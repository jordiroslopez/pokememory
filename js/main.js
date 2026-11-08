import "./style.css";

import { renderGame } from "./ui/templates.js";
import { initializeLogin, initializeLogout } from "./auth/auth.js";
import { initializeGame } from "./game/game.js";
import { loadRanking } from "./ui/rankingView.js";

// CONTENEDOR PRINCIPAL
const registro = document.getElementById("registro");

// COMPROBAR SESIÓN
const userId = sessionStorage.getItem("user");

if (userId) {
    // MOSTRAR VISTA DEL JUEGO
    renderGame(registro);

    // INICIALIZAR FUNCIONALIDADES
    initializeGame(userId);
    initializeLogout();

    // CARGAR RANKING
    loadRanking();
} else {
    // MOSTRAR Y CONFIGURAR LOGIN
    initializeLogin();
}