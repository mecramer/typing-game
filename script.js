// hook up to DOM elements
const word = document.querySelector('#word');
const text = document.querySelector('#text');
const scoreEl = document.querySelector('#score');
const timeEl = document.querySelector('#time');
const endgameEl = document.querySelector('#end-game-container');
const settingsBtn = document.querySelector('#settings-btn');
const settings = document.querySelector('#settings');
const settingsForm = document.querySelector('#settings-form');
const difficultySelect = document.querySelector('#difficulty');

// list of words for game
const words = [
  'touchdown',
  'baseball',
  'football',
  'ball',
  'score',
  'tater',
  'triple',
  'walkoff',
  'strikeout',
  'fastball',
  'splitter',
  'homerun',
  'walk',
  'catch',
  'quarterback',
  'interception',
  'pickoff',
  'steal',
  'error',
  'tennis'
];

// Initialize word
let randomWord;

// Initiallze score
let score = 0;

// Initialize time
let time = 10;

// Set difficulty to value in local storage or medium
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Focus on text on page load
text.focus();

// start counting down
// setInterval allows you to run something every set amount of time
const timeInterval = setInterval(updateTime, 1000)

// generate random world from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// console.log(getRandomWord());

// Update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// Update time
// starts at 10 seconds and removes a second, every second that this function is called
// if time gets to 0, run clearInterval() to stop the time and call a gameOver() function
function updateTime() {
  //console.log(1);
  time--;
  timeEl.innerHTML = time + 's';

  if(time === 0) {
    clearInterval(timeInterval);
    // end game
    gameOver();
  }
}

// Game over, show end screen
// change html for end game box
// add a reload button to it
// change style to show the gox
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;

  endgameEl.style.display = 'flex';
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

addWordToDOM();

// Event listeners

// Typing:
// check if word typed in equals the random word
//  if it does, choose a new word
//  and update score
//  and clear input field
//  and add 5 seconds to the clock
text.addEventListener('input', e => {
  const insertedText = e.target.value;
  // console.log(insertedText);
  if(insertedText === randomWord) {
    addWordToDOM();
    updateScore();
    e.target.value = '';

    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 4;
    }

    updateTime();
  }
});

// Settings button click
// clicking the settings button shows/hides the difficulty bar
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select
// when the diffculty dropdown changes, set its value to difficulty variable
settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  // console.log(difficulty);
  localStorage.setItem('difficulty', difficulty);
});