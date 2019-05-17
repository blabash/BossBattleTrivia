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

var animationSetup = false;

function animationPipeline() {

    /* Variables */
    const self = this,
        w = window.innerWidth,
        h = window.innerHeight,
        stage = document.getElementById('stage'),
        startButton = document.getElementById('startButton'),
        title = document.getElementById('title'),
        questionTitle = document.getElementsByClassName("questions"),
        score = document.getElementsByClassName("score"),
        scoreSpan = score[0].getElementsByTagName('span'),
        timer = document.getElementsByClassName("timer"),
        timerSpan = timer[0].getElementsByTagName('span'),
        gameChoices = document.getElementById('gameChoices'),
        gameHeader = document.getElementById('gameHeader'),
        buttonOne = document.getElementById('buttonOne'),
        buttonTwo = document.getElementById('buttonTwo'),
        buttonThree = document.getElementById('buttonThree'),
        buttonFour = document.getElementById('buttonFour'),
        buttonArray = [buttonOne, buttonTwo, buttonThree, buttonFour],
        modal_window = document.getElementById('modal_window')
        startAnimation = new TimelineMax({ repeat: 0 }),
        gameIndex = 0,
        actualScore = 0,
        timerIndex = 8,
        runningGameAgain = false,
        timerObject = undefined,
        gameQuestions = [],
        gameMusic = new Audio('http://f5361a5c08a4c03f7c6f-acbeb9602bd0a56bf9c1a6bed3d8280b.r27.cf2.rackcdn.com/math2.mp3'),
        rightAnswer = new Audio('http://f5361a5c08a4c03f7c6f-acbeb9602bd0a56bf9c1a6bed3d8280b.r27.cf2.rackcdn.com/RightSound2%202.mp3'),
        wrongAnser = new Audio('http://f5361a5c08a4c03f7c6f-acbeb9602bd0a56bf9c1a6bed3d8280b.r27.cf2.rackcdn.com/wrongSound2.mp3'),
        questions = [
            'The acronym CSS means what?',
            'The acronym PHP means what?',
            'Who was the creator of Git?',
            'Django is a web framework for what language?',
            'Which one of these is a CSS preprocessor?',
            'A JavaScript catch block is written how?',
            'What is the function of CSS on a website?',
            'What does the &#60;b&#62; tag do in HTML?',
            'What language was GSAP originally written in?',
            'What type of file is a SVG file?'
        ],
        answers = [
            ['Cool Style Sheets', 'Crummy Style Sheets', 'Cascading Style Sheets', 'Colored Style Sheets'],
            ['PHP: Hypertext Preprocessor', 'Personal Hypertext Preprocessor', 'PHP', 'Patronizing Hypertext Preprocessor'],
            ['Steve Jobs', 'Linus Torvalds', 'Steven Seagal', 'Tom Preston-Werner'],
            ['Ruby', 'JavaScript', 'PHP', 'Python'],
            ['HTML', 'React', 'SASS', 'Lua'],
            ['catch(Exception $e){}', 'catch(Exception e){}', 'except Exception as inst', 'catch(err){}'],
            ['Markup web pages', 'Output data to a client', 'Used to describe look and format of markup', 'NOTHING'],
            ['Break to a new line', 'Insert server data', 'Bold Text', 'Bullet Point'],
            ['VBScript', 'ActionScript', 'Silverlight', 'JavaScript'],
            ['Bitmap', 'Vector', 'Raster', 'GIF']
        ],
        correctAnswers = [2, 0, 1, 3, 2, 3, 2, 2, 1, 1],
        gameAnswers = [];

    /**
     * Setup styles and events
     **/
    self._initilize = function () {

        self.windowWasResized();
        // Add click listener to start button 
        startButton.addEventListener('click', self.startGamePlay);

        // Add answer click listener
        for (let i = 0; i < buttonArray.length; i++) {
            buttonArray[i].addEventListener('click', self.anwerClicked, false);
        }
    };

    /**
     * Called everytime the window resizes to calculate new dimensions
     **/
    self.windowWasResized = function () {
        stage.style.height = (h - 20) + 'px';
        stage.style.width = (w - 20) + 'px';
    };

    /**
     * Setup the stage and fire off the stage animations
     **/
    self.startGamePlay = function () {

        // Get the game indexes
        self.generateGameIndexes();

        // Add data to the interface
        self.setupUserInterfaceWithData();
        // Set the score to zero
        scoreSpan[0].textContent = actualScore;
        timerSpan[0].textContent = timerIndex;

        startAnimation.to([startButton, title], 1, { alpha: 0 });
        startAnimation.to([startButton, title], 0.1, { css: { display: 'none' } });
        startAnimation.to([gameHeader, gameChoices], 0.1, { css: { display: 'block' }, onComplete: self.fireOffGameLogic });
    };

    /**
     * Callback function from the startAnimation timeline above
     * This function starts the timer and plays the music at the same time
     **/
    self.fireOffGameLogic = function () {
        self.runTimer();
        gameMusic.currentTime = 0;
        gameMusic.play();
    }

    /**
     * This function rebuilds the UI with a new question and answer
     **/
    self.setupUserInterfaceWithData = function () {
        // Add questions to buttons
        let ques = questions[gameQuestions[gameIndex]];
        let t = questionTitle[0].getElementsByTagName('span');
        t[0].innerHTML = ques;
        // Add answers to buttons
        let ans = answers[gameQuestions[gameIndex]];
        for (let i = 0; i < ans.length; i++) {
            let a = ans[i];
            buttonArray[i].textContent = a;
        }
    };
    /**
     * Called to start a gameplay timer that runs every second
     **/
    self.runTimer = function () {
        timerObject = window.setInterval(self.updateClock, 1000);
    };
    /**
     * Callback function for the gameplay timer
     **/
    self.updateClock = function () {
        timerIndex--;
        if (timerIndex == -1) {
            timerIndex = 8;
            gameIndex++;
        }

        if (gameIndex == gameQuestions.length) {
            clearTimeout(timerObject);
            // end the game
            self.runEndOfGame();
            return;
        } else if (timerIndex == 8) {
            self.setupUserInterfaceWithData();
        }
        // Display updated time
        timerSpan[0].textContent = timerIndex;
    };

    /**
     * Determines if an answer is correct or incorrect
     * Displays a message to user and plays sound effect
     **/
    self.anwerClicked = function (e) {

        clearTimeout(timerObject);
        gameMusic.pause();
        gameMusic.currentTime = 0;
        // Get the answer index
        let answerIndex = Number(e.target.getAttribute('data-index'));
        // Get the actual answer index 
        let actualCorrectAnswerIndex = gameAnswers[gameIndex];

        // Correct answer
        if (actualCorrectAnswerIndex == answerIndex) {
            rightAnswer.play();
            actualScore += 10;
            scoreSpan[0].textContent = actualScore;
            cancelButtons = true;
            self.dispatch_modal('YOUR ANSWER IS: <span class="correct">CORRECT!</span>', 1000);
            // Incorrect Answer
        } else {
            wrongAnser.play();
            cancelButtons = true;
            self.dispatch_modal('YOUR ANSWER IS: <span class="incorrect">INCORRECT!</span>', 1000);
        }
    }

    /**
     * This function generates random indexes to be used for our game logic
     * The indexes are used to assign questions and correct answers
     **/
    self.generateGameIndexes = function () {
        let breakFlag = false;
        while (!breakFlag) {
            let randomNumber = Math.floor(Math.random() * 9);
            if (gameQuestions.indexOf(randomNumber) == -1) {
                gameQuestions.push(randomNumber);
                gameAnswers.push(correctAnswers[randomNumber]);
            }
            if (gameQuestions.length == 5) {
                breakFlag = true;
            }
        }
    };

    /**
     *  Dispatches a modal window with a message to user
     */
    self.dispatch_modal = function (message, time) {
        window_width = window.innerWidth || document.documentElement.clientWidth
            || document.body.clientWidth;

        modal_window.getElementsByTagName('p')[0].innerHTML = message;
        modal_window.style.left = ((window_width / 2) - 150) + 'px';

        self.fade_in(time, modal_window, true);
    };

    /**
     * Credit for the idea about fade_in and fade_out to Todd Motto
     * fade_in function emulates the fadeIn() jQuery function
     */
    self.fade_in = function (time, elem, flag) {

        let opacity = 0, interval = 50,
            gap = interval / time, self = this;

        elem.style.display = 'block';
        elem.style.opacity = opacity;

        function func() {
            opacity += gap;
            elem.style.opacity = opacity;

            if (opacity >= 1) {
                window.clearInterval(fading);
                //now detect if we need to call fade out
                if (flag) {
                    setTimeout(function () {
                        self.fade_out(time, elem);
                    }, 1500);
                }
            }
        }
        let fading = window.setInterval(func, interval);
    },

        /**
         *  
         * Credit for the idea about fade_in and fade_out to Todd Motto
         * fade_out function emulates the fadeOut() jQuery function
         */
        self.fade_out = function (time, elem) {
            let opacity = 1, interval = 50, gap = interval / time;

            function func() {
                opacity -= gap;
                elem.style.opacity = opacity;

                if (opacity <= 0) {
                    window.clearInterval(fading);
                    elem.style.display = 'none';
                    gameIndex++;
                    // Determine if we need to run another game loop
                    if (gameIndex != gameQuestions.length) {
                        timerIndex = 8;
                        timerSpan[0].textContent = timerIndex
                        self.setupUserInterfaceWithData();
                        self.runTimer();
                        gameMusic.play();
                    } else {
                        self.runEndOfGame();
                    }
                }
            }
            let fading = window.setInterval(func, interval);
        };

    /**
     * Runs when the game ends
     * Displays a modal window with the option to tweet score or play again
     **/
    self.runEndOfGame = function () {

        window_width = window.innerWidth || document.documentElement.clientWidth
            || document.body.clientWidth;
        let tweetButton = '<button id="tweekScore" class="left twitter" onClick="self.tweetScore()">TWEET SCORE</button>';
        let playAgainButton = '<button id="playAgain" class="left" onClick="self.resetGame()">PLAY AGAIN</button>';
        let actualScoreHeader = '<h2>CONGRATS, YOUR FINAL SCORE IS: ' + actualScore + '</h2>';
        let insertedHTML = actualScoreHeader + '<div>' + tweetButton + playAgainButton + '</div>';
        modal_window.getElementsByTagName('div')[0].innerHTML = insertedHTML;
        modal_window.style.left = ((window_width / 2) - 150) + 'px';

        self.fade_in(1000, modal_window, false);
    };

    /**
     * The tweets score function allows a user to post their score to twitter
     **/
    self.tweetScore = function () {
        let u = 'https://codepen.io/agnosticdev/pen/ZbWjaB';
        let text = 'I just played Web Trivia Game on @CodePen and scored: ' + actualScore + ' points! @matt_815';
        let url = 'https://twitter.com/intent/tweet?original_referer=' + u + '&url=' + u + '&text=' + text;
        let newWindow = window.open(url, 'name', 'height=400,width=450');
        if (window.focus) { newWindow.focus() }
        return false;
    }
    /**
     * This function resets the game and starts it all over again
     * This function acts as to reset all data from scratch
     **/
    self.resetGame = function () {

        modal_window.style.opacity = 0.0;
        modal_window.innerHTML = '<div class="modal_message"><p></p></div>';

        window.clearTimeout(timerObject);
        timerObject = undefined;
        gameIndex = 0;
        gameAnswers = [];
        actualScore = 0;
        timerIndex = 8;
        gameQuestions = [];
        // Get the game indexes
        self.generateGameIndexes();

        // Add data to the interface
        self.setupUserInterfaceWithData();
        // Set the score to zero
        scoreSpan[0].textContent = actualScore;
        timerSpan[0].textContent = timerIndex;
        self.runTimer();
        gameMusic.currentTime = 0;
        gameMusic.play();

    };

    /**
     * Logging Function
     **/
    self.l = function (message) {
        console.log(message);
    };

    // Initialize the functionality of the controller
    self._initilize();

} // End animationPipeline

