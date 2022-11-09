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
        ],
        [
            [1, 2],
            [0, 1],
            [1, 0],
            [1, 1],
        ],
        [
            [1, 2],
            [0, 1],
            [2, 1],
            [1, 1],
        ],
        [
            [2, 1],
            [1, 2],
            [1, 0],
            [1, 1],
        ],
    ],
    Imino: [
        [
            [0, 0],
            [0, 1],
            [0, 2],
            [0, 3],
        ],
        [
            [0, 0],
            [1, 0],
            [2, 0],
            [3, 0],
        ],
        [
            [0, 0],
            [0, 1],
            [0, 2],
            [0, 3],
        ],
        [
            [0, 0],
            [1, 0],
            [2, 0],
            [3, 0],
        ],
    ],
    Omino: [
        [
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1],
        ],
        [
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1],
        ],
        [
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1],
        ],
        [
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1],
        ],
    ],
    Zmino: [
        [
            [0, 0],
            [1, 0],
            [1, 1],
            [2, 1],
        ],
        [
            [1, 0],
            [0, 1],
            [1, 1],
            [0, 2],
        ],
        [
            [0, 0],
            [1, 0],
            [1, 1],
            [2, 1],
        ],
        [
            [1, 0],
            [0, 1],
            [1, 1],
            [0, 2],
        ],
    ],
    Smino: [
        [
            [1, 0],
            [2, 0],
            [0, 1],
            [1, 1],
        ],
        [
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 2],
        ],
        [
            [1, 0],
            [2, 0],
            [0, 1],
            [1, 1],
        ],
        [
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 2],
        ],
    ],
    Jmino: [
        [
            [0, 2],
            [1, 0],
            [1, 1],
            [1, 2],
        ],
        [
            [0, 0],
            [0, 1],
            [1, 1],
            [2, 1],
        ],
        [
            [0, 0],
            [1, 0],
            [0, 1],
            [0, 2],
        ],
        [
            [0, 0],
            [1, 0],
            [2, 0],
            [2, 1],
        ],
    ],
    Lmino: [
        [
            [0, 0],
            [0, 1],
            [0, 2],
            [1, 2],
        ],
        [
            [0, 0],
            [1, 0],
            [2, 0],
            [0, 1],
        ],
        [
            [0, 0],
            [1, 0],
            [1, 1],
            [1, 2],
        ],
        [
            [0, 1],
            [1, 1],
            [2, 0],
            [2, 1],
        ],
    ],
};

// 시작하기
function init() {
    tetrisTempMovingItem = { ...tetrisMovingItem }; // 객체 안의 데이터만 가져올 수 있음

    for (i = 0; i < tetrisrouws; i++) {
        prependNewLine();
    }
    prependNewLine(); // 블록 라인 만들기
    // renderBlocks(); // 블록 출력하기
    generateNewBlcok(); //블럭 새만들기(두번째부터 자동내려감시작되므로 시작할때 한번 실행중)
}

// 블록 만들기
function prependNewLine() {
    const li = document.createElement("li"); //엘리먼트 만들기
    const ul = document.createElement("ul");
    for (j = 0; j < tetriscols; j++) {
        const matrix = document.createElement("li");
        ul.prepend(matrix);
    }

    li.prepend(ul);
    playground.prepend(li);
}

// 블록 출력하기
function renderBlocks(moveType = "") {
    // const ty = tetrisTempMovingItem.type;
    // const di = tetrisTempMovingItem.direction;
    // const to = tetrisTempMovingItem.top;
    // const le = tetrisTempMovingItem.left;

    const { type, direction, top, left } = tetrisTempMovingItem;
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach((moving) => {
        moving.classList.remove(type, "moving");
    });

    blocks[type][direction].some((block) => {
        //foreach와 같이 반복문인데 애는 중간스탑이 가능
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
                if (moveType === "top") {
                    seizeBlock();
                }
            }, 0);
            return true;
        }
    });
    tetrisMovingItem.left = left;
    tetrisMovingItem.top = top;
    tetrisMovingItem.direction = direction;
}

// 블록 감지하기
function seizeBlock() {
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach((moving) => {
        moving.classList.remove("moving");
        moving.classList.add("seized");
        checkEmpty();
    });
    checkMatch();
}
// 한줄 제거하기
function checkMatch() {
    const childNodes = playground.childNodes;
    childNodes.forEach((child) => {
        let matched = true;
        child.children[0].childNodes.forEach((li) => {
            if (!li.classList.contains("seized")) {
                matched = false;
            }
        });

        if (matched) {
            child.remove();
            prependNewLine();
        }
    });

    generateNewBlcok();
}

// 새로운 블럭 만들기
function generateNewBlcok() {
    clearInterval(tetrisDownInterval);
    tetrisDownInterval = setInterval(() => {
        moveBlock("top", 1);
    }, tetrisDuration);

    const blockArray = Object.entries(blocks);
    const tetrisRandomIndex = Math.floor(Math.random() * blockArray.length);

    tetrisMovingItem.type = blockArray[tetrisRandomIndex][0];
    tetrisMovingItem.top = 0;
    tetrisMovingItem.left = 3;
    tetrisMovingItem.direction = 0;
    tetrisTempMovingItem = { ...tetrisMovingItem };
    renderBlocks();
}

// 빈칸 확인하기
function checkEmpty(target) {
    if (!target || target.classList.contains("seized")) {
        return;
    }
    return true;
}

// 블록 움직이기
function moveBlock(moveType, amount) {
    tetrisTempMovingItem[moveType] += amount;
    renderBlocks(moveType);
}

// 모양 바꾸기
function changeDerection() {
    const direction = tetrisTempMovingItem.direction;
    direction === 3 ? (tetrisTempMovingItem.direction = 0) : (tetrisTempMovingItem.direction += 1);
    renderBlocks();
}
// 빨리 내리기
function dropBlock() {
    clearInterval(tetrisDownInterval);

    tetrisDownInterval = setInterval(() => {
        moveBlock("top", 1);
    }, 5);
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
        case 38:
            changeDerection();
            break;
        case 32:
            dropBlock();
            break;

        default:
            break;
    }
});

init();
