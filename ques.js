const questions = [
  {
    question: "How do we prevent excess waste content being unused?",
    options: ["Dump waste into water bodies", "Reuse, reduce, recycle", "Overfishing", "Disturb coral reefs"],
    answer: "Reuse, reduce, recycle"
  },
  {
    question: "How do we segregate our trashes?",
    options: ["Pile up the trash in one place", "Throw them everywhere", "Throw them to the proper assigned trash bin", "Keep them in your pockets"],
    answer: "Throw them to the proper assigned trash bin"
  },
  {
    question: "How does climate change affect the oceans?",
    options: ["Maintains correct temperatures", "It alters the water temperatures which affects marine life", "Helps in the development of young sea creatures", "Adjust the water based on the preference of the animals"],
    answer: "It alters the water temperatures which affects marine life"
  },
  {
    question: "How often do we have to clean our environment?",
    options: ["Everyday will do the trick!", "Never ever clean the places", "When people tell us to", "Just let the environment rot in trash"],
    answer: "Everyday will do the trick!"
  },
  {
    question: "How much percentage does the water overall covers in the Earth?",
    options: ["73%","68%","41%","10%"]
    answer: "73%"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let answeredQuestions = [];

function displayQuestion(index) {
  const questionsDiv = document.getElementById("questions");
  questionsDiv.innerHTML = "";

  const q = questions[index];
  const questionDiv = document.createElement("div");
  questionDiv.classList.add("question");
  questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;

  q.options.forEach(option => {
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `question`;
    radio.value = option;
    const label = document.createElement("label");
    label.textContent = option;
    questionDiv.appendChild(radio);
    questionDiv.appendChild(label);
    questionDiv.appendChild(document.createElement("br"));
  });
  questionsDiv.appendChild(questionDiv);
  updateButtonVisibility();
}

function nextQuestion() {
  const selectedOption = document.querySelector(`input[name="question"]:checked`);
  if (!selectedOption) {
    alert("Please select an answer.");
    return;
  }
  answeredQuestions[currentQuestionIndex] = selectedOption.value;

  if (selectedOption.value === questions[currentQuestionIndex].answer) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion(currentQuestionIndex);
  } else {
    document.getElementById("nextButton").classList.add("hidden");
    document.getElementById("submitButton").classList.remove("hidden");
    displayResults();
  }
}

function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion(currentQuestionIndex);
  }
}

function calculateScore() {
  displayResults();
  const resultDiv = document.getElementById("result");
  resultDiv.textContent = `You scored ${score} out of ${questions.length}.`;
}

function displayResults() {
  const questionsDiv = document.getElementById("questions");
  questionsDiv.innerHTML = "";
  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");
    questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
    q.options.forEach(option => {
      const label = document.createElement("label");
      label.textContent = option;
      if (option === q.answer) {
        label.classList.add("correct");
      } else if (option === answeredQuestions[index]) {
        label.classList.add("incorrect");
      }
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });
    questionsDiv.appendChild(questionDiv);
  });
  updateButtonVisibility();
}

function updateButtonVisibility() {
    const prevButton = document.getElementById("prevButton");
    if(currentQuestionIndex === 0){
        prevButton.classList.add("hidden");
    } else {
        prevButton.classList.remove("hidden");
    }
}

displayQuestion(currentQuestionIndex);