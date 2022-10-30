


// 01 HTML/CSS 디자인 구성

// 02

const memoryWrap = document.querySelector(".memory__wrap");
const memoryCard = memoryWrap.querySelectorAll(".cards li");

let cardOne, cardTwo;
let disableDeck = false;
let matchedCard = 0;

let sound = ["./audio/match.mp3", "./audio/unmatch.mp3", "./audio/success.mp3"];
let soundMatch = new Audio(sound[0]);
let soundUnMatch = new Audio(sound[1]);
let soundSuccess = new Audio(sound[2]);

// 카드 뒤집기
function flipCard(e) {
    let clickedCard = e.target;

    if (clickedCard !== cardOne && !disableDeck) {
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
            soundSuccess.play();
            alert("GameOver");
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        soundMatch.play();
        disableDeck = false;
    } else {
        // alert("이미지가 일치하지 않습니다.");

        setTimeout(() => {
            cardOne.classList.add("shakeX");
            cardTwo.classList.add("shakeX");
        }, 500);

        setTimeout(() => {
            cardOne.classList.remove("shakeX", "flip");
            cardTwo.classList.remove("shakeX", "flip");
            cardOne = cardTwo = "";
            disableDeck = false;
            soundUnMatch.play();
        }, 1000);
    }
}

// 카드 섞기
function shuffledCard() {
    cardOne = cardTwo = "";
    disableDeck = false;
    matchedCard = 0;

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    let result = arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

    memoryCard.forEach((card, index) => {
        card.classList.remove("flip");

        setTimeout(() => {
            card.classList.add("flip");
        }, 200 * index);

        setTimeout(() => {
            card.classList.remove("flip");
        }, 4000);
 
        let imgTag = card.querySelector(".back img");
        imgTag.src = `./img/memory0${arr[index]}.png`;
    });
}
// shuffledCard();

// 카드 클릭
memoryCard.forEach((card) => {
    card.addEventListener("click", flipCard);
});

// 버튼 클릭
const Btn = document.querySelector(".icon3");

Btn.addEventListener("click", () => {
    document.querySelector("#game__box").style.display = "block";
    memoryWrap.style.display = "flex";
    setTimeout(()=>{
        memoryWrap.style.opacity = "1";
    }, 500)
    setTimeout(()=>{
        shuffledCard()
    }, 1700)
});
// 버튼 클릭 닫기
document.querySelector(".memory__close").addEventListener("click",()=>{
    document.querySelector("#game__box").style.display = "none";
    memoryWrap.style.display = "none";
    memoryWrap.style.opacity = "0";
})