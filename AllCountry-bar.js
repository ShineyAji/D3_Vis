
var amargin =  {top: 20, right: 10, bottom: 40, left: 30};
var marginOverview = {top: 10, right: 10, bottom: 30, left: 40};
var selectorHeight = 60;
var awidth = 600 - amargin.left - amargin.right;
var aheight = 300 - amargin.top - amargin.bottom - selectorHeight;
var heightOverview = 80 - marginOverview.top - marginOverview.bottom;

var svg5 = d3.select("#AllCountry")
.append("svg")
.attr("width", awidth + amargin.left + amargin.right)
.attr("height", aheight + amargin.top + amargin.bottom + selectorHeight)
.append("g")


function updateallcountry()
{

svg5.selectAll("*").remove()  

ayear = document.getElementById("yearlist").value;
var aradios = document.getElementsByName('maps');
for (var radio of aradios)
{
        if (radio.checked) 
        {
        amapoption = radio.value;       
        }
}

if(amapoption == "Happiness_Score"){ var color = d3.scaleSequential(d3.interpolateGnBu).domain([0,8]); }
else if (amapoption == "Economy"){ var color = d3.scaleSequential(d3.interpolateYlOrBr).domain([0,2]); }
else if (amapoption == "Family"){ var color = d3.scaleSequential(d3.interpolateBuGn).domain([0,1.7]); }
else if (amapoption == "Health"){ var color = d3.scaleSequential(d3.interpolateBuPu).domain([0,1.14]); }
else if (amapoption == "Freedom"){ var color = d3.scaleSequential(d3.interpolatePuRd).domain([0,0.8]); }
else if (amapoption == "Trust"){ var color = d3.scaleSequential(d3.interpolateReds).domain([0,0.55]); }
else if (amapoption == "Generosity"){ var color = d3.scaleSequential(d3.interpolateGnBu).domain([0,0.9]); }


csvdata = d3.csv("https://raw.githubusercontent.com/ShineyAji/D3_Vis/main/data/"+ayear+".csv")
.then(function(csvdata)
{
        var data = csvdata.map(function(d)
        {
                return{
                        Country: d.Country,
                        Score: d[amapoption]
                }
        });
 
        data.sort(function(b, a) { return a.Score - b.Score; }); 

var maxLength = d3.max(data.map(function(d){ return d.Country.length}))
var barWidth = maxLength * 3;
var numBars = Math.round(width/barWidth);
var isScrollDisplayed = barWidth * data.length > awidth;
       

var xscale = d3.scaleBand()
                .domain(data.slice(0,numBars).map(function (d) { return d.Country; }))
                .range([0, awidth])
                .padding(.2)

var yscale = d3.scaleLinear()
                .domain([0, d3.max(data, function (d) { return d.Score; })])
                .range([aheight, 0]);
    
var diagram = svg5.append("g").attr("transform", "translate(" + amargin.left + "," + amargin.top + ")");
  
diagram.append("g")
  	.attr("class", "x axis")
        .attr("transform", "translate(0, " + aheight + ")")
        .call(d3.axisBottom(xscale))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-130)")
        .style("text-anchor", "end")
        .attr('dx', '-1.4em')
        .attr('dy', '-0.2em')
        .style("font-size", "1.2em");
  
diagram.append("g")
       .attr("class", "y axis")
       .call(d3.axisLeft(yscale))
       .selectAll("text")
       .attr("transform", "translate(-10,0)rotate(-180)")
       .attr('dx', '2.9em');

  
var bars = diagram.append("g");
  
bars.selectAll("rect")
            .data(data.slice(0, numBars), function (d) {return d.Country; })
        .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", function (d) { return xscale(d.Country); })
            .attr("y", function (d) { return yscale(d.Score); })
            .attr("width", (xscale.bandwidth()))
            .attr("height", function (d) { return aheight - yscale(d.Score); })
            .style("fill",function(d){return color(d.Score)});

svg5.append("text")      
.attr("x", -45)
.attr("y",0)
.style("text-anchor", "right")
.text("Score")
.style("fill","gray")
.style("font-size", "12px")
.attr("transform", "translate(-10,0)rotate(-180)");

svg5.append("text")      
.attr("x", -280)
.attr("y",35)
.style("text-anchor", "right")
.text("High Score")
.style("fill","gray")
.style("font-size", "12px")
.attr("transform", "translate(-10,0)rotate(-90)");

 svg5.append("text")      
.attr("x", -280)
.attr("y",500)
.style("text-anchor", "right")
.text("Low Score")
.style("fill","gray")
.style("font-size", "12px")
.attr("transform", "translate(-10,0)rotate(-90)");
  
if (isScrollDisplayed)
{

  var xOverview = d3.scaleBand()
                  .domain(data.map(function (d) { return d.Country; }))
                  .range([0, awidth])
                  .padding(.2);
  yOverview = d3.scaleLinear().range([heightOverview, 0]);
  yOverview.domain(yscale.domain());

  var subBars = diagram.selectAll('.subBar')
        .data(data)
        .enter()
        .append("rect")
        .classed('subBar', true)
        .attr("height", function(d) {return heightOverview - yOverview(d.Score);})
        .attr("width", function(d) { return xOverview.bandwidth()})
        .attr("x", function(d) {return xOverview(d.Country);})
        .attr("y", function(d) {return aheight + heightOverview + yOverview(d.Score)})
        .style("fill",function(d){return color(d.Score)})

  var displayed = d3.scaleQuantize()
              .domain([0, awidth])
              .range(d3.range(data.length));

         diagram.append("rect")
              .attr("transform", "translate(0, " + (aheight + amargin.bottom) + ")")
              .attr("class", "mover")
              .attr("x",0)
              .attr("y",0)
              .attr("height", selectorHeight)
              .attr("width", Math.round(parseFloat(numBars * awidth)/data.length))
              .attr("pointer-events", "all")
              .attr("cursor", "pointer")
              .call(d3.drag().on("drag",display));

              
}
function display (event,d) {

    var x = parseInt(d3.select(".mover").attr("x")),
        nx = x + event.dx,
        w = parseInt(d3.select(".mover").attr("width")),
        f, nf, new_data, rects;


    if ( nx < 0 || nx + w > awidth ) return;

    d3.select(".mover").attr("x", nx);

    f = displayed(x);
    nf = displayed(nx);

    if ( f === nf ) return;
    

    new_data = data.slice(nf, nf + numBars);
    xscale.domain(new_data.map(function (d) { return d.Country; }));
    diagram.select(".x.axis")
            .call(d3.axisBottom(xscale))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-130)")
            .style("text-anchor", "end")
            .style("font-size", "1.2em")
            .attr('dx', '-1.4em')
            .attr('dy', '-0.2em');

    rects = bars.selectAll("rect")
            .data(new_data, function (d) {return d.Country; });
    
    rects.attr("x", function (d) { return xscale(d.Country); });

    rects.enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", function (d) { return xscale(d.Country); })
            .attr("y", function (d) { return yscale(d.Score); })
            .attr("width", xscale.bandwidth())
            .attr("height", function (d) { return aheight - yscale(d.Score); })
            .style("fill",function(d){return color(d.Score)});  
    rects.exit().remove();
};
})
}
