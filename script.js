const images = Array.from(document.querySelectorAll('.choice__container--img'));
const message = document.querySelector('.score__result');
const scorePlayer = document.querySelector('.score__player');
const scoreComputer = document.querySelector('.score__computer');
const selectionPlayer = document.querySelector('.player__selection');
const selectionComputer = document.querySelector('.computer__selection');

let playerScore = 0;
let computerScore = 0;


images.forEach((image) =>
  image.addEventListener('click', () => {
    if (playerScore >= 5 || computerScore >= 5) {
      return;
    }
    game(image.dataset.image);
  })
);

/* Game Logic */

function getComputerSelection() {
  let computerNumber = random(3);
  let computerGuess = '';

  switch (computerNumber) {
    case 1:
      computerGuess = 'Rock';
      break;
    case 2:
      computerGuess = 'Paper';
      break;
    case 3:
      computerGuess = 'Scissors';
      break;
    default:
      break;
  }

  return computerGuess;
}

function playRound(playerSelection, computerSelection) {
  let log = '';

  if (playerSelection === 'Rock') {
    if (computerSelection === 'Paper') {
      log = 'LOSER ! PAPER BEATS ROCK';
    } else if (computerSelection === 'Scissors') {
      log = 'WINNER WINNER CHICKEN DINNER ! ROCK BEATS SCISSORS';
    } else {
      log = "It's a tie";
    }
  } else if (playerSelection === 'Paper') {
    if (computerSelection === 'Scissors') {
      log = 'LOSER ! SCISSORS BEATS PAPER';
    } else if (computerSelection === 'Rock') {
      log = 'WINNER WINNER CHICKEN DINNER ! PAPER BEATS ROCK';
    } else {
      log = "It's a tie";
    }
  } else if (playerSelection === 'Scissors') {
    if (computerSelection === 'Rock') {
      log = 'LOSER ! ROCK BEATS SCISSORS';
    } else if (computerSelection === 'Paper') {
      log = 'WINNER WINNER CHICKEN DINNER ! SCISSORS BEATS PAPER';
    } else {
      log = "TIE";
    }
  }

  return log;
}

function createParagWithText(text) {
  const p = document.createElement('p');
  p.textContent = text;

  return p;
}

function game(playerSelect) {
  let playerSelection = capitalize(playerSelect);
  let computerSelection = getComputerSelection();

  let roundResult = playRound(playerSelection, computerSelection);

  if (roundResult.search('WINNER WINNER CHICKEN DINNER !') > -1) {
    playerScore++;
  } else if (roundResult.search('LOSER !') > -1) {
    computerScore++;
  }

  scorePlayer.textContent = playerScore;
  scoreComputer.textContent = computerScore;
  message.textContent = roundResult;
  selectionPlayer.appendChild(createParagWithText(playerSelection));
  selectionComputer.appendChild(createParagWithText(computerSelection));

  if (playerScore >= 5 && computerScore < 5) {
    message.textContent = 'GAME OVER YOU WON!';
    setTimeout(function (){
        location.reload();
    }, 5000);

  } else if (playerScore < 5 && computerScore >= 5) {
    message.textContent = 'GAME OVER YOU LOSS!';
    setTimeout(function (){
        location.reload();
    }, 3000);
  }
}

/* Helper Functions */
function random(number) {
  return Math.floor(Math.random() * number + 1);
}

function capitalize(string) {
  return (
    string.toLowerCase().charAt(0).toUpperCase() + string.toLowerCase().slice(1)
  );
}