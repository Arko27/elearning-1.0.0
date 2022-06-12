import api from './apis.js'
import './main.js';

document.getElementById("question-box").style.display = "none"
var questions = []
var idx=0
if(questions.length==0)
{
    document.getElementById("start").disabled = true  
    document.getElementById("start").style.cursor = "not-allowed";
    document.getElementById("start").textContent = "Preparing Your Test...";  
}

else
{
    document.getElementById("start").disabled = false  
    document.getElementById("start").style.cursor = "pointer"  
    document.getElementById("start").textContent = "Start Test";  
}

const get = (()=>{
    var NodesString = "";
    var i = 0;
    const params = new URLSearchParams(document.location.search);
    console.log(params)
    const Subject = params.get("subject");
    const topic = params.get("topic");
    const level = params.get("level");

console.log(`{api.get.question}${Subject}/${topic}/${level}?page=1&limit=10`);
    fetch(`${api.get.question}${Subject}/${topic}/${level}?page=1&limit=10`,{
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
    })

    .then((res) => res.json())
    .then((data) => {
        console.log(data.result)
        questions = data.result;
        document.getElementById("start").disabled = false  
        document.getElementById("start").style.cursor = "pointer"  
        document.getElementById("start").textContent = "Start Test";  

    });
})()

document.getElementById("start").addEventListener("click",(e)=>{
  e.preventDefault();
    InitializeQuestion()
    setQuestion(0)    
    
});

document.getElementById("prev-question").addEventListener("click",(e)=>{
    e.preventDefault();
   
    if(idx>0)
    {
        idx-=1
    setQuestion(idx)
    }
    console.log(idx)
});

document.getElementById("next-question").addEventListener("click",(e)=>{
    e.preventDefault();
    if(idx<questions.length-1)
    {
    idx+=1
    setQuestion(idx)
    }
      console.log(idx)
});

function setQuestion()
{
    if(questions.length>0)
    {
        document.getElementById("title").textContent =  `Question ${idx+1}`;
        document.getElementById("question").textContent =  questions[idx].question;
        document.getElementById("option1").textContent =  questions[idx].option1;
        document.getElementById("option2").textContent =  questions[idx].option2;
        document.getElementById("option3").textContent =  questions[idx].option3;
        document.getElementById("option4").textContent =  questions[idx].option4;
    }
}

function InitializeQuestion()
{
    document.getElementById("greet").style.display = "none"
    document.getElementById("question-box").style.display = "block"
}