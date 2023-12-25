var banner = $("#banner-message")
var button = $("button")

// handle click and add class
button.on("click", function(){
  var inputValue = $("#txtInput").val();
  var age = parseInt(moment().diff(inputValue,'years',true));
  
$("#spantext").html(age + ' years old');
  
})