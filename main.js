const cols = 10;
const rows = 20;
const blockSize = 30;
const colorMapping = [
  "red",
  "orange",
  "green",
  "purple",
  "blue",
  "cyan",
  "yellow",
  "white",
];

const brickLayout = [
  [
    [
      [1, 7, 7],
      [1, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 1, 1],
      [7, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [7, 7, 1],
    ],
    [
      [7, 1, 7],
      [7, 1, 7],
      [1, 1, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [7, 1, 7],
      [7, 1, 1],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [1, 7, 7],
    ],
    [
      [1, 1, 7],
      [7, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 7, 1],
      [1, 1, 1],
      [7, 7, 7],
    ],
  ],
  [
    [
      [1, 7, 7],
      [1, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 1, 1],
      [1, 1, 7],
      [7, 7, 7],
    ],
    [
      [7, 1, 7],
      [7, 1, 1],
      [7, 7, 1],
    ],
    [
      [7, 7, 7],
      [7, 1, 1],
      [1, 1, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [1, 1, 7],
      [1, 7, 7],
    ],
    [
      [1, 1, 7],
      [7, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 7, 1],
      [7, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 7],
      [7, 1, 1],
    ],
  ],
  [
    [
      [7, 7, 7, 7],
      [1, 1, 1, 1],
      [7, 7, 7, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 1, 7],
      [7, 7, 1, 7],
      [7, 7, 1, 7],
      [7, 7, 1, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 7, 7, 7],
      [1, 1, 1, 1],
      [7, 7, 7, 7],
    ],
    [
      [7, 1, 7, 7],
      [7, 1, 7, 7],
      [7, 1, 7, 7],
      [7, 1, 7, 7],
    ],
  ],
  [
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [1, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 1, 7],
      [7, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 1, 7],
      [1, 1, 7],
      [7, 1, 7],
    ],
  ],
];

const KEY_CODES = {
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  UP: "ArrowUp",
  DOWN: "ArrowDown",
};

const whiteColorID = 7;

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

ctx.canvas.width = cols * blockSize;
ctx.canvas.height = rows * blockSize;

class Board {
  constructor(ctx) {
    this.ctx = ctx;
    this.grid = this.generateWhiteBoard();
    this.score = 0;
    this.gameOver = false;
    this.isPlaying = false;
    this.clearAudio = new Audio("../sounds/clear.wav");
  }

  reset() {
    this.score = 0;
    this.grid = this.generateWhiteBoard();
    this.gameOver = false;
    this.drawBoard();
  }

  generateWhiteBoard() {
    return Array.from({ length: rows }, () => Array(cols).fill(whiteColorID));
  }

  drawCell(xAxis, yAxis, colorID) {
    this.ctx.fillStyle = colorMapping[colorID] || colorMapping[whiteColorID];
    this.ctx.fillRect(
      xAxis * blockSize,
      yAxis * blockSize,
      blockSize,
      blockSize
    );
    this.ctx.fillStyle = "black";
    this.ctx.strokeRect(
      xAxis * blockSize,
      yAxis * blockSize,
      blockSize,
      blockSize
    );
  }

  drawBoard() {
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[0].length; col++) {
        this.drawCell(col, row, this.grid[row][col]);
      }
    }
  }

  handleCompleteRows = () => {
    const latestGrid = board.grid.filter((row) => {
      return row.some((col) => col === whiteColorID);
    });

    const newScore = rows - latestGrid.length;
    const newRows = Array.from({ length: newScore }, () =>
      Array(cols).fill(whiteColorID)
    );
    if (newScore) {
      board.grid = [...newRows, ...latestGrid];
      this.handleScore(newScore * 10);

      this.clearAudio.play();
      console.log({ latestGrid });
    }
  };

  handleScore = (newScore) => {
    this.score += newScore;
    document.getElementById("score").innerHTML = this.score;
  };

  handleGameOver() {
    this.gameOver = true;
    this.isPlaying = false;
    alert("GAME OVER");
  }
}

class Brick {
  constructor(id) {
    this.id = id;
    this.layout = brickLayout[id];
    this.activeIndex = 0;
    this.colPos = 3;
    this.rowPos = -2;
  }

  draw() {
    for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
      for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
        if (this.layout[this.activeIndex][row][col] !== whiteColorID) {
          board.drawCell(col + this.colPos, row + this.rowPos, this.id);
        }
      }
    }
  }

  clear() {
    for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
      for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
        if (this.layout[this.activeIndex][row][col] !== whiteColorID) {
          board.drawCell(col + this.colPos, row + this.rowPos, whiteColorID);
        }
      }
    }
  }

  moveLeft() {
    if (
      !this.checkCollision(
        this.rowPos,
        this.colPos - 1,
        this.layout[this.activeIndex]
      )
    ) {
      this.clear();
      this.colPos--;
      this.draw();
    }
  }

  moveRight() {
    if (
      !this.checkCollision(
        this.rowPos,
        this.colPos + 1,
        this.layout[this.activeIndex]
      )
    ) {
      this.clear();
      this.colPos++;
      this.draw();
    }
  }

  moveDown() {
    if (
      !this.checkCollision(
        this.rowPos + 1,
        this.colPos,
        this.layout[this.activeIndex]
      )
    ) {
      this.clear();
      this.rowPos++;
      this.draw();
      return;
    }
    this.handleLanded();

    if (!board.gameOver) {
      generateNewBrick();
    }
  }

  rotate() {
    if (
      !this.checkCollision(
        this.rowPos,
        this.colPos,
        this.layout[(this.activeIndex + 1) % 4]
      )
    ) {
      this.clear();
      this.activeIndex = (this.activeIndex + 1) % 4;
      this.draw();
    }
  }

  checkCollision(nextRow, nextCol, nextLayout) {
    for (let row = 0; row < nextLayout.length; row++) {
      for (let col = 0; col < nextLayout[0].length; col++) {
        if (nextLayout[row][col] !== whiteColorID && nextRow >= 0) {
          if (
            col + nextCol < 0 ||
            col + nextCol >= cols ||
            row + nextRow >= rows ||
            board.grid[row + nextRow][col + nextCol] !== whiteColorID
          )
            return true;
        }
      }
    }
    return false;
  }

  handleLanded() {
    if (this.rowPos <= 0) {
      board.handleGameOver();
      return;
    }
    for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
      for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
        if (this.layout[this.activeIndex][row][col] !== whiteColorID) {
          board.grid[row + this.rowPos][col + this.colPos] = this.id;
        }
      }
    }
    board.handleCompleteRows();
    board.drawBoard();
  }
}

generateNewBrick = () => {
  brick = new Brick(Math.floor(Math.random() * 10) % brickLayout.length);
};

board = new Board(ctx);
board.drawBoard();

document.getElementById("play").addEventListener("click", () => {
  board.reset();
  board.isPlaying = true;
  generateNewBrick();

  const refresh = setInterval(() => {
    if (!board.gameOver) {
      brick.moveDown();
    } else {
      clearInterval(refresh);
    }
  }, 1000);
});

document.addEventListener("keydown", (e) => {
  if (!board.gameOver && board.isPlaying) {
    console.log({ e });
    switch (e.code) {
      case KEY_CODES.LEFT:
        brick.moveLeft();
        break;
      case KEY_CODES.RIGHT:
        brick.moveRight();
        break;
      case KEY_CODES.DOWN:
        brick.moveDown();
        break;
      case KEY_CODES.UP:
        brick.rotate();
        break;
      default:
        break;
    }
  }
});

console.table(board.grid);
