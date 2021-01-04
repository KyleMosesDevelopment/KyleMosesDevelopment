/* Assignment - 6 – COSC 2328 – Professor McCurry
   Implemented by Kyle Moses */

// Global Variables
const statusMessage = document.getElementById('game-status');

// this function shows which players turn it is
const currentPlayerTurnMessage = () => `It is Player ${currentPlayer} turn!`;

// These are what the status message could possibly display
// this is shorthand to create function... => automatically returns whatever is after it
const winMessage = () => `Player ${currentPlayer} is the winner!`;

const tieMessage = () => `The game ended in a draw!`

// win conditions array 
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Creates an empty array with size nine
// Each index is to be populated with "X" or "O"
/* board layout by index position
0|1|2
3|4|5
6|7|8
*/
var gameBoard = ["", "", "", "", "", "", "", "", ""];

// will be false if game is over
var gameActive = true;

// Keeps track of whos turn it is
var currentPlayer = "X";

// used to track how many wins each player has
var xWins = 0;
var oWins = 0;
var tieWins = 0;


// set the status message to display the player X before the game starts
statusMessage.innerHTML = currentPlayerTurnMessage();

// this function is run when a specific image is clicked
// passes indexNumber and the image clicked with (this)
function cellClicked (indexNumber, imageClicked) { 
    const cellIndex = indexNumber;

    const currentCell = imageClicked;

    // If array at cell inded is not empty, or if game active false, return and dont do anything
    if (gameBoard[cellIndex] !== "" || !gameActive)
    {
        return;
    }

    // update the board
    updateBoard(cellIndex, currentCell);
    // check for winner
    checkForWinnerOrDraw();
}

// recieves the clicked image index and the image itself
// changes the image src to x or o
function updateBoard(cellIndex, currentCell) { 
    gameBoard[cellIndex] = currentPlayer;
    if (currentPlayer == 'X') {
        currentCell.src = "./images/xImage.png"
    }
    else {
        currentCell.src = "./images/oImage.png"
    }
}

// is run after the game board is updated
// check for winner with current player, if no winner and no draw then switch player
function checkForWinnerOrDraw() {
    var roundWon = false;
    for (var i = 0; i < 8; i++) {
        var currentWinPattern = winningConditions[i];
        var a = gameBoard[currentWinPattern[0]];
        var b = gameBoard[currentWinPattern[1]];
        var c = gameBoard[currentWinPattern[2]];
        if (a === ""|| b === ""|| c === "") {
            // if one of these vars is empty move on to next iteration of loop
            continue;
        }
        if (a === b && b === c) {
            // if a b and c are all the same player in the gameBoard array, the game has been won
            roundWon = true;
            break;
        }
    }
    // if round won true
    if (roundWon) {
        statusMessage.innerHTML = winMessage();
        gameActive = false;
        countWin();
        return;
    }

    // If round is draw, game board will not contain any empty strings
    var roundDraw = !gameBoard.includes("");
    if (roundDraw) {
        statusMessage.innerHTML = tieMessage();
        gameActive = false;
        countTie();
        return;
    }

    // If you get to this point in code, the game is not over, so switch the player
    changePlayer();
}

// triggered when no winner or draw found
// changes current player global var to X or O
function changePlayer() {
    // ternary statement ---- if current player is X? then set to O -- else set to X
    currentPlayer = currentPlayer === 'X' ? 'O' :'X';
    statusMessage.innerHTML = currentPlayerTurnMessage();
}

// Triggers when reset button pressed
// reset all global variables to their original state
// change all images back to default before click
function reset() {
    gameActive = true;
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    // would be easier using JQUERY 
    // grab each cell and change it back to default image
    document.getElementById("cell0").src = "./images/kitty.png";
    document.getElementById("cell1").src = "./images/kitty.png";
    document.getElementById("cell2").src = "./images/kitty.png";
    document.getElementById("cell3").src = "./images/kitty.png";
    document.getElementById("cell4").src = "./images/kitty.png";
    document.getElementById("cell5").src = "./images/kitty.png";
    document.getElementById("cell6").src = "./images/kitty.png";
    document.getElementById("cell7").src = "./images/kitty.png";
    document.getElementById("cell8").src = "./images/kitty.png";

    statusMessage.innerHTML = currentPlayerTurnMessage();
}

// triggers when checkForWinnerOrDraw() roundWon = true;
// Adds one to the global variable, then updates the xWins tag 
function countWin() {
    if (currentPlayer === "X") {
        xWins++;
        document.getElementById("xWins").innerHTML = "X Number of Wins: " + xWins;
    }
    else {
        oWins++;
        document.getElementById("oWins").innerHTML = "O Number of Wins: " + oWins;
    }
}

// Triggers when checkForWinnerOrDraw() roundDraw = true;
// Adds one to the global variable, then updates the tieWins tag
function countTie() {
    tieWins++;
    document.getElementById("tieWins").innerHTML = "Number of Ties: " + tieWins;
}

// triggers when mouseover a certain image
// shows the move, but if gameboard has already been played in that index then nothing happens
function displayMove(imgIndex, img) {
    if(gameBoard[imgIndex] === "" && gameActive) {
        var imageMousedOver = img;
        if (currentPlayer === 'X') {
            imageMousedOver.src = "./images/xImage.png";
        }
        else {
            imageMousedOver.src = "./images/oImage.png";
        }
    }
}

// triggered when mouse out of img
// if gameboard in that spot is still empty, change image back to default
function resetImage(imgIndex, img) {
    if(gameBoard[imgIndex] === "") {
        img.src = "./images/kitty.png";
    }
}

// triggers when user uses keyboard in body of page
// finds unicode value of keyboard press
// if it is 1-9, grab associated index and img from document
// pass into cellClicked function
function keyboardInput(event) {
    var pressedKey = event.which;
    if(pressedKey < 49 || pressedKey > 57) {
        return;
    }
    var imageSelected;
    var indexSelected;
    switch(pressedKey) {
        case 49:
            imageSelected = document.getElementById("cell0");
            indexSelected = 0;
            break;
        case 50:
            imageSelected = document.getElementById("cell1");
            indexSelected = 1;
            break;
        case 51:
            imageSelected = document.getElementById("cell2");
            indexSelected = 2;
            break;
        case 52:
            imageSelected = document.getElementById("cell3");
            indexSelected = 3;
            break;
        case 53:
            imageSelected = document.getElementById("cell4");
            indexSelected = 4;
            break;
        case 54:
            imageSelected = document.getElementById("cell5");
            indexSelected = 5;
            break;
        case 55:
            imageSelected = document.getElementById("cell6");
            indexSelected = 6;
            break;
        case 56:
            imageSelected = document.getElementById("cell7");
            indexSelected = 7;
            break;
        case 57:
            imageSelected = document.getElementById("cell8");
            indexSelected = 8;
    }
    cellClicked (indexSelected, imageSelected)
}