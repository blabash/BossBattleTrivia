const backgroundMethods = require('./background');
const setGravity = backgroundMethods.setGravity;
const setSpawnRate = backgroundMethods.setSpawnRate;
const ragSounds = require('./sounds');
const randomRagTauntSound = ragSounds.randomRagTauntSound;
const randomRagMadSound = ragSounds.randomRagMadSound;
const randomRagDeathSound = ragSounds.randomRagDeathSound;

var triviaQuestions = [{
    question: "In what year was the Molten Core raid released?",
    answerList: ["2002", "2003", "2005", "2004"],
    answer: 3
},
{
    question: "What was the name of Ragnaros' majordomo?",
    answerList: ["Moroes", "Bill Gates", "Executus", "Van Cleef"],
    answer: 2
}];

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
        document.getElementById('startBtn').style.display = 'none';
        document.getElementById('rag-video').classList.add('visible');
        newGame();
    });
    
    document.getElementById('startOverBtn').addEventListener('click', () => {
        document.getElementById('startOverBtn').style.display = 'none';
        document.getElementById('rag-video').classList.remove('hidden');
        document.getElementById('rag-video').classList.add('visible');
        newGame();
    });
}

function newGame() {
    document.getElementById('finalMessage').innerHTML = '';
    document.getElementById('correctAnswers').innerHTML = '';
    document.getElementById('incorrectAnswers').innerHTML = '';
    document.getElementById('unanswered').innerHTML = '';
    currentQuestion = 0;
    setCorrectAnswers(0);
    incorrectAnswer = 0;
    unanswered = 0;
    updateHealthbar();
    newQuestion();
}

function newQuestion() {
    setGravity(3); 
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
        updateHealthbar();
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

    if (currentQuestion == (triviaQuestions.length - 1) && (unanswered + incorrectAnswer < 1)) { //change 1 to 3
        setTimeout(randomRagDeathSound, 5500);
        setTimeout(scoreboard, 5000)
        setTimeout(() => {
            document.getElementById('rag-video').classList.add('hidden');
        }, 5500)
        won = true;
    } else if (unanswered + incorrectAnswer === 1) { // change 1 to 3
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
   if (typeof(correctAnswer) == 'undefined')
      updateHealthbar(triviaQuestions.length, 0, 2);
   else
      updateHealthbar(correctAnswer, n, 10);

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
