import { POKEBALL_PNG } from "../config/config.js";

const ID_MAX = 100;

let firstCard = null;
let secondCard = null;
let canSelect = true;
let currentCards = 0;

function randomNumber() {
    return Math.floor((Math.random() * ID_MAX)+1);
}

export function generateCards(n_cards) {
    const board = document.getElementById("game-board");

    currentCards = n_cards;

    let cards = [];

    // GENERAR ID CARTAS ALEATORIAS
    let idValues = [];
    for (let i = 0; i < n_cards/2; i++) {
        let aux = randomNumber();

        while (idValues.includes(aux)) {
            idValues.pop();
            aux = randomNumber();
            idValues.push(aux);
        }

        idValues.push(aux);
    }

    // GENERAR PAREJAS POKEMON
    for (let i = 0; i < n_cards / 2; i++) {
        const pokemonId = idValues[i];

        cards.push(pokemonId, pokemonId);
    }

    // MEZCLAR CARTAS
    cards.sort(() => Math.random() - 0.5);

    // CREAR CARTAS
    board.innerHTML = cards.map((id, index) => `
        <button
            class="memory-card"
            data-id="${id}"
            data-index="${index}"
            type="button">
        </button>
    `).join("");

    board.style.display = "grid";

    firstCard = null;
    secondCard = null;
    canSelect = true;
}

export function detectCards(onFinish) {
    const board = document.getElementById("game-board");

    board.addEventListener("click", (event) => {
        const card = event.target.closest(".memory-card");

        if (
            !card ||
            !canSelect ||
            card.classList.contains("matched") ||
            card === firstCard
        ) {
            return;
        }

        // MOSTRAR IMAGEN POKEMON
        const pokemonId = card.dataset.id;

        card.style.backgroundImage = `url("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png")`;
        card.style.backgroundSize = "contain";
        card.style.backgroundPosition = "center";
        card.style.backgroundRepeat = "no-repeat";
        
        card.classList.add("revealed", "flipped");

        if (firstCard === null) {
            firstCard = card;
            return;
        }

        secondCard = card;
        canSelect = false;

        // COMPROBAR SI SON IGUALES
        if (firstCard.dataset.id === secondCard.dataset.id) {

            firstCard.classList.add("matched");
            secondCard.classList.add("matched");

            firstCard = null;
            secondCard = null;

            canSelect = true;

            // COMPROBAR SI SE HA COMPLETADO LA PARTIDA
            const matchedCards = document.querySelectorAll(
                ".memory-card.matched"
            );

            if (matchedCards.length === currentCards) {
                onFinish();
            }

        } else {

            // VOLVER A MOSTRAR LA POKEBALL
            setTimeout(() => {
                firstCard.style.backgroundImage =
                    `url('${POKEBALL_PNG}')`;

                secondCard.style.backgroundImage =
                    `url('${POKEBALL_PNG}')`;

                firstCard.classList.remove("revealed", "flipped");
                secondCard.classList.remove("revealed", "flipped");

                firstCard = null;
                secondCard = null;

                canSelect = true;

            }, 1000);
        }
    });
}