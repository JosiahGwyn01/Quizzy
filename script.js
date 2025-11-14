// DOM Elements

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");


// Quiz Questions

const quizQuestions = [
    {
        question: "What is the 1st Correct answer?",
        answers: [
            { text: "wrong", correct: false},
            { text: "correct", correct: true},
            { text: "wrong", correct: false},
            { text: "wrong", correct: false},
        ],
    },
    {
        question: "What is the 2nd Correct answer?",
        answers: [
            { text: "wrong", correct: false},
            { text: "wrong", correct: false},
            { text: "wrong", correct: false},
            { text: "not wrong", correct: true},
        ],
    },
    {
        question: "What is the 3rd Correct answer?",
        answers: [
            { text: "wrong", correct: false},
            { text: "correct", correct: true},
            { text: "wrong", correct: false},
            { text: "not correct", correct: false},
        ],
    },
    {
        question: "What is the 4th Correct answer?",
        answers: [
            { text: "correct", correct: true},
            { text: "not correct", correct: false},
            { text: "wrong", correct: false},
            { text: "not correct", correct: false},
        ],
    },
    {
        question: "What is the 5th Correct answer?",
        answers: [
            { text: "wrong", correct: false},
            { text: "not correct", correct: false},
            { text: "correct", correct: true},
            { text: "wrong", correct: false},
        ],
    },
];

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event Listener

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz(){
    console.log("Quiz Started");

    // reset var
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;
    
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion()
}

function showQuestion(){    //reset state
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer =>{
        const  button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");


        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer)

        answersContainer.appendChild(button)
    })
}

function selectAnswer(event){
    if(answersDisabled) return;

    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answersContainer.children).forEach(button => {
        if(button.dataset.correct ==="true"){
            button.classList.add("correct");
        } else if(button == selectedButton){
            button.classList.add("incorrect");
        }
    });

    if(isCorrect){
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;

        if(currentQuestionIndex < quizQuestions.length){
            showQuestion();
        }
        else{
            showResults();
        }
    },500)
}

function showResults(){
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length) * 100;

    if(percentage === 100) {
        resultMessage.textContent = "Quizzy Perfect!";
    } else if(percentage >= 80){
        resultMessage.textContent = "Quizzy almost Perfect!";
    } else if(percentage >= 60){
        resultMessage.textContent = "Quizzy half Perfect!";
    } else if(percentage >= 40){
        resultMessage.textContent = "Quizzy below half Perfect!";
    } else {
        resultMessage.textContent = "damn...";
    }
}

function restartQuiz(){
    console.log("Restarting Quiz");

    resultScreen.classList.remove("active");
    startScreen.classList.add("active");
}