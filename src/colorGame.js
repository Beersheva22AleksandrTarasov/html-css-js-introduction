//config
const N_TURNS = 3;

//elements
const inputElement = document.getElementById('input-id');
// const buttonElement = document.getElementById('button-id');
const goButtonElement = document.getElementById('go-button-id');
const squareElement = document.getElementById('square-id');
const resultMessageElement = document.getElementById('game-result-id');
const playAgainButtonElement = document.getElementById('play-again-id');

//variables
let turnCount = 0;
let color;

//functions
function game() {
    const color = inputElement.value;
    squareElement.style.backgroundColor = color;
    turnCount++;
    inputElement.value = '';
    
    if (turnCount >= N_TURNS) {
        finish();
    }
}
function setListeners() {
}



function getColor() {
    squareElement.setAttribute("style", `background-color:${color}`);
}

function start() {
    turnCount = 0;
    inputElement.disabled = false;
    squareElement.style.backgroundColor = "white";
    resultMessageElement.innerHTML = "";
    playAgainButtonElement.hidden = true;
    goButtonElement.disabled = false;
    inputElement.readOnly = false;


}

function finish() {
    inputElement.readOnly = true;
    // inputElement.disabled = true;
    playAgainButtonElement.hidden = false;
    resultMessageElement.innerHTML = "Congratulation, game is over";
    goButtonElement.disabled = true;
}


//actions
goButtonElement.addEventListener("click", game);
playAgainButtonElement.addEventListener("click", start)
start();
