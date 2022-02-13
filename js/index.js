const gameWrap = document.querySelector('.game-wrapper');
const gameField = document.querySelector('.game');
const title = document.querySelector('.title');
const timer = document.querySelector('.subtitle');
const playground = document.querySelector('.playground');
const menu = document.querySelector('.menu');
const input = document.querySelector('.menu__level');
const button = document.querySelector('.menu__btn');
const btnReset = document.querySelector('.btn-reset');
const finish = document.querySelector('.finish');

/**
 * change visibility functions
 */
function hideElement(el) {
  el.classList.add('hide');
}

function showElement(el) {
  el.classList.remove('hide');
}
/**
 * timer function
 */
let time = 0;
let timeUp;
let min = 0;
let sec = 0;

function startTimer () {
  timeUp = setInterval(function() {
    min = Math.floor(time/60);
    sec = time % 60;

    sec = sec < 10 ? `0${sec}` : sec;
    min = min < 10 ? `0${min}` : min;

    timer.innerHTML = `${min}:${sec}`;
    time++;
  }, 1000);
}

/**
 * create cards (wrap, front&back face) depending on select level
 */
function getCards(cards) {

  for (let card = 1; card <= Math.pow(cards, 2); card++) {

    let flipWrap = document.createElement("div");
    playground.appendChild(flipWrap);
    flipWrap.classList.add("flip-card-wrap");

    let frontFace = document.createElement("div");
    flipWrap.appendChild(frontFace);
    frontFace.classList.add("front-face");

    let backFace = document.createElement("div");
    flipWrap.appendChild(backFace);
    backFace.classList.add("back-face");
  }
}
/**
 * deal cards on the table depending on select level
 */
function dealCards(cards) {
  switch(cards) {
    case 2:
      getCards(2);
      break;
    case 4:
      getCards(4);
      break;
    case 6:
      getCards(6);
      break;
    case 8:
      getCards(8);
      break;
    case 10:
      getCards(10);
      break;
  }
}
/**
 * change size imgs depending on select level
 */
function changeSizeImg() {
  const imagesFront = document.querySelectorAll('.front-face');
  const numsBack = document.querySelectorAll('.back-face');
  switch(imagesFront.length) {
    case 16:
      imagesFront.forEach(el => el.classList.add('card-size-4'));
      numsBack.forEach(el => el.classList.add('card-size-4'));
      break;
    case 36:
      imagesFront.forEach(el => el.classList.add('card-size-6'));
      numsBack.forEach(el => el.classList.add('card-size-6'));
      break;
    case 64:
      imagesFront.forEach(el => el.classList.add('card-size-8'));
      numsBack.forEach(el => el.classList.add('card-size-8'));
      break;
    case 100:
      imagesFront.forEach(el => el.classList.add('card-size-10'));
      numsBack.forEach(el => el.classList.add('card-size-10'));
      break;
  }
}

/**
 * get playground field
 */
function startGame() {

  const cards = document.querySelectorAll('.flip-card-wrap');
  const cardsBack = document.querySelectorAll('.back-face');

  /**
   * get array of random digits
  */
  let arrOfNumbers = () => {
    let arr = [];
    for (let i = 1; i < (cards.length+1)/2; i++) {
      arr.push(i);
      arr.push(i);
    }
    return arr;
  }
  /**
   * mix digits func
   */
  function shuffle(arr){
    let j, temp;
    for(let i = arr.length - 1; i > 0; i--){
      j = Math.floor(Math.random()*(i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }

  const nums = shuffle(arrOfNumbers());
  /**
   * set data-atr for flip-card wrappers
   */
  cards.forEach((card, index) => card.setAttribute('data-number', nums[index]));
  /**
   * put digits in back-face of cards
   */
  cardsBack.forEach((card, index) => {
    card.classList.add('number');
    card.textContent = nums[index];
  });

  const numbers = document.querySelectorAll('.number');

  /**
   * change size nums depending on select level
   */
  (function() {
    switch(numbers.length) {
      case 36:
        numbers.forEach(el => el.style.fontSize = 'var(--font3)');
        break;
      case 64:
        numbers.forEach(el => el.style.fontSize = 'var(--font3)');
        break;
      case 100:
        numbers.forEach(el => el.style.fontSize = 'var(--font2)');
        break;
      default:
        numbers.forEach(el => el.style.fontSize = 'var(--font4)');
        break;
    }
  }());

  cards.forEach(card => card.addEventListener("click", flipCard));
}

/**
 * flip & matching cards funcs
 */
let lockFlipping = false;
let flippedCard = false;
let firstFlippedCard;
let secondFlippedCard;

function flipCard() {
  // this = clicked card
  if (lockFlipping) return;
  if (this === firstFlippedCard) return;

  this.classList.add('flip');

  // card back-face up
  if (!flippedCard) {
    // 1 click
    flippedCard = true;
    firstFlippedCard = this;
  } else {
    // 2 click
    flippedCard = false;
    secondFlippedCard = this;
    checkForMatch();
  }

  /**
   * check matching cards functions
   */
  function checkForMatch() {
    let isMatch = firstFlippedCard.dataset.number !== secondFlippedCard.dataset.number;
    isMatch ? unflipCards() : disableCards();
  }

  function unflipCards() {
    lockFlipping = true;
    setTimeout(() => {
      firstFlippedCard.classList.remove('flip');
      secondFlippedCard.classList.remove('flip');

      lockFlipping = false;
    }, 1500);
  }

  function disableCards() {
    firstFlippedCard.removeEventListener('click', flipCard);
    secondFlippedCard.removeEventListener('click', flipCard);
  }

  const cards = playground.querySelectorAll('.flip-card-wrap');
  const flippedCards = playground.querySelectorAll('.flip');

  if (flippedCards.length === cards.length) {
    setTimeout(() => {
      finishGame();
    }, 1500);
  }
}

/**
 * finish text create func
 */
function getFinishText() {
  const bravo = document.createElement('h2');
  const timeCountResult = document.createElement('p')
  finish.appendChild(bravo);
  finish.appendChild(timeCountResult);
  finish.style.height = "190px";
  bravo.classList.add('bravo');
  timeCountResult.classList.add('result');
  bravo.textContent = 'Bravo!';
  timeCountResult.textContent = `Your time: ${Math.floor(min)} min and ${Math.floor(sec)} sec!`;
}

/**
 * finished game when all cards was flipped
 */
  function finishGame() {
  hideElement(gameField);
  hideElement(title);
  hideElement(timer);
  hideElement(btnReset);
  showElement(finish);
  getFinishText();

  setTimeout(() => location.reload(), 3000);
}


function game() {
  hideElement(menu);
  showElement(playground);
  showElement(btnReset);
  startTimer();
  dealCards(+input.value);
  getCards();
  changeSizeImg(+input.value);
  startGame();
}

/**
 *  validate input & click btn to start
 */
button.addEventListener("click", () => {
  let invalid = +input.value.match(/[13579]/g);
  let value = +input.value;
  if(value > 0 && value < 11 && value !== invalid) {
    game();
  } else {
    input.value = 4;
  }
});

btnReset.addEventListener('click', () => location.reload());
