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
const memoryAudio = memoryWrap.querySelector("#memoryaudio");
const memorymusicStop = memoryWrap.querySelector(".memory__audio .stop");



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
    console.log(clickedCard)
    console.log(cardOne)
    if (clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return (cardOne = clickedCard);
        }
        console.log("뒤집기성공")
        cardTwo = clickedCard;
        disableDeck = true;

        let cardOneImg = cardOne.querySelector(".back img").src;
        let cardTwoImg = cardTwo.querySelector(".back img").src;

        matchCards(cardOneImg, cardTwoImg);
    }else{
        console.log("뒤집기실행문오류")
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
        if (memoryCountNum == 0) {
            soundSuccess.play();
            cardOne = cardTwo = "";
            memoryCount.innerText = `x ${memoryCountNum}`;
            soundMatch.play();
            disableDeck = false;

            memoryEndQuiz();
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        soundMatch.play();
        soundMatch.volume=1;
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
        imgTag.src = `https://parkhyeonshin.github.io/codingclass/javascript/effect/gameFolder/img/memory0${arr[index]}.png`;
    });
    console.log(cardOne)
}
// shuffledCard();

// 카드 클릭
function CardClick(){
    memoryCard.forEach((card) => {
        card.addEventListener("click", flipCard);
    });
}
// 카드 클릭시 플립카드로 넘기기 함수
// function clickCard(){
//     flipCard();
// }


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

    clearInterval(memoryTimer);
    memoryTimeReaming = 90;
    memoryCountNum = 16;
    matchedCard = 0;
    cardOne = cardTwo = "";
    memoryCount.innerText = `x ${memoryCountNum}`;
    memoryTime.innerText = memoryDisplayTime();
    memoryBtn.style.pointerEvents = "auto";
    memoryWindow.style.display = "block";
    memoryCardWindow.style.display = "none";
    memoryCard.forEach(e=>{
        e.removeEventListener("click", flipCard)
    })
    shuffledCard();
    CardClick();
    memoryBtn.innerText = "START";
    memoryCard.forEach((e) => {
        e.style.pointerEvents = "none";
    });
    memoryAudio.pause();
    memoryAudio.currentTime = 0;
    memorymusicStop.style.display = "none";
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
    memoryCard.forEach(e=>{
        e.removeEventListener("click", flipCard)
    })
    CardClick();
    setTimeout(() => {
        memoryTimer = setInterval(memoryReduceTime, 1000);
    }, 4000);
    shuffledCard();
    memorymusicStop.style.display = "block";
    memoryAudio.play();
    memoryAudio.volume = 0.5;
});

// 게임끝나면
function memoryEndQuiz() {
    clearInterval(memoryTimer);
    matchedCard = 0;
    cardOne = cardTwo = "";

    // clearTimeout(memoryTimer);
    // memoryTimeReaming = 120;
    memoryBtn.innerText = "RESTART";
    memoryCard.forEach((e) => {
        e.style.pointerEvents = "none";
    });
    memoryBtn.style.pointerEvents = "auto";
}

memorymusicStop.addEventListener("click", () => {
    memoryAudio.pause();
    memoryAudio.currentTime = 0;
    memorymusicStop.style.display = "none";
    document.querySelector(".memory__audio .play").classList.add("show");
    document.querySelector(".memory__audio .play").style.display = "block";
})
const memorymusicPlay = document.querySelector(".memory__audio .play").addEventListener("click", () => {
    memoryAudio.play();
    memoryAudio.volume = 0.5;
    memorymusicStop.style.display = "block";
    document.querySelector(".memory__audio .play").style.display = "none";

})