const gameStart = document.querySelector('.game-start');
const gameArea = document.querySelector('.game-area');
const gameOver = document.querySelector('.game-over');
const gameScore = document.querySelector('.game-score');
const gamePoints = document.querySelector('.points');

gameStart.addEventListener('click', onGameStart);

function onGameStart() {
    gameStart.classList.add('hide');
    
    //render wizard
    const wizard = document.createElement('div');
    wizard.classList.add('wizard');
    wizard.style.top = player.y + 'px';
    wizard.style.left = player.x + 'px';
    gameArea.appendChild(wizard);

    player.width = wizard.offsetWidth;
    player.height = wizard.offsetHeight;
    
    //game infinite loop
    window.requestAnimationFrame(gameAction)
}

let keys = {};

let player = {
    x: 150,
    y: 100,
    width: 0,
    height: 0
};

let game = {
    speed: 2,
    speedMult: 4
};
let scene = {
    score: 0
}

// Game loop function
function gameAction() {
    const wizard = document.querySelector('.wizard');
    
    //Increment score count
    scene.score++;

    // Apply gravitation
    let isInAir = (player.height + player.y) <= gameArea.offsetHeight;
    if (isInAir) {
        player.y += game.speed
    }

    // Register user input
    if (keys.ArrowUp && player.y > 0) {
        player.y -= game.speed * game.speedMult;
    }
    if (keys.ArrowDown && isInAir) {
        player.y += game.speed * game.speedMult;
    }
    if (keys.ArrowLeft && player.x > 0) {
        player.x -= game.speed * game.speedMult;
    }
    if (keys.ArrowRight && player.x + player.width < gameArea.offsetWidth) {
        player.x += game.speed * game.speedMult;
    }

    wizard.style.top = player.y + 'px';
    wizard.style.left = player.x + 'px';

    // Apply score
    gamePoints.textContent = scene.score;

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
