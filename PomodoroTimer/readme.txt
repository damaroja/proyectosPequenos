


Este proyecto usa la funcion startTimer para manejar el objeto setInterval

  function startTimer() {
    interval = setInterval(() => {
        timeLeft--;
        updateTimer();
    }, 1000);
    start.disabled = true;
}

Para congelar el timer, usamos la funcion clearInterval(interval) con el paramatro interval 
de SetInterval

  function stopTimer() {
    clearInterval(interval);
    start.disabled = false;
}

Para resetear el timer, usamos stopTimer


