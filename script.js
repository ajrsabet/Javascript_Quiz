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
var scoreCounter = document.getElementById("scoreCounter");
var highScore = document.getElementById("highScore");
var quizHeader = document.getElementById("quizHeader")
var correctAns = 0
var incorrectAns = 0
var qNum = 0;
var subtractTime = "no";
var stopTime = "no";
var secondsLeft = questionArray.length * 15;


// if (storedTodos !== null) {
//     todos = storedTodos;
//   }

  var score1 = window.localStorage.getItem('score1');
  var score2 = window.localStorage.getItem('score2');
  var score3 = window.localStorage.getItem('score3');
  var lastScore = window.localStorage.getItem('lastScore');





console.log(score1, score2, score3, lastScore);


timer.textContent = "Quiz Time Limit: " + secondsLeft;
qText.textContent = "You will have " + secondsLeft + " seconds to complete " + questionArray.length + " number of questions. Every question you get wrong will penalize your time by 15 seconds. Once you finish the quize or the timer gets to 0, the quize will stop. Your quiz will be the time remaining on the timer."


function startTimer() {
    var timerInterval = setInterval(function () {
        if (stopTime === "yes") {
            clearInterval(timerInterval)
        }
        secondsLeft--;
        console.log(secondsLeft);
        
        timer.textContent = "Time: " + secondsLeft;
        timer.setAttribute("style", "color:white");

        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            scoreCounter();
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
    // TANGENT: answer randomizer
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

// Check answer
buttons.forEach(function (button) {
    button.addEventListener("click", function (event) {
        // console.log("clicked", event.target);
        opt = ["A", "B", "C", "D", ]
        answer = rndAns[opt.indexOf(event.target.textContent)];
        // console.log(answer);
        if (answer === questionArray[qNum].answer) {
            console.log("correct answer");
            
            correctAns++;
            scoreCounter.textContent = "Correct: " + correctAns + " Incorrect: " + incorrectAns;
            // console.log(correctAnswers);

        } else {
            console.log("incorrect answer");
            incorrectAns++;
            // deduct time
            secondsLeft = secondsLeft - 15;
        }
        scoreCounter.textContent = "Correct: " + correctAns + " Incorrect: " + incorrectAns;
        // console.log(qNum);
        // console.log(questionArray.length);


        if (qNum < questionArray.length - 1) {

            //move to next question
            qNum++
            nextQuestion();

        } else {
            //end quiz and show scoreboard
            stopTime = "yes"
            qText.textContent = "You have completed all of the questions in the quiz"
            scoreBoard();
        }
    })

})

highScore.addEventListener("click", function () {
    scoreBoard();
})

function scoreBoard() {
    window.localStorage.setItem("lastScore", lastScore);
    localStorage.setItem("score1", score1);
    localStorage.setItem("score2", score2);
    localStorage.setItem("score3", score3);
    
    startBtn.style.display = "none";
    aBtn.parentElement.parentElement.style.display = "";
    bBtn.parentElement.parentElement.style.display = "";
    cBtn.parentElement.parentElement.style.display = "";
    dBtn.parentElement.parentElement.style.display = "";
    aBtn.style.display = "none";
    bBtn.style.display = "none";
    cBtn.style.display = "none";
    dBtn.style.display = "none";
    setTimeout(function(){ }, 3000);
    lastScore = secondsLeft
    console.log("lastScore: " + lastScore);
    
    if (lastScore >= score1) {
        score3 = score2;
        score2 = score1;
        score1 = lastScore;
    } else if (lastScore >= score2) {
        score3 = score2;
        score2 = lastScore;
    } else if (lastScore >= score3) {
        score3 = lastScore;
    }
    aAnswer.textContent = "Score 1: " + score1;
    bAnswer.textContent = "Score 2: " + score2;
    cAnswer.textContent = "Score 3: " + score3;
    dAnswer.textContent = "Last Score: " + lastScore;
}

// TANGENT: Questions will be pulled random 

// Score is calculated by time remaining. Answering quickly and correctly results in a higher score. Answering incorrectly results in a time penalty (for example, 15 seconds are subtracted from time remaining).

//When time runs out and/or all questions are answered, the user is presented with their final score and asked to enter their initials. Their final score and initials are then stored in localStorage.


// BONUS: Add audio files to alert the user of correct or incorrect answers. Be sure to include the appropriate license.

// BONUS: Customize the application theme. DONE

// BONUS: Create multiple quizzes and an option for users to choose between them.

// BONUS: Add the application to your portfolio.