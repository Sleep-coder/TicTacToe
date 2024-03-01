let squares = document.querySelectorAll(".square");
let resetBtn = document.querySelector("#resetBtn");
let newBtn = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let image = document.querySelectorAll(".image");
let tab = document.querySelector(".tab");

let turnO = true;
let count = 0;
let moves = [];
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const gameDraw = () => {
  msg.innerHTML =
    "<p id='msg'>Game is draw</p><img src='二哈萌柴2微信表情-husky-and-shiba.gif'>";
  msgContainer.classList.remove("hide");
};

squares.forEach((square, index) => {
  square.addEventListener("click", () => {
    if (square.innerText) {
      return;
    }

    if (turnO) {
      //playerO
      square.innerText = "O";
      turnO = false;
    } else {
      //playerX
      square.innerText = "X";
      turnO = true;
    }

    count++;
    moves.push({ index, player: square.innerText });
    updateTab();

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const updateTab = () => {
  tab.innerHTML = moves
    .map(
      (move) =>
        `<div class="tab-moves">Player ${move.player} moved to ${move.index}</div>`
    )
    .join("");
};

const showWinner = (val1, winnerFunction) => {
  msg.innerHTML = `<p id='msg'>Congratulations, Winner is ${val1}</p><img src='rock-and-roll-party-hard.gif'><br>
  <p id='msg'>Better Luck next time,${winnerFunction()}</p>
  <img src="bear-sad.gif" />`;
  msgContainer.classList.remove("hide");
};

const checkWinner = () => {
  for (let patterns of winPatterns) {
    let pos1 = squares[patterns[0]].innerText;
    let pos2 = squares[patterns[1]].innerText;
    let pos3 = squares[patterns[2]].innerText;

    if (pos1 !== "" && pos1 !== "" && pos1 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        showWinner(pos1, () => {
          if (pos1 === "O") {
            return "X";
          } else {
            return "O";
          }
        });
        return true;
      }
    }
  }
};

const removeText = () => {
  for (let square of squares) {
    square.innerText = "";
  }
};

const resetGame = () => {
  turnO = true;
  count = 0;
  msgContainer.classList.add("hide");
  removeText();
  moves = [];
  updateTab();
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
