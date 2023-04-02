// Game start function

let buttonColours = ["red","blue","green","yellow"];

let gamePattern = [];

let level = -1;

let userClickedPattern = [];

if (level === -1){
    $(document).keydown(function(){
        gamePattern = [];
        nextSequence();
        });
}

// Player interaction

$(".btn").on("click",function(){
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    checkAnswer(gamePattern, userClickedPattern);
});

// Check answer

function checkAnswer(gamePattern, userClickedPattern){
    if (userClickedPattern[userClickedPattern.length - 1] === gamePattern[userClickedPattern.length - 1] && userClickedPattern.length === gamePattern.length && level != 5 && level != 10){
        console.log("Success");
        $("#level-result").css("visibility", "visible");
        setTimeout(function(){
            $("#level-result").css("visibility", "hidden");
        },1000);
        setTimeout(function(){
            nextSequence();
        },2000);
        // Mogambo code
    } else if (userClickedPattern[userClickedPattern.length - 1] === gamePattern[userClickedPattern.length - 1] && userClickedPattern.length === gamePattern.length && level === 5){
        $("#mogambo-container").css("display","inline-block");
        setTimeout(function(){
            $("#mogambo-container").css("display","none");
        },1500);
        setTimeout(function(){
            nextSequence();
        },2000);
        // Nacho code
    } else if (userClickedPattern[userClickedPattern.length - 1] === gamePattern[userClickedPattern.length - 1] && userClickedPattern.length === gamePattern.length && level === 10){
        $(".mogambo-img").attr("src","https://media.giphy.com/media/JrjNe1zbLYd3y/giphy.gif");
        $("#mogambo-container").css("display","inline-block");
        setTimeout(function(){
            $("#mogambo-container").css("display","none");
        },1500);
        setTimeout(function(){
            nextSequence();
        },2000);
    } else if (userClickedPattern[userClickedPattern.length - 1] !== gamePattern[userClickedPattern.length - 1]){
        console.log("Wrong");
        let wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over. Press Any Key to Restart");
        level = -1;
    }
}

// Game pattern

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    for (let i=0; i<gamePattern.length; i++){
        delayFx(i,gamePattern);
        }
}

// Animate function

function animatePress(currentColour){
    $("." + currentColour).addClass("pressed");
    setTimeout(function(){
        $("." + currentColour).removeClass("pressed");
    },100);
}

// Delay function

function delayFx(indexNum,gameSequence){
    setTimeout(function(){
        $("#" + gameSequence[indexNum]).animate({opacity:"100%"},100).fadeOut(50).fadeIn(50);

        playSound(gameSequence[indexNum]);
    }, 1000 * indexNum);
}

// Switch function

function playSound(button){
    switch(button){
        case "green":
            let greenSound = new Audio("sounds/green.mp3");
            greenSound.play();
            break;

        case "red":
            let redSound = new Audio("sounds/red.mp3");
            redSound.play();
            break;

        case "yellow":
            let yellowSound = new Audio("sounds/yellow.mp3");
            yellowSound.play();
            break;

        case "blue":
            let blueSound = new Audio("sounds/blue.mp3");
            blueSound.play();
            break;

        default:
            console.log("default press " +button);
            break;
    }
}