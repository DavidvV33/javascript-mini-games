'use strict';

let secretNumber = Math.trunc(Math.random() * 50 + 1);
let score = 50;
let highscore = 0;

function displayMessage(message) {
  document.querySelector('.message').textContent = message;
}

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  // When there is no input
  if (!guess) {
    displayMessage('No Number!');
  }
  // When player wins
  else if (guess === secretNumber) {
    displayMessage('Correct number!');

    document.querySelector('body').style.background = '#60b347';

    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;

    // Highscore
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

    // When guess is different
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? 'Too high' : 'Too low');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('You lost the game!');
      document.querySelector('.score').textContent = 0;
    }
  }
});

function reset() {
  secretNumber = Math.trunc(Math.random() * 50 + 1);
  document.querySelector('body').style.background =
    'linear-gradient(135deg, #141e30, #243b55)';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
  displayMessage('Start guessing...');
  score = 50;
  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = '';
}

document.querySelector('.again').addEventListener('click', reset);
