//============================================================
// Set up SVG game area
var board = 
d3.select("body")
.append("svg")
.attr("position", "absolute")
.attr("width", 500)
.attr("height", 500);


//============================================================
//Build enemies [https://developer.mozilla.org/en-US/docs/SVG]
var enemies = [];
for(var i = 0; i < 11; i++){
  enemies.push(i);
};

board.selectAll('circles')
.data(enemies)
.enter()
.append("circle") // appends circle to each svg
.attr("cx", function (d, i) { return 50 * (Math.floor(Math.random() * i));}) //circle coordinates within svg
.attr("cy", function (d, i) { return 50 * (Math.floor(Math.random() * i));}) //circle coordinates within svg
.attr("r", 5) //circle radius
.style("fill", "purple");

//Use CSS3 animations to make the enemies whirling shuriken.
 // [https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations]


//============================================================
// Create the player and make him draggable.
// Add another circle of a new color to board SVG.
board.selectAll('rects')
.data([1])
.enter()
.append('rect')
.attr("x", 250) 
.attr("y", 250) 
.attr("height", 10) 
.attr("width", 10)  
.style("color", "blue")

  // Use D3 to make player draggable.


//============================================================
// Function to handle movement of enemies and collision detection
var movement = function(){

  // Update coordinates of each enemy to randomize x and y every second
    //setInterval()
  d3.selectAll('enemy')
  .attr("cx", function(d, i){return Math.random() * i})
  .attr("cy", function(d, i){return Math.random() * i});

    // Once enemies are moving, use d3.transition() to animate smoothly

  // Set up event listener for player proximity to enemy

  // Detect collision if enemy touches player (look at CoffeeScript example)
    
    // When collision is detected: 
      // if currentScore is higher than highScore, set new highScore

        // reset currentScore to 0

      // increment collisions

};
  
//============================================================
// On load, begin incrementing currentScore
var scoreCount = function(){
  // Update currentScore span
  //  Score counter:
  var currentScore = 0;
  var updateCurrentScore = function(){
    currentScore++;
    d3.select('#currentScore').text(currentScore.toString());
    return updateCurrentScore();
  }
};
scoreCount();













