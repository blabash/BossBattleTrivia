ragTauntSounds = ['rag-laugh-07', 'rag-laugh-12', 'rag-laugh-14'];
ragMadSounds = ['rag-pissed-01', 'rag-pissed-evo00'];
ragDeathSounds = ['rag-death-00', 'rag-death-01'];

function randomRagTauntSound() {
    let index = Math.floor(Math.random() * 1000) % ragTauntSounds.length;
    let id = ragTauntSounds[index];
    let audioElement = document.getElementById(id);
    audioElement.play();
}

function randomRagMadSound() {
    let index = Math.floor(Math.random() * 1000) % ragMadSounds.length;
    let id = ragMadSounds[index];
    let audioElement = document.getElementById(id);
    audioElement.play();
}

function randomRagDeathSound() {
    let index = Math.floor(Math.random() * 1000) % ragDeathSounds.length;
    let id = ragDeathSounds[index];
    let audioElement = document.getElementById(id);
    audioElement.play();
}


let battleMusicPlaying = false;
let introMusicPlaying = true;

function playBattleMusic() {
    let battleMusic = document.getElementById('battle-music');
    battleMusic.play();
    battleMusicPlaying = true;
}

function pauseIntroMusic() {
    let introMusic = document.getElementById('intro-music');
    introMusic.pause();
    introMusicPlaying = false;
}

function pauseMusic() {
    let battleMusic = document.getElementById('battle-music');
    let introMusic = document.getElementById('intro-music');
    introMusicPlaying = false;
    document.getElementById('toggle-music-button')
    .addEventListener('click', () => {
            battleMusic.pause();
            introMusic.pause();
        })
}

pauseMusic();


function battleMusicToggle(value) {
    battleMusicPlaying = value;
}

// function toggleMusic() { //not working
//     let battleMusic = document.getElementById('battle-music');
//     let introMusic = document.getElementById('intro-music');

//     document.getElementById('toggle-music-button')
//     .addEventListener('click', () => {
//         if (introMusicPlaying) {
//             introMusic.pause();
//             introMusicPlaying = false;
//         } else if (!introMusicPlaying) {
//             introMusic.play();
//             introMusicPlaying = true;
//         }

//         if (battleMusicPlaying) {
//             battleMusic.pause();
//             battleMusicPlaying = false;
//         } else if (!battleMusicPlaying) {
//             battleMusic.play()
//             battleMusicPlaying = true;
//         }
//     })
// }


// toggleMusic();

module.exports = {
    randomRagTauntSound: randomRagTauntSound,
    randomRagMadSound: randomRagMadSound,
    randomRagDeathSound: randomRagDeathSound,
    playBattleMusic: playBattleMusic,
    pauseIntroMusic: pauseIntroMusic,
    battleMusicToggle: battleMusicToggle
}