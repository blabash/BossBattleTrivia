const backgroundMethods = require('./background');
const setGravity = backgroundMethods.setGravity;
const setSpawnRate = backgroundMethods.setSpawnRate;
const ragSounds = require('./sounds');
const randomRagTauntSound = ragSounds.randomRagTauntSound;
const randomRagMadSound = ragSounds.randomRagMadSound;
const randomRagDeathSound = ragSounds.randomRagDeathSound;
const playBattleMusic = ragSounds.playBattleMusic;
const pauseIntroMusic = ragSounds.pauseIntroMusic;
const battleMusicToggle = ragSounds.battleMusicToggle;

var triviaQuestions = [{
    question: "In what year was the Molten Core raid released?",
    answerList: ["2002", "2003", "2004", "2005"],
    answer: 2
},
{
    question: "What was the name of Ragnaros' majordomo?",
    answerList: ["Moroes", "Ner'Zhul", "Executus", "Van Cleef"],
    answer: 2
},
{
    question: "Which of these classes are not available to blood elves?",
    answerList: ["Rogue", "Warlock", "Priest", "Warrior"],
    answer: 3
},
{
    question: "What is the name of the human capital city?",
    answerList: ["Ironforge", "Elwynn City", "Stormwind City", "Booty Bay"],
    answer: 2
},
{
    question: "Which four-wing instance is located in Tirisfal Glades?",
    answerList: ["Auchindoun", "The Stockade", "Scarlet Monastery", "Shaodwfang Keep"],
    answer: 2
},
{
    question: "Who build Karazhan?",
    answerList: ["Archimonde", "Medivh", "Kel'thuzad", "Arthas Menethil"],
    answer: 1
},
{
    question: "What is the Draenei racial healing ability called?",
    answerList: ["Blessing of Argus", "Gift of the Naaru", "Symbol of Hope", "Call of the Exodar"],
    answer: 1
},
{
    question: "Where is the Clef of Shadow located?",
    answerList: ["Shadowmoon Valley", "Hellfire Peninsula", "Orgrimmar", "Tirisfal Glades"],
    answer: 2
},
{
    question: "What is the name of the pirate faction that plagues the goblins of the Steamwheedle Cartel?",
    answerList: ["Blood Admirals", "Azeroth Plunderers", "Jungle Stalkers", "Bloodsail Buccaneers"],
    answer: 3
},
{
    question: "Arthas Menethil was prince of where?",
    answerList: ["Stormwind", "The Eastern Kingdoms", "Stratholme", "Lordaeron"],
    answer: 3
},
{
    question: "When a warlock summons their dreadsteed, which world does it come from?",
    answerList: ["Nazrethim", "Xoroth", "The Twisting Nether", "Argus"],
    answer: 1
},
{
    question: "What raid instance is located in Stranglethorn Vale?",
    answerList: ["Zul'Aman", "Zul'Farrak", "Jaguero Isle", "Zul'Gurub"],
    answer: 3
},
{
    question: "Which of the following weapons is NOT summoned by Kael'thas Sunstrider in The Eye?",
    answerList: ["Twinblade of the Pheonix", "Cosmic Infuser", "Infinity Blade", "Devastation"],
    answer: 0
},
{
    question: "What is the racial enemy of the Tauren?",
    answerList: ["Centaurs", "Demons", "Quilboars", "Dwarves"],
    answer: 0
},
{
    question: "What non-combat vanity pet is completely unattainable by Horde players? (There is only one.)?",
    answerList: ["White Kitten", "Prairie Chicken", "Sprite Darter", "Red Moth"],
    answer: 2
},
{
    question: "Where would you find Timmy the Cruel??",
    answerList: ["Gnomeregan", "Orgrimmar", "Stratholme", "Eversong Woods"],
    answer: 2
},
{
    question: "The entrance to Blackwing Lair is found inside what instance?",
    answerList: ["Upper Blackrock Spire", "Blackrock Depths", "Molten Core", "Onyxia's Lair"],
    answer: 0
},
{
    question: "What zone contains the settlement of Darkshire?",
    answerList: ["Deadwin Pass", "Duskwood", "Swamp of Sorrows", "Redridge Mountains"],
    answer: 1
},
{
    question: "What is the name of the goblin camp in Dustwallow Marsh?",
    answerList: ["Brackenwall Village", "Everlook", "Theramore", "Mudsprocket"],
    answer: 3
},
{
    question: "What profession uses the fish Oily Blackmouth?",
    answerList: ["Alechmy", "Herbalism", "Cooking", "Jewelcrafting"],
    answer: 0
},
{
    question: "Which of the following class abilities changes your party's movement speed?",
    answerList: ["Retribution Aura", "Aspect of the Pack", "Battle Shout", "Sprint"],
    answer: 1
},
{
    question: "Which of the following is a Priest talent?",
    answerList: ["Healing Grace", "Focused Mind", "Shadow Master", "Force of Will"],
    answer: 3
},
{
    question: "What faction gives you a quest involving the almighty Booterang?",
    answerList: ["Netherwing", "Hydraxian Waterlords", "The Consortium", "Steamwheedle Cartel"],
    answer: 0
},
{
    question: "Where would you find Old Blanchy?",
    answerList: ["Old Hillsbrad Foothills", "Ironforge", "Loch Modan", "Westfall"],
    answer: 3
},
{
    question: "Where would you find Young Blanchy?",
    answerList: ["Old Hillsbrad Foothills", "Loch Modan", "Westfall", "Durotar"],
    answer: 0
},
{
    question: "Who is the current leader of the Darkspear Troll tribe?",
    answerList: ["Vol'Jin", "Sen'jin", "Hakkar", "Thrall"],
    answer: 0
},
{
    question: "What is the name of the level 60 kitty that roams The Exodar?",
    answerList: ["Fluffy", "Nibblet", "Crusty Bob", "Velen"],
    answer: 1
},
{
    question: "The rogue talent Mutilate requires what?",
    answerList: ["Level 45", "Dual-wielding daggers", "At least one dagger", "40 points in the Combat Tree"],
    answer: 1
},
{
    question: "Which of the following bosses requires your raid to bring along a fishing pole?",
    answerList: ["Hydross", "Morogrim Tidewalker", "Solarian", "The Lurker Below"],
    answer: 3
},
{
    question: "What is Lil Timmy's title?",
    answerList: ["Boy with kittens", "Boy with peashooter", "Gun Vendor", "Kitten Vendor"],
    answer: 0
},
{
    question: "Who is the King of Stormwind?",
    answerList: ["Bolvar Fordragon", "Saidan Dathrohan", "Varian Wrynn", "Anduin Wrynn"],
    answer: 3
},
{
    question: "The highly sought-after Tome of Polymorph: Turtle drops from what boss?",
    answerList: ["Gahz'ranka", "Hydross", "Attumen the Huntsman", "Kurinnaxx"],
    answer: 0
},
{
    question: "Which of the following items is also known as 'the squidstick'?",
    answerList: ["Terestrian's Stranglestaff", "Staff of Infinite Mysteries", "Feral Staff of Lashing", "Zhar'doom, Greatstaff of the Devourer"],
    answer: 0
},
{
    question: "Which class has no healing spells?",
    answerList: ["Warrior", "Hunter", "Warlock", "Shaman"],
    answer: 1
},
{
    question: "Which of the following zones is in the Eastern Kingdoms?",
    answerList: ["Mulgore", "Teldrassil", "Badlands", "Feralas"],
    answer: 2
},];

