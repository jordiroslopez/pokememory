let minutos = 0;
let segundos = 0;
let timerInterval = null;

function timer() {
    segundos++;

    if (segundos >= 60) {
        segundos = 0;
        minutos++;
    }

    document.getElementById("timer").textContent =
        `${minutos}m ${segundos}s`;
}

export function startTimer() {
    minutos = 0;
    segundos = 0;

    clearInterval(timerInterval);

    document.getElementById("timer").textContent = "0m 0s";

    timerInterval = setInterval(timer, 1000);
}

export function stopTimer() {
    clearInterval(timerInterval);
}

export function getElapsedTime() {
    return minutos * 60 + segundos;
}