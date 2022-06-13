import api from "./apis.js";
import "./main.js";

document.getElementById("question-box").style.display = "none";
var questions = [];
var idx = 0;

window.addEventListener("load", (event) => {
  const params = new URLSearchParams(document.location.search);
  const Subject = params.get("subject");

  const link = "subject-wise-practice.html?subject=" + Subject;
  document.getElementById("sub").setAttribute("href", link);

  const level = { 1: "Easy", 2: "Moderate", 3: "Advanced" };
  document.getElementById("diff").textContent = level[params.get("level")];

  document.getElementById("topic").textContent = params
    .get("topic")
    .replace("%20", " ");

  document.getElementById("sub").textContent =
    Subject.charAt(0).toUpperCase() + Subject.substring(1).toLowerCase();
});

if (questions.length == 0) {
  document.getElementById("start").disabled = true;
  document.getElementById("start").style.cursor = "not-allowed";
  document.getElementById("start").textContent = "Preparing Your Test...";
} else {
  document.getElementById("start").disabled = false;
  document.getElementById("start").style.cursor = "pointer";
  document.getElementById("start").textContent = "Start Test";
}

const get = (() => {
  var NodesString = "";
  var i = 0;
  const params = new URLSearchParams(document.location.search);
  console.log(params);
  const Subject = params.get("subject");
  const topic = params.get("topic");
  const level = params.get("level");

  console.log(`{api.get.question}${Subject}/${topic}/${level}?page=1&limit=10`);
  fetch(`${api.get.question}${Subject}/${topic}/${level}?page=1&limit=10`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.result);
      questions = data.result;
      document.getElementById("start").disabled = false;
      document.getElementById("start").style.cursor = "pointer";
      document.getElementById("start").textContent = "Start Test";
    });
})();

document.getElementById("start").addEventListener("click", (e) => {
  e.preventDefault();
  InitializeQuestion();
  setQuestion(0);
});

document.getElementById("prev-question").addEventListener("click", (e) => {
  e.preventDefault();

  if (idx > 0) {
    idx -= 1;
    setQuestion(idx);
    document.getElementById("exampleRadios1").disabled = false;
    document.getElementById("exampleRadios2").disabled = false;
    document.getElementById("exampleRadios3").disabled = false;
    document.getElementById("exampleRadios4").disabled = false;
  }

  console.log(idx);
});

document.getElementById("next-question").addEventListener("click", (e) => {
  e.preventDefault();
  if (idx < questions.length - 1) {
    idx += 1;
    setQuestion(idx);
    document.getElementById("exampleRadios1").disabled = false;
    document.getElementById("exampleRadios2").disabled = false;
    document.getElementById("exampleRadios3").disabled = false;
    document.getElementById("exampleRadios4").disabled = false;
  }
  console.log(idx);
});

// checked question

document.getElementById("check").addEventListener("change", (e) => {
  console.log(e.target.value);
  if (questions[idx].correct_answer.indexOf(e.target.value) != -1) {
    console.log();
    let target = `example${e.target.id[e.target.id.length - 1]}`;
    document.getElementById(target).style.background = "#87E8C6";
    document.getElementById(target).style.transition = "0.5s";
  } else {
    selectCorrect(e)
  }
  document.getElementById("exampleRadios1").disabled = true;
  document.getElementById("exampleRadios2").disabled = true;
  document.getElementById("exampleRadios3").disabled = true;
  document.getElementById("exampleRadios4").disabled = true;
});

function selectCorrect(e)
{
    let target = `example${e.target.id[e.target.id.length - 1]}`;
    document.getElementById(target).style.background = "#EF9688";
    document.getElementById(target).style.transition = "0.5s";
    if(questions[idx].correct_answer.indexOf(document.getElementById("exampleRadios1").value) != -1)
    {
        document.getElementById("example1").style.background = "#87E8C6";
        document.getElementById("example1").style.transition = "0.5s";
    }
    if(questions[idx].correct_answer.indexOf(document.getElementById("exampleRadios2").value) != -1)
    {
        document.getElementById("example2").style.background = "#87E8C6";
        document.getElementById("example2").style.transition = "0.5s";
    }
    if(questions[idx].correct_answer.indexOf(document.getElementById("exampleRadios3").value) != -1)
    {
        document.getElementById("example3").style.background = "#87E8C6";
        document.getElementById("example3").style.transition = "0.5s";
    }
    if(questions[idx].correct_answer.indexOf(document.getElementById("exampleRadios4").value) != -1)
    {
        document.getElementById("example4").style.background = "#87E8C6";
        document.getElementById("example4").style.transition = "0.5s";
    }
}
function setQuestion() {
  if (questions.length > 0) {
    document.getElementById("title").textContent = `Question ${idx + 1}`;
    document.getElementById("question").textContent = questions[idx].question;
    document.getElementById("option1").textContent = questions[idx].option1;
    document.getElementById("option2").textContent = questions[idx].option2;
    document.getElementById("option3").textContent = questions[idx].option3;
    document.getElementById("option4").textContent = questions[idx].option4;

    document.getElementById("exampleRadios1").value = questions[idx].option1;
    document.getElementById("exampleRadios2").value = questions[idx].option2;
    document.getElementById("exampleRadios3").value = questions[idx].option3;
    document.getElementById("exampleRadios4").value = questions[idx].option4;
    // exampleRadios1
  }
}

function InitializeQuestion() {
  document.getElementById("greet").style.display = "none";
  document.getElementById("question-box").style.display = "block";
}
