// http://latentflip.com/LearningD3/collider/

//============================================================
// Set up SVG game area
var board = 
  d3.select("body")
    .append("svg")
    .attr("position", "absolute")
    .attr("width", 500)
    .attr("height", 500)

//============================================================
//Build enemies [https://developer.mozilla.org/en-US/docs/SVG]
var enemyArr = [];
for(var i = 0; i < 11; i++){
  enemyArr.push(i);
};

var enemies = 
  board.selectAll('circle') // grab empty reference for circles to fill in 
    .data(enemyArr)         //plug in to data source to bind to each circle
    .enter()                //create a placeholder for each datum in data source
      .append("circle") // appends circle to each svg
      .attr("cx", function (d, i) { return 50 * (Math.floor(Math.random() * i));}) 
      .attr("cy", function (d, i) { return 50 * (Math.floor(Math.random() * i));}) 
      .attr("r", 5) //circle radius
      .style("fill", "purple")
      .classed('enemy', true);

  //Use CSS3 animations to make the enemies whirling shuriken.
 // [https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations]


//============================================================
// Create the player and make him draggable.

//Handle dragging
/*
var point = d3.mouse(this);
var p = {x: point[0], y: point[1] };

 // Initialize drag behavior
.on("drag", dragmove;

function dragmove(d) {
  var x = d3.event.x;
  var y = d3.event.y;
  d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
}
*/


// Add a rect of a new color to board SVG.
var player = 
  board.selectAll('rects')
    .data([1])
    .enter()
      .append('rect')
      .attr("x", 250) 
      .attr("y", 250) 
      .attr("height", 10) 
      .attr("width", 10)
      .style("color", "blue")
      .classed('player', true);

    // player.on("click", function(d) { alert("hello"); });

// board.on('click', function(){
//   return alert('Hello!');
// });

var drag = d3.behavior.drag()
    .on("drag", dragmove);

function dragmove(d) {
  var x = d3.event.x;
  var y = d3.event.y;
  d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
}

player.on('drag', dragmove);


//============================================================
// Function to handle movement of enemies and collision detection
function moveEnemies(){
  enemies
    .transition()
    .duration(2000)
    .attr("cx", function (d, i) { return 50 * (Math.floor(Math.random() * i));}) 
    .attr("cy", function (d, i) { return 50 * (Math.floor(Math.random() * i));});

    window.setTimeout(moveEnemies, 2000);
};



  // Set up event listener for player proximity to enemy

  // Detect collision if enemy touches player (look at CoffeeScript example)
    
    // When collision is detected: 
      // if currentScore is higher than highScore, set new highScore

        // reset currentScore to 0

      // increment collisions

  
//============================================================
// On load, begin incrementing currentScore
var count = 0;
var currentScore = d3.select('#currentScore')

function scoreCount(){
  count++;
  console.log(count);
  currentScore.text(count);

  window.setTimeout(scoreCount, 100);
};


moveEnemies();

scoreCount();


