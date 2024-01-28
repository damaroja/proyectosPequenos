





const start = document.querySelector('#start');
const stop = document.querySelector('#stop');
const reset = document.querySelector('#reset');



const horas = document.querySelector('#horas');
const minutos = document.querySelector('#minutos');
const segundos = document.querySelector('#segundos');
const milisegundos = document.querySelector('#milisegundos');

let timeInterval
let startTime = 0
let elapsedTime = 0

document.addEventListener('DOMContentLoaded', () => {
    start.addEventListener('click', startTimer)
    stop.addEventListener('click', stopTimer)
    reset.addEventListener('click', resetTimer)
    stop.disabled = true
    reset.disabled = true
    start.disabled = false
})


function startTimer() {
    startTime = Date.now() - elapsedTime
    timeInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime
        formatTime(elapsedTime)
    }, 10)
    start.disabled = true
    stop.disabled = false
    reset.disabled = false
}

const formatTime = (elapsedTime) => {
    milisegundos.textContent = (Math.floor(elapsedTime % 1000) / 10 > 9) ? Math.floor(elapsedTime % 1000) / 10 : '0' + Math.floor(elapsedTime % 1000) / 10
    segundos.textContent = (Math.floor(elapsedTime / 1000) % 60 > 9) ? Math.floor(elapsedTime / 1000) % 60 : '0' + Math.floor(elapsedTime / 1000) % 60
    minutos.textContent = Math.floor(elapsedTime / 60000) % 60 > 9 ? Math.floor(elapsedTime / 60000) % 60 : '0' + Math.floor(elapsedTime / 60000) % 60
    horas.textContent = Math.floor(elapsedTime / 3600000) % 60 > 9 ? Math.floor(elapsedTime / 3600000) % 60 : '0' + Math.floor(elapsedTime / 3600000) % 60
}


function stopTimer() {
    clearInterval(timeInterval)
    start.disabled = false
    stop.disabled = true
}


function resetTimer() {
    clearInterval(timeInterval)
    elapsedTime = 0
    formatTime(elapsedTime)
    start.disabled = false
    stop.disabled = true
    reset.disabled = true
}
