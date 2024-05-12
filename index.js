let playerO = "O";
let playerX = "X";
let currentPlayer = playerO;
let isGameOver = false;
let restartButton = document.getElementById("restart");
let board = [
  ["", "", ""], // 00 01 02
  ["", "", ""], // 10 11 12
  ["", "", ""], // 20 21 22
];
restartButton.addEventListener("click", () => setGame());

window.onload = function () {
  setGame();
};

function checkWinner() {
  // horizontally
  for (let r = 0; r < board.length; r++) {
    if (
      board[r][0] === board[r][1] &&
      board[r][1] === board[r][2] &&
      board[r][0] !== ""
    ) {
      isGameOver = true;
      document.getElementById(
        "winner"
      ).innerText = `Hurray, ${board[r][0]} Won`;
      return;
    }
  }

  // vertically
  for (let c = 0; c < board.length; c++) {
    if (
      board[0][c] === board[1][c] &&
      board[1][c] === board[2][c] &&
      board[0][c] !== ""
    ) {
      isGameOver = true;
      document.getElementById(
        "winner"
      ).innerText = `Hurray, ${board[0][c]} Won`;
      return;
    }
  }

  // diagonally
  if (
    (board[0][0] === board[1][1] &&
      board[1][1] === board[2][2] &&
      board[0][0] !== "") ||
    (board[0][2] === board[1][1] &&
      board[1][1] === board[2][0] &&
      board[0][2] !== "")
  ) {
    isGameOver = true;
    document.getElementById("winner").innerText = `Hurray, ${board[1][1]} Won`;
    return;
  }
}

function handleTileClick(e) {
  if (isGameOver) return;

  let cords = this.id.split("-");
  let r = parseInt(cords[0]);
  let c = parseInt(cords[1]);

  if (this.innerText !== "") return;

  board[r][c] = currentPlayer;
  this.innerText = currentPlayer;
  if (currentPlayer === playerO) {
    currentPlayer = playerX;
  } else {
    currentPlayer = playerO;
  }

  console.log(board);

  checkWinner();
}

function setGame() {
  let gameBoard = document.getElementById("board");
  gameBoard.innerHTML = ''
  board = [
    ["", "", ""], // 00 01 02
    ["", "", ""], // 10 11 12
    ["", "", ""], // 20 21 22
  ];

  isGameOver = false;
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      let tile = document.createElement("div");
      tile.classList.add("tile");
      tile.id = row.toString() + "-" + col.toString();
      if (row == 0 || row === 1) {
        tile.classList.add("horizontal-line");
      }

      if (col === 0 || col === 1) {
        tile.classList.add("vertical-line");
      }
      tile.addEventListener("click", handleTileClick);
      gameBoard.appendChild(tile);
    }
  }
}
