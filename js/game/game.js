import { MAX_CARDS } from "../config/config.js";
import { generateCards, detectCards } from "./cards.js";

import {
    startTimer,
    stopTimer,
    getElapsedTime
} from "./timer.js";

import { saveRecord } from "../services/rankingService.js";
import { loadRanking } from "../ui/rankingView.js";

let currentCards = 0;
let gameFinished = false;
let userId = null;
let newRecordId = null;

async function finishGame() {
    if (gameFinished) return;

    gameFinished = true;

    stopTimer();

    const totalTime = getElapsedTime();

    try {

        // GUARDAR RESULTADO
        const data = await saveRecord(
            userId,
            totalTime,
            currentCards
        );

        // IDENTIFICADOR DEL NUEVO REGISTRO
        newRecordId = data.name;

        // ACTUALIZAR RANKING
        await loadRanking(newRecordId);

    } catch (error) {
        console.error("Error guardando la partida:", error);

        document.getElementById("modal").textContent =
            "No se ha podido guardar la partida.";
    }
}

export function initializeGame(currentUserId) {
    userId = currentUserId;

    detectCards(finishGame);

    const formCards = document.getElementById("game-form");
    const modal = document.getElementById("modal");

    formCards.addEventListener("click", (event) => {
        event.preventDefault();

        if (event.target.id !== "play-btn") return;

        const data = new FormData(formCards);
        const n_cards = Number(data.get("cards-number"));

        // VALIDAR NUMERO DE CARTAS
        if (!Number.isInteger(n_cards)) {
            modal.textContent = "El número de cartas debe ser entero.";
            return;
        }

        if (n_cards < 2) {
            modal.textContent = "El número de cartas debe ser como mínimo 2.";
            return;
        }

        if (n_cards % 2 !== 0) {
            modal.textContent = "El número de cartas debe ser par.";
            return;
        }

        if (n_cards > MAX_CARDS) {
            modal.textContent =
                `El número de cartas debe ser entre 2 y ${MAX_CARDS}.`;

            return;
        }

        modal.textContent = "";

        // CONFIGURAR PARTIDA
        currentCards = n_cards;
        gameFinished = false;

        // INICIAR PARTIDA
        generateCards(n_cards);
        document.getElementById("play-btn").textContent = "Jugar de nuevo";
        startTimer();
    });
}