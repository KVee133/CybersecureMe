
const quizQuestions = [
  {
    question: "Do you use the same password across multiple accounts?",
    answers: ["Yes", "No"],
    correct: "No"
  },
  {
    question: "Do you regularly check app permissions on your phone?",
    answers: ["Yes", "No"],
    correct: "Yes"
  },
  {
    question: "Have you ever clicked 'Accept All Cookies' without reading?",
    answers: ["Yes", "No"],
    correct: "No"
  },
  {
    question: "Do you use a VPN on public Wi-Fi?",
    answers: ["Yes", "No"],
    correct: "Yes"
  },
  {
    question: "Have you posted personal details like your birthday online?",
    answers: ["Yes", "No"],
    correct: "No"
  },
];

let currentQuestion = 0;
let score = 0;
const metadata = [];

const questionBox = document.getElementById('question-box');
const answersBox = document.getElementById('answers');
const nextBtn = document.getElementById('next-btn');

function loadQuestion() {
  const q = quizQuestions[currentQuestion];
  questionBox.innerText = q.question;
  answersBox.innerHTML = '';
  q.answers.forEach(answer => {
    const btn = document.createElement('button');
    btn.innerText = answer;
    btn.onclick = () => selectAnswer(answer);
    answersBox.appendChild(btn);
  });
}

function selectAnswer(answer) {
  if (answer === quizQuestions[currentQuestion].correct) {
    score++;
  }
  currentQuestion++;
  if (currentQuestion < quizQuestions.length) {
    loadQuestion();
  } else {
    document.getElementById('quiz-section').classList.add('hidden');
    if (score < 5) {
      document.getElementById('game-section').classList.remove('hidden');
    } else {
      showResults();
    }
  }
}

function simulateClick(action) {
  const log = document.getElementById('footprint-log');
  const li = document.createElement('li');
  li.innerText = `${action} clicked - Data captured`;
  log.appendChild(li);
  metadata.push(action);
}

function showResults() {
  document.getElementById('game-section').classList.add('hidden');
  document.getElementById('result-section').classList.remove('hidden');
  document.getElementById('score-result').innerText = `Quiz Score: ${score}/${quizQuestions.length}`;
  document.getElementById('footprint-summary').innerText = `You left a digital trail of: ${metadata.join(', ')}.`;
}

nextBtn.onclick = () => loadQuestion();
loadQuestion();