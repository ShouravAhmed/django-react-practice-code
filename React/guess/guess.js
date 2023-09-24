"use strict";

const body = document.querySelector("body");
const message = document.querySelector(".message");
const number = document.querySelector(".number");

const score = document.querySelector(".score");
const guess = document.querySelector(".guess");

const highScore = document.querySelector(".highscore");
highScore.textContent = localStorage.getItem("highScore");
if (highScore.textContent.length > 3) highScore.textContent = "0";

let randomNumber = Number(Math.floor(Math.random() * 100) + 1);
let win = false;
let lose = false;

function saveHighScore(hscore) {
  if (Number(hscore) > Number(highScore.textContent)) {
    localStorage.setItem("highScore", hscore);
    highScore.textContent = hscore;
  }
}

function checkButtonClicked() {
  if (win || lose) return;
  if (guess.value == "") {
    message.textContent = "Wrong Input";
    return;
  }
  if (Number(guess.value) == randomNumber) {
    win = true;
    message.textContent = "🎉 Correct Number";

    number.textContent = guess.value;
    body.style.backgroundColor = "#2e8b57";

    saveHighScore(score.textContent);
  } else {
    score.textContent = String(Math.max(Number(score.textContent) - 10, 0));
    if (score.textContent == "0") {
      lose = true;
      message.textContent = "You Lose";
      return;
    }
    if (Number(guess.value) < randomNumber) {
      message.textContent = "Too Low";
    } else {
      message.textContent = "Too High";
    }
  }
  guess.value = "";
  guess.focus();
}

document.querySelector(".check").addEventListener("click", function () {
  checkButtonClicked();
});

document.querySelector("input").addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    checkButtonClicked();
  }
});

document.querySelector(".reset").addEventListener("click", function () {
  message.textContent = "🤔 Start Guessing...";
  number.textContent = "?";

  score.textContent = "100";
  guess.value = "";

  randomNumber = Number(Math.floor(Math.random() * 100) + 1);
  body.style.backgroundColor = "#1c1a1a";

  win = false;
  lose = false;
});
