// 01 HTML/CSS 디자인 구성

// 02

const memoryWrap = document.querySelector(".memory__wrap");
const memoryCardWindow = document.querySelector(".memory__card");
const memoryCard = memoryWrap.querySelectorAll(".cards li");
const memoryTime = memoryWrap.querySelector(".memory__timer");
const memoryBtn = memoryWrap.querySelector(".memory__btn");
const memoryWindow = memoryWrap.querySelector(".memory__window");
const memoryMain = memoryWrap.querySelector(".memory__windowMain");
const memoryRanking = memoryWrap.querySelector(".memory__windowRanking");
const memoryCount = memoryWrap.querySelector(".memory__count__num");

let memoryTimer = 0;
let memoryTimeReaming = 00;
let memoryCountNum = 16;

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
        memoryCountNum--;
        memoryCountNum--;
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        if (memoryCountNum == 0) {
            soundSuccess.play();
            cardOne = cardTwo = "";
            memoryCount.innerText = `x ${memoryCountNum}`;
            soundMatch.play();
            memoryEndQuiz();
        }
        cardOne = cardTwo = "";
        soundMatch.play();
        memoryCount.innerText = `x ${memoryCountNum}`;
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
            card.style.pointerEvents = "auto";
        }, 4000);

        let imgTag = card.querySelector(".back img");
        imgTag.src = `./img/memory0${arr[index]}.png`;
    });
}
// shuffledCard();

// 카드 클릭
memoryCard.forEach((card) => {
    card.addEventListener("click", flipCard);
    card.addEventListener("click", () => {
        console.log("11");
    });
});

// 버튼 클릭
const Btn = document.querySelector(".icon3");

Btn.addEventListener("click", () => {
    document.querySelector("#game__box").style.display = "block";
    memoryWrap.style.display = "flex";
    setTimeout(() => {
        memoryWrap.style.opacity = "1";
    }, 500);
});
// 버튼 클릭 닫기
document.querySelector(".memory__close").addEventListener("click", () => {
    document.querySelector("#game__box").style.display = "none";
    memoryWrap.style.display = "none";
    memoryWrap.style.opacity = "0";
});

// 시간설정하기 함수
function memoryReduceTime() {
    memoryTimeReaming--;
    // if (memoryTimeReaming < 11) {
    //     document.querySelector(".search__time").style.background = "red";
    // }
    if (memoryTimeReaming == 0) {
        memoryEndQuiz();
    }

    memoryTime.innerText = memoryDisplayTime();
}

// 시간 표시하기 (분, 초 변환) 함수
function memoryDisplayTime() {
    if (memoryTimeReaming <= 0) {
        return "0:00";
    } else {
        let minutes = Math.floor(memoryTimeReaming / 60);
        let seconds = Math.floor(memoryTimeReaming % 60);

        // 초 단위가 한자리 일때 0 추가
        if (seconds < 10) seconds = "0" + seconds;
        if (minutes < 10) minutes = "0" + minutes;
        return minutes + ":" + seconds;
    }
}

// 스타트버튼클릭
memoryBtn.addEventListener("click", (e) => {
    memoryTimeReaming = 90;
    memoryCountNum = 16;
    cardOne = cardTwo = "";
    memoryCount.innerText = `x ${memoryCountNum}`;
    memoryTime.innerText = memoryDisplayTime();
    memoryBtn.style.pointerEvents = "none";
    memoryWindow.style.display = "none";
    memoryCardWindow.style.display = "block";
    setTimeout(() => {
        memoryTimer = setInterval(memoryReduceTime, 1000);
    }, 4000);
    shuffledCard();
});

// 게임끝나면
function memoryEndQuiz() {
    clearInterval(memoryTimer);
    matchedCard = 0;

    // clearTimeout(memoryTimer);
    // memoryTimeReaming = 120;
    memoryBtn.innerText = "RESTART";
    memoryCard.forEach((e) => {
        e.style.pointerEvents = "none";
    });
    memoryBtn.style.pointerEvents = "auto";
}
