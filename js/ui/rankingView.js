import { TOP_RANKING } from "../config/config.js";
import { getRankingData } from "../services/rankingService.js";

export async function loadRanking(highlightId = null) {
    const ranking = document.getElementById("ranking");

    try {
        // RECUPERAR PARTIDAS Y USUARIOS
        const { records, users } = await getRankingData();

        if (!records) {
            ranking.innerHTML = "<p></p>";

            return;
        }

        // CONVERTIR OBJETO A ARRAY
        let results = Object.entries(records).map(([id, record]) => {
            const user = users?.[record.userId];

            return {
                id: id,
                username: user?.nickname ?? "Desconocido",
                email: user?.email ?? "Desconocido",
                time: Number(record.time),
                cards: Number(record.cards)
            };
        });

        // ORDENAR CARTAS DESCENDENTE Y TIEMPO ASCENDENTE
        results.sort((a, b) => {
            return b.cards - a.cards || a.time - b.time;
        });

        // DETERMINAR REGISTROS VISIBLES
        let visibleRecords = [];

        if (results.length <= TOP_RANKING) {
            visibleRecords = results;
        } else {
            const newIndex = results.findIndex(
                record => record.id === highlightId
            );

            if (newIndex >= 0 && newIndex < TOP_RANKING) {
                visibleRecords = results.slice(0, TOP_RANKING);
            } else if (newIndex >= TOP_RANKING) {
                visibleRecords = [
                    ...results.slice(0, TOP_RANKING),
                    null,
                    results[newIndex],
                    null
                ];
            } else {
                visibleRecords = [
                    ...results.slice(0, TOP_RANKING),
                    null
                ];
            }
        }

        // GENERAR TABLA HTML
        ranking.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Posición</th>
                        <th>Username</th>
                        <th>Mail</th>
                        <th>Tiempos</th>
                        <th>Cartas</th>
                    </tr>
                </thead>
                <tbody>
                    ${visibleRecords.map((record) => {
                        if (record === null) {
                            return `
                                <tr>
                                    <td colspan="5">...</td>
                                </tr>
                            `;
                        }

                        const position = results.indexOf(record) + 1;

                        return `
                            <tr class="${record.id === highlightId ? "highlight" : ""}">
                                <td>${position}</td>
                                <td>${record.username}</td>
                                <td>${record.email}</td>
                                <td>
                                    ${Math.floor(record.time / 60)}m
                                    ${record.time % 60}s
                                </td>
                                <td>${record.cards}</td>
                            </tr>
                        `;
                    }).join("")}
                </tbody>
            </table>
        `;
    } catch (error) {
        console.error("Error cargando el ranking:", error);
        ranking.innerHTML = "Error cargando el ranking.";
    }
}