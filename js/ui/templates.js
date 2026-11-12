export function renderGame(registro) {

    registro.innerHTML = `
        <div class="game-page">
            <div id="izquierda" class="seccion">
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
                            max="18"
                        >
                        <button id="play-btn" type="button">
                            Jugar
                        </button>
                    </form>
                </div>
            </div>
            <div id="derecha">
                <div id="seccion-logout">
                    <form id="logout-form">
                        <button id="logout-btn" type="submit">LOGOUT</button>
                    </form>
                </div>
                <div id="seccion-formulario" class="seccion">
                    <div id="ranking"></div>
                    <tag id="modal"></tag>
                </div>
            </div>
        </div>
    `;
}