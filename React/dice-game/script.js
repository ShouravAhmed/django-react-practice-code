"use strict";

let currentPlayer = 0;
let win = 0;

let playerZeroScore = 0;
const playerZeroScoreElement = document.querySelector("#score--0");
let playerZeroCurrentScore = 0;
const playerZeroCurrentScoreElement = document.querySelector("#current--0");
const playerZero = document.querySelector(".player--0");

let playerOneScore = 0;
const playerOneScoreElement = document.querySelector("#score--1");
let playerOneCurrentScore = 0;
const playerOneCurrentScoreElement = document.querySelector("#current--1");
const playerOne = document.querySelector(".player--1");

const rollDice = document.querySelector(".btn--roll");
const dice = document.querySelector(".dice");
const hold = document.querySelector(".btn--hold");
const reset = document.querySelector(".btn--new");

const roolingEffect = function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      const diceNo = Number(Math.floor(Math.random() * 5) + 1);
      dice.src = "dice-" + String(diceNo) + ".png";
      resolve();
    }, 100);
  });
};

const alterPlayer = function () {
  if (currentPlayer) {
    playerOne.classList.remove("player--active");
    playerZero.classList.add("player--active");
  } else {
    playerOne.classList.add("player--active");
    playerZero.classList.remove("player--active");
  }
  currentPlayer = currentPlayer ^ 1;
};

const clearCurrentScore = function () {
  playerZeroCurrentScoreElement.textContent = "0";
  playerOneCurrentScoreElement.textContent = "0";
  playerZeroCurrentScore = 0;
  playerOneCurrentScore = 0;
};

rollDice.addEventListener("click", async function () {
  if (win) return;

  for (let i = 0; i < 10; i++) {
    await roolingEffect();
  }
  const diceNo = Number(Math.floor(Math.random() * 5) + 1);
  dice.src = "dice-" + String(diceNo) + ".png";

  console.log(dice.src);

  if (diceNo == 1) {
    clearCurrentScore();
    alterPlayer();
  } else {
    if (currentPlayer) {
      playerOneCurrentScore += diceNo;
      playerOneCurrentScoreElement.textContent = String(playerOneCurrentScore);
    } else {
      playerZeroCurrentScore += diceNo;
      playerZeroCurrentScoreElement.textContent = String(
        playerZeroCurrentScore
      );
    }
  }
});

hold.addEventListener("click", function () {
  if (win) return;

  if (currentPlayer) {
    playerOneScore += playerOneCurrentScore;
    playerOneScoreElement.textContent = String(playerOneScore);

    if (playerOneScore > 20) {
      playerOne.classList.add("player--winner");
      win = 1;
      return;
    }
  } else {
    playerZeroScore += playerZeroCurrentScore;
    playerZeroScoreElement.textContent = String(playerZeroScore);

    if (playerZeroScore > 20) {
      playerZero.classList.add("player--winner");
      win = 1;
      return;
    }
  }
  clearCurrentScore();
  alterPlayer();
});

reset.addEventListener("click", function () {
  clearCurrentScore();
  currentPlayer = 0;
  win = 0;

  playerOneScore = 0;
  playerOneScoreElement.textContent = String(playerOneScore);

  playerZeroScore = 0;
  playerZeroScoreElement.textContent = String(playerZeroScore);

  if (playerOne.classList.contains("player--winner")) {
    playerOne.classList.remove("player--winner");
  } else if (playerZero.classList.contains("player--winner")) {
    playerZero.classList.remove("player--winner");
  }
});
