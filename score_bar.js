// set the dimensions and margins of the graph
var bmargin = {top: 40, right: 30, bottom: 60, left: 150},
bwidth = 450 - bmargin.left - bmargin.right,
bheight = 400 - bmargin.top - bmargin.bottom;
// append the svg object to the body of the page
var svg3 = d3.select("#score-bar")
.append("svg")
.attr("width", bwidth + bmargin.left + bmargin.right)
.attr("height", bheight + bmargin.top + bmargin.bottom)
.append("g")
.attr("transform",
      "translate(" + bmargin.left + "," + bmargin.top + ")");


var svg4 = d3.select("#score-bar2")
.append("svg")
.attr("width", bwidth + bmargin.left + bmargin.right)
.attr("height", bheight + bmargin.top + bmargin.bottom)
.append("g")
.attr("transform",
    "translate(" + bmargin.left + "," + bmargin.top + ")");


// Parse the Data
//csvdata = d3.csv("https://raw.githubusercontent.com/ShineyAji/D3_Vis/main/data/2021.csv")
csvdata = d3.csv("https://raw.githubusercontent.com/ShineyAji/D3_Vis/main/data/2021.csv")
.then(function(csvdata)
{
    csvdata.sort(function(b, a) {
    return a.Happiness_Score - b.Happiness_Score;
    });
    data = csvdata.slice(0,10);

    saddata = csvdata.sort(function(b, a) {
        return b.Happiness_Score - a.Happiness_Score;
     });
     saddata = saddata.slice(0,10)



// Add X axis
var x = d3.scaleLinear()
.domain([0, 10])
.range([ 0, bwidth]);
svg3.append("g")
.attr("transform", "translate(0," + bheight + ")")
.call(d3.axisBottom(x))
.selectAll("text")
  .attr("transform", "translate(-10,0)rotate(-45)")
  .style("text-anchor", "end")
  

// Y axis
var y = d3.scaleBand()
.range([ 0, bheight ])
.domain(data.map(function(d) { return d.Country; }))
.padding(.1);
svg3.append("g")
.call(d3.axisLeft(y))
.style("font-size", "0.8em");


var chart1 = svg3.selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("class","g1")
            .attr("transform",function(d) {return "translate(0,"+y(d.Country)+")"; });

chart1.append("Myrect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x",x(0))
    .attr("y", function(d) { return y(d.Country); })
    .attr("width", function(d) { return x(d.Happiness_Score); })
    .attr("height", y.bandwidth() )
    .attr("fill", "#9BCC7F")

    chart1.append("text")
    .data(data)
    .enter()
    .append("text")
    .text(function(d) { return d.Happiness_Score; })
    .attr("x", function(d){return x(d.Happiness_Score);})
    .attr("y", function(d) { return y(d.Country); })
    .attr('dy', '1.0em')
    .attr('dx', '0.7em')
    .attr("text-anchor","left")
    //.attr("alighnment-baseline", "left")
    .style("fill","green")


var sx = d3.scaleLinear()
.domain([0, 10])
.range([ 0, bwidth]);
svg4.append("g")
.attr("transform", "translate(0," + bheight + ")")
.call(d3.axisBottom(sx))
.selectAll("text")
.attr("transform", "translate(-10,0)rotate(-45)")
.style("text-anchor", "end");


var sy = d3.scaleBand()
.range([ 0, bheight ])
.domain(saddata.map(function(d1) { return d1.Country; }))
.padding(.1);
svg4.append("g")
.call(d3.axisLeft(sy))
.style("font-size", "0.8em");

var chart2 = svg4.selectAll("g")
            .data(saddata)
            .enter().append("g")
            .attr("class","g2")
            .attr("transform",function(d) {return "translate(0,"+sy(d.Country)+")"; });

chart2.append("SadRect")
    .data(saddata)
    .enter()
    .append("rect")
    .attr("x",sx(0))
    .attr("y", function(d) { return sy(d.Country); })
    .attr("width", function(d) { return sx(d.Happiness_Score); })
    .attr("height", sy.bandwidth() )
    .attr("fill", "#F3A1A1")

    chart2.append("SadText")
    .data(saddata)
    .enter()
    .append("text")
    .text(function(d) { return d.Happiness_Score; })
    .attr("x", function(d){return sx(d.Happiness_Score);})
    .attr("y", function(d) { return sy(d.Country); })
    .attr('dy', '1.0em')
    .attr('dx', '0.7em')
    .attr("text-anchor","left")
    //.attr("alighnment-baseline", "left")
    .style("fill","red")

    svg4.append("text")      
    .attr("x",150)
    .attr("y",-15)
    .style("text-anchor", "middle")
    .text("Top 10 Saddest Countries in 2021")
    .style("fill","gray")

    svg3.append("text")      
    .attr("x",150)
    .attr("y",-15)
    .style("text-anchor", "middle")
    .text("Top 10 Happiest Countries in 2021")
    .style("fill","gray")
    

    svg3.append("text")      
    .attr("x", 150 )
    .attr("y", bheight+(bmargin.bottom-30) )
    .style("text-anchor", "middle")
    .text("Candril Ladder Score")
    .style("fill","gray")
    .style("font-size", "12px");

    svg4.append("text")      
    .attr("x", 150 )
    .attr("y", bheight+(bmargin.bottom-30) )
    .style("text-anchor", "middle")
    .text("Candril Ladder Score")
    .style("fill","gray")
    .style("font-size", "12px");


})
