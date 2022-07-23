const startScreen = document.querySelector('.start-screen')
const gameScreen = document.querySelector('.game-screen')

startScreen.addEventListener('click', (e) => {
    console.log(startScreen, gameScreen);
    startScreen.classList.add('hidden')
    gameScreen.classList.remove('hidden')
})
