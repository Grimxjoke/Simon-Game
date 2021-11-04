// GLOBAL VARIABLES

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

// KeyBoard EVENT

$(document).on("keydown", function() {
  if (started === false) {
    nextSequence();
  }
  started = true;
})


// Click EVENT

$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  var currentLevel = userClickedPattern.length;
  playSound(userChosenColour);
  animatePress(this);
  checkAnswer(currentLevel);
})


// Funtions

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var buttonsColors = ["red", "blue", "green", "yellow"];
  var randomChosenColour = buttonsColors[randomNumber];
  gamePattern.push(randomChosenColour);
  setTimeout(function(){
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
  }, 600);
  level++;
  $("h1").html("level " + level);
  console.log("Game Patern : " + gamePattern);
}

function playSound(sound) {
  new Audio("sounds/" + sound + ".mp3").play();
}

function animatePress(currentColor) {
  var thisButton = $(currentColor);
  thisButton.addClass("pressed");
  setTimeout(function() {
    thisButton.removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  for (var count = 0; count < currentLevel; count++) {
    if(gamePattern[count] != userClickedPattern[count] && started === true){
      gameOver();
    }
  }
  if(level === currentLevel){
    console.log("gagné");
    nextSequence();
    userClickedPattern = [];
  }
}

function gameOver() {
  started = false;
  new Audio("sounds/wrong.mp3").play();
  $("h1").html("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
