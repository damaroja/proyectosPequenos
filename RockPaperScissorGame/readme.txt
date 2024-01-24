



Esta app posee manejo de caracteres especiales: 


        <button id="rock">&#x1f44a</button>
        <button id="paper">&#x1f590</button>
        <button id="scissor">&#x270c</button>


Para generar manos para el juego. La funcion computerPlay genera de forma aleatoria 
un movimiento: 
  const computerPlay = () => {
    const options = ['rock', 'paper', 'scissor'];
    const random = Math.floor(Math.random() * options.length);
    return options[random];
}

Es decir, escoge de forma aleatoria una opcion entre las que posee el array

El Humano escoge la opcoion que desea y se transforma en un identificador tipo:
  scissor
  paper
  rock

Despues a través de la funcion playRound se comparan las opciones escogidas 
por ambos y se genera una respuesta:



  const playRound = (playerSelection, computerSelection) => {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();
    if (playerSelection === computerSelection) {
        return 'tie';
    } else if (playerSelection === 'rock' && computerSelection === 'scissor') {
        playerScore++;
        return 'win';
    } else if (playerSelection === 'paper' && computerSelection === 'rock') {
        playerScore++;
        return 'win';
    } else if (playerSelection === 'scissor' && computerSelection === 'paper') {
        playerScore++;
        return 'win';
    } else {
        computerScore++;
        return 'lose';
    }
}

A su vez actualizamos los contadores: 
  let playerScore = 0
  let computerScore = 0

Y lo mostramos por pantalla




