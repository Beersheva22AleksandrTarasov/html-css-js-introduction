// config
const questionsAndAnswers = [
    ['What is the capital of France?', 'Paris'],
    ['What is the tallest mammal?', 'Giraffe'],
    ['What is the largest planet in our solar system?', 'Jupiter'],
    ['What is the name of the longest river in the world?', 'Nile'],
    ['What is the most populous country in the world?', 'China'],
    ['What is the chemical symbol for gold?', 'Au'],
    ['What is the largest organ in the human body?', 'Skin'],
    ['What is the smallest country in the world?', 'Vatican'],
    ['What is the name of the first man to walk on the moon?', 'Armstrong'],
    ['What is the smallest planet in our solar system?', 'Mercury'],
    ['What is the name of the fictional detective created by Arthur Conan Doyle?', 'Sherlock'],
    ['What is the highest mountain in the world?', 'Everest'],
    ['What is the currency of Japan?', 'Yen'],
    ['What is the name of the biggest ocean in the world?', 'Pacific'],
    ['What is the first element on the periodic table?', 'Hydrogen'],
    ['What is the name of the imaginary line that divides the Earth into two hemispheres?', 'Equator'],
    ['What is the distance around a circle called?', 'Circumference'],
    ['What is the name of the author of "To Kill a Mockingbird"?', 'Lee'],
    ['What is the largest species of cat?', 'Tiger'],
    ['What is the smallest bone in the human body?', 'Stapes'],
    ['What is the highest waterfall in the world?', 'Angel'],
    ['What is the name of the world’s largest desert?', 'Sahara'],
    ['What is the name of the first man to fly solo across the Atlantic?', 'Lindbergh'],
    ['What is the name of the river that runs through Egypt?', 'Nile'],
    ['What is the largest country in the world by area?', 'Russia'],
    ['What is the name of the process by which plants convert sunlight into energy?', 'Photosynthesis'],
    ['What is the name of the largest moon of Saturn?', 'Titan'],
    ['What is the name of the most widely spoken language in the world?', 'Mandarin'],
];

const percentageOfAttempts = 0.5;
let NUMBER_OF_ATTEMPTS;
const WIN_MESSAGE = "Congratulations, you've won.";
const LOSS_MESSAGE = "It's a pity, you've lost.";
const QUESTION = 0;
const ANSWER = 1;

//Elements
const inputElement = document.getElementById('input-id');
const checkButtonElement = document.getElementById('check-button-id');
const questionElement = document.getElementById('question-id');
const gameFieldElement = document.getElementById('field-id');
const lineElements = document.getElementById('line-id');
const blockElements = document.getElementById('block-id');
const resultMessageElement = document.getElementById('game-result-id');
const playAgainButtonElement = document.getElementById('play-again-id');
const finishButtonElement = document.getElementById('finish-button-id');

//variables
let questionAndAnswer;
let question;
let answer;
let userGuess;
let attemptCount;
let lettersBlocks;

//functions
function init() {
    resetVariables();
    createWord();
    questionElement.innerHTML = question;
    inputElement.disabled = false;
    inputElement.value = "";
    resultMessageElement.innerHTML = "";
    playAgainButtonElement.hidden = true;
    checkButtonElement.disabled = false;
    inputElement.readOnly = false;
    inputElement.placeholder = `Enter a letter. You have ${NUMBER_OF_ATTEMPTS} attempts.`;
    inputElement.size = inputElement.placeholder.length;
    lettersBlocks = document.querySelectorAll(".letter-block");
}

function resetVariables() {
    attemptCount = 0;
    questionAndAnswer = getRandomElement(questionsAndAnswers);
    question = questionAndAnswer[QUESTION];
    answer = questionAndAnswer[ANSWER];
    NUMBER_OF_ATTEMPTS = Math.floor(percentageOfAttempts * answer.length);
}

function finish() {
    const lowAnswer = answer.toLocaleLowerCase();
    if (lowAnswer == userGuess) {
        displayWord();
    }
    const resultMessage = lowAnswer == userGuess ? WIN_MESSAGE : LOSS_MESSAGE + ` answer is "${answer}"`;
    resultMessageElement.innerHTML = resultMessage;
    inputElement.readOnly = true;
    playAgainButtonElement.hidden = false;
    checkButtonElement.disabled = true;
}

function check() {
    userGuess = inputElement.value.toLowerCase();
    if (attemptCount == NUMBER_OF_ATTEMPTS) {
        finish()
        return;
    }
    if (!isStringOnlyNLetters(userGuess, 1)) {
        alert(`Enter a letter, please. Allowed characters: A-z.`)
        return;
    }
    attemptCount++;
    updateWord(userGuess);
    inputElement.value = "";
    inputElement.placeholder = `Enter a letter. You have ${NUMBER_OF_ATTEMPTS - attemptCount} attempts.`;

    if (attemptCount == NUMBER_OF_ATTEMPTS) {
        inputElement.placeholder = "Enter an answer";
    }
}

function iKnowTheWord() {
    inputElement.placeholder = "Enter an answer"
    attemptCount = NUMBER_OF_ATTEMPTS;
}

function isStringOnlyNLetters(str, n) {
    const regex = new RegExp(`^[a-zA-Z]{${n}}$`);
    return regex.test(str);
}

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
}
function getWordLine() {
    return [...answer].map((letter) => `<div class="letter-block">${letter}</div>`).join("");
}

function createWord() {
    const newWord = `<li class="word-line">${getWordLine()}</li>`;
    gameFieldElement.innerHTML = newWord;
}

function updateWord(userLetter) {
    lettersBlocks.forEach(letterBlock => {
        const letter = letterBlock.innerHTML.toLowerCase();
        if (userLetter == letter) {
            letterBlock.classList.add("white");
        }
    })
};

function displayWord() {
    lettersBlocks.forEach(letterBlock => letterBlock.classList.add("white"));
}

checkButtonElement.addEventListener("click", check);
playAgainButtonElement.addEventListener("click", init)
finishButtonElement.addEventListener("click", iKnowTheWord)

init();