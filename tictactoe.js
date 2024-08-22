document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll("[data-cell]");
    const message = document.querySelector("[data-message]");
    const restartButton = document.querySelector("[data-restart]");
  
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;
  
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    const checkWinner = () => {
      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          gameActive = false;
          message.textContent = `${currentPlayer} is the Winner!!!!`;
          cells[a].classList.add("winner");
          cells[b].classList.add("winner");
          cells[c].classList.add("winner");
        }
      }
  
      if (!gameBoard.includes("") && gameActive) {
        gameActive = false;
        message.textContent = "It's a draw!";
      }
    };
  
    const handleCellClick = (cell, index) => {
      if (gameBoard[index] === "" && gameActive) {
        cell.textContent = currentPlayer;
        gameBoard[index] = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    };
  
    const restartGame = () => {
      gameBoard = ["", "", "", "", "", "", "", "", ""];
      currentPlayer = "X";
      gameActive = true;
      message.textContent = "";
      cells.forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("winner");
      });
    };
  
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        handleCellClick(cell, index);
      });
    });
  
    restartButton.addEventListener("click", restartGame);
  });
