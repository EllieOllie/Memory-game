const gameWrap = document.querySelector('.game-wrapper');
const gameField = document.querySelector('.game');
const playground = document.querySelector('.playground');
const menu = document.querySelector('.menu');
const warning = document.querySelector('.menu__subtitle');
const input = document.querySelector('.menu__level');
const button = document.querySelector('.menu__btn');
const timer = document.querySelector('.timer');
const finish = document.querySelector('.finish');
/**
 * change hide-class playground function
 */
function hideMenu() {
  menu.classList.add('hide');
  startTimer();
  playground.classList.remove('hide');
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
 *
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
 *
 */
function toggleCards() {

  const cards = document.querySelectorAll('.flip-card-wrap');
  const cardsBack = document.querySelectorAll('.back-face');

  let arrOfNumbers = () => {
    let arr = [];
    for (let i = 1; i < (cards.length+1)/2; i++) {
      arr.push(i);
      arr.push(i);
    }
    return arr;
  }

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

  function putNumbersBack() {
    const nums = shuffle(arrOfNumbers());

    cards.forEach((card, index) => card.setAttribute('data-number', nums[index]));

    cardsBack.forEach((card, index) => {
      card.classList.add('number');
      card.textContent = nums[index];
    });

    getSizeNums();
  }

  function getSizeNums() {
    const nums = document.querySelectorAll('.number');
    switch(nums.length) {
      case 36:
        nums.forEach(el => el.style.fontSize = 'var(--font3)');
        break;
      case 64:
        nums.forEach(el => el.style.fontSize = 'var(--font3)');
        break;
      case 100:
        nums.forEach(el => el.style.fontSize = 'var(--font2)');
        break;
      default:
        nums.forEach(el => el.style.fontSize = 'var(--font4)');
        break;
    }
  }

  putNumbersBack();



  let lockFlipping = false;
  let flippedCard = false;
  let firstFlippedCard;
  let secondFlippedCard;

  function flipCard() {
    if (lockFlipping) return;
    if (this === firstFlippedCard) return;

    this.classList.add('flip');

    if (!flippedCard) {
      // 1 click
      flippedCard = true;
      firstFlippedCard = this;
    } else {
      // 2 click
      flippedCard = false;
      secondFlippedCard = this;

      checkForMatch();
      /**
       * check matching cards function
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

/*!
      // function finishGame() {
      //   if (flippedCard === true) {
      //     gameField.classList.add('hide');
      //     timer.classList.add('hide');
      //     finish.classList.remove('hide');
      //     finish.textContent = `Bravo!`;
      //   }
      // }

      // finishGame();*/

    }
  }

  cards.forEach(card => card.addEventListener("click", flipCard));
}




/**
 * timer functions
 */
function startTimer () {

  let time = 0;

  timerUp = setInterval(function() {
    let minutes = Math.floor(time/60);
    let seconds = time % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    timer.innerHTML = `${minutes}:${seconds}`;
    time++;
  }, 1000);
}
/*--------------------------------- */





function startGame() {
  hideMenu();
  dealCards(+input.value);
  getCards();
  changeSizeImg(+input.value);
  toggleCards();
}




button.addEventListener("click", () => {
  let invalid = +input.value.match(/[13579]/g);
  let value = +input.value;
  if(value > 0 && value < 11 && value !== invalid) {
    startGame();
  } else {
    warning.classList.add('warning');
    setTimeout(() => {
      location.reload();
    }, 1500);
  }
});
