const board = document.getElementById("game-board");
const movesText = document.getElementById("moves");
const winMessage = document.getElementById("win-message");
const restartBtn = document.getElementById("restart");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;

const colors = ["red", "blue", "green"];
let deck = [...colors, ...colors]; // pairs

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  board.innerHTML = "";
  moves = 0;
  movesText.textContent = "Moves: 0";
  winMessage.classList.add("hidden");
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  shuffle(deck);

  deck.forEach(color => {
    const card = document.createElement("div");
    card.classList.add("card", color);
    card.dataset.color = color;

    card.addEventListener("click", () => handleFlip(card));
    board.appendChild(card);
  });
}

function handleFlip(card) {
  if (lockBoard) return;
  if (card === firstCard) return;
  if (card.classList.contains("flipped")) return;

  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  moves++;
  movesText.textContent = `Moves: ${moves}`;
  checkMatch();
}

function checkMatch() {
  lockBoard = true;

  if (firstCard.dataset.color === secondCard.dataset.color) {
    resetTurn();
    checkWin();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetTurn();
    }, 700);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function checkWin() {
  const flippedCards = document.querySelectorAll(".card.flipped");
  if (flippedCards.length === deck.length) {
    winMessage.classList.remove("hidden");
  }
}

restartBtn.addEventListener("click", createBoard);

// init
createBoard();
