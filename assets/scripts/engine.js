const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const clouds = document.querySelector('.clouds')
const overlayStart = document.getElementById('overlayStart')
const overlayGameOver = document.getElementById('overlayGameOver')
const score = document.querySelector('.score')
const lastScore = document.querySelector('.last-score')
const bestScore = document.querySelector('.best-score')
const container = document.querySelector('.container')

const backgroundMusic = document.getElementById('backgroundMusic')
const toggleMusicButton = document.getElementById('toggleMusic')

let scorePoints = 0
let scoreUpdate
let lastScorePoints
let bestScorePoints = 0
let loopGameOver

const start = () => {
    setTimeout(() => {
        pipe.style.animation = 'pipe-animation 1.5s infinite linear';
    }, 10);
    clouds.style.animation = 'clouds-animation 10s infinite linear'
    overlayStart.style.display = 'none'
    backgroundMusic.play()
    scoreUpdate = setInterval(() => {
        scorePoints++,
        score.innerText = `Score: ${scorePoints}`
    },1500)
    loopGameOver = setInterval (() => {
        const pipePositionL = +window.getComputedStyle(pipe).left.replace('px', '')
        const pipePositionR = +window.getComputedStyle(pipe).right.replace('px', '')
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')
        const cloudsPosition = +window.getComputedStyle(clouds).right.replace('px', '');
    
        if (pipePositionL <= 120 && pipePositionL >0 && marioPosition < 100) {
    
            pipe.style.animation = ''
            pipe.style.right = `${pipePositionR}px`
            mario.style.animation = ''
            mario.style.bottom = `${marioPosition}px`
            setTimeout (() => 
                mario.classList.remove('jump')
            , 500)
            clouds.style.animation = ''
            clouds.style.right = `${cloudsPosition}px`
    
            mario.src = './assets/sprites/game-over.png'
            mario.style.width = '75px'
            mario.style.marginLeft = '50px'
    
            clearInterval(loopGameOver)
            clearInterval(scoreUpdate)
    
            backgroundMusic.pause()
    
            overlayGameOver.style.display = 'block'
        }
        
    }, 10)
}



const jump = () => {
    mario.classList.add('jump')
    setTimeout (() => 
        mario.classList.remove('jump')
    , 500)
    // console.log('voce pulou')
}






toggleMusicButton.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        toggleMusicButton.src = './assets/sprites/soundOn.png'
        toggleMusicButton.textContent = 'Pause Music';
    } else {
        backgroundMusic.pause();
        toggleMusicButton.src = './assets/sprites/soundOff.png'
        toggleMusicButton.textContent = 'Play Music';
    }
});

const resetGame = () => {
    clearInterval(loopGameOver);
    
    mario.src = './assets/sprites/mario.gif'
    mario.style.width = '150px'
    mario.style.marginLeft = '0px'
    mario.style.bottom = '0px'
    pipe.style.right = '0px'
    clouds.style.right = '0px'
    overlayGameOver.style.display = 'none'
    overlayStart.style.display = 'block'
    pipe.style.animation = ''
    clouds.style.animation = ''
    
    lastScorePoints = scorePoints
    scorePoints = 0
    score.innerText = `Score: ${scorePoints}`
    lastScore.innerText = `Last Score: ${lastScorePoints}`
    lastScore.style.display = 'block'

    if (lastScorePoints > bestScorePoints) {
        bestScorePoints = lastScorePoints
    }
    bestScore.innerText = `Best Score: ${bestScorePoints}`
    bestScore.style.display = 'block'
}


document.addEventListener('keydown', jump)
document.addEventListener('click', jump)