// Used to call the animationPipline function
let interval = setInterval(function () {
    if (document.readyState === 'complete') {
        clearInterval(interval);
        let pipe = animationPipeline();

        window.onresize = function (event) {
            let pipe = animationPipeline()
        };
    }
}, 100);











//rectangle/square
// ctx.fillStyle = "rgba(255, 0, 0, .5";
// ctx.fillRect(100, 100, 100, 100); //rectangle takes the fillstyle that precedes it
// ctx.fillStyle = "rgba(0, 255, 0, .5";
// ctx.fillRect(200, 200, 100, 100);
// ctx.fillStyle = "rgba(0, 0, 255, .5";
// ctx.fillRect(300, 300, 100, 100);

// //line
// ctx.beginPath();
// ctx.moveTo(50, 300);
// ctx.lineTo(300, 100);
// ctx.lineTo(400, 300);
// ctx.strokeStyle = "#fa34a3"
// ctx.stroke();

//arc/circle
// ctx.beginPath()
// ctx.arc(300, 300, 30, 0, Math.PI * 2, false);
// ctx.strokeStyle = "blue";
// ctx.stroke();
// const COLORS = ["blue", "red", "green"];

// for (let i = 0; i < 100; i++) {
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerHeight;
//     ctx.beginPath();
//     ctx.arc(x, y, 30, 0, Math.PI * 2, false);
//     ctx.strokeStyle = COLORS[Math.floor(Math.random() * COLORS.length)];
//     ctx.stroke();
// }

