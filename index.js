let x = 1;
let y = 1;

let gameField = document.querySelector('.game__field');

[...gameField.children].forEach((square) => {
    let random = Math.random();
    square.innerHTML = random < 0.7 ? '♠' : random < 0.8 || random > 0.7 ? '♣' : random < 0.9 || random > 0.8 ? '♢' : '♡';
    square.setAttribute('x', x);
    x++;
    square.setAttribute('y', y);
    if (x > 6) {
        y++;
        x = 1;
    }
});

function removeInner(x, y) {
    let value = gameField.querySelector(`[x="${x}"][y="${y}"]`).innerHTML;
    let topValue = gameField.querySelector(`[x="${x}"][y="${y - 1}"]`) ? gameField.querySelector(`[x="${x}"][y="${y - 1}"]`).innerHTML : 0;
    let bottomValue = gameField.querySelector(`[x="${x}"][y="${y + 1}"]`) ? gameField.querySelector(`[x="${x}"][y="${y + 1}"]`).innerHTML : 0;
    let leftValue = gameField.querySelector(`[x="${x - 1}"][y="${y}"]`) ? gameField.querySelector(`[x="${x - 1}"][y="${y}"]`).innerHTML : 0;
    let rightValue = gameField.querySelector(`[x="${x + 1}"][y="${y}"]`) ? gameField.querySelector(`[x="${x + 1}"][y="${y}"]`).innerHTML : 0;
    gameField.querySelector(`[x="${x}"][y="${y}"]`).innerHTML = '';

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

document.addEventListener('click', (e) => {
    const isGameSquares = e.target.matches('.game__squares');
    if (isGameSquares) {
        let x = Number(e.target.getAttribute("x"));
        let y = Number(e.target.getAttribute("y"));
        removeInner(x, y);
    }
});
