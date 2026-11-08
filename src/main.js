import './style.css'

const DB_URL = "https://pokememory-64550-default-rtdb.europe-west1.firebasedatabase.app";
const POKEBALL_PNG = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";

const registro = document.getElementById("registro");

let minutos = 0;
let segundos = 0;
let userId = sessionStorage.getItem("user");
let timerInterval = null;
let firstCard = null;
let secondCard = null;
let canSelect = true;

// CONTADOR DE TIEMPO DESDE QUE INICAIA LA PARTIDA
function timer() {
    segundos++;

    if (segundos >= 60) {
        segundos = 0;
        minutos++;
    }

    document.getElementById("timer").textContent = `${minutos}m ${segundos}s`;
}

// INICIAR CONTADOR
function startTimer() {
    minutos = 0;
    segundos = 0;

    clearInterval(timerInterval);

    timerInterval = setInterval(timer, 1000); // EJECUTAR timer() CADA SEGUNDO EN SEGUNDO PLANO
}

// GENERAR CARTAS
function generateCards(n_cards) {
    const board = document.getElementById("game-board");

    let cards = [];

    // GENERAR PAREJAS POKEMON
    for (let i = 0; i < n_cards / 2; i++) {
        const pokemonId = i + 1;
        cards.push(pokemonId, pokemonId);
    }

    // MEZCLAR LAS CARTAS
    cards.sort(() => Math.random() - 0.5);

    // CREAR LAS CARTAS
    board.innerHTML = cards.map((id, index) => `
        <button class="memory-card" data-id="${id}" data-index="${index}" type="button"></button>
    `).join("");

    board.style.display = "grid";
}

// DETECTAR PULSACIÓN EN CARTA
function detectCards() {
    const board = document.getElementById("game-board");

    board.addEventListener("click", (event) => {
        const card = event.target.closest(".memory-card");

        if (!card || !canSelect || card.classList.contains("matched") ||
            card === firstCard) {
            return;
        }

        // MOSTRAR IMAGEN POKEMON
        card.style.backgroundImage =
            `url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${card.dataset.id}.png')`;

        card.classList.add("revealed", "flipped");

        if (firstCard === null) {
            firstCard = card;
            return;
        }

        secondCard = card;
        canSelect = false;

        // COMPROBAR SI LAS CARTAS SELECCIONADAS SON IGUALES
        if (firstCard.dataset.id === secondCard.dataset.id) {

            firstCard.classList.add("matched");
            secondCard.classList.add("matched");

            firstCard = null;
            secondCard = null;
            canSelect = true;

        } else { // MOSTRAR POKEBALL EN CARTA
            setTimeout(() => {
                firstCard.style.backgroundImage = `url('${POKEBALL_PNG}')`;
                secondCard.style.backgroundImage = `url('${POKEBALL_PNG}')`;

                firstCard.classList.remove("revealed", "flipped");
                secondCard.classList.remove("revealed", "flipped");

                firstCard = null;
                secondCard = null;
                canSelect = true;
            }, 1000);
        }
    });
}

if (userId) {
    registro.innerHTML = `
    <div class="game-page">
        <div id="derecha" class="seccion">
            <div id="timer">0m 0s</div>

            <div id="game-board"></div>

            <div id="form-cards">
                <form id="game-form">
                    <input
                        id="cards-number"
                        name="cards-number"
                        placeholder="Cartas"
                        type="number"
                        min="2"
                        max="24"
                    >
                    <button id="play-btn" type="button">Jugar</button>
                </form>
            </div>
        </div>
        <div id="izquierda">
            <div id="seccion-logout">
                <form id="logout-form">
                    <button id="logout-btn" type="click">LOGOUT</button>
                </form>
            </div>
            <div id="seccion-formulario" class="seccion">
                <div class="instrucciones">RANKING</div>
                <tag id="modal"></tag>
            </div>
        </div>
    </div>
    `;

    detectCards();
    
    const formLogout = document.getElementById("logout-form");

    formLogout.addEventListener('click', async (event) => {
        event.preventDefault();

        // BORRAR USUARIO DE SESSIONSTORAGE Y REFRESCAR VENTANA
        if (event.target.id === "logout-btn") {
            sessionStorage.removeItem("user");
            window.location.reload();
            return true;
        }
    })

    const formCards = document.getElementById("game-form");
    const modal = document.getElementById("modal");

    formCards.addEventListener('click', (event) => {
        event.preventDefault();

        if (event.target.id === "play-btn") {
            const data = new FormData(formCards);
            const n_cards = Number(data.get("cards-number"));

            // VERIFICAR QUE EL NÚMERO DE CARTAS ES VÁLIDO

            if (!Number.isInteger(n_cards)) {
                modal.innerHTML = "El número de cartas debe ser entero.";
                return;
            }

            if (n_cards < 2) {
                modal.innerHTML = "El número de cartas debe ser como mínimo 2.";
                return;
            }

            if (n_cards % 2 !== 0) {
                modal.innerHTML = "El número de cartas debe ser par.";
                return;
            }

            if (n_cards < 2 || n_cards > 24) {
                modal.innerHTML = " El número de cartas debe ser entre 2 y 24."
                return;
            }

            modal.innerHTML = "";

            // REINICIAR ESTADO DE LAS CARTAS
            firstCard = null;
            secondCard = null;
            canSelect = true;

            // INICIAR PARTIDA
            generateCards(n_cards);
            startTimer();
        }
    });
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