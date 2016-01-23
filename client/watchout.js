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
      .attr("cx", function (d, i) { return 50 * Math.floor((Math.random() * i));}) 
      .attr("cy", function (d, i) { return 50 * Math.floor((Math.random() * i));}) 
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
  board.selectAll('players')
    .data([1])
    .enter()
      .append('circle')
      .attr("r", 5)
      .attr("cx", 250) 
      .attr("cy", 250) 
      .attr("fill", "green")
      .classed('player', true);

    // player.on("click", function(d) { alert("hello"); });


var position = [219, 29];  // internal variable
function on_drag() {
    // set internal variable based on mouse position
    position = [d3.event.x, d3.event.y];
    redraw();
}
function redraw() {
    // set circle's position based on internal variable
    d3.select(".player")
        .attr("cx", position[0])
        .attr("cy", position[1]);
}

d3.behavior.drag()  // capture mouse drag event
    .on('drag', on_drag)
    .call(d3.select(".player"));

// function dragmove(d) {
//   var x = d3.event.x;
//    var y = d3.event.y;
//    d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
// }


// var model = {
//     position: [100, 50],
//     get: function() { return this.position; },
//     set: function(p) { this.position = p; }
// };

// function redraw() {
//     d3.select(".player")
//         .attr('transform', "translate(" + model.get() + ")");
// }

// function ref(obj, prop) {
//     return {
//         get: function() { return obj[prop]; },
//         set: function(v) { obj[prop] = v; }
//     };
// };


//============================================================
// Handle movement of enemies and collision detection
function moveEnemies(){
  enemies
    .transition()
    .duration(2000)
    .attr("cx", function (d, i) { return 50 * (Math.floor(Math.random() * i));}) 
    .attr("cy", function (d, i) { return 50 * (Math.floor(Math.random() * i));});

    window.setTimeout(moveEnemies, 2000);

    function checkCollision(){
      // if (enemy center - player center)
    }

    // add event listener for player proximity
    // if collision (See coffeescript example)
      // if current score (count) > highScore
        // highScore = current score (count)
      // reset count to 0
      // increment collisions
};

  
//============================================================
// On load, begin incrementing currentScore
var count = 0;
var currentScore = d3.select('#currentScore')

function scoreCount(){
  count++;
  currentScore.text(count);

  window.setTimeout(scoreCount, 10);
};


moveEnemies();

scoreCount();


