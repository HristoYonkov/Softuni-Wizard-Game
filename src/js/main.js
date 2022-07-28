const gameStart = document.querySelector('.game-start')
const gameArea = document.querySelector('.game-area')
const gameOver = document.querySelector('.game-over')
const gameScore = document.querySelector('.game-score')

gameStart.addEventListener('click', onGameStart);

function onGameStart() {
    gameStart.classList.add('hide')
    
    //render wizard
    const wizard = document.createElement('div');
    wizard.classList.add('wizard');
    wizard.style.top = player.y + 'px';
    wizard.style.left = player.x + 'px';
    gameArea.appendChild(wizard);
    
    //game infinite loop
    window.requestAnimationFrame(gameAction)
}

let keys = {};

let player = {
    x: 150,
    y: 100
};

let game = {
    speed: 2
};

// Game loop function
function gameAction() {
    const wizard = document.querySelector('.wizard');
    // Register user input
    if (keys.ArrowUp) {
        player.y -= game.speed;
    }
    if (keys.ArrowDown) {
        player.y += game.speed;
    }
    if (keys.ArrowLeft) {
        player.x -= game.speed;
    }
    if (keys.ArrowRight) {
        player.x += game.speed;
    }

    wizard.style.top = player.y + 'px';
    wizard.style.left = player.x + 'px';

    window.requestAnimationFrame(gameAction)
}

//global key listeners
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);


function onKeyDown(e) {
    keys[e.code] = true;
}

function onKeyUp(e) {
    keys[e.code] = false;
}
