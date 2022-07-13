toggle=0
document.getElementById("newcontact").style.display = "none";
document.getElementById("newcontact").addEventListener("click",(e)=>{
    // e.preventDefault();
    toggle=!toggle
    if(toggle==1){
    document.getElementById("floating").style.display = "block";
    }else{
    document.getElementById("floating").style.display = "none";
    // document.querySelector("#newcontact i").class = "fa fa-times"
    //     console.log(document.querySelector("#newcontact i").class)
    }

  })

cname = document.getElementById("cname").value;
cemail = document.getElementById("cemail").value;
csubject = document.getElementById("csubject").value;
cmessage = document.getElementById("cmessage").value;


document.getElementById("cbutton").addEventListener('click',(e)=>{
  e.preventDefault();
  console.log(cname,cemail,csubject,cmessage)
  // if(!cname){
  //   alert("provide name")
  // }
  // else
  // if(!cemail){
  //   alert("provide email")
  // }
  // else
  // if(!csubject){
  //   alert("provide subject")
  // }
  // else
  // if(!cmessage){
  //   alert("provide message")
  // }
})
