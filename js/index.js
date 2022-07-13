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




document.getElementById("cbutton").addEventListener('click',(e)=>{
  e.preventDefault();
  cname = document.getElementById("cname").value;
  cemail = document.getElementById("cemail").value;
  csubject = document.getElementById("csubject").value;
  cmessage = document.getElementById("cmessage").value;
  console.log(cname,cemail,csubject,cmessage)
  if(!cname){
    alert("provide name")
  }
  else
  if(!cemail){
    alert("provide email")
  }
  else
  if(!csubject){
    alert("provide subject")
  }
  else
  if(!cmessage){
    alert("provide message")
  }

  Email.send({
    Host : "smtp.gmail.com",
    Username : 'arkosen27@gmail.com',
    Password : "",
    To : 'arkosen27@gmail.com',
    From : cemail,
    Subject : `${cname} has sent you a Message`,
    Body : `Name: ${cname} <br/> Mail ID: ${cemail} <br/> Message: ${cmessage} <br/>`,
  }).then(
  message => alert("Mail has been Sent Successfully")
);
})
