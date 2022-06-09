import api from './apis.js'

function addTopics(topicName)
{
    let box = `<div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div class="course-item bg-light">
                        <div class="position-relative overflow-hidden">
                            <img class="img-fluid" src="img/course-1.jpg"alt="">
                                <div class="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                                    <a href="#" class="flex-shrink-0 btn btn-sm btn-primary border-end px-3" style="border-radius: 30px 0 0 30px">Easy</a>
                                    <a href="#" class="flex-shrink-0 btn btn-sm btn-primary border-end" style="border-radius: 0px 0 0 0px">Moderate</a>
                                    <a href="#" class="flex-shrink-0 btn btn-sm btn-primary" style="border-radius: 0 30px 30px 0;">Advanced</a>
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
    fetch(api.get.apiMath,{
        method: "GET"
    })

    .then((res) => res.json())
    .then((data) => {
        // console.log(data.result)
        data.result.forEach(elem => {
            console.log(elem.name);
            NodesString += addTopics(elem.name);
    });
    var UlElement = document.getElementById('topic-box');
    UlElement.insertAdjacentHTML('beforeend', NodesString);
    });
}

AddNewElementUsingString()


// var Elements = ["C", "C++", "Java", "Python", "R", "Perl", "C#"];

// 		function AddNewElementUsingString()
//         {
// 			var NodesString = "";
// 			for (var i = 0; i < Elements.length; i++)
//             {
// 				NodesString += addTopics(Elements[i]);
// 			}

// 			var UlElement = document.getElementById('topic-box');
//             UlElement.insertAdjacentHTML('beforeend', NodesString);
// 		}


// function AddNewElementUsingString()
// {
//     fetch(api.get.apiPhy,{
//         method: "GET"
//     })

//     .then((res) => res.json())
//     .then((data) => {
//         // console.log(data.result)
//         data.result.forEach(elem => {
//             console.log(elem.name);
//     });
//     });
// }