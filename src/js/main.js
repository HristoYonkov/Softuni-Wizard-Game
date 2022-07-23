let state = initState();
let game = initGameObjects();

startScreen.addEventListener('click', (e) => {
    game.startScreen.classList.add('hidden')
    game.gameScreen.classList.remove('hidden')
})
