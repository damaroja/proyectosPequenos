



const start = document.querySelector('#start');
const stop = document.querySelector('#stop');
const reset = document.querySelector('#reset');
const timer = document.querySelector('#timer');


document.addEventListener('DOMContentLoaded', () => {
    start.addEventListener('click', startTimer);
    stop.addEventListener('click', stopTimer);
    reset.addEventListener('click', resetTimer);
    updateTimer();
});


let interval;
let timeLeft = 36000;
const audio = new Audio("https://manzdev.github.io/codevember2017/assets/eye-tiger.mp3");
audio.loop = true;
audio.controls = true;
function startTimer() {
    interval = setInterval(() => {
        timeLeft--;
        updateTimer();
    }, 1000);
    start.disabled = true;
}

function updateTimer(){
    if(timeLeft === 0) {
        stopTimer();
        audio.play();
    }
    let dias = Math.floor(timeLeft / 86400);
    let horas = Math.floor(timeLeft / 3600);
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let formatedTime = `${dias}d ${horas}h ${minutes}m ${seconds}s`;
    timer.textContent = formatedTime;

}

function stopTimer() {
    clearInterval(interval);
    start.disabled = false;
}

function resetTimer() {
    stopTimer();
    timeLeft = 5;
    updateTimer();
    audio.pause();
    audio.currentTime = 0;
}


