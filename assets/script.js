var startElements = document.querySelector(".startScreen");
var gameElements = document.querySelector(".gameScreen");
var resultsElements = document.querySelector(".resultScreen");
var answer1 = document.querySelector("#answer1");
var answer2 = document.querySelector("#answer2");
var answer3 = document.querySelector("#answer3");
var answer4 = document.querySelector("#answer4");
var answers = [answer1, answer2, answer3, answer4];

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

gameElements.setAttribute("style","display: none");
resultsElements.setAttribute("style","display: none");

startElements.addEventListener("click", function(event) {
    if(!event.currentTarget==="button") return;
    startElements.setAttribute("style","display: none");
    gameElements.setAttribute("style","display: in-line");
    gameElements.firstChild.textContent = question1.question;
    for(var i = 0; i < answers.length; i++){
        answers[i].textContent = question1.answers[i];
    }
});

console.log(typeof '9');