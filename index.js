 var buttonColors=["red","blue","green","yellow"];

 var gamePattern=[];
 var userClickedPattern=[];
 var started=false;
 var level=0;

 $(document).keypress(function() {
    if(!started){
        $("#level-title").text("Level "+level);
        newSequence();
        started=true;
    }
});

$(".btn").on("click",function(){
    var userChoosenColor=$(this).attr("id");

    userClickedPattern.push(userChoosenColor);

    playSound(userChoosenColor);

    animatePress(userChoosenColor);

    checkAnswer(userClickedPattern.length-1);
 });

 function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
       console.log("success");
    
    if (userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
            newSequence();
        },1000);
    }
    }
    else{
       console.log("wrong");
       playSound("wrong");
       $("body").addClass("game-over");
       setTimeout(function(){
        $("body").removeClass("game-over");
       },200);
       $("#level-title").text("Game Over, Press Any Key to Restart");
       startOver();
    }
}

function newSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour= buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

 function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
 }

 function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed ");
    var delayInMilliseconds = 1000;
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed ");
    }, delayInMilliseconds);
 }
 function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}