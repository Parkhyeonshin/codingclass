const tetrisWrap = document.querySelector(".tetris__wrap");
const playground = document.querySelector(".playground > ul");

// 변수설정
let tetrisrouws = 15,
    tetriscols = 10;
let tetrisScore = 0,
    tetrisDuration = 500,
    tetrisDownInterval;
let tetrisTempMovingItem;

// 블록 정보
const tetrisMovingItem = {
    type: "Tmino",
    direction: 0, // 블록 모양
    top: 0,
    left: 0,
};

// 불록 좌표값
const blocks = {
    Tmino: [
        [
            [2, 1],
            [0, 1],
            [1, 0],
            [1, 1],
        ], // 기본모양
        [
            [1, 2],
            [0, 1],
            [1, 0],
            [1, 1],
        ], // 90deg
        [
            [1, 2],
            [0, 1],
            [2, 1],
            [1, 1],
        ], // 180deg
        [
            [2, 1],
            [1, 2],
            [1, 0],
            [1, 1],
        ], // 270deg
    ],
    Lmino: "",
    Jmino: "",
    Zmino: "",
    Smino: "",
    Omino: "",
    Imino: "",
};

// 시작하기
function init() {
    tetrisTempMovingItem = { ...tetrisMovingItem }; // 객체 안의 데이터만 가져올 수 있음

    prependNewLine(); // 블록 라인 만들기
    renderBlocks(); // 블록 출력하기
}

// 블록 만들기
function prependNewLine() {
    for (i = 0; i < tetrisrouws; i++) {
        const li = document.createElement("li"); //엘리먼트 만들기
        const ul = document.createElement("ul");
        for (j = 0; j < tetriscols; j++) {
            const matrix = document.createElement("li");
            ul.prepend(matrix);
        }

        li.prepend(ul);
        playground.prepend(li);
    }
}

// 블록 출력하기
function renderBlocks() {
    // const ty = tetrisTempMovingItem.type;
    // const di = tetrisTempMovingItem.direction;
    // const to = tetrisTempMovingItem.top;
    // const le = tetrisTempMovingItem.left;

    const { type, direction, top, left } = tetrisTempMovingItem;
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach((moving) => {
        moving.classList.remove(type, "moving");
    });

    blocks[type][direction].forEach((block) => {
        const x = block[0] + left; //x좌표
        const y = block[1] + top; //y좌표

        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
        const isAvailable = checkEmpty(target);

        if (isAvailable) {
            target.classList.add(type, "moving");
        } else {
            tetrisTempMovingItem = { ...tetrisMovingItem };
            setTimeout(() => {
                renderBlocks();
            }, 0);
        }
    });
    tetrisMovingItem.left = left;
    tetrisMovingItem.top = top;
    tetrisMovingItem.direction = direction;
}

// 빈칸 확인하기
function checkEmpty(target) {
    if (!target) {
        return;
    }
    return true;
}

// 블록 움직이기
function moveBlock(moveType, amount) {
    tetrisTempMovingItem[moveType] += amount;
    renderBlocks();
}

// 이벤트
document.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
        case 39:
            moveBlock("left", 1);
            break;
        case 37:
            moveBlock("left", -1);
            break;
        case 40:
            moveBlock("top", 1);
            break;

        default:
            break;
    }
});

init();
