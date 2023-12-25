var subcontainer2 = document.getElementsByClassName("sub-container2")[0];
var subcontainer3 = document.getElementsByClassName("sub-container3")[0];
var checkicon = document.getElementById("CheckIcon");
var deleteicon = document.getElementById("DeleteIcon");
var i = 0;


deleteicon.addEventListener("click", function(){
    typeNote();
})

checkicon.addEventListener("click", function(){
    createNote();
})

function typeNote(){
    if(subcontainer3.style.display == "none"){
        subcontainer3.style.display = "block"; 
    }
    else{
        subcontainer3.style.display = "none";
    }
}

function createNote(){
 var noteText = document.getElementById("note-text").value;

 var node0 = document.createElement("div");
 var node1 = document.createElement("h1");

  node1.innerHTML = noteText;

  node1.setAttribute("style", "width:250px; height:250px; font-size:26px; padding:25px; margin-top:10px; overflow:hidden; box-shadow:0px 10px 24px 0px rgba(0,0,0,0.75)");
  node1.style.margin= margin();
  node1.style.transform = rotate();
  node1.style.background = color();

  node0.appendChild(node1);
  subcontainer2.insertAdjacentElement("beforeend",node0);

  document.getElementById("note-text"). value = "";

  node0.addEventListener("dblclick", function(){
    node0.remove();
  })

  node0.addEventListener("mouseenter", function(){
    node0.style.transform = "scale(1.1)";
  })
  node0.addEventListener("mouseleave", function(){
    node0.style.transform = "scale(1)";
  })
  
}

function margin(){
    var random_margin = ["-5px","1px","5px","10px","15px","20px"];

    return random_margin[Math.floor(Math.random() * random_margin.length)];
}
function rotate(){
  var random_rotate = ["rotate(3deg)","rotate(1deg)","rotate(-1deg)","rotate(3deg)","rotate(5deg)","rotate(10deg)"]; 

  return random_rotate[Math.floor(Math.random()*random_rotate.length)];
}

function color(){
    var random_color = ["#0096FF", "#7FFFD4", "#DFFF00", "#32CD32", "#FFBF00", "#FF00FF" ];
    
   if(i > random_color.length - 1){
    i = 0;
   }

    return random_color [i++];
}
