// config
const WORDS = [
    'ANGEL', 'BEACH', 'CHESS', 'DREAM', 'EARTH',
    'FAITH', 'GLORY', 'HAPPY', 'JOLLY', 'KITTY',
    'LUCKY', 'MONEY', 'NIGHT', 'OCEAN', 'PEACE',
    'QUICK', 'RIGHT', 'SMILE', 'TOAST', 'UNITY'
];
const N_TURNS = 6;
const wordLength = 5;
const WIN_MESSAGE = "Congratulations, you've won.";
const LOSS_MESSAGE = "It's a pity, you've lost.";

//Elements
const inputElement = document.getElementById('input-id');
const checkButtonElement = document.getElementById('check-button-id');
const gameFieldElement = document.getElementById('field-id');
const lineElements = document.getElementById('line-id');
const blockElements = document.getElementById('block-id');
const resultMessageElement = document.getElementById('game-result-id');
const playAgainButtonElement = document.getElementById('play-again-id');

//variables
let hiddenWord = "";
let userGuess = "";
let turnCount = 0;

//functions
function init() {
    hiddenWord = getRandomWord();
    turnCount = 0;
    inputElement.disabled = false;
    resultMessageElement.innerHTML = "";
    playAgainButtonElement.hidden = true;
    checkButtonElement.disabled = false;
    inputElement.readOnly = false;
    gameFieldElement.innerHTML = "";
}

function finish() {
    const resultMessage = hiddenWord == userGuess ? WIN_MESSAGE : LOSS_MESSAGE + ` Hidden word is "${hiddenWord}"`;
    resultMessageElement.innerHTML = resultMessage;
    inputElement.readOnly = true;
    playAgainButtonElement.hidden = false;
    checkButtonElement.disabled = true;
}

function check() {
    userGuess = inputElement.value.toUpperCase();
    if (!isStringOnlyFiveLetters(userGuess)) {
        alert(`Enter a ${wordSize} letter word, please. Allowed characters: A-z.`)
        return;
    }
    turnCount++;
    insertNewWord(userGuess);
    inputElement.value = "";
    if (userGuess == hiddenWord || turnCount >= N_TURNS) {
        finish();
    }
}

function isStringOnlyFiveLetters(str) {
    const regex = new RegExp(`^[a-zA-Z]{${wordSize}}$`);
    return regex.test(str);
}

function getRandomWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)]
}
function getWordLine(word) {
    return [...word].map((letter, index) => `<div class="letter-block ${getBgColor(word, index)}">${letter}</div>`).join("");
}

function getBgColor(word, index) {
    let res = "grey";
    if (hiddenWord.includes(word[index])) {
        res = hiddenWord[index] == word[index] ? "green" : "yellow";
    }
    return res;
}

function insertNewWord(word) {
    const newWord = `<li class="word-line">${getWordLine(word)}</li>`;
    gameFieldElement.insertAdjacentHTML("beforeend", newWord);
}

checkButtonElement.addEventListener("click", check);
playAgainButtonElement.addEventListener("click", init)

init();