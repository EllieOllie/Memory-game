const gameField = document.querySelector('.game');
const playground = document.querySelector('.playground');
const flipCard = document.querySelector('.flip-card');
const menu = document.querySelector('.menu');
const warning = document.querySelector('.menu__subtitle');
const input = document.querySelector('.menu__level');
const button = document.querySelector('.menu__btn');


function hideMenu() {
  menu.classList.add('hide');
  playground.classList.remove('hide');
}

function getCards(cards) {

  for (let card = 1; card <= Math.pow(cards, 2); card++) {

    let flipWrap = document.createElement("div");
    flipCard.appendChild(flipWrap);
    flipWrap.classList.add("flip-card-wrap");

    let frontFlip = document.createElement("div");
    flipWrap.appendChild(frontFlip);
    frontFlip.classList.add("front-flip");

    let backFlip = document.createElement("div");
    flipWrap.appendChild(backFlip);
    backFlip.classList.add("back-flip");
  }
}

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

function changeSizeImg() {
  const imagesFront = document.querySelectorAll('.front-flip');
  const numsBack = document.querySelectorAll('.back-flip');
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

function toggleCards() {

  const cards = document.querySelectorAll('.flip-card-wrap');
  const images = document.querySelectorAll('.front-flip');
  const cardsBack = document.querySelectorAll('.back-flip');

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

    images.forEach((card, index) => card.setAttribute('data-number', nums[index]));

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

  [...cards].map(card => card.addEventListener("click", () => {
    card.classList.toggle('flip');
    // compareCards();
  }))
}

// function compareCards() {
//   const flippedCard = document.querySelectorAll('.flip');
//   console.log(...flippedCard);

//   if (flippedCard.length === 2) {
//     if ([...flippedCard][0].firstElementChild.getAttribute('data-number') !== [...flippedCard][1].firstElementChild.getAttribute('data-number')) {
//       flippedCard.classList.remove('flip');
//     }
//   }

//   // let clickedCard = (event) => console.log(event.target);
//   // document.addEventListener('click', clickedCard);
// }




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
