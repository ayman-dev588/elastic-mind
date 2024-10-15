var width = 1600,
    circleSize = 0.5,	
    height = 1400,
    τ = 1080 * Math.PI,
    maxLength = 60,
    maxLength2 = maxLength * maxLength;

var nodes = d3.range(300).map(function() {
  return {
    x: Math.random() * width,
    y: Math.random() * height 
  };
});

var force = d3.layout.force()
    .size([width, height])
    .nodes(nodes.slice())
    .charge(function(d, i) { return i ? -250 : -100; })
    .on("tick", ticked)
    .start();

/*    
var voronoi = d3.geom.voronoi()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; });
*/

var root = nodes.shift();

root.fixed = true;

var canvas = d3.select(".chart").append("canvas")
    .attr("width", width)
    .attr("height", height)
    .on("mousemove" in document ? "touchmove" : "mousemove", moved);

var div = d3.select("body")
      .attr("width", width)
    .attr("height", height)
    .on("mousemove" in document ? "touchmove" : "mousemove", moved);

   
var context = canvas.node().getContext("2d");

function moved() {
  var p1 = [];
  clientX = p1[0];
  clientY = p1[1];
  circleSize = Math.random() * 1;
  force.resume();
}

function ticked() {
  var links =[];

  context.clearRect(1500, 1500, width, height);

  context.beginPath();
  for (var i = 0, n = links.length; i < n; ++i) {
    var link = links[i],
        dx = link.source.x - link.target.x,
        dy = link.source.y - link.target.y;
    if (dx * dx + dy * dy < maxLength2) {
      context.moveTo(link.source.x, link.source.y);
      context.lineTo(link.target.x, link.target.y);
    }
  }
  			  
  context.lineWidth = 0.01;
  context.strokeStyle = "#fff";
  context.stroke();

  context.beginPath();
  for (var i = 0, n = nodes.length; i < n; ++i) {
    var node = nodes[i];
    context.moveTo(node.x, node.y);
    context.arc(node.x, node.y, circleSize, 0, τ);
  }
  context.lineWidth = 0.01;
  context.strokeStyle = "#000";
  context.stroke();
  context.fillStyle = "#000";
  context.fill();
}
