// set the dimensions and margins of the graph
var margin = {top: 40, right: 150, bottom: 60, left: 30},
width = 500 - margin.left - margin.right,
height = 420 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#bubble")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
  "translate(" + margin.left + "," + margin.top + ")");




//Read the data
d3.csv("../static/data/facebook_mock.csv").then(function(fbData) {
    console.log("si leyo");
    console.log(fbData);


    // ---------------------------//
    //      CONVERT TO NUMERICAL VALUES WHERE NEEDEED//
    // ---------------------------//
    fbData.forEach(function(data) {
        data.comment = +data.comment;
        data.like = +data.like;
        data.share = +data.share;
        console.log("change to a number");
      });
    
      
    // ---------------------------//
    //       AXIS  AND SCALE      //
    // ---------------------------//
    
    //Find maximum vales
    var maximumX = d3.max(fbData, d =>d.like);
    console.log(maximumX);

    var maximumY = d3.max(fbData, d =>d.share);
    console.log(maximumY);

    var maximumZ = d3.max(fbData, d =>d.comment);
    console.log(maximumZ);
    
    
    
    // Add X axis
    var x = d3.scaleLinear()
        .domain([0,maximumX*1.3])
        .range([ 0, width ]);
    svg.append("g")
       .attr("transform", "translate(0," + height + ")")
       .call(d3.axisBottom(x).ticks(15));

// Add X axis label:
svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height+50 )
    .text("Post's likes");

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, maximumY*1.3])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y));

// Add Y axis label:
svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", 0)
    .attr("y", -20 )
    .text("Post's shares")
    .attr("text-anchor", "start")

// Add a scale for bubble size
var z = d3.scaleSqrt()
.domain([0, maximumZ*1.1])
.range([ 2, 30]);

// Add a scale for bubble color
var myColor = d3.scaleOrdinal()
.domain(["Photo","Status","Link", "Video"])
.range(d3.schemeSet1);

// ---------------------------//
//      TOOLTIP               //
// ---------------------------//

// -1- Create a tooltip div that is hidden by default:
var tooltip = d3.select("#bubble")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "black")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("color", "white")

// -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
var showTooltip = function(d) {
  tooltip
    .transition()
    .duration(200)
  tooltip
    .style("opacity", 1)
    .html("Success: " + d.Clus_km)
    .style("left", (d3.mouse(this)[0]+30) + "px")
    .style("top", (d3.mouse(this)[1]+30) + "px")
}
var moveTooltip = function(d) {
  tooltip
    .style("left", (d3.mouse(this)[0]+30) + "px")
    .style("top", (d3.mouse(this)[1]+30) + "px")
}
 var hideTooltip = function(d) {
   tooltip
    .transition()
    .duration(200)
    .style("opacity", 0)
  }

// ---------------------------//
//       HIGHLIGHT GROUP      //
// ---------------------------//

// What to do when one group is hovered
var highlight = function(d){
  // reduce opacity of all groups
  d3.selectAll(".bubbles").style("opacity", .05)
  // expect the one that is hovered
  d3.selectAll("."+d).style("opacity", 1)
  }

// And when it is not hovered anymore
var noHighlight = function(d){
  d3.selectAll(".bubbles").style("opacity", 1)
}

// ---------------------------//
//       CIRCLES              //
// ---------------------------//

// Add dots
svg.append('g')
  .selectAll("dot")
  .data(fbData)
  .enter()
  .append("circle")
    .attr("class", function(d) { return "bubbles " + d.Type })
      .attr("cx", function (d) { return x(d.like); } )
      .attr("cy", function (d) { return y(d.share); } )
      .attr("r", function (d) { return z(d.comment/10); } )
      .style("fill", function (d) { return myColor(d.Type); } )
    // -3- Trigger the functions for hover
    .on("mouseover", showTooltip )
    .on("mousemove", moveTooltip )
    .on("mouseleave", hideTooltip )

    // ---------------------------//
    //       LEGEND              //
    // ---------------------------//

    // Add legend: circles
    var valuesToShow = [0.2, 1.2, 6.4] //circle figures with different sizes
    var xCircle = 390
    var xLabel = 440
    svg
      .selectAll("legend")
      .data(valuesToShow)
      .enter()
      .append("circle")
        .attr("cx", xCircle)
        .attr("cy", function(d){ return height - 100 - z(d) } )
        .attr("r", function(d){ return z(d) })
        .style("fill", "none")
        .attr("stroke", "black")

    // Add legend: segments
    svg
      .selectAll("legend")
      .data(valuesToShow)
      .enter()
      .append("line")
        .attr('x1', function(d){ return xCircle + z(d) } )
        .attr('x2', xLabel)
        .attr('y1', function(d){ return height - 100 - 1.7*z(d) } )
        .attr('y2', function(d){ return height - 100 - 1.7*z(d) } )
        .attr('stroke', 'black')
        .style('stroke-dasharray', ('2,2'))

    // Add legend: labels
    svg
      .selectAll("legend")
      .data(valuesToShow)
      .enter()
      .append("text")
        .attr('x', xLabel)
        .attr('y', function(d){ return height - 100 - 1.3*z(d) } )
        .text( function(d){ return d*10 } )
        .style("font-size", "10px" )
        .attr('alignment-baseline', 'middle')

    // Legend title
    svg.append("text")
      .attr('x', xCircle)
      .attr("y", height - 100 +30)
      .text("Post's comments")
      .attr("text-anchor", "middle")

    // Add one dot in the legend for each name.
    var size = 20
    var allgroups = ["Photo","Status","Link", "Video"]
    svg.selectAll("myrect")
      .data(allgroups)
      .enter()
      .append("circle")
        .attr("cx", 390)
        .attr("cy", function(d,i){ return 10 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 7)
        .style("fill", function(d){ return myColor(d)})
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight)

    // Add labels beside legend dots
    svg.selectAll("mylabels")
      .data(allgroups)
      .enter()
      .append("text")
        .attr("x", 390 + size*.8)
        .attr("y", function(d,i){ return i * (size + 5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d){ return myColor(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight)
  
    


//end of reading data do not errase :)
});
