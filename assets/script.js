var startElements = document.querySelector(".startScreen");
var gameElements = document.querySelector(".gameScreen");
var resultsElements = document.querySelector(".resultScreen");
var answer1 = document.querySelector("#answer1");
var answer2 = document.querySelector("#answer2");
var answer3 = document.querySelector("#answer3");
var answer4 = document.querySelector("#answer4");

gameElements.setAttribute("style","display: none");
resultsElements.setAttribute("style","display: none");

startElements.addEventListener("click", function(event) {
    if(!event.currentTarget==="button") return;
    startElements.setAttribute("style","display: none");
    gameElements.setAttribute("style","display: in-line");
});