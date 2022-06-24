const X_CLASS = "x";
const CIRCLE_CLASS = "circle";

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let circleTurn;

let POP_SOUND = new Audio("QKTA234-pop.mp3");
POP_SOUND.volume = 0.5;

const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningText = document.getElementById("winningMessage");
const winningContainer = document.getElementById("winningTextCointainer");
const restartButton = document.getElementById("restartButton");

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHover();
  winningContainer.classList.remove("show");
}

function handleClick(event) {
  const cell = event.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    displayWin();
  } else if (isDraw()) {
    displayDraw();
  } else {
    switchTurn();
    setBoardHover();
  }
}

// Winning condition and displaying win
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
function displayWin() {
  winningText.innerText = `${circleTurn ? "O" : "X"} Wins!`;
  winningContainer.classList.add("show");
}

//Condition for draw and displaying result
function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}
function displayDraw() {
  winningText.innerText = `Draw`;
  winningContainer.classList.add("show");
}

//Marking and changing turns
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  POP_SOUND.play();
}

function switchTurn() {
  circleTurn = !circleTurn;
}

//Adding hover effect class according to the turn
function setBoardHover() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  const curClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  board.classList.add(curClass);
}
