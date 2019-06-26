ragTauntSounds = ['rag-laugh-07', 'rag-laugh-12', 'rag-laugh-14'];
ragMadSounds = ['rag-pissed-01', 'rag-pissed-evo00'];
ragDeathSounds = ['rag-death-00', 'rag-death-01'];

function randomRagTauntSound() {
    let index = Math.floor(Math.random() * 1000) % ragTauntSounds.length;
    let id = ragTauntSounds[index];
    let audioElement = document.getElementById(id);
    !muted && audioElement.play();
}

function randomRagMadSound() {
    let index = Math.floor(Math.random() * 1000) % ragMadSounds.length;
    let id = ragMadSounds[index];
    let audioElement = document.getElementById(id);
    !muted && audioElement.play();
}

function randomRagDeathSound() {
    let index = Math.floor(Math.random() * 1000) % ragDeathSounds.length;
    let id = ragDeathSounds[index];
    let audioElement = document.getElementById(id);
    !muted && audioElement.play();
}

let gameStarted = false;
function playBattleMusic() {
    let battleMusic = document.getElementById('battle-music');
    !muted && battleMusic.play();
    gameStarted = true;
}

function pauseIntroMusic() {
    let introMusic = document.getElementById('intro-music');
    introMusic.pause();
}

let muted = false;
function toggleMusic() {
    let battleMusic = document.getElementById('battle-music');
    let introMusic = document.getElementById('intro-music');
    document.getElementById('toggle-music-button')
    .addEventListener('click', () => {
            muted && gameStarted ? battleMusic.play() : battleMusic.pause();
            muted ? introMusic.play() : introMusic.pause();
            muted = !muted;
        })
}

toggleMusic();

module.exports = {
    randomRagTauntSound: randomRagTauntSound,
    randomRagMadSound: randomRagMadSound,
    randomRagDeathSound: randomRagDeathSound,
    playBattleMusic: playBattleMusic,
    pauseIntroMusic: pauseIntroMusic,
}