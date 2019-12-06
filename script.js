// High score link

// Countdown Timer: Starts at 0 on page load, Set timer for 15 seconds per question

var timer = document.getElementById("timer");
// var jumbotron = document.querySelector(".jumbotron");
// var quiz = document.querySelector(".quizHeader");
var qText = document.getElementById("qText");
var startBtn = document.getElementById("startBtn");
var buttons = document.querySelectorAll(".optbtn")
var aBtn = document.getElementById("aBtn");
var bBtn = document.getElementById("bBtn");
var cBtn = document.getElementById("cBtn");
var dBtn = document.getElementById("dBtn");
var aAnswer = document.getElementById("aAnswer");
var bAnswer = document.getElementById("bAnswer");
var cAnswer = document.getElementById("cAnswer");
var dAnswer = document.getElementById("dAnswer");
var scoreBoard = document.getElementById("scoreBoard");
var correctAns = 0
var incorrectAns = 0
var qNum = 0;
var subtractTime = "no"
var secondsLeft = questionArray.length * 15
timer.textContent = "Quiz Time Limit: " + secondsLeft + " seconds";



function startTimer() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timer.textContent = "Time: " + secondsLeft + " sec";

        if (subtractTime === "yes") {
            secondsLeft = secondsLeft-15 ;
            subtractTime = "no"
        }
        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            timer.textContent = "Time: 0 sec";
            scoreBoard();
        }
    }, 1000)
}

// The user arrives at the landing page and is presented with a call-to-action to "Start Quiz." Also note the navigation option to "View Highscores" and the "Time" value set at 0.

// Clicking the "Start Quiz" button presents the user with a series of questions. The timer is initialized with a value and immediately begins countdown.
var quizHeader = document.querySelector(".quizHeader");
aBtn.parentElement.parentElement.style.display = "none";
bBtn.parentElement.parentElement.style.display = "none";
cBtn.parentElement.parentElement.style.display = "none";
dBtn.parentElement.parentElement.style.display = "none";


// start quiz
startBtn.addEventListener("click", function () {
    // console.log("Start Button works");
    startTimer();
    startBtn.style.display = "none";
    aBtn.parentElement.parentElement.style.display = "";
    bBtn.parentElement.parentElement.style.display = "";
    cBtn.parentElement.parentElement.style.display = "";
    dBtn.parentElement.parentElement.style.display = "";

    nextQuestion();

})


// load next question onto page
function nextQuestion() {
    // answer randomizer
    rndAns = [];

    for (let i = questionArray[qNum].choices.length - 1; i > -1; i--) {
        j = Math.floor(Math.random() * (i + 1));
        // console.log("j: " + j);

        rndAns.push(questionArray[qNum].choices[j]);
        questionArray[qNum].choices.splice(j, 1);

        // console.log("rndAns:" + rndAns);
        // console.log("ansAry:" + questionArray[qNum].choices);
    }


    qText.textContent = questionArray[qNum].question;
    aAnswer.textContent = rndAns[0];
    bAnswer.textContent = rndAns[1];
    cAnswer.textContent = rndAns[2];
    dAnswer.textContent = rndAns[3];
}

// take user choice and compare with answer
buttons.forEach(function (button) {
    button.addEventListener("click", function (event) {
        // console.log("clicked", event.target);
        opt = ["A", "B", "C", "D", ]
        answer = rndAns[opt.indexOf(event.target.textContent)];
        // console.log(answer);
        if (answer === questionArray[qNum].answer) {
            correctAns++;
            scoreBoard.textContent = "Correct: " + correctAns + " Incorrect: " + incorrectAns;
            // console.log(correctAnswers);

        } else {
            incorrectAns++;
            // deduct time
            subtractTime = "yes"
            
        }
        scoreBoard.textContent = "Correct: " + correctAns + " Incorrect: " + incorrectAns;
// console.log(qNum);
// console.log(questionArray.length);


        if (qNum < questionArray.length-1) {

            //move to next question
            qNum++
            nextQuestion();

        } else {
            qText.textContent = "you have completed the quiz"
            aBtn.parentElement.parentElement.style.display = "none";
            bBtn.parentElement.parentElement.style.display = "none";
            cBtn.parentElement.parentElement.style.display = "none";
            dBtn.parentElement.parentElement.style.display = "none";
            // scoreBoard();
        }
    })

})

// function answerChecker(answerPicked){
//     var answer = 0;
//     var answerArr = []
//     for (let i = 0; i < .length; i++) {
//         var solution = array[i];
//         if (answerPicked === answer)
//         results.push

//     }
// }

// TANGENT: Questions will be pulled random
// TANGENT: Question answers ordered randomly 

// Score is calculated by time remaining. Answering quickly and correctly results in a higher score. Answering incorrectly results in a time penalty (for example, 15 seconds are subtracted from time remaining).

//When time runs out and/or all questions are answered, the user is presented with their final score and asked to enter their initials. Their final score and initials are then stored in localStorage.


// BONUS: Add audio files to alert the user of correct or incorrect answers. Be sure to include the appropriate license.

// BONUS: Customize the application theme.

// BONUS: Create multiple quizzes and an option for users to choose between them.

// BONUS: Add the application to your portfolio.