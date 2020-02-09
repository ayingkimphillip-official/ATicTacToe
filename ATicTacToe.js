var displayPlayer;
var displayWinner;
// var gameBoard;
var gameBoardButton;
var players = [
    1,
    2
];
var currentPlayer;
var gameBoard = [];
var boardScanner = [];

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

    displayPlayer.value = "";
    displayWinner.hidden = true;
    displayWinner.value = "";
}

function attachEventHandlers() {
    btnGameStart.addEventListener("click", onBtnGameStartClicked);
    btnGameReset.addEventListener("click", onBtnGameResetClicked);

    for (var i = 0; i < gameBoardButton.length; i++) {
        gameBoardButton[i].addEventListener("click", onGameBoardButtonClicked);
        gameBoardButton[i].disabled = true;
    }

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
    for (var i = 0; i < gameBoardButton.length; i++) {
        gameBoardButton[i].disabled = false;
        gameBoardButton[i].innerText = "";
    }
    btnGameStart.disabled = true;
}

function onBtnGameResetClicked() {
    displayPlayer.value = "";
    displayWinner.value = "";
    btnGameStart.disabled = false;
    displayWinner.hidden = true;
    displayPlayer.classList.remove("player1", "player2");

    for (var i = 0; i < gameBoardButton.length; i++) {
        gameBoardButton[i].innerText = null;
        gameBoardButton[i].disabled = true;
    }
}

function generateGameBoard() {
    for (var i = 0; i < WIDTH; i++) {
        var row = document.createElement("div");
        row.classList.add("row");
        gameBoard.appendChild(row);
        boardScanner.push([]);
        boardScanner[i].push(new Array(HEIGHT));
        for (var j = 0; j < HEIGHT; j++) {
            var cell = document.createElement("button");
            cell.classList.add("cell");
            row.appendChild(cell);
            boardScanner[i][j] = cell;
        }
    }
}

function onGameBoardButtonClicked(mouseclick) {
    if (currentPlayer == 1) {
        displayPlayer.classList.remove("player1");
        displayPlayer.classList.add("player2");
        mouseclick.target.classList.add("player1");
        mouseclick.target.innerText = "X";
        mouseclick.target.disabled = true;
        currentPlayer = players[1];
        displayPlayer.value = "Player 2";
    }
    else {
        displayPlayer.classList.remove("player2");
        displayPlayer.classList.add("player1");
        mouseclick.target.classList.add("player2");
        mouseclick.target.innerText = "O";
        mouseclick.target.disabled = true;
        currentPlayer = players[0];
        displayPlayer.value = "Player 1";
    }
    checkForWinner();
}

function checkForWinner() {
    for (var i = 0; i < WIDTH; i++) {
        for (var j = 0; j < HEIGHT; j++) {
            //Horizontal Checker
            if (j == 0) {
                if (boardScanner[i][j].innerText == "X" && boardScanner[i][j + 1].innerText == "X" && boardScanner[i][j + 2].innerText == "X") {
                    console.log("HERE!");
                    displayPlayer.value = "";
                    displayWinner.hidden = false;
                    displayWinner.value = "Winner is Player 1";
                }
                else if (boardScanner[i][j].innerText == "O" && boardScanner[i][j + 1].innerText == "O" && boardScanner[i][j + 2].innerText == "O") {
                    console.log("HERE!");
                    displayPlayer.value = "";
                    displayWinner.hidden = false;
                    displayWinner.value = "Winner is Player 2";
                }
            }
            //Vertical Checker
            if (i == 0) {
                if (boardScanner[i][j].innerText == "X" && boardScanner[i + 1][j].innerText == "X" && boardScanner[i + 2][j].innerText == "X") {
                    console.log("HERE!");
                    displayPlayer.value = "";
                    displayWinner.hidden = false;
                    displayWinner.value = "Winner is Player 1";
                }
                else if (boardScanner[i][j].innerText == "O" && boardScanner[i + 1][j].innerText == "O" && boardScanner[i + 2][j].innerText == "O") {
                    console.log("HERE!");
                    displayPlayer.value = "";
                    displayWinner.hidden = false;
                    displayWinner.value = "Winner is Player 2";
                }
            }
            //Diagonal Checker
            if (i == 0 && j == 0) {
                if (boardScanner[i][j].innerText == "X" && boardScanner[i + 1][j + 1].innerText == "X" && boardScanner[i + 2][j + 2].innerText == "X") {
                    console.log("HERE!");
                    displayPlayer.value = "";
                    displayWinner.hidden = false;
                    displayWinner.value = "Winner is Player 1";
                }
                else if (boardScanner[i][j].innerText == "O" && boardScanner[i + 1][j + 1].innerText == "O" && boardScanner[i + 2][j + 2].innerText == "O") {
                    console.log("HERE!");
                    displayPlayer.value = "";
                    displayWinner.hidden = false;
                    displayWinner.value = "Winner is Player 2";
                }
                else if (boardScanner[i][j + 2].innerText == "X" && boardScanner[i + 1][j + 1].innerText == "X" && boardScanner[i + 2][j].innerText == "X") {
                    console.log("HERE!");
                    displayPlayer.value = "";
                    displayWinner.hidden = false;
                    displayWinner.value = "Winner is Player 1";
                }
                else if (boardScanner[i][j + 2].innerText == "O" && boardScanner[i + 1][j + 1].innerText == "O" && boardScanner[i + 2][j].innerText == "O") {
                    console.log("HERE!");
                    displayPlayer.value = "";
                    displayWinner.hidden = false;
                    displayWinner.value = "Winner is Player 2";
                }
            }
        }
    }
}