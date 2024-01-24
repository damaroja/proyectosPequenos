




const buttons = document.querySelectorAll('button');
const playerScoreText = document.querySelector('#user-score');
const computerScoreText = document.querySelector('#computer-score');


let playerScore = 0
let computerScore = 0


buttons.forEach(button => {
    
    button.addEventListener('click', () => {
        const result = playRound(button.id, computerPlay());
        if (result === 'win') {
            playerScoreText.textContent = ''
            playerScoreText.textContent = parseInt(playerScore) ;
            return
        } else if (result === 'lose') {
            computerScoreText.textContent = ''
            computerScoreText.textContent = parseInt(computerScore)
            return
        }
        return
    });
});


const computerPlay = () => {
    const options = ['rock', 'paper', 'scissor'];
    const random = Math.floor(Math.random() * options.length);
    return options[random];
}

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
