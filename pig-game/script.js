'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// Game state
let activePlayer, currentScore, totalScores, playing;

function newGame() {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  activePlayer = 0;
  currentScore = 0;
  totalScores = [0, 0];
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;

  // Remove winner class from both players
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  // Restore active player classes
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}

newGame();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');

  activePlayer = activePlayer === 0 ? 1 : 0;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
}

function diceRoll() {
  if (!playing) return;
  const diceNumber = Math.trunc(Math.random() * 6) + 1;

  diceEl.src = `dice-${diceNumber}.png`;
  diceEl.classList.remove('hidden');

  if (diceNumber === 1) {
    switchPlayer();
  } else {
    currentScore += diceNumber;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  }
}

function Hold() {
  if (!playing) return;
  totalScores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    totalScores[activePlayer];

  if (totalScores[activePlayer] >= 20) {
    diceEl.classList.add('hidden');

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');

    document.getElementById(`current--${activePlayer}`).textContent = 0;

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');

    playing = false;
  } else {
    switchPlayer();
  }
}

document.querySelector('.btn--roll').addEventListener('click', diceRoll);
document.querySelector('.btn--hold').addEventListener('click', Hold);
document.querySelector('.btn--new').addEventListener('click', newGame);
