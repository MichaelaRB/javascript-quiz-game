var startElements = document.querySelector(".startScreen");
var gameElements = document.querySelector(".gameScreen");
var resultsElements = document.querySelector(".resultScreen");
var answer1 = document.querySelector("#answer1");
var answer2 = document.querySelector("#answer2");
var answer3 = document.querySelector("#answer3");
var answer4 = document.querySelector("#answer4");
var answers = [answer1, answer2, answer3, answer4];
var timerEl = document.querySelector("#timer");
var resultEl = document.querySelector("#result");

gameElements.setAttribute("style","display: none");
resultsElements.setAttribute("style","display: none");

var question1 = {
    question: "Which of the following is the correct way to declare and initialize a variable in JavaScript?",
    answers: ["var x = 10;","int x = 10;","variable x = 10;","--x: 10;"],
    correctAns: "var x = 10;",
};

var question2 = {
    question: "Which of the following is NOT a JavaScript data type?",
    answers: ["Number","BigInt","Integer","String"],
    correctAns: "Integer",
};

var question3 = {
    question: "What will be logged to the console from the code console.log(typeof '9')",
    answers: ["Number", "String", "Undefined","Boolean"],
    correctAns: "String",
};
var question4 = {
    question: "What does === look for?",
    answers: ["Matching value type", "Matching values", "Matching value type and matching values", "None of the above"],
    correctAns: "Matching value type and matching values",
};

var question5 = {
    question: "What does 'NaN' represent?",
    answers: ["Null", "Undefined", "No value", "Not a number"],
    correctAns: "Not a number",
};

var questions = [question1, question2, question3, question4, question5];

startElements.addEventListener("click", function(event) {
    if(!event.currentTarget==="button") return;
    startElements.setAttribute("style","display: none");
    gameElements.setAttribute("style","display: in-line");
    gameElements.firstChild.textContent = question1.question;
    for(var i = 0; i < answers.length; i++){
        answers[i].textContent = question1.answers[i];
    }
    
    gameTime();
});

function gameTime() { 
    var timeLeft = 60;
    var questionNum = 1;

    var timeInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = "Time left: " + timeLeft;
        if(timeLeft === 0) {
            clearInterval(timeInterval);
            gameElements.setAttribute("style","display: none");
            resultsElements.setAttribute("style","display: inline");
        }
    },1000);
    gameElements.addEventListener("click", function(event) {
        if(questionNum === 5) {
            gameElements.setAttribute("style","display: none");
            resultsElements.setAttribute("style","display: inline");
            return;
        }
        if(!event.currentTarget==="li") return;
        var ans = event.currentTarget.textContent;
        if(a!==questions[questionNum].correctAns){
            resultEl.textContent = "Wrong!"
            timeLeft = timeLeft - 10;
            timerEl.textContent = "Time left: " + timeLeft;
        }
        else{
            resultEl.textContent = "Correct!"
        }
        gameElements.firstChild.textContent = questions[questionNum].question;
        for(var i = 0; i < answers.length; i++){
            answers[i].textContent = questions[questionNum].answers[i];
        }
        questionNum++;       
    });
}