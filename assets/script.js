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
var scoreEl = document.querySelector("#finalScore");
var questNo = document.querySelector("#questNo");
var initialEl = document.querySelector("#initials-text");
var submit = document.querySelector("#scoreSubmit");
var scoresLink = document.querySelector("#scoreList");
var highScores = document.querySelector("#highScores")
var scorePage = document.querySelector(".scoresScreen");
var scoresList = [];
var initialsList = [];
var clearBtn = document.querySelector("#clearBtn");
var returnBtn = document.querySelector("#returnBtn");

gameElements.setAttribute("style","display: none");
resultsElements.setAttribute("style","display: none");
scorePage.setAttribute("style","display: none");

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
var questionNum = 0;

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
    var timeInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = "Time left: " + timeLeft;
        if(timeLeft === 0) {
            clearInterval(timeInterval);
            gameElements.setAttribute("style","display: none");
            resultsElements.setAttribute("style","display: inline");
        }
    },1000);
    for(var i = 0; i < 4; i++) {
        answers[i].addEventListener("click", function(event) {
            event.preventDefault();
            var ans = event.currentTarget.textContent;
            if(!event.currentTarget==="li") return;
            if(ans!==questions[questionNum].correctAns){
                resultEl.textContent = "Wrong!"
                setTimeout(function() {
                    resultEl.textContent = "";
                },1000);
                timeLeft = timeLeft - 10;
            }
            else{
                    resultEl.textContent = "Correct!"
                    setTimeout(function() {
                        resultEl.textContent = "";
                    },1000);
            }
            questionNum++; 
            questNo.textContent = "Question " + (questionNum + 1);
            if(questionNum === 5 || timeLeft === 0) {
                gameElements.setAttribute("style","display: none");
                resultsElements.setAttribute("style","display: inline");
                clearInterval(timeInterval);
                timerEl.textContent = "Time left: " + timeLeft;
                scoreEl.textContent = "Your score: " + timeLeft;
                return;
            }   
            gameElements.firstChild.textContent = questions[questionNum].question;
            for(var i = 0; i < answers.length; i++){
                answers[i].textContent = questions[questionNum].answers[i];
            }   
        });
    }
    submit.addEventListener("click", function(event) {
        event.preventDefault();
        if(localStorage.getItem("scores")!==null && localStorage.getItem("initials")!==null)
        {
            scoresList = JSON.parse(localStorage.getItem("scores"));
            initialsList = JSON.parse(localStorage.getItem("initials"));
        }
        var scoreInitial = initialEl.value.trim();
        if(scoreInitial === "") {
            alert("Please input an identifier for the scores page.")
            return;
        }
        initialsList.push(scoreInitial);
        scoresList.push(timeLeft);
        localStorage.setItem("initials", JSON.stringify(initialsList));
        localStorage.setItem("scores", JSON.stringify(scoresList));
        window.location.reload();
    });
}

scoresLink.addEventListener("click", function(event) {
    gameElements.setAttribute("style","display: none");
    startElements.setAttribute("style","display: none");
    resultsElements.setAttribute("style","display: none");
    scoresLink.setAttribute("style","display: none")
    timerEl.setAttribute("style","display: none");
    scorePage.setAttribute("style","display: inline");
    renderScores();
});

clearBtn.addEventListener("click", function(event) {
    event.preventDefault();
    clearScores();
});

returnBtn.addEventListener("click", function(event) {
    window.location.reload();
});

function renderScores() {
    highScores.innerHTML = "";

    scoresList = JSON.parse(localStorage.getItem("scores"));
    initialsList = JSON.parse(localStorage.getItem("initials"));
    if(scoresList === null || initialsList === null) return;
    //sort scores so the highest scores display first
    for(var i = 0; i < scoresList.length; i++) {
        for(var j = 0; j < scoresList.length - i - 1; j++) {
            if(scoresList[j]<scoresList[j+1])
            {
                var tempScore = scoresList[j+1];
                var tempInitial = initialsList[j+1];
                scoresList[j+1] = scoresList[j];
                scoresList[j] = tempScore;
                initialsList[j+1] = initialsList[j];
                initialsList[j] = tempInitial;
            }
        }
    }
    if(scoresList.length >= 10) {
        scoresList.splice(9);
        initialsList.splice(9);
    }
    for (var i = 0; i < scoresList.length; i++) {
      var newScore = scoresList[i] + " " + initialsList[i];
  
      var li = document.createElement("li");
      li.textContent = newScore;

      highScores.appendChild(li);
    }
  }

function clearScores() {
    localStorage.removeItem("scores");
    localStorage.removeItem("initials");
    renderScores();
}