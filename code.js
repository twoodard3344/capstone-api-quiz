let questionHtml = document.getElementById("question");
let answerHtml = document.getElementById("answer");
let scoreHtml = document.getElementById("score");
let userInputHtml = document.getElementById("user-input");
let submitAnswerBtn = document.getElementById("submit-answer")
let resultHtml = document.getElementById("result");
let showResultCorrect = document.getElementById("show-result");
let score = 0;
answerHtml.hidden = true;

function getTriviaData(){
    let api_url = ("https://jservice.kenzie.academy/api/random-clue?valid=true")

    fetch(api_url)
    .then ((response) =>response.json())
    .then((data) =>{
        //javaScript destructuring
        const{question,answer} = data;
        console.log(question)
        console.log(answer);
        questionHtml.innerHTML = question;
        answerHtml.innerHTML = answer;
        showResultCorrect.innerHTML =""
        resultHtml.hidden = true;
    } )
}

getTriviaData();

function correctMessage()
{       
    showResultCorrect.innerHTML = `Correct Answer: ` + answerHtml.innerHTML;
    questionHtml.innerHTML = `<p>Loading Next Question ...</p>`
        
}

function incorrectMessage () {
    showResultCorrect.innerHTML = `Correct Answer: ` + answerHtml.innerHTML;
    questionHtml.innerHTML = `<p>Loading Next Question ...</p>`

}




function checkAnswer() {
    let userAnswer = userInputHtml.value;
   let ifCorrect = userAnswer.toLowerCase() === answerHtml.innerHTML.toLowerCase();
    if (userAnswer === "")
    {
        alert("Answer left blank. Please try again.")
        return;
    }
    else if (ifCorrect)
    {   resultHtml.hidden = false;
        resultHtml.innerHTML = "Correct!"
        resultHtml.style.color = "#33cc33"
        resultHtml.style.fontWeight = "bold"
        answerHtml.hidden = false;
        score ++;
        scoreHtml.innerHTML = `Score: ${score}`;
        setTimeout(correctMessage,1000);
        userInputHtml.value = "";
    answerHtml.hidden = true;
    questionHtml.style.color ="black"
        setTimeout(getTriviaData,4000)
        
        
    }
    else 
    {
        resultHtml.hidden = false;
        resultHtml.style.color = "#ff0000"
        resultHtml.style.fontWeight = "bold"
        score = 0;
        scoreHtml.innerHTML = `score: ${score}`;
        console.log("Wrong");
       
        resultHtml.innerHTML = "WRONG. GAME STARTING OVER...";
        setTimeout(incorrectMessage,1000);
        setTimeout(location.reload.bind(location),4000);
    }

}

submitAnswerBtn.addEventListener("click", function(event){
    event.preventDefault();
    checkAnswer();
})


