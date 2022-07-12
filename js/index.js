toggle=0
document.getElementById("floating").style.display = "none";
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