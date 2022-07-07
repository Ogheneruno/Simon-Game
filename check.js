var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

document.addEventListener("keydown", (function() {
    if (!started) {
        document.querySelector("#level-title").textContent = "Level " + level;
        nextSequence();
        started = true;
    }
}));

for (var i = 0; i < document.querySelectorAll(".btn").length; i++) {
    document.querySelectorAll(".btn")[i].addEventListener("click", function() {
        var userChosenColour = this.getAttribute("id");
        userClickedPattern.push(userChosenColour);
        
        playSound(userChosenColour);
    
        checkAnswer(userClickedPattern.length - 1);
    });
}


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");

        document.querySelector("body").classList.add("game-over");

        setTimeout(() => {
            document.querySelector("body").classList.remove("game-over");
        }, 200);

        document.querySelector("#level-title").textContent = "Game Over, Press Any Key to Restart";

        startOver();
        
    }
}


function nextSequence() {

    userClickedPattern = [];
    
    level++;
    document.querySelector("#level-title").textContent = "Level " + level;

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    document.querySelector("#" + randomChosenColor).classList.add("pressed");

    setInterval(() => {
        document.querySelector("#" + randomChosenColor).classList.remove("pressed");
    }, 100);

    playSound(randomChosenColor);

}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColour) {
    document.querySelector("#" + currentColour).classList.add("pressed");

    setTimeout(() => {
        document.querySelector("#" + currentColour).classList.remove("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}