
//INITIALISE

$(document).ready(function(){
  $('#introModal').css('display', 'block');
  //Game
  $('#circle').on('click', function(){
    event.stopPropagation();
    dotClick();
  })
  $('.background').click(function(){
    event.stopPropagation();
    gameOver();
  })

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
    //Modals
  $('#settings').click(function(){
    $('#settingsModal').css('display', 'block');
  });
  $('#settingsModal').click(function(){
    $('#settingsModal').css('display', 'none');
  });
  $('#introModal').click(function(){
    $('#introModal').css('display', 'none');
  });
  $('#gameOverModal').click(function(){
    $('#gameOverModal').css('display', 'none');
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
    //Setting presets
  $('#reactBtn').click(function(){
    $(this).toggleClass("active");
    $('#aimBtn').removeClass("active");
    if($(this).hasClass("active")){
      setSliders("react");
      if($('#timeBtn').hasClass("active")){

      } else { toggleTime($('#timeBtn')); }
      if($('#missBtn').hasClass("active")){
        toggleMiss($('#missBtn'));
      } else { }
      if($('#sizeBtn').hasClass("active")){
        toggleResize($('#sizeBtn'));
      } else { }
      if($('#timeoutBtn').hasClass("active")){

      } else { toggleTimeout($('#timeoutBtn')); }
    } else {
      //back to default
      $('.diffBtns').each(function(){
        if($(this).hasClass("active")){
          setSliders($(this).attr('id'));
        }
      });
      if($('#timeBtn').hasClass("active")){

      } else { toggleTime($('#timeBtn')); }
      if($('#missBtn').hasClass("active")){

      } else { toggleMiss($('#missBtn')); }
      if($('#sizeBtn').hasClass("active")){
        toggleResize($('#sizeBtn'));
      } else { }
      if($('#timeoutBtn').hasClass("active")){
        toggleTimeout($('#timeoutBtn'));
      } else { }
    }
  });
  $('#aimBtn').click(function(){
    $(this).toggleClass("active");
    $('#reactBtn').removeClass("active");
    if($(this).hasClass("active")){
      setSliders("aim");
      if($('#timeBtn').hasClass("active")){

      } else { toggleTime($('#timeBtn')); }
      if($('#missBtn').hasClass("active")){

      } else { toggleMiss($('#missBtn')); }
      if($('#sizeBtn').hasClass("active")){
        toggleResize($('#sizeBtn'));
      } else { }
      if($('#timeoutBtn').hasClass("active")){

      } else { toggleTimeout($('#timeoutBtn')); }
    } else {
      $('.diffBtns').each(function(){
        if($(this).hasClass("active")){
          setSliders($(this).attr('id'));
        }
      });
      if($('#timeBtn').hasClass("active")){

      } else { toggleTime($('#timeBtn')); }
      if($('#missBtn').hasClass("active")){

      } else { toggleMiss($('#missBtn')); }
      if($('#sizeBtn').hasClass("active")){
        toggleResize($('#sizeBtn'));
      } else { }
      if($('#timeoutBtn').hasClass("active")){
        toggleTimeout($('#timeoutBtn'));
      } else { }
    }
  });
    //Toggle game attributes
      //set timeout and fade on/off
  $('#timeBtn').click(function(){
    var $this = $(this);
    toggleTime($this);
  });
      //set background click on/off
  $('#missBtn').click(function(){
    var $this = $(this);
    toggleMiss($this);
  });
      //set sizeToggle
  $('#sizeBtn').click(function(){
    var $this = $(this);
    toggleResize($this);
  });
      //set timerToggle
  $('#timeoutBtn').click(function(){
    var $this = $(this);
    toggleTimeout($this);
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
    $('#circle').css({
      height: sizeSlider.value,
      width: sizeSlider.value,
    })
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
var timerToggle = true; // set to false when size toggled off

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
  timer = setInterval(gameOver, difficulty.time);
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
    difficulty.size = difficulty.size-1;
  }
  if(timerToggle){
    difficulty.time = difficulty.time-20;
  }
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
  $('#score').html("Score: " + score +",  Clicks: " + clicks);
}

  //Triggered on timeout or background click
function gameOver(){
  clearInterval(timer);
  var sizeSlider = document.getElementById('sizeSlider');
  var timerSlider = document.getElementById('timerSlider');
  $('#gameOverModal').css('display', 'block');
  $('#goscore').html("Score: " + score +"<br>  Clicks: " + clicks);
  $('#circle').css({
    opacity    : '1',
    left       : 0,
    top        : 0,
    width      : sizeSlider.value,
    height     : sizeSlider.value,
  });
  score = 0;
  clicks = 0;
  setScore(0);
  difficulty.time = timerSlider.value;
  difficulty.size = sizeSlider.value;
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
    case "react":
      sizeSlider.value = 125;
      timerSlider.value = 750;
      $('#sizeValue').html(sizeSlider.value);
      $('#timerValue').html(timerSlider.value);
      break;
    case "aim":
      sizeSlider.value = 75;
      timerSlider.value = 1500;
      $('#sizeValue').html(sizeSlider.value);
      $('#timerValue').html(timerSlider.value);
      break;
    default:
      sizeSlider.value = 100;
      timerSlider.value = 2000;
      $('#sizeValue').html(sizeSlider.value);
      $('#timerValue').html(timerSlider.value);
      break;
  }
}

  // Sets whether the game ends on miss
  // $this : the button pressed to activate
function toggleMiss($this){
  $this.toggleClass("active");
  if($('#missBtn').hasClass("active")){
    $('.background').click(function(){
      event.stopPropagation();
      gameOver();
    });
  }
  else{
    $('.background').unbind();
  }
}

  // Sets whether the game ends on timeout
  // $this : the button pressed to activate
function toggleTime($this){
  $this.toggleClass("active");
  if($('#timeBtn').hasClass("active")){
    gameOverToggle = gameOver;
  }
  else{
    gameOverToggle = " ";
  }
  fadeToggle = !fadeToggle;
}

  // Sets whether the circle resizes
  // $this : the button pressed to activate
function toggleResize($this){
  $this.toggleClass("active");
  sizeToggle = !sizeToggle;
}

  // Sets whether the timer lowers
  // $this : the button pressed to activate
function toggleTimeout($this){
  $this.toggleClass("active");
  timerToggle = !timerToggle;
}
