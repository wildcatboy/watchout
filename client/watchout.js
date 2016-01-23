//============================================================
// Set up SVG game area
var board = 
  d3.select("body")
    .append("svg")
    .attr("position", "absolute")
    .attr("width", 500)
    .attr("height", 500)

var currentScore = 0;
var collisions = 0;
var highScore = 0;
//============================================================
//Build enemies [https://developer.mozilla.org/en-US/docs/SVG]
var enemyArr = [];
for(var i = 2; i < 12; i++){
  enemyArr.push(i);
};

var enemies = 
  board.selectAll('circle') // grab empty reference for circles to fill in 
    .data(enemyArr)         //plug in to data source to bind to each circle
    .enter()                //create a placeholder for each datum in data source
      .append("circle") // appends circle to each svg
      .attr("cx", function (d, i) { return 500 * Math.random();}) 
      .attr("cy", function (d, i) { return 500 * Math.random();}) 
      .attr("r", 5) //circle radius
      .style("fill", "purple")
      .classed('enemy', true);

  //Use CSS3 animations to make the enemies whirling shuriken.
 // [https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations]


//============================================================
// Create the player and make him draggable.
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

var position = [250, 250];
function on_drag() {
    // set position based on mouse position
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

//============================================================
// Move enemies to random coordinates every 2 seconds.
function moveEnemies(){
  enemies
    .transition()
    .duration(2000)
    .attr("cx", function (d, i) { return 495 * Math.random();}) 
    .attr("cy", function (d, i) { return 495 * Math.random();});

    window.setTimeout(moveEnemies, 2000);
};
moveEnemies(enemies);
 //============================================================ 
// Return true if collision is detected between an enemy and the player.
var prevCollision = false;
function collisionDetector(){
  var collision = false;

  enemies.each(function(){
    var x = Math.abs(parseInt(player.attr("cx")) - this.cx.animVal.value); 
    var y = Math.abs(parseInt(player.attr("cy")) - this.cy.animVal.value); 
    var distance =  Math.sqrt(Math.pow(x,2) + Math.pow(y,2));

    var pR = parseInt(player.attr("r"));
    var eR = this.r.animVal.value;
    var limit = eR + pR;
    
    if(limit > distance){
      collision = true;
    }
  });

    if(collision){
      if(currentScore > highScore){
        highScore = currentScore;
      }
      currentScore = 0;
      if(prevCollision !== collision){
        collisions++;
      }
    }
   prevCollision = collision;
};
d3.timer(collisionDetector, 1);

//============================================================
// Iterate over enemies, on collision with player, update scores and collision count.


  //if(collision){
    // if current score (count) > highScore
     // highScore = current score (count)
  // reset count to 0
  // increment collisions    
 
// check each enemy for collision
//board.selectAll('.enemy').each(function(){collision(this);}); //works to select an individual enemy as circle

//============================================================
// On load, begin incrementing currentScore
function scoreCount(){
  currentScore++;
  d3.select('#currentScore').text(currentScore);
  d3.select('#highScore').text(highScore);
  d3.select('#collisionCount').text(collisions);
  window.setTimeout(scoreCount, 10);
};

scoreCount();


