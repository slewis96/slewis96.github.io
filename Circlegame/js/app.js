
          //INITIALISE

$(document).ready(function(){
  $('#introModal').css('display', 'block');
  //Game
  $('#circle').on('click', function(){
    event.stopPropagation();
    var $this = $(this);
    dotClick($this);
  })
  $('.background').click(function(){
    gameOver();
  })

  //Menu
    //Themes
  setThemeEvents();

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
  $('#closeGO').click(function(){
    $('#gameOverModal').css('display', 'none');
    circlesRemaining = 0;
  });
  $('.innerModal').click(function(){
    event.stopPropagation();
  });

    //Game mode
  $('#juggleBtn').click(function(){
    $(this).toggleClass("active");
    setJuggleSettings();
  });

    //Setting presets
  $('#reactBtn').click(function(){
    $(this).toggleClass("active");
    $('#aimBtn').removeClass("active");
    if($(this).hasClass("active")){
      setSliders("react");
      if(!($('#timeBtn').hasClass("active"))){ //on
        toggleTime($('#timeBtn'));
      }
      if($('#missBtn').hasClass("active")){ //off
        toggleMiss($('#missBtn'));
      } else { }
      if(!($('#sizeBtn').hasClass("active"))){ //on
        toggleResize($('#sizeBtn'));
      }
      if(!($('#timeoutBtn').hasClass("active"))){ //on
        toggleTimeout($('#timeoutBtn'));
      }
    } else {
      //back to default
      resetSettings();
    }
  });
  $('#aimBtn').click(function(){
    $(this).toggleClass("active");
    $('#reactBtn').removeClass("active");
    if($(this).hasClass("active")){
      setSliders("aim");
      if(!($('#timeBtn').hasClass("active"))){ //on
        toggleTime($('#timeBtn'));
      }
      if(!($('#missBtn').hasClass("active"))){ //on
        toggleMiss($('#missBtn'));
      }
      if($('#sizeBtn').hasClass("active")){ //off
        toggleResize($('#sizeBtn'));
      }
      if(!($('#timeoutBtn').hasClass("active"))){ //on
        toggleTimeout($('#timeoutBtn'));
      }
    } else {
      //back to default
      resetSettings();
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

  //Difficulty buttons
  $.each($('.diffBtns'), function(){
    $(this).click(function(){
      $('.diffBtns').removeClass('active');
      $(this).addClass('active');
      setSliders($(this).attr('id'));
      setTimeout(setDifficulty(sizeSlider.value, timerSlider.value), 2);
    });
  });

  //Sliders
  var sizeSlider = document.getElementById('sizeSlider');
  var timerSlider = document.getElementById('timerSlider');
    //display number to side of slider
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

var clicks = 0; // Incremented every circle click
var score = 0; // 2/clicks added each circle click
var highscore = 0; // replaced by highest score
var jugglehighscore = 0; // replaced by highest remaining circles
var misses = 0; // Amount of times missed only incremented if missBtn toggle off
var timer; // Time available to click circle before gameOver
var difficulty = {
  size: 100,
  time: 2000
}; // defined in setDifficulty via sliders
var timergoToggle = gameOver; // set to "" when timer toggled off
var fadeToggle = true; // set to false when timer toggled off
var sizeToggle = true; // set to false when size toggled off
var timerToggle = true; // set to false when size toggled off
var pokeToggle; // Determines whether pokemon images are swapped
var juggleToggle; // Defines whether more circles will spawn set in juggleBtn
var circleTimer; // Interval to toggle circle add
var circleSpawnTime = 0; // Determines if between circle spawn
var circlesRemaining = 0; // How many circles are on the screen on gameover

          //FUNCTIONS

//GAME
  // Repositions circle randomly on click
function dotClick($this){
  clearInterval(timer);
  var position = $this.position();
  var maxwidth = $('.background').width()-200;
  var maxheight = $('.background').height()-200;
  var newPosX = (Math.floor(Math.random() * maxwidth));
  var newPosY = (Math.floor(Math.random() * maxheight));
  $this.css({
    transition : "opacity 0s",
    opacity    : '1',
    left       : newPosX,
    top        : newPosY,
    width      : difficulty.size,
    height     : difficulty.size,
  });
  if(pokeToggle){setPokemon($this);}
  if(juggleToggle){addCircle()}
  if(fadeToggle){fadeOut($this);}
  clicks++;
  increaseDifficulty();
  setScore(Math.floor(clicks/2));
  timer = setInterval(timergoToggle, difficulty.time);
}

  // Sets circle to fade out in timer/600 (initally 3.33 seconds)
function fadeOut($this){
  var transtime = 'opacity '+(difficulty.time/600)+'s';
  $this.css({
    transition : transtime,
    opacity    : 0,
  });
  //detect when circle is opacity 0 then removes it from screen and does circlesRemaining--
  if(juggleToggle){
    var opacity = setInterval(
      function(){
        var currentOp = parseFloat($this.css('opacity'));
        if(currentOp == 0){
          console.log("gone");
          clearInterval(opacity);
          circlesRemaining--;
          $this.css('display', "none");
        }
      }, 100
    );
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
}

  // Ran on confirm button to set slider values
  // size and time : values from slider
function setDifficulty(size, time){
  difficulty.size = size;
  difficulty.time = time;
}

  // Set onscreen score and score var
  // x : Math.floor(clicks/2)
function setScore(x){
  score += x;
  $('#score').html("Score: " + score +",  Clicks: " + clicks);
}

  // Set onscreen highscore
function setHighScore(){
  if(score>highscore){
    highscore = score;
    $('#highscore').html("Highscore: " + highscore);
  }
}

  //Triggered on background click or timeout
function gameOver(){
  setHighScore();
  clearInterval(timer);
  var sizeSlider = document.getElementById('sizeSlider');
  var timerSlider = document.getElementById('timerSlider');
  $('#gameOverModal').css('display', 'block');
  if(misses>1){
    $('#goscore').html("Score: " + score +"<br>  Clicks: " + clicks +"<br>  Misses: " + misses);
  } else {
    $('#goscore').html("Score: " + score +"<br>  Clicks: " + clicks);
  }
  $('#circle').css({
    opacity    : '1',
    left       : 0,
    top        : 0,
    width      : sizeSlider.value,
    height     : sizeSlider.value,
  });
  score = 0;
  clicks = 0;
  misses = 0;
  circleSpawnTime = 0;
  setScore(score);
  difficulty.time = timerSlider.value;
  difficulty.size = sizeSlider.value;
}
  //Triggered on gameOver in juggle game mode
function gameOverJuggle(){
  clearInterval(circleTimer);
  setHighScore();
  clearInterval(timer);
  var sizeSlider = document.getElementById('sizeSlider');
  var timerSlider = document.getElementById('timerSlider');
  $('#gameOverModal').css('display', 'block');
  difficulty.time = timerSlider.value;
  difficulty.size = sizeSlider.value;
  if(parseFloat($('#circle').css('opacity'))>0){
    circlesRemaining++;
  }
  if(circlesRemaining>jugglehighscore){
    jugglehighscore = circlesRemaining;
  }
  $('#goscore').html("Circles remaining: " + circlesRemaining +"<br>  Juggle high score: " + jugglehighscore+"<br>  Clicks: " + clicks);
  $('.background').html("<div id='circle' class='circle'></div>");
  $('#circle').css({
    opacity    : '1',
    left       : 0,
    top        : 0,
    width      : sizeSlider.value,
    height     : sizeSlider.value,
  });
  $('#circle').on('click', function(){
    event.stopPropagation();
    var $this = $(this);
    dotClick($this);
  });
  circlesRemaining = 0;
  score = 0;
  clicks = 0;
  misses = 0;
  circleSpawnTime = 0;
  juggleToggle = true;
  setScore(score);
}

  //Sets Pokemon image every click
  //dependant on pokemonToggle
function setPokemon($this){
  var randpoke = getPokemon();
  $this.css("background-image", "url(imgs/Pokemon/pokemon"+randpoke+".png), radial-gradient(ellipse farthest-corner at 45px 45px, rgba(50, 50, 50, 0.5) 0%, rgba(80, 80, 80, 0.0) )");
}
  //Generates random number
function getPokemon(){
  var rand = Math.floor(Math.random() * 200);
  switch(true){
    case (rand==1):
      return 0;
      break;
    case (rand>1 && rand<50):
      return 8;
      break;
    case (rand>50 && rand<100):
      return 9;
      break;
    case (rand>100 && rand<150):
      return 10;
      break;
    case (rand>150 && rand<162):
      return 6;
      break;
    case (rand>162 && rand<174):
      return 3;
      break;
    case (rand>174 && rand<186):
      return 2;
      break;
    case (rand>186 && rand<189):
      return 7;
      break;
    case (rand>189 && rand<192):
      return 5;
      break;
    case (rand>192 && rand<196):
      return 4;
      break;
    case (rand>196 && rand<200):
      return 1;
      break;
    default:
      return 10;
      break;
  }
}

  //Adds circle on screen after 10 seconds from first dotClick
  //adds the next circle 10+10 seconds later and the next 20+10 later etc.
function addCircle(){
  clearInterval(circleTimer);
  var circleNum = $(".background").children().length + 1;
  $(".background").append("<div id='circle"+circleNum+"' class='circle'></div>");
  var $this;
  $('#circle'+circleNum).on('click', function(){
    event.stopPropagation();
    $this = $(this);
    dotClick($this);
  });
  var maxwidth = $('.background').width()-200;
  var maxheight = $('.background').height()-200;
  var newPosX = (Math.floor(Math.random() * maxwidth));
  var newPosY = (Math.floor(Math.random() * maxheight));
  $('#circle'+circleNum).css({
    transition : "opacity 0s",
    opacity    : '1',
    left       : newPosX,
    top        : newPosY,
    width      : difficulty.size,
    height     : difficulty.size,
  });
  fadeOut($('#circle'+circleNum));
  circleSpawnTime += 5000;
  circlesRemaining++;
  juggleToggle=!juggleToggle;
  circleTimer = setInterval(function(){juggleToggle=true;}, circleSpawnTime);
}

//EVENTS
  //Sets themes CSS to theme based on dropdown-content buttons
function setThemeEvents(){
  $('.circle').css("background-image", "url('')");
  $.each($('.dropdown-content').children(), function(){
    var themeID = $(this).attr("id");
    $(this).click(function(){
      $('#themecss').attr('href','css/'+themeID+'.css');
      $('.circle').css("background-image", "url('')");
      pokeToggle = false;
    });
    if(themeID=="ducktheme"){
      $(this).click(function(){
        $('#themecss').attr('href','css/'+themeID+'.css');
        $('.circle').css("background-image", "url('')");
        $('.circle').css("background-image", "url('imgs/duck.png')");
        pokeToggle = false;
      });
    }
    if(themeID=="poketheme"){
      $(this).click(function(){
        $('#themecss').attr('href','css/'+themeID+'.css');
        $('.circle').css("background-image", "url('')");
        $('.circle').css("background-image", "url('imgs/Pokemon/pokemon8.png')");
        pokeToggle = true;
      });
    }
  });
}

  // Sets whether the game ends on miss
  // $this : the button pressed to activate
function toggleMiss($this){
  $this.toggleClass("active");
  if($('#missBtn').hasClass("active")){
    $('.background').click(function(){
      gameOver();
    });
  }
  else{
    $('.background').unbind();
    $('.background').click(function(){
      misses++;
    });
  }
}

  // Sets whether the game ends on timeout
  // $this : the button pressed to activate
function toggleTime($this){
  $this.toggleClass("active");
  if($('#timeBtn').hasClass("active")){
    timergoToggle = gameOver;
  }
  else{
    timergoToggle = " ";
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
      $('#circle').css({
        height: sizeSlider.value,
        width: sizeSlider.value,
      })
      setDifficulty(sizeSlider.value, timerSlider.value);
      break;
    case "medium":
      sizeSlider.value = 100;
      timerSlider.value = 2000;
      $('#sizeValue').html(sizeSlider.value);
      $('#timerValue').html(timerSlider.value);
      $('#circle').css({
        height: sizeSlider.value,
        width: sizeSlider.value,
      })
      setDifficulty(sizeSlider.value, timerSlider.value);
      break;
    case "hard":
      sizeSlider.value = 50;
      timerSlider.value = 1000;
      $('#sizeValue').html(sizeSlider.value);
      $('#timerValue').html(timerSlider.value);
      $('#circle').css({
        height: sizeSlider.value,
        width: sizeSlider.value,
      })
      setDifficulty(sizeSlider.value, timerSlider.value);
      break;
    case "react":
      sizeSlider.value = 125;
      timerSlider.value = 750;
      $('#sizeValue').html(sizeSlider.value);
      $('#timerValue').html(timerSlider.value);
      $('#circle').css({
        height: sizeSlider.value,
        width: sizeSlider.value,
      })
      setDifficulty(sizeSlider.value, timerSlider.value);
      break;
    case "aim":
      sizeSlider.value = 75;
      timerSlider.value = 1500;
      $('#sizeValue').html(sizeSlider.value);
      $('#timerValue').html(timerSlider.value);
      $('#circle').css({
        height: sizeSlider.value,
        width: sizeSlider.value,
      })
      setDifficulty(sizeSlider.value, timerSlider.value);
      break;
    case "juggle":
      sizeSlider.value = 125;
      timerSlider.value = 2500;
      $('#sizeValue').html(sizeSlider.value);
      $('#timerValue').html(timerSlider.value);
      $('#circle').css({
        height: sizeSlider.value,
        width: sizeSlider.value,
      })
      setDifficulty(sizeSlider.value, timerSlider.value);
      break;
    default:
      sizeSlider.value = 100;
      timerSlider.value = 2000;
      $('#sizeValue').html(sizeSlider.value);
      $('#timerValue').html(timerSlider.value);
      $('#circle').css({
        height: sizeSlider.value,
        width: sizeSlider.value,
      })
      setDifficulty(sizeSlider.value, timerSlider.value);
      break;
  }
}

  //resets the settings to default used on presets and gamemode
function resetSettings(){
  $('.diffBtns').each(function(){
    if($(this).hasClass("active")){
      setSliders($(this).attr('id'));
    }
  });
  if(!($('#timeBtn').hasClass("active"))){ //if off turn on
    toggleTime($('#timeBtn'));
  }
  if(!($('#missBtn').hasClass("active"))){ //if off turn on
    toggleMiss($('#missBtn'));
  }
  if($('#sizeBtn').hasClass("active")){ //if on turn off
    toggleResize($('#sizeBtn'));
  }
  if($('#timeoutBtn').hasClass("active")){ //if on turn off
    toggleTimeout($('#timeoutBtn'));
  }
}

  //sets settings ready for juggle mode and resets them on off toggle
function setJuggleSettings(){
  $('#reactBtn').removeClass("active");
  $('#aimBtn').removeClass("active");
  if($("#juggleBtn").hasClass("active")){
    resetSettings();
    setSliders("juggle");
    $.each($("#settingsModal button"), function(){
      $(this).prop('disabled', true);
    });
    $("#sizeSlider").prop('disabled', true);
    $("#timerSlider").prop('disabled', true);
    $("#confirm").prop('disabled', false);
    $("#juggleBtn").prop('disabled', false);
    timergoToggle = gameOverJuggle;
    $('.background').unbind();
    $('.background').click(function(){
      gameOverJuggle();
    });
    juggleToggle=true;
  } else {
    $.each($("#settingsModal button"), function(){
      $(this).prop('disabled', false);
    });
    $("#sizeSlider").prop('disabled', false);
    $("#timerSlider").prop('disabled', false);
    timergoToggle = gameOver;
    $('.background').unbind();
    $('.background').click(function(){
      gameOver();
    });
    clearInterval(circleTimer);
    juggleToggle=false;
    resetSettings();
  }
}
