import { getData, postData } from "./database.js";

export async function saveRecord(userId, time, cards) {
    return await postData("ranking", {
        userId: userId,
        time: time,
        cards: cards
    });
}

export async function getRankingData() {
    const records = await getData("ranking");
    const users = await getData("usuarios");

    return {
        records,
        users
    };
}