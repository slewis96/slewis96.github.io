# Circle Game
Click on the circle as soon as it appears miss then **gameover** don't click in time then **gameover**
More successful clicks means a smaller target and a shorter time to click

## Issues:
- [x] Circle goes off screen
- [x] Misclick not working

## Todo:
- [ ] fix gameOver, add modal on game over to show score and clicks then reset game (ajax?)
- [ ] Give instructions through modal then Ajax to refresh frame on gameover
- [x] setInterval dot change (setInterval bottom of move func, clearInterval at top) if function with interval runs gameOver
- [x] After x amount of clicks shrink circle, set interval time smaller, change score multiplyer
- [x] fadeOut in sync with timeout
- [x] **MENU** <br>
    - [x] Toggle gameOver on: timeout, miss
    - [x] Toggle fadeout
    - [x] Sliders for initial interval time and width & height
    - [x] Difficulty buttons set sliders and submit at pre defined points
    - [ ] Modul with info on effect of menu items??
- [ ] Toggle button for "mania" untimed, unlimited amount of circles, test accuracy (limited amount of circles)
### Todo extra:
- [x] Sliders for initial interval time and size
- [x] Pre defined themes on drop down in menu
- [ ] New game mode multiple circles: <br>
    Disable sliders other than size slider and button  <br>
    Add max circles slider  <br>
    First click: set var to true while var is true and i under maxCircle value : set interval to  find first circle with display none and  set random pos and set display to block
    (increment i on each loop decrement on each click)<br>
    On each circle click: set gameover interval, clear on top. decrease interval for circle spawn display none then randomise pos

### Notes:
Modal instructions & settings <br>
Main color hex: #c20000 <br>
Color B: #0048c2 <br>
Color C: #00c213 <br>
Color D: #76769E <br>
Font: ```<link href="https://fonts.googleapis.com/css?family=PT+Sans" rel="stylesheet">``` <br>
https://fonts.google.com/?selection.family=PT+Sans
