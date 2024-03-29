let x = 1;
let y = 1;

function createGame(id, x, y) {
    let gameField = ``;
    for (let i = 1; i < y+1; i++) {
        for (let k = 1; k < x+1; k++) {
            gameField += getCell(k, i);
        }

    }
    document.querySelector(`#${id}`).innerHTML = `<div class="game">
        <div class="game__field">${gameField}</div></div>`
}

function getCell(x, y) {
    let random = Math.random();
    let className;
    let type;

    if (random < 0.25) {
        type = "♠";
        className = 'game__squares_spades';
    } else if (random > 0.25 && random < 0.5) {
        type = "♣";
        className = 'game__squares_clubs';
    } else if (random > 0.5 && random < 0.75) {
        type = "♢";
        className = 'game__squares_diamonds';
    } else {
        type = "♡";
        className = 'game__squares_hearts';
    }

    return `<div class="game__squares ${className}" x=${x} y=${y}>${type}</div>`
}

createGame('game', 6, 7);

let gameField = document.querySelector(".game__field");

function removeInner(x, y) {
    let gameSquare = gameField.querySelector(`[x="${x}"][y="${y}"]`);
    let value = gameSquare.innerHTML;
    if (value === "") {
        return;
    }
    let topValue = getNearCell(x, y-1);
    let bottomValue = getNearCell(x, y+1);
    let leftValue = getNearCell(x-1, y);
    let rightValue = getNearCell(x+1, y);
    gameSquare.innerHTML = "";
    if (value === topValue) {
        removeInner(x, y - 1);
    }
    if (value === bottomValue) {
        removeInner(x, y + 1);
    }
    if (value === leftValue) {
        removeInner(x - 1, y);
    }
    if (value === rightValue) {
        removeInner(x + 1, y);
    }
}

function getNearCell(x, y) {
    return gameField.querySelector(`[x="${x}"][y="${y}"]`) && gameField.querySelector(`[x="${x}"][y="${y}"]`).innerHTML;
}

document.addEventListener("click", e => {
    const isGameSquares = e.target.matches(".game__squares");
    if (isGameSquares) {
        let x = Number(e.target.getAttribute("x"));
        let y = Number(e.target.getAttribute("y"));
        removeInner(x, y);
    }
});
