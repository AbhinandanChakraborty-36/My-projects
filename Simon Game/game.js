
var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var start=false;
var level=0;
$(".btn").click(function(){
    var userChosenColour= $(this).attr("id");//to select the button we clicked last.
     userClickedPattern.push(userChosenColour);
     playSound(userChosenColour);
     animatePress(userChosenColour);
     checkAnswer(userClickedPattern.length);

});
$(document).keydown(function(){

    if(!start)
    {
        $("h1").text("Level "+level);
        nextSequence();
        start=true;        
    }  
});
function nextSequence()
{
    level++;
    $("h1").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour =buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    //  var audio= new Audio("sounds/"+randomChosenColour+".mp3");
    //  audio.play();

    playSound(randomChosenColour);
    

} 

function playSound(name)
{

    var audio= new Audio("sounds/"+name+".mp3");
     audio.play();

}

function animatePress(currentColour)
{
     $("#"+currentColour).addClass("pressed");
     setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");}, 100);

}

function checkAnswer(currentLevel)
{

 
   
     if(userClickedPattern[currentLevel-1]===gamePattern[currentLevel-1] )
     {
         if(userClickedPattern.length === gamePattern.length)
         {
        console.log("success");
        setTimeout(function(){
            nextSequence();
        },1000);
        userClickedPattern=[];
     }
    }

     else{
        console.log("wrong");
        var soundo=new Audio("sounds/wrong.mp3");
        soundo.play();

        $("body").addClass("game-over");
        setTimeout(function() {

        $("body").removeClass("game-over");
            
        },200);
       
        $("h1").text("Game Over! Press Any Key to Restart");

        startOver();
        
        
         
     }

   
        

}



function startOver() {

    level=0;
    gamePattern=[];
    userClickedPattern=[]

    start=false;
    
}
