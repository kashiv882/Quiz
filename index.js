const questions = [
    {
        question: "What is the capital of France?",
        Answers: [
            { text: "Paris", correct: true },
            { text: "London", correct: false },
            { text: "Rome", correct: false },
            { text: "Madrid", correct: false },
        ]
    },
    {
        question: "Which planet is known as the 'Red Planet'?",
        Answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false },
        ]
    },
    {
        question: "Who was the first President of the United States?",
        Answers: [
            { text: "John Adams", correct: false },
            { text: "Thomas Jefferson", correct: false },
            { text: "George Washington", correct: true },
            { text: "Abraham Lincoln", correct: false },
        ]
    },
    {
        question: "What is the value of π (pi) to two decimal places?        ",
        Answers: [
            { text: "3.14", correct: true },
            { text: "3.16", correct: false },
            { text: "3.12", correct: false },
            { text: "3.02", correct: false },
        ]
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        Answers: [
            { text: "William Shakespeare", correct: true },
            { text: "Charles Dickens", correct: false },
            { text: "Jane Austen", correct: false },
            { text: "F. Scott Fitzgerald", correct: false },
        ]
    },
    {
        question: "In which sport is the term 'slam dunk' commonly used?",
        Answers: [
            { text: "Tennis", correct: false },
            { text: " Soccer", correct: false },
            { text: "Basketball", correct: true },
            { text: "Golf", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerText = "Question " + questionNo + ". " + currentQuestion.question;

    currentQuestion.Answers.forEach(Answer => {
        const button = document.createElement("button");
        button.innerHTML = Answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if (Answer.correct) {
            button.dataset.correct = Answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
