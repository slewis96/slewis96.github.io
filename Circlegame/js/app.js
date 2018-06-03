
//INITIALISE

$(document).ready(function(){

  //Game
  $('#circle').on('click', function(){
    event.stopPropagation();
    dotClick();
  });
  $('.background').click(function(){
    event.stopPropagation();
    gameOver();
  });

  //Menu
    //Themes
  $('#defaulttheme').click(function(){
    $('#themecss').attr('href','css/colorsA.css');
  });
  $('#bluetheme').click(function(){
    $('#themecss').attr('href','css/colorsB.css');
  });
  $('#greentheme').click(function(){
    $('#themecss').attr('href','css/colorsC.css');
  });
  $('#purpletheme').click(function(){
    $('#themecss').attr('href','css/colorsD.css');
  });
    //Settings modal
  $('#settings').click(function(){
    openMenu();
  });
  $('#settingsModal').click(function(){
    $('#settingsModal').css('display', 'none');
  });
  $('.innerModal').click(function(){
    event.stopPropagation();
  });
  $.each($('.diffBtns'), function(){
    $(this).click(function(){
      $('.diffBtns').removeClass('active');
      $(this).addClass('active');
      setSliders($(this).attr('id'));
      setTimeout(setDifficulty(sizeSlider.value, timerSlider.value), 2);
    });
  });
    //Toggle game attributes
      //set timeout and fade on/off
  $('#timeBtn').click(function(){
    $(this).toggleClass("active");
    if($('#timeBtn').hasClass("active")){
      gameOverToggle = gameOver;
    }
    else{
      gameOverToggle = " ";
    }
    fadeToggle = !fadeToggle;
  });
      //set background click on/off
  $('#missBtn').click(function(){
    $(this).toggleClass("active");
    if($('#missBtn').hasClass("active")){
      $('.background').click(function(){
        event.stopPropagation();
        gameOver();
      });
    }
    else{
      $('.background').unbind();
    }
  });
      //set sizeToggle
  $('#sizeBtn').click(function(){
    $(this).toggleClass("active");
    if($('#sizeBtn').hasClass("active")){
      sizeToggle = false;
    }
    else{
      sizeToggle = true;
    }
  });

  //Sliders
  var sizeSlider = document.getElementById('sizeSlider');
  var timerSlider = document.getElementById('timerSlider');
  $('#sizeValue').html(sizeSlider.value);
  $('#timerValue').html(timerSlider.value);
    // Show value to the side of sliders
  sizeSlider.oninput = function() {
    $('#sizeValue').html(sizeSlider.value);
  }
  timerSlider.oninput = function() {
    $('#timerValue').html(timerSlider.value);
  }
    //Set difficulty based on slider values
  $('#confirm').click(function(){
    setDifficulty(sizeSlider.value, timerSlider.value);
    $('#settingsModal').css('display', 'none');
  });

});

//VARIABLES

var clicks = 0; // incremented every circle click
var score = 0; // 2/clicks added each circle click
var timer; // time available to click circle before gameOver
var difficulty = {
  size: 100,
  time: 2000,
  scrMult: 1
}; // defined in setDifficulty via sliders
var gameOverToggle = gameOver; // set to "" when timer toggled off
var fadeToggle = true; // set to false when timer toggled off
var sizeToggle = true; // set to false when size toggled off

//FUNCTIONS

  // Repositions circle randomly on click
function dotClick(){
  clearInterval(timer);
  var maxwidth = $('.background').width()-200;
  var maxheight = $('.background').height()-200;
  var newPosX = (Math.floor(Math.random() * maxwidth));
  var newPosY = (Math.floor(Math.random() * maxheight));
  $('#circle').css({
    transition : "opacity 0s",
    opacity    : '1',
    left       : newPosX,
    top        : newPosY,
    width      : difficulty.size,
    height     : difficulty.size,
  });
  fadeOut();
  clicks++;
  increaseDifficulty();
  setScore(difficulty.scrMult);
  timer = setInterval(gameOverToggle, difficulty.time);
}

  // Sets circle to fade out in timer/600 (initally 3.33 seconds)
function fadeOut(){
  if(fadeToggle){
    var transtime = 'opacity '+(difficulty.time/600)+'s';
    $('#circle').css({
      transition : transtime,
      opacity    : 0
    });
  }
}

  // Ran on every click to reduce size of circle and time to click
  // dependant on sizeToggle and timerToggle
function increaseDifficulty(){
  if(sizeToggle){
    difficulty.size = difficulty.size-0.5;
  }
  difficulty.time = difficulty.time-15;
  difficulty.scrMult = Math.floor(clicks/2);
}

  // Ran on confirm button to set slider values
  // size and time : values from slider
function setDifficulty(size, time){
  difficulty.size = size;
  difficulty.time = time;
}

  // Set onscreen score and score var
  // x : difficulty.scrMult
function setScore(x){
  score += x;
  $('#score').html("Score: " + score +"&emsp;Clicks: " + clicks);
}

  //Triggered on timeout or background click
function gameOver(){
  alert("Game Over!");
  location.reload();
}

  //Open settings modal on setting icon click
function openMenu(){
  $('#settingsModal').css('display', 'block');
}

  // Sets sliders to predefined setDifficulty
  // diff : id of button pressed (easy, medium, hard)
function setSliders(diff){
  var sizeSlider = document.getElementById('sizeSlider');
  var timerSlider = document.getElementById('timerSlider');
  switch(diff){
    case "easy":
      sizeSlider.value = 150;
      timerSlider.value = 3000;
      $('#sizeValue').html(sizeSlider.value);
      $('#timerValue').html(timerSlider.value);
      break;
    case "medium":
      sizeSlider.value = 100;
      timerSlider.value = 2000;
      $('#sizeValue').html(sizeSlider.value);
      $('#timerValue').html(timerSlider.value);
      break;
    case "hard":
      sizeSlider.value = 50;
      timerSlider.value = 1000;
      $('#sizeValue').html(sizeSlider.value);
      $('#timerValue').html(timerSlider.value);
      break;
  }
}
