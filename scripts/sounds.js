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

module.exports = {
    randomRagTauntSound: randomRagTauntSound,
    randomRagMadSound: randomRagMadSound,
    randomRagDeathSound: randomRagDeathSound,
}