const boardSize = 40;
const interval = 1000;

let currentDirection = 'right';
let startX = 0;
let startY = 0;

let snake = [2, 1, 0];
let head = snake[0];

for (let i = 0; i < (boardSize * boardSize); i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    document.getElementById('gameBoard').appendChild(cell);
}

const cells = Array.from(document.querySelectorAll('#gameBoard div'))




setInterval(function() {
    updateBoard();
}, interval)

function updateBoard() {
    console.log('update board')

    switch (currentDirection) {
        case 'right':
            
            break;
        case 'left':
            break;
        case 'up':
            break;
        case 'down':
            break;
    }
}