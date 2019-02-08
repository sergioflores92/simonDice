var level = 0;
var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

// produces new random step
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $('.' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $('h1').text("Nivel " + level);
  level += 1;
}
//produces the sound of each button, gets called in nextSequence()
//and in the event click handler
function playSound(name) {
  new Audio('sounds/' + name + '.mp3').play();
}

// click event handler
$(".btn").click(function() {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatedPress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1); // creo que deberia ser asi
});

function animatedPress(currentColour) {
  $('.' + currentColour).addClass('pressed');
  setTimeout(function() {
    $('.' + currentColour).removeClass('pressed');
  }, 100);
}
//////////////// event handler to start the game/////////////////////
$(document).keydown(function() {
  nextSequence();
  $(document).off('keydown');

});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(function() {
      $('body').removeClass('game-over');
    }, 200);

    $('h1').text('Perdiste puto!');
    setTimeout(function (){$('h1').text('Presiona cualquier tecla para empezar');},1000);
    startOver();
    console.log("wrong");
  }
}

function startOver(){
  level = 0;
  userClickedPattern=[];
  gamePattern=[];
  $(document).keydown(function() {
    nextSequence();
    $(document).off('keydown');

  });

}
