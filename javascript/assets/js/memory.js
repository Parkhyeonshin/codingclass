// 01 HTML/CSS 디자인 구성

// 02

const memoryWrap = document.querySelector(".memory__wrap");
const memoryCard = memoryWrap.querySelectorAll(".cards li");

let cardOne, cardTwo;
let disableDeck = false;
let matchedCard = 0;

let sound = ["../assets/audio/match.mp3", "../assets/audio/unmatch.mp3", "../assets/audio/success.mp3"];
let soundMatch = new Audio(sound[0]);
let soundUnMatch = new Audio(sound[1]);
let soundSuccess = new Audio(sound[2]);

// 카드 뒤집기
function flipCard(e) {
    let clickedCard = e.target;

    if (clickedCard !== cardOne) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return (cardOne = clickedCard);
        }
        cardTwo = clickedCard;
        disableDeck = true;

        let cardOneImg = cardOne.querySelector(".back img").src;
        let cardTwoImg = cardTwo.querySelector(".back img").src;

        matchCards(cardOneImg, cardTwoImg);
    }
}

// 카드 확인(두개의 이미지 비교)
function matchCards(img1, img2) {
    if (img1 == img2) {
        // 같을 경우
        matchedCard++;
        // alert("이미지가 일치합니다.⎛⎝.⎛° ͜ʖ°⎞.⎠⎞");

        if (matchedCard == 8) {
            alert("GameOver");
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        disableDeck = false;
    } else {
        // alert("이미지가 일치하지 않습니다.");

        setTimeout(() => {
            cardOne.classList.add("shakeX");
            cardTwo.classList.add("shakeX");
        }, 500);

        setTimeout(() => {
            cardOne.classList.remove("shakeX");
            cardTwo.classList.remove("shakeX");
            cardOne = cardTwo = "";
            disableDeck = false;
            soundUnMatch.play();
        }, 1600);
    }
}

// 카드 클릭
memoryCard.forEach((card) => {
    card.addEventListener("click", flipCard);
});
