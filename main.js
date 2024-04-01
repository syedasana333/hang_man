// ARRAY OF WORDS, HINTS & ALPHA

let words = ['Elephant', 'Guitar', 'Pineapple', 'Astronaut', 'Bicycle', 'Rainbow', 'Detective', 'Watermelon', 'Dragonfly', 'Football', 'Octopus', 'Piano', 'Strawberry', 'Scientist', 'Helicopter', 'Thunderstorm', 'Butterfly', 'Basketball', 'Giraffe', 'Saxophone', 'Orange', 'Engineer', 'Motorcycle', 'Blizzard', 'Beetle', 'Tennis', 'Rhino', 'Violin', 'Mango', 'Doctor'];
let hints = ['Animals', 'Musical Instruments', 'Fruits', 'Professions', 'Transportation', 'Weather', 'Professions', 'Fruits', 'Insects', 'Sports', 'Animals', 'Musical Instruments', 'Fruits', 'Professions', 'Transportation', 'Weather', 'Insects', 'Sports', 'Animals', 'Musical Instruments', 'Fruits', 'Professions', 'Transportation', 'Weather', 'Insects', 'Sports', 'Animals', 'Musical Instruments', 'Fruits', 'Professions'];
let keyboard = ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'W', 'X', 'C', 'V', 'B', 'N'];


let lettersContainer = document.querySelector('.letters');
let wordContainer = document.querySelector('.words')
let wordBlocks = document.getElementsByClassName('word');

let lifeLeft = document.querySelector('.life');
let background = document.querySelector('.banner-bg');
let resultBanner = document.querySelector('.result-banner');
let playBtn = document.querySelector('.play-btn');

let currentHealth;
let health;
let wrongAttempts;
let word;
let missingLetters;
let randomIndex;


// CREATING KEYBOARD ALPHA

keyboard.forEach( elem => {
    let letters = document.createElement('div');
    letters.classList.add('letter');
    letters.innerText = elem;

    lettersContainer.appendChild(letters);
});


function createWordBlock(){
    // TO CLEAR PREVIOUS BLOCKS

    wordContainer.innerHTML = '';

    randomIndex = Math.floor(Math.random() * words.length);
    let word = words[randomIndex].toUpperCase().split('');

    // CREATE BLOCKS 

    word.forEach((elem) => {
        let wordBlock = document.createElement('div');
        wordBlock.classList.add('word');
        wordBlock.innerText = elem;

        wordContainer.appendChild(wordBlock);
    });

    // HIDING BLOCK LETTERS

    let blankLength = Math.ceil(word.length * 0.4);
    let count = 0;
    let invisibleLetters = [];

    while(count < blankLength){
        let randomIndex = Math.floor(Math.random() * word.length);
        let isEmpty = wordBlocks[randomIndex].innerText;
                
        if(!(isEmpty === '')){

            if(!(invisibleLetters.includes(word[randomIndex]))){
                invisibleLetters.push(word[randomIndex]);
            }

            wordBlocks[randomIndex].style.color = '#483198';
            wordBlocks[randomIndex].innerText = '';
            count++;
        }
    }

    return [word, invisibleLetters];
}


function gameStart(){ 
    [word, missingLetters] = createWordBlock();
    wrongAttempts = Math.floor(word.length * 0.5);
    health = 100/wrongAttempts;
    currentHealth = 100;
}

// ONCLICK EVENTS ON LETTERS

lettersContainer.onclick = clickEvent;

function clickEvent(event){
    let letter = event.target.innerText;
    
    if(missingLetters.includes(letter)){

        word.forEach((elem, index) => {
            if(elem === letter){
                wordBlocks[index].innerText = letter;
            }
        });

        missingLetters.splice(missingLetters.indexOf(letter), 1);
    }
    else{
        currentHealth -= health;
        reduceLife(currentHealth);
        wrongAttempts--;
    }

    if(wrongAttempts === 0){
        banner('loss');
    }

    if(!(missingLetters.length)){
        banner('won');
    }
}


// UPATE LIFE LINE

let reduceLife = value => lifeLeft.style.background = `linear-gradient(to right, #DB6F6F ${value}%, transparent ${value}%)`


// SHOW RESULT BANNER

function banner(result){
    background.style.display = 'block';
    resultBanner.style.display = 'flex';

    let resultUpdate = document.querySelector('.result');
    resultUpdate.innerText = `You ${result}!`;
}


// RESTART ONCLICK PLAY BUTTON

playBtn.addEventListener('click', () => {
    background.style.display = 'none';
    resultBanner.style.display = 'none';
    lifeLeft.style.background = '#DB6F6F';
    gameStart();
});


// SHOW AND HIDE TOOLTIP ONCLICK HINT BUTTON 

function showToolTip(){
    let tooltipContainer = document.querySelector('.tooltip-container'); 
    tooltipContainer.style.display = tooltipContainer.style.display === 'block' ? 'none' : 'block';

    let tooltip = document.querySelector('.tooltip');
    tooltip.innerText = hints[randomIndex];

    setTimeout(() => {
        tooltipContainer.style.display = 'none';
    }, 3000);
}