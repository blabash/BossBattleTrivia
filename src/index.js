import './styles/app.css';
import Background from '../scripts/background';

console.log("working");

let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');

Background(ctx);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

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
    finished: "Let's see how you did."
}

document.getElementById('startBtn').addEventListener('click', () => {
    document.getElementById('startBtn').style.display = 'none';
    newGame();
});

document.getElementById('startOverBtn').addEventListener('click', () => {
    document.getElementById('startOverBtn').style.display = 'none';
    newGame();
});

function newGame() {
    document.getElementById('finalMessage').innerHTML = '';
    document.getElementById('correctAnswers').innerHTML = '';
    document.getElementById('incorrectAnswers').innerHTML = '';
    document.getElementById('unanswered').innerHTML = '';
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    updateHealthbar();
    newQuestion();
}

function newQuestion() {
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

function answerPage() {
    let answers = document.getElementsByClassName('questionChoices');
    for (let i = 0; i < answers.length; i++) {
        answers[i].className += ' disabled';
    }

    let rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
    let rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    //checks to see correct, incorrect, or unanswered
    if ((userSelect == rightAnswerIndex) && (answered == true)) {
        correctAnswer++;
	updateHealthbar();
        document.getElementById('message').innerHTML = messages.correct;
    } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
        incorrectAnswer++;
        document.getElementById('message').innerHTML = messages.incorrect;
        document.getElementById('correctedAnswer').innerHTML = 'The correct answer was: ' + rightAnswerText;
    } else {
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

    if (currentQuestion == (triviaQuestions.length - 1)) {
        setTimeout(scoreboard, 5000)
    } else {
        currentQuestion++;
        setTimeout(newQuestion, 5000);
    }
}

function updateHealthbar()
{
    let width = 100 - (100 * correctAnswer / triviaQuestions.length);
    var elem = document.getElementById("myBar"); 

    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++; 
        elem.style.width = width + '%'; 
      }
  }
}

function scoreboard() {
    document.getElementById('timeLeft').innerHTML = '';
    document.getElementById('message').innerHTML = '';
    document.getElementById('correctedAnswer').innerHTML = '';
    document.getElementById('finalMessage').innerHTML = messages.finished;
    document.getElementById('correctAnswers').innerHTML = "Correct Answers: " + correctAnswer;
    document.getElementById('incorrectAnswers').innerHTML = "Incorrect Answers: " + incorrectAnswer;
    document.getElementById('unanswered').innerHTML = "Unanswered: " + unanswered;
    document.getElementById('startOverBtn').style.visibility = "visible";
    document.getElementById('startOverBtn').classList.add('reset');
    document.getElementById('startOverBtn').style.display = 'block';
}
