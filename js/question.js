import api from "./apis.js";
import "./main.js";

document.getElementById("question-box").style.display = "none";
var questions = [];
var response = [];
var idx = 0;
var score = 0;
var total_score = 0;
let t, q, h = 0;

window.addEventListener("load", (event) => {
  // alert("")
  // const getQuestion = JSON.parse(localStorage.getItem("question"));
  // if (getQuestion && getQuestion.length > 0) {
  //   questions = getQuestion;
  //   c1 = 1;
  //   c2 = 1;
  //   InitializeQuestion();
  //   setQuestion(0);
  //   Reloadtimer(
  //     parseInt(localStorage.getItem("minutes")),
  //     parseInt(localStorage.getItem("seconds"))
  //   );
  // }

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

function getQues(ques) {
  var NodesString = "";
  var i = 0;
  const params = new URLSearchParams(document.location.search);
  console.log(params);
  const Subject = params.get("subject");
  const topic = params.get("topic");
  const level = params.get("level");

  total_score = parseInt(ques) * 4;

  console.log(
    `{api.get.question}${Subject}/${topic}/${level}?page=1&limit=${ques}`
  );
  fetch(
    `${api.get.question}${Subject}/${topic}/${level}?page=1&limit=${ques}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data.result);
      questions = data.result;
      localStorage.setItem("question", JSON.stringify(questions));
      for (var i = 0; i < data.result.length; i++) {
        response[i] = null;
      }
      document.getElementById("start").disabled = false;
      document.getElementById("start").style.cursor = "pointer";
      if (data.result.length > 0) {
        document.getElementById("start").textContent = "Start Test";
      } else {
        document.getElementById("start").disabled = true;

        document.getElementById("start").textContent = "No Test Found!";
      }
    });
}

document.getElementById("start").addEventListener("click", (e) => {
  e.preventDefault();
  InitializeQuestion();
  setQuestion(0);
  timer(parseInt(t));
});

document.getElementById("prev-question").addEventListener("click", (e) => {
  e.preventDefault();

  if (idx > 0) {
    idx -= 1;
    checkResponses(idx);
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
    checkResponses(idx);
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
    response[idx] = 1;
    let target = `example${e.target.id[e.target.id.length - 1]}`;
    document.getElementById(target).style.background = "#87E8C6";
    document.getElementById(target).style.transition = "0.5s";
    score += 4;
  } else {
    response[idx] = 0;
    score -= 1
    selectCorrect(e);
  }
  document.getElementById("exampleRadios1").disabled = true;
  document.getElementById("exampleRadios2").disabled = true;
  document.getElementById("exampleRadios3").disabled = true;
  document.getElementById("exampleRadios4").disabled = true;
});

function selectCorrect(e) {
  let target = `example${e.target.id[e.target.id.length - 1]}`;
  document.getElementById(target).style.background = "#EF9688";
  // document.getElementById(target).insertAdjacentHTML(
  //   "beforeend",
  //   '<i class="fa fa-times ms-3"></i>');
  document.getElementById(target).style.transition = "0.5s";
  if (
    questions[idx].correct_answer.indexOf(
      document.getElementById("exampleRadios1").value
    ) != -1
  ) {
    document.getElementById("example1").style.background = "#87E8C6";
    document.getElementById("example1").style.transition = "0.5s";
  }
  if (
    questions[idx].correct_answer.indexOf(
      document.getElementById("exampleRadios2").value
    ) != -1
  ) {
    document.getElementById("example2").style.background = "#87E8C6";
    document.getElementById("example2").style.transition = "0.5s";
  }
  if (
    questions[idx].correct_answer.indexOf(
      document.getElementById("exampleRadios3").value
    ) != -1
  ) {
    document.getElementById("example3").style.background = "#87E8C6";
    document.getElementById("example3").style.transition = "0.5s";
  }
  if (
    questions[idx].correct_answer.indexOf(
      document.getElementById("exampleRadios4").value
    ) != -1
  ) {
    document.getElementById("example4").style.background = "#87E8C6";
    document.getElementById("example4").style.transition = "0.5s";
  }
}

function setQuestion() {
  if (questions.length > 0) {
    document.getElementById("title").textContent = `Question ${idx + 1}`;
    document.getElementById("question").textContent = questions[idx].question;
    document.getElementById("questionImage").src = questions[idx].questionImage;

    if (questions[idx].questionImage != "") {
      console.log(idx);
      document.getElementById("questionImage").style.display = "block";
    } else {
      document.getElementById("questionImage").style.display = "none";
    }
    // document.getElementById("questionImage").style['object-fit'] = 'contain';

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
  document.getElementById("hint").querySelector("div").style.display = "none";
}

function Reloadtimer(min, sec) {
  console.log(min, typeof min);
  var y = new Date();
  var date = new Date(y);
  var countDownDate = date.setMinutes(y.getMinutes() + min);
  var countDownDate = date.setSeconds(y.getSeconds() + sec);

  x = setInterval(function () {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    localStorage.setItem("minutes", minutes);

    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    localStorage.setItem("seconds", seconds);
    if (minutes < 10) minutes = "0" + minutes;

    if (seconds < 10) seconds = "0" + seconds;

    document.getElementById("demo").textContent =
      minutes + "m " + seconds + "s ";

    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").textContent = "TIME IS UP";
      finishQues();
    }
  }, 1000);
}

var x;

function timer(min) {
  var y = new Date();
  var countDownDate = new Date(y).setMinutes(y.getMinutes() + min);

  x = setInterval(function () {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    localStorage.setItem("minutes", minutes);

    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    localStorage.setItem("seconds", seconds);
    if (minutes < 10) minutes = "0" + minutes;

    if (seconds < 10) seconds = "0" + seconds;

    document.getElementById("demo").textContent =
      minutes + "m " + seconds + "s ";

    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").textContent = "TIME IS UP";
      finishQues();
    }
  }, 1000);
}

t = document.getElementById("timebtn").innerText.split(" ")[0];
q = document.getElementById("quesbtn").innerText.split(" ")[0];
if(t != '' && q != '')
  getQues(q)

document.querySelector("#timer").addEventListener("click", (e) => {
  t = e.target.innerText.split(" ")[0];
  document.getElementById("timebtn").textContent = t + " Mins";

  console.log(t);
  getQues(q);
});

document.querySelector("#noquest").addEventListener("click", (e) => {

  q = e.target.innerText.split(" ")[0];
  document.getElementById("quesbtn").textContent = q + " Ques";
  console.log(q);
  getQues(q);
});

document.getElementById("confirmsubmit").addEventListener("click", (e) => {
  finishQues();
});

function finishQues() {
  document.getElementById("question-box").style.display = "none";
  document.getElementById("rewardcard").style.display = "block";
  clearInterval(x);
  document.getElementById("demo").textContent = "";
  document.getElementById('marks').textContent = score + '/'+ total_score;
  localStorage.clear();
}

function checkResponses(idx) {
  resetResponses();
  resetChecked();
}

function resetResponses() {
  document.getElementById("example1").style.background = "none";
  document.getElementById("example2").style.background = "none";
  document.getElementById("example3").style.background = "none";
  document.getElementById("example4").style.background = "none";
}

function resetChecked() {
  document.getElementById("exampleRadios1").checked = false;
  document.getElementById("exampleRadios2").checked = false;
  document.getElementById("exampleRadios3").checked = false;
  document.getElementById("exampleRadios4").checked = false;
}

document.getElementById("hint_label").addEventListener("click", () => {
  h++;
  if (h == 1) {
    document.getElementById("hint").querySelector("div").style.display = "inline-block";
    document.getElementById("hint").querySelector("div").style.transition = "0.7s";
  } else {
    h = h % 2;
    document.getElementById("hint").querySelector("div").style.display = "none";
    document.getElementById("hint").querySelector("label").style.display ="inline-block";
  }
});
