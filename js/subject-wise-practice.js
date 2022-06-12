import api from './apis.js'
import './main.js';

function addTopics(topicName,subject,topic)
{
    let box = `<div class="col-lg-3 col-md-6 wow fadeInRight" data-wow-delay="0.1s">
                    <div class="course-item bg-light">
                        <div class="position-relative overflow-hidden">
                            <img class="img-fluid" src="img/course-1.jpg"alt="">
                                <div class="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                                    <a href="questions.html?subject=${subject}&topic=${topic}&level=1" id="easy" class="flex-shrink-0 btn btn-sm btn-primary border-end px-3" style="border-radius: 30px 0 0 30px">Easy</a>
                                    <a href="questions.html" id="mod" class="flex-shrink-0 btn btn-sm btn-primary border-end" style="border-radius: 0px 0 0 0px">Moderate</a>
                                    <a href="questions.html" id="adv" class="flex-shrink-0 btn btn-sm btn-primary" style="border-radius: 0 30px 30px 0;">Advanced</a>
                                </div>
                        </div>
                        <div class="text-center p-4 pb-0">
                            <h3 class="mb-0" id="topic">${topicName}</h3>
                            <div class="mb-3"></div>
                        </div>
                        <div class="d-flex border-top"></div>
                    </div>
                </div>`
    
    return box
}

function AddNewElementUsingString()
{
    var NodesString = "";
    var i = 0;
    const params = new URLSearchParams(document.location.search);
    console.log(params)
    const Subject = params.get("subject");
    fetch(`${api.get.topic}${Subject}`,{
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
    })

    .then((res) => res.json())
    .then((data) => {
        // console.log(data.result)
        data.result.forEach(elem => {
            i++
            console.log(elem.name);
            NodesString += addTopics(String(i) + '. ' + elem.name,Subject,elem.name);
    });
    var UlElement = document.getElementById('topic-box');
    UlElement.insertAdjacentHTML('beforeend', NodesString);
    });
}

AddNewElementUsingString()

document.getElementById('easy').addEventListener("click",()=>{
    function top(){
        a = document.getElementById("topic").innerText
        return a
    }
})


