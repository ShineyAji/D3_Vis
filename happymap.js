var width = '1000'
var height = '400'
const svg2 = d3.select("#sample1")
    .append('svg')
    .attr('width', width)
    .attr('height', height);
    cyear = 2021;
    factor = "Happiness_Score";
var color = d3.scaleSequential(d3.interpolateGreens).domain([0,10]);
const path = d3.geoPath();
const cprojection = d3.geoMercator()
                    .scale(100)
                    .center([20,50])
                    .translate([width/2, height/2]);
const cdata = new Map();
Promise.all([
    d3.json("/data/world.geojson"),
    d3.csv("/data/"+cyear+".csv", function(d)
    {
        cdata.set(d.code, +d[factor])
    })
])
.then(function(loadData)
    {
        let score = loadData[0]
        
        svg2.append("g")
                .selectAll("path")
                .data(score.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(cprojection)
                    )
                // set the color of each country
                .attr("fill", function (d) 
                {
                    d.total = cdata.get(d.id) || 0;
                    return color(d.total);
                })
                .style("stroke", "#696969")
                .style("stroke-width", "0.5px")
                .attr("class", function(d)  {return "Country" } )
                .style("opacity", 1)
            }
)
