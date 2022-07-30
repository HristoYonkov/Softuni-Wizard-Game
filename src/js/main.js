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
    height: 0,
    lastTimeFiredFireball: 0
};

let game = {
    speed: 2,
    speedMult: 4,
    fireballMultiplier: 5,
    fireInterval: 1000
};

let scene = {
    score: 0
}

// Game loop function
function gameAction(timestamp) {
    const wizard = document.querySelector('.wizard');
    
    // Modify fireballs positions
    let fireballs = document.querySelectorAll('.fire-ball');
    fireballs.forEach(fireball => {
        fireball.x += game.speed * game.fireballMultiplier;
        fireball.style.left = fireball.x + game.speed + 'px';
        
        if (fireball.x + fireball.offsetWidth > gameArea.offsetWidth) {
            fireball.parentElement.removeChild(fireball);
        }
    });
    
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

    if (keys.Space && timestamp - player.lastTimeFiredFireball > game.fireInterval) {
        wizard.classList.add('wizard-fire');
        addFireBall(player);
        player.lastTimeFiredFireball = timestamp;

    } else {
        wizard.classList.remove('wizard-fire')
    }

    // Apply movement
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

function addFireBall(player) {
    let fireball = document.createElement('div');
    fireball.classList.add('fire-ball');
    fireball.style.top = (player.y + player.height / 3 - 5) + 'px';
    fireball.x = player.x + player.width;
    fireball.style.left = fireball.x + 'px';

    gameArea.appendChild(fireball);
}