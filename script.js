// Set all global variables
var timer = document.getElementById("timer");
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
var score1 = 0
var score2 = 0
var score3 = 0
var lastScore = 0

// Initial content setup
timer.textContent = "Quiz Time Limit: " + secondsLeft;
qText.textContent = "You will have " + secondsLeft + " seconds to complete " + questionArray.length + " number of questions. Every question you get wrong will penalize your time by 15 seconds. Once you finish the quize or the timer gets to 0, the quize will stop. Your quiz will be the time remaining on the timer."
var quizHeader = document.querySelector(".quizHeader");
aBtn.parentElement.parentElement.style.display = "none";
bBtn.parentElement.parentElement.style.display = "none";
cBtn.parentElement.parentElement.style.display = "none";
dBtn.parentElement.parentElement.style.display = "none";

// Retrieve/set local storage
if (localStorage.getItem('score1') !== null) {
    score1 = JSON.parse(localStorage.getItem('score1'));
    score2 = JSON.parse(localStorage.getItem('score2'));
    score3 = JSON.parse(localStorage.getItem('score3'));
    lastScore = JSON.parse(localStorage.getItem('lastScore'));
} else {
    localStorage.setItem("lastScore", JSON.stringify(lastScore));
    localStorage.setItem("score1", JSON.stringify(score1));
    localStorage.setItem("score2", JSON.stringify(score2));
    localStorage.setItem("score3", JSON.stringify(score3));
}

// Timer
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
            setScoreboard();
        }
    }, 1000)
}

// start quiz
startBtn.addEventListener("click", function () {
    secondsLeft = questionArray.length * 15;
    startBtn.style.display = "none";
    aBtn.parentElement.parentElement.style.display = "";
    bBtn.parentElement.parentElement.style.display = "";
    cBtn.parentElement.parentElement.style.display = "";
    dBtn.parentElement.parentElement.style.display = "";
    startTimer();
    nextQuestion();
})

// load next question onto page
function nextQuestion() {
    // TANGENT: answer randomizer
    rndAns = [];

    for (let i = questionArray[qNum].choices.length - 1; i > -1; i--) {
        j = Math.floor(Math.random() * (i + 1));
        rndAns.push(questionArray[qNum].choices[j]);
        questionArray[qNum].choices.splice(j, 1);
    }

    // Display questions on screen
    qText.textContent = questionArray[qNum].question;
    aAnswer.textContent = rndAns[0];
    bAnswer.textContent = rndAns[1];
    cAnswer.textContent = rndAns[2];
    dAnswer.textContent = rndAns[3];
}

// Check answer
buttons.forEach(function (button) {
    button.addEventListener("click", function (event) {
        var opt = ["A", "B", "C", "D"]
        var answer = rndAns[opt.indexOf(event.target.textContent)];
        if (answer === questionArray[qNum].answer) {
            correctAns++;
            scoreCounter.textContent = "Correct: " + correctAns + " Incorrect: " + incorrectAns;
        } else {
            incorrectAns++;
            // deduct time
            secondsLeft = secondsLeft - 15;
        }

        // Update score counter
        scoreCounter.textContent = "Correct: " + correctAns + " Incorrect: " + incorrectAns;

        if (qNum < questionArray.length - 1) {
            //move to next question
            qNum++
            nextQuestion();
        } else {
            //end quiz and show scoreboard
            stopTime = "yes"
            qText.textContent = "You have completed all of the questions in the quiz"
            setScoreboard();
        }
    })
})

// Press highScore button to go to scoreboard
highScore.addEventListener("click", function () {
    scoreBoard();
})

// Set lastScore with time remaining from this test
function setScoreboard() {
    if (secondsLeft !== questionArray.length * 15) {
        lastScore = secondsLeft
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
    }
    scoreBoard();
}

// Display scoreboard
function scoreBoard() {
    startBtn.style.display = "none";
    aBtn.parentElement.parentElement.style.display = "";
    bBtn.parentElement.parentElement.style.display = "";
    cBtn.parentElement.parentElement.style.display = "";
    dBtn.parentElement.parentElement.style.display = "";
    aBtn.style.display = "none";
    bBtn.style.display = "none";
    cBtn.style.display = "none";
    dBtn.style.display = "none";
    aAnswer.textContent = "Score 1: " + score1;
    bAnswer.textContent = "Score 2: " + score2;
    cAnswer.textContent = "Score 3: " + score3;
    dAnswer.textContent = "Last Score: " + lastScore;
    // Rewrite scoreboard in local storage
    localStorage.setItem("lastScore", JSON.stringify(lastScore));
    localStorage.setItem("score1", JSON.stringify(score1));
    localStorage.setItem("score2", JSON.stringify(score2));
    localStorage.setItem("score3", JSON.stringify(score3));
}