let currentQuestion;
let correctAnswer;
let incorrectAnswer;
let unanswered;
let seconds;
let time;
let answered;
let userSelect;

const messages = {
    correct: "Yep, that's right",
    incorrect: "No, that's not it.",
    endTime: "Out of time!",
    youWin: "You win...this time.",
    youLose: "You are defeated."
}

function getStarted() {
    document.getElementById('startBtn').addEventListener('click', () => {
        document.getElementById('start-screen-container').style.display = 'none';
        document.getElementById('rag-video').classList.add('visible');
        battleMusicToggle(true);
        pauseIntroMusic();
        randomRagTauntSound();
        playBattleMusic();
        newGame();
    });
    
    document.getElementById('startOverBtn').addEventListener('click', () => {
        document.getElementById('startOverBtn').style.display = 'none';
        document.getElementById('rag-video').classList.remove('hidden');
        document.getElementById('rag-video').classList.add('visible');
        randomRagTauntSound();
        newGame();
    });
}

function newGame() {
    document.getElementById('game-container').classList.add('fade-in');
    document.getElementById('finalMessage').innerHTML = '';
    document.getElementById('correctAnswers').innerHTML = '';
    document.getElementById('incorrectAnswers').innerHTML = '';
    document.getElementById('unanswered').innerHTML = '';
    currentQuestion = 0;
    setCorrectAnswers(0);
    incorrectAnswer = 0;
    unanswered = 0;
    // updateHealthbar();
    newQuestion();
}

function newQuestion() {
    setGravity(3);
    document.getElementById('currentQuestion').classList.remove('disabled');
    document.getElementById('question').classList.remove('disabled');
    document.getElementById('timeLeft').classList.remove('disabled'); 
    setSpawnRate(75); //set lava back to non-scary mode
    document.getElementById('message').innerHTML = '';
    document.getElementById('correctedAnswer').innerHTML = '';
    answered = true;

    //sets up new questions & answerList
    document.getElementById('currentQuestion').innerHTML = 'Question #' + (currentQuestion + 1) + '/' + triviaQuestions.length;
    document.getElementById('question').innerHTML = triviaQuestions[currentQuestion].question
    for (let i = 0; i < 4; i++) {
        let choice = document.createElement('button');
        choice.innerHTML = triviaQuestions[currentQuestion].answerList[i];
        choice.setAttribute('index', i);
        choice.classList.add('questionChoices');
        document.getElementById('answerList').appendChild(choice)
    }
    countdown();
    //clicking an answer will pause the time and setup answerPage
    let questionChoices = document.getElementsByClassName('questionChoices');

    for (let i = 0; i < questionChoices.length; i++) {
        questionChoices[i].addEventListener('click', () => {
            userSelect = questionChoices[i].getAttribute('index');
            document.getElementById('currentQuestion').classList.add('disabled');
            document.getElementById('question').classList.add('disabled');
            document.getElementById('timeLeft').classList.add('disabled');
            clearInterval(time);
            answerPage();
        });
    }
}

