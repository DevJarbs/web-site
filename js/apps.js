



const questions = [
    {
        question: "Which input type defines a slider control?",
        answers: [
            { text: "slider", correct: false},
            { text: "search", correct: false},
            { text: "range", correct: true},
            { text: "controls", correct: false},
        ]
    },
    {
        question:"Graphics defined by SVG is in which format?",
        answers: [
            { text: "CSS", correct: false},
            { text: "HTML", correct: false},
            { text: "XML", correct: true},
        ]
    },
    {
        question:"In HTML, onblur and onfocus are:",
        answers: [
            { text: "HTML elements", correct: false},
            { text: "Style attributes", correct: false},
            { text: "Event attributes", correct: true},
        ]
    },
    {
        question:"Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
        answers: [
            { text: "src", correct: false},
            { text: "longdesc", correct: false},
            { text: "title", correct: false},
            { text: "alt", correct: true},
        ]
    },
    {
        question:"Who is making the Web standards?",
        answers: [
            { text: "The World Wide Web Consortium", correct: false},
            { text: "Mozilla", correct: false},
            { text: "Google", correct: true},
            { text: "Microsoft", correct: false},
        ]
    }
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
         button.classList.add("correct");
    }
        button.disabled = true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = 'Your score is ' +score +' out of ' +questions.length+'!';
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
    showQuestion();}
    else{
        showScore();
    }
    
}

nextButton.addEventListener("click", ()=>{
    if (currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
            startQuiz();
    };
})

startQuiz();
 