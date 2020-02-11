var displayPlayer;
var displayWinner;
// var gameBoard;
var gameBoardButton;
var players = [
    "X",
    "O"
];
var currentPlayer = 0;
var gameBoard = [];
var boardScanner = [];
let isWinner = false;

var btnGameStart;
var btnGameReset;

var WIDTH = 3;
var HEIGHT = 3;

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        initialize();
        attachEventHandlers();
    }
};

function initialize() {
    btnGameStart = document.querySelector("#btnGameStart");
    btnGameReset = document.querySelector("#btnGameReset");
    displayPlayer = document.querySelector("#player-container input");
    displayWinner = document.querySelector("#game-container input");
    gameBoard = document.querySelector("#gameBoard");
    generateGameBoard();
    gameBoardButton = document.querySelectorAll(".cell");

    for (let i = 0; i < WIDTH; i++) {
        for (let j = 0; j < HEIGHT; j++) {
            boardScanner[i][j].innerText = " ";
            boardScanner[i][j].disabled = true;
        }
    }

    displayPlayer.value = "";
    displayWinner.hidden = true;
    displayWinner.value = "";
}

function attachEventHandlers() {
    btnGameStart.addEventListener("click", onBtnGameStartClicked);
    btnGameReset.addEventListener("click", onBtnGameResetClicked);
    for (var i = 0; i < WIDTH; i++) {
        for (var j = 0; j < HEIGHT; j++) {
            boardScanner[i][j].addEventListener("click", onGameBoardButtonClicked);
        }
    }
}

function onBtnGameStartClicked() {
    currentPlayer = players[0];
    displayPlayer.classList.add("player1");
    displayPlayer.value = "Player 1";
    for (let i = 0; i < WIDTH; i++) {
        for (let j = 0; j < HEIGHT; j++) {
            boardScanner[i][j].innerText = " ";
            boardScanner[i][j].disabled = false;
        }
    }
    btnGameStart.disabled = true;
}

function onBtnGameResetClicked() {
    displayPlayer.value = "";
    displayWinner.value = "";
    btnGameStart.disabled = false;
    displayWinner.hidden = true;
    displayPlayer.classList.remove("player1", "player2");
    displayWinner.classList.remove("player1", "player2", "noWinner");
    for (let i = 0; i < WIDTH; i++) {
        for (let j = 0; j < HEIGHT; j++) {
            boardScanner[i][j].classList.remove("player1", "player2");
            boardScanner[i][j].innerText = null;
            boardScanner[i][j].disabled = true;
        }
    }
    isWinner = false;
}

function generateGameBoard() {
    for (var i = 0; i < WIDTH; i++) {
        var row = document.createElement("div");
        row.classList.add("row");
        gameBoard.appendChild(row);
        for (var j = 0; j < HEIGHT; j++) {
            var cell = document.createElement("button");
            cell.classList.add("cell");
            cell.x = i;
            cell.y = j;
            row.appendChild(cell);

            if (boardScanner[i] == null) {
                boardScanner[i] = [];
            }
            boardScanner[i][j] = cell;
        }
    }
}

function onGameBoardButtonClicked(mouseclick) {
    if (currentPlayer == players[0]) {
        mouseclick.target.classList.add("player1");
        mouseclick.target.innerText = "X";
        mouseclick.target.disabled = true;
        currentPlayer = players[1];
        displayPlayer.classList.remove("player1");
        displayPlayer.classList.add("player2");
        displayPlayer.value = "Player 2";
    }
    else {
        mouseclick.target.classList.add("player2");
        mouseclick.target.innerText = "O";
        mouseclick.target.disabled = true;
        currentPlayer = players[0];
        displayPlayer.classList.remove("player2");
        displayPlayer.classList.add("player1");
        displayPlayer.value = "Player 1";
    }
    checkForWinner();
    checkForDraw();
}

function checkForWinner() {
    let result = false;
    let counter = (WIDTH*HEIGHT);
    for (let i = 0; i < WIDTH; i++) {
        for (let j = 0; j < HEIGHT; j++) {
            let currentCell = boardScanner[i][j];
            result =
                checkForHorizontalWinner(currentCell) ||
                checkForVerticalWinner(currentCell) ||
                checkForDiagonalWinner(currentCell);
            if (result == true) {
                isWinner = result;
                for (let i = 0; i < WIDTH; i++) {
                    for (let j = 0; j < HEIGHT; j++) {
                        boardScanner[i][j].disabled = true;
                    }
                }
                if (currentPlayer == players[1]) {
                    displayPlayer.value = " ";
                    displayWinner.hidden = false;
                    displayWinner.classList.add("player1");
                    displayWinner.value = "The winner is Player 1!";
                }
                else {
                    displayPlayer.value = " ";
                    displayWinner.hidden = false;
                    displayWinner.classList.add("player2");
                    displayWinner.value = "The winner is Player 2!";
                }
            }
        }
    }
}

function checkForHorizontalWinner(cell) {
    let result = false;
    let symbol = cell.innerText;

    if (symbol.length > 0) {
        let counter = 1;

        for (let i = cell.y + 1; i < WIDTH; i++) {
            let currentCell = boardScanner[cell.x][i];
            var currentSymbol = currentCell.innerText;
            if (currentSymbol == symbol) {
                counter++;
            }
            if (counter >= WIDTH) {
                result = true;
            }
        }
    }
    return result;
}

function checkForVerticalWinner(cell) {
    let result = false;
    let symbol = cell.innerText;

    if (symbol.length > 0) {
        let counter = 1;

        for (let i = cell.x + 1; i < WIDTH; i++) {
            let currentCell = boardScanner[i][cell.y];
            var currentSymbol = currentCell.innerText;
            if (currentSymbol == symbol) {
                counter++;
            }
            if (counter >= WIDTH) {
                result = true;
            }
        }
    }
    return result;
}

function checkForDiagonalWinner(cell) {
    let result = false;
    let symbol = cell.innerText;

    if (symbol.length > 0) {
        //From UpperLeft to LowerRight and vice versa
        let counter = 1;
        let i = cell.x + 1;
        let j = cell.y + 1;
        while (i < WIDTH && j < HEIGHT) {
            let currentCell = boardScanner[i++][j++];
            let currentSymbol = currentCell.innerText;
            if (currentSymbol == symbol) {
                counter++;
            }
            if (counter >= WIDTH) {
                result = true;
            }
        }

        //From UpperRight to LowerLeft and vice versa
        counter = 1;
        i = cell.x - 1;
        j = cell.y + 1;
        while (i >= 0 && j < HEIGHT) {
            let currentCell = boardScanner[i--][j++];
            let currentSymbol = currentCell.innerText;
            if (currentSymbol == symbol) {
                counter++;
            }
            if (counter >= WIDTH) {
                result = true;
            }
        }
    }
    return result;
}

function checkForDraw () {
    let counter = 0;
    for (let i = 0; i < WIDTH; i++) {
        for (let j = 0; j < HEIGHT; j++) {
            if(boardScanner[i][j].disabled == true && isWinner == false) {
                counter++;
                if(counter == (WIDTH*HEIGHT) && isWinner == false) {
                    displayPlayer.value = " ";
                    displayWinner.hidden = false;
                    displayWinner.classList.add("noWinner");
                    displayWinner.value = "Tie!";
                }
            }
        }
    }
}