function countdown() {
    seconds = 15;
    document.getElementById('timeLeft').innerHTML = '<h3>Time Remaining: ' + seconds + '</h3>';
    answered = true;
    //sets timer to go down
    time = setInterval(showCountdown, 1000);
}

function showCountdown() {
    seconds--;
    document.getElementById('timeLeft').innerHTML = '<h3>Time Remaining: ' + seconds + '</h3>';
    if (seconds < 1) {
        document.getElementById('currentQuestion').classList.add('disabled');
        document.getElementById('question').classList.add('disabled');
        document.getElementById('timeLeft').classList.add('disabled');
        randomRagTauntSound();
        clearInterval(time);
        answered = false;
        answerPage();
    }
}

let won;
function answerPage() {
    let answers = document.getElementsByClassName('questionChoices');
    for (let i = 0; i < answers.length; i++) {
        answers[i].className += ' disabled';
    }

    let rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
    let rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    //checks to see correct, incorrect, or unanswered
    if ((userSelect == rightAnswerIndex) && (answered == true)) {
        randomRagMadSound();
        setCorrectAnswers(correctAnswer+1);
        // updateHealthbar();
        document.getElementById('message').innerHTML = messages.correct;
    } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
        setSpawnRate(2); //make lava scary
        randomRagTauntSound();
        incorrectAnswer++;
        document.getElementById('message').innerHTML = messages.incorrect;
        document.getElementById('correctedAnswer').innerHTML = 'The correct answer was: ' + rightAnswerText;
    } else {
        setSpawnRate(5); 
        unanswered++;
        document.getElementById('message').innerHTML = messages.endTime;
        document.getElementById('correctedAnswer').innerHTML = 'The correct answer was: ' + rightAnswerText;
        answered = true;
    }

    setTimeout(() => {
        while (answers.length > 0) {
            answers[0].parentNode.removeChild(answers[0]);
        }
        document.getElementById('question').innerHTML = '';
    }, 5000)

    if (currentQuestion == (triviaQuestions.length - 1) && (unanswered + incorrectAnswer < 3)) { //change 1 to 3
        document.getElementById('game-container').classList.remove('fade-in');
        setTimeout(randomRagDeathSound, 5500);
        setTimeout(scoreboard, 5000)
        setTimeout(() => {
            document.getElementById('rag-video').classList.add('hidden');
        }, 5500)
        won = true;
    } else if (unanswered + incorrectAnswer === 3) { // change 1 to 3
        document.getElementById('game-container').classList.remove('fade-in');
        setTimeout(randomRagTauntSound, 5500);
        setTimeout(scoreboard, 5000);
        won = false;
    } else {
        currentQuestion++;
        setTimeout(newQuestion, 5000);
    }
}

function setCorrectAnswers(n)
{
//    if (typeof(correctAnswer) == 'undefined')
//       updateHealthbar(triviaQuestions.length, 0, 2);
//    else
//       updateHealthbar(correctAnswer, n, 10);

   correctAnswer = n;
}


function updateHealthbar(from, to, speed) {
    let fromWidth = 100 - (100 * from / triviaQuestions.length);
    let toWidth   = 100 - (100 * to / triviaQuestions.length);

    var elem = document.getElementById("myBar");

    var id = setInterval(frame, speed);
    function frame() {
        inc = (fromWidth > toWidth) ? -1 : 1;

        if (fromWidth == toWidth || toWidth > 100 || toWidth < 0)
           clearInterval(id);
        else {
           fromWidth += inc;
           elem.style.width = fromWidth + '%';
        }
    }
}

function scoreboard() {
    setSpawnRate(75);
    document.getElementById('game-container').classList.add('fade-in');
    document.getElementById('currentQuestion').innerHTML = '';
    document.getElementById('timeLeft').innerHTML = '';
    document.getElementById('message').innerHTML = '';
    document.getElementById('correctedAnswer').innerHTML = '';
    if (won) {
        document.getElementById('finalMessage').innerHTML = messages.youWin;    
    } else {
        document.getElementById('finalMessage').innerHTML = messages.youLose;    
    }
    document.getElementById('correctAnswers').innerHTML = "Correct Answers: " + correctAnswer;
    document.getElementById('incorrectAnswers').innerHTML = "Incorrect Answers: " + incorrectAnswer;
    document.getElementById('unanswered').innerHTML = "Unanswered: " + unanswered;
    document.getElementById('startOverBtn').style.visibility = "visible";
    document.getElementById('startOverBtn').classList.add('reset');
    document.getElementById('startOverBtn').style.display = 'block';
}

module.exports = getStarted;
