
var width = '800'
var height = '600'
const svg = d3.select("#My_Map")
    .append('svg')
    .attr('width', width)
    .attr('height', height);
//var byear = 2021;
function updateMap(){

    updateallcountry();

    d3.selectAll(".annotation").remove()
    byear = document.getElementById("yearlist").value;
    var radios = document.getElementsByName('maps');
    for (var radio of radios)
    {
        if (radio.checked) 
        {
            mapoption = radio.value;
        }
    }


const path = d3.geoPath();
const projection = d3.geoMercator()
                    .scale(110)
                    .center([10,50])
                    .translate([width/2, height/2]);

const data = new Map();
//const colorScale = d3.scaleSequential(d3.interpolateOranges).domain([0,10]);

if(mapoption == "Happiness_Score"){ var colorScale = d3.scaleSequential(d3.interpolateGnBu).domain([0,8]); }
else if (mapoption == "Economy"){ var colorScale = d3.scaleSequential(d3.interpolateYlOrBr).domain([0,2]); }
else if (mapoption == "Family"){ var colorScale = d3.scaleSequential(d3.interpolateBuGn).domain([0,1.7]); }
else if (mapoption == "Health"){ var colorScale = d3.scaleSequential(d3.interpolateBuPu).domain([0,1.14]); }
else if (mapoption == "Freedom"){ var colorScale = d3.scaleSequential(d3.interpolatePuRd).domain([0,0.8]); }
else if (mapoption == "Trust"){ var colorScale = d3.scaleSequential(d3.interpolateReds).domain([0,0.55]); }
else if (mapoption == "Generosity"){ var colorScale = d3.scaleSequential(d3.interpolateGnBu).domain([0,0.9]); }
//else if (mapoption == "Economy"){ var colorScale = d3.scaleSequential(d3.interpolatePuRd).domain([0,2.1]); }

Promise.all([
                //d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),
                d3.json("https://raw.githubusercontent.com/ShineyAji/D3_Vis/main/data/world.geojson"),
                d3.csv("https://raw.githubusercontent.com/ShineyAji/D3_Vis/main/data/"+byear+".csv", function(d)
                {
                    data.set(d.code, +d[mapoption])
                })
            ])
        .then(function(loadData)
        {
    
            let toscore = loadData[0]
            
            var tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)


            let mouseOver = function(d) 
                {
                
                    var score = "";
                    if (d.path[0].__data__.total == '0')
                        {
                            score = "Not Reported";
                        }
                    else
                        {
                        score = d.path[0].__data__.total;
                        }
                    d3.selectAll(".Country")
                    .transition()
                    .duration(200)
                    .style("opacity", .8)
                    d3.select(this)
                    .transition()
                    .duration(200)
                    .style("opacity", 1)
                    .style("stroke", "black")
                    tooltip
                    .transition()
                    .duration(200)
                    tooltip
                    .style("opacity", 1)
                    .html("<b>" + d.path[0].__data__.properties.name + "</b><br/>" + mapoption + ":" + score)
                    .style("left", (event.pageX) + "px")
                    .style("top", (event.pageY - 28) + "px")
                }
    
            let mouseLeave = function(d) 
            {
                d3.selectAll(".Country")
                .transition()
                .duration(200)
                .style("opacity", 1)
                .style("stroke", "#696969")
                d3.select(this)
                .transition()
                .duration(200)
                .style("stroke", "#696969")
                tooltip
                    .transition()
                    .duration(200)
                    .style("opacity", 0)
            }

    

            svg.append("g")
                .selectAll("path")
                .data(toscore.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                    )
                // set the color of each country
                .attr("fill", function (d) 
                {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "#696969")
                .style("stroke-width", "0.5px")
                .attr("class", function(d)  {return "Country" } )
                .style("opacity", 1)
                .on("mouseover", mouseOver)
                .on("mouseleave", mouseLeave )


                d3.select('#legend')
                .selectAll('mapoption')
                .remove();

            // build the map legend

            //annotation
            const finannotations = [
                {
                    note: { 
                            label: "Finland had been ranked the happiest country in 2021,2020,2019 & 2018",
                            title: "Happiest Country",
                            wrap: 300,
                            padding: 10
                            },
                    color: ["#0B7806"],
                    x: projection([30.444685,64.204453])[0],
                    y: projection([30.444685,64.204453])[1],
                    dy: -130,
                    dx: 50
                    
                }]
            const swisannotations = [
                {
                    note: { 
                            label: "Switzerland had been ranked the happiest country in 2015",
                            title: "Happiest Country",
                            wrap: 300,
                            padding: 10
                            },
                    color: ["#0B7806"],
                    x: projection([9.632932,47.347601])[0],
                    y: projection([9.632932,47.347601])[1],
                    dy: -200,
                    dx: 80
                    
                }]

            const subsahannotations = [
                {
                    note: { 
                            label: "Sub-Saharan Africa countries had the least happiness score from 2015 to 2019",
                            title: "Least Happiest Country",
                            wrap: 300,
                            padding: 10
                            },
                    color: ["#B50404"],
                    x: projection([0.36758,10.191213])[0],
                    y: projection([0.36758,10.191213])[1],
                    dy: 100,
                    dx: -80
                    
                }]
            const denannotations = [
                {
                    note: { 
                            label: "Denmark had been ranked the happiest country in 2016",
                            title: "Happiest Country",
                            wrap: 300,
                            padding: 10
                            },
                    color: ["#0B7806"],
                    x: projection([10.667804,56.081383])[0],
                    y: projection([10.667804,56.081383])[1],
                    dy: -170,
                    dx: 100
                    
                }]
            const norannotations = [
                {
                    note: { 
                            label: "Norway had been ranked the happiest country in 2017",
                            title: "Happiest Country",
                            wrap: 300,
                            padding: 10
                            },
                    color: ["#0B7806"],
                    x: projection([10.527709,64.486038])[0],
                    y: projection([10.527709,64.486038])[1],
                    dy: -140,
                    dx: 100
                    
                }]
            const afgannotations = [
                {
                    note: { 
                            label: "Afghanistan had the least happiness score in 2020 & 2021",
                            title: "Least Happiest Country",
                            wrap: 300,
                            padding: 10
                            },
                    color: ["#B50404"],
                    x: projection([71.498768,35.650563])[0],
                    y: projection([71.498768,35.650563])[1],
                    dy: 130,
                    dx: -200
                    
                }]
            
            const ecoannotations1 = [
                {
                    note: { 
                            label: "Countries in Middle East Region had highest Economy per Capita from 2015 to 2019",
                            title: "Highest Economy Per Capita",
                            wrap: 300,
                            padding: 10
                            },
                    color: ["Green"],
                    x: projection([55.439025,25.439145])[0],
                    y: projection([55.439025,25.439145])[1],
                    dy: -210,
                    dx: 0,
                    
                }]
            const ecoannotations2 = [
                {
                    note: { 
                            label: "Luxembourg had highest Economy per Capita in 2020 & 2021",
                            title: "Highest Economy Per Capita",
                            wrap: 300,
                            padding: 10
                            },
                    color: ["Green"],
                    x: projection([6.242751,49.902226])[0],
                    y: projection([6.242751,49.902226])[1],
                    dy: -210,
                    dx: 50,
                    
                }]

            const subsahecoannotations = [
                {
                    note: { 
                            label: "Countries in Sub-Saharan Africa Region had lowest Economy per Capita",
                            title: "Lowest Economy Per Capita",
                            wrap: 300,
                            padding: 10
                            },
                    color: ["#B50404"],
                    x: projection([0.36758,10.191213])[0],
                    y: projection([0.36758,10.191213])[1],
                    dy: 60,
                    dx: -50
                    
                }]
            const myagenannotations = [
                {
                    note: { 
                            label: "Myanmar,Indonesia & Thailand demonstrate highest generosity scores",
                            title: "Highest Generosity",
                            wrap: 300,
                            padding: 10
                            },
                    color: ["Green"],
                    x: projection([97.777732,14.837286])[0],
                    y: projection([97.777732,14.837286])[1],
                    dy: -290,
                    dx: -1
                    
                }]
            const sinhelannotations = [
                {
                    note: { 
                            label: "Singapore & Hong Kong demonstrate highest health scores",
                            title: "Highest Health Score",
                            wrap: 300,
                            padding: 10
                            },
                    color: ["Green"],
                    x: projection([103.91555786132812,1.4267019064882447])[0],
                    y: projection([103.91555786132812,1.4267019064882447])[1],
                    dy: -320,
                    dx: -1 
                    
                }]

            const subsahhelannotations = [
                {
                    note: { 
                            label: "Countries in Sub-Saharan Africa Region had lowest Health Score",
                            title: "Lowest Health Score",
                            wrap: 300,
                            padding: 10
                            },
                    color: ["#B50404"],
                    x: projection([0.36758,10.191213])[0],
                    y: projection([0.36758,10.191213])[1],
                    dy: 130,
                    dx: -50
                    
                }]

            const uzbfreeannotations = [
                {
                    note: { 
                            label: "Norway & Uzbekistan had highest freedom scores",
                            title: "Highest Freedom Score",
                            wrap: 300,
                            padding: 10
                            },
                    color: ["Green"],
                    x: projection([66.518607,41.994646])[0],
                    y: projection([56.518607,41.994646])[1],
                    dy: -200,
                    dx: 0
                }]
            const norfreeannotations = [
                {
                    note: { 
                            label: "Norway & Uzbekistan had highest freedom scores",
                            title: "Highest Freedom Score",
                            wrap: 300,
                            padding: 10
                            },
                    type: d3.annotationLabel,        
                    color: ["Green"],
                    x: projection([15.52255,80.01608])[0],
                    y: projection([15.52255,80.01608])[1],
                    dy: -25,
                    dx: 90,
                    disable: ["note"]
                }]

            const syrfreeannotations = [
                {
                    note: { 
                            label: "Countries like Angola, Sudan, South Sudan & Syria reported last in the freedom score over years",
                            title: "Least Freedom",
                            wrap: 300,
                            padding: 10
                            },
                    color: ["#B50404"],
                    x: projection([37.066761,35.623036])[0],
                    y: projection([37.066761,35.623036])[1],
                    dy: 100,
                    dx: -150
                }]

            const sudfreeannotations = [
                {
                    note: { 
                            label: "Countries like Angola, Sudan, South Sudan & Syria reported last in the freedom score over years",
                            title: "Least Freedom",
                            wrap: 300,
                            padding: 10
                            },
                    type: d3.annotationLabel,
                    color: ["#B50404"],
                    x: projection([23.805813,14.666319])[0],
                    y: projection([23.805813,14.666319])[1],
                    dy: -10,
                    dx: -20,
                    disable: ["note"]
                }]

            const sintruannotations = [
                {
                    note: { 
                            label: "Singapore had highest trust scores throughout the years. Rwanda from Sub Saharan Africa Region also demonstrate highest trust score ",
                            title: "Highest Trust Score",
                            wrap: 300,
                            padding: 10
                            },
                    color: ["Green"],
                    x: projection([103.91555786132812,1.4267019064882447])[0],
                    y: projection([103.91555786132812,1.4267019064882447])[1],
                    dy: -280,
                    dx: -1
                    
                }]

            const romtruannotations = [
                {
                    note: { 
                            label: "Romania was one of the country which reported low trust scores throughout the years",
                            title: "Lowest Trust Support",
                            wrap: 300,
                            padding: 10
                            },
                    color: ["#B50404"],
                    x: projection([27.558081,45.707462])[0],
                    y: projection([27.558081,45.707462])[1],
                    dy: 30,
                    dx: -160,
            }]


            const icefamannotations = [
                {
                    note: { 
                            label: "Iceland had highest score in Social Support from 2015 to 2021",
                            title: "Highest Social Support",
                            wrap: 300,
                            padding: 10
                            },
                    color: ["Green"],
                    x: projection([-22.762972,63.960179])[0],
                    y: projection([-22.762972,63.960179])[1],
                    dy: -150,
                    dx: 140
                    
                }]

            const benfamannotations = [
                {
                    note: { 
                            label: "Benin, Togo & Syria had the least score in Social Support",
                            title: "Least Social Support",
                            wrap: 300,
                            padding: 10
                            },
                    type: d3.annotationLabel,
                    color: ["#B50404"],
                    x: projection([1.447178,11.547719])[0],
                    y: projection([1.447178,11.547719])[1],
                    dy: 100,
                    dx: -85,
                    disable: ["note"]
                    
                }]

            const syrfamannotations = [
                {
                    note: { 
                            label: "Benin, Togo & Syria had the least score in Social Support",
                            title: "Least Social Support",
                            wrap: 300,
                            padding: 10
                            },
                    color: ["#B50404"],
                    x: projection([35.998403,34.644914])[0],
                    y: projection([35.998403,34.644914])[1],
                    dy: 150,
                    dx: -150
                    
                }]

            const litgenannotations = [
                {
                    note: { 
                            label: "Lithuania was one of the country which reported least generosity score from 2015 to 2018",
                            title: "Least Generosity",
                            wrap: 300,
                            padding: 10
                            },
                    color: ["#B50404"],
                    x: projection([22.201157,55.337802])[0],
                    y: projection([22.201157,55.337802])[1],
                    dy: 200,
                    dx: -100
                    
                }]

            const botgenannotations = [
                {
                    note: { 
                            label: "Botswana started reporting least generosity score from 2018",
                            title: "Least Generosity",
                            wrap: 300,
                            padding: 10
                            },
                    color: ["#B50404"],
                    x: projection([22.824271,-25.500459])[0],
                    y: projection([22.824271,-25.500459])[1],
                    dy: 60,
                    dx: -80
                    
                }]

            const hapscoreannotations = [
                {
                    note: { 
                            label:"Hover over a country to check its Happiness Score",
                            title: "Happiness",
                            wrap: 500
                            },
                    type: d3.annotationLabel,
                    color: ["gray"],
                    x: projection([55.439025,25.439145])[0],
                    y: projection([55.439025,25.439145])[1],
                    dy: 180,
                    dx: 100,
                    disable: ["connector"]
                    
                }]
            

            const ecoannotations = [
                {
                    note: { 
                            label:"Hover over a country to check its Economy Score",
                            title: "Economy",
                            wrap: 500
                            },
                    type: d3.annotationLabel,
                    color: ["gray"],
                    x: projection([55.439025,25.439145])[0],
                    y: projection([55.439025,25.439145])[1],
                    dy: 180,
                    dx: 100,
                    disable: ["connector"]
                    
                }]

            const famannotations = [
                {
                    note: { 
                            label:"Hover over a country to check its Family Score",
                            title: "Family",
                            wrap: 500
                            },
                    type: d3.annotationLabel,
                    color: ["gray"],
                    x: projection([55.439025,25.439145])[0],
                    y: projection([55.439025,25.439145])[1],
                    dy: 180,
                    dx: 100,
                    disable: ["connector"]
                    
                }]

            const freeannotations = [
                {
                    note: { 
                            label:"Hover over a country to check its Freedom Score'",
                            title: "Freedom:",
                            wrap: 500
                            },
                    type: d3.annotationLabel,
                    color: ["gray"],
                    x: projection([55.439025,25.439145])[0],
                    y: projection([55.439025,25.439145])[1],
                    dy: 180,
                    dx: 100,
                    disable: ["connector"]
                    
                }]
            const genannotations = [
                {
                    note: { 
                            label:"Hover over a country to check its Generosity Score",
                            title: "Generosity",
                            wrap: 500
                            },
                    type: d3.annotationLabel,
                    color: ["gray"],
                    x: projection([55.439025,25.439145])[0],
                    y: projection([55.439025,25.439145])[1],
                    dy: 180,
                    dx: 100,
                    disable: ["connector"]
                    
                }]
            const helannotations = [
                {
                    note: { 
                            label:"Hover over a country to check its Health Score",
                            title: "Health",
                            wrap: 500
                            },
                    type: d3.annotationLabel,
                    color: ["gray"],
                    x: projection([55.439025,25.439145])[0],
                    y: projection([55.439025,25.439145])[1],
                    dy: 180,
                    dx: 100,
                    disable: ["connector"]
                    
                }]
            const trustannotations = [
                {
                    note: { 
                            label:"Hover over a country to check its Trust Score",
                            title: "Trust",
                            wrap: 500
                            },
                    type: d3.annotationLabel,
                    color: ["gray"],
                    x: projection([55.439025,25.439145])[0],
                    y: projection([55.439025,25.439145])[1],
                    dy: 180,
                    dx: 100,
                    disable: ["connector"]
                    
                }]

                const finhappy = d3.annotation().annotations(finannotations)
                const swishappy = d3.annotation().annotations(swisannotations)
                const subsahhappy = d3.annotation().annotations(subsahannotations)
                const denhappy = d3.annotation().annotations(denannotations)
                const norhappy = d3.annotation().annotations(norannotations)
                const afghappy = d3.annotation().annotations(afgannotations)
                const mideco = d3.annotation().annotations(ecoannotations1)
                const luxeco = d3.annotation().annotations(ecoannotations2)
                const hapscore = d3.annotation().annotations(hapscoreannotations)
                const ecoscore = d3.annotation().annotations(ecoannotations)
                const subsaheco = d3.annotation().annotations(subsahecoannotations)
                const famscore = d3.annotation().annotations(famannotations)
                const helscore = d3.annotation().annotations(helannotations)
                const genscore = d3.annotation().annotations(genannotations)
                const trustscore = d3.annotation().annotations(trustannotations)
                const freescore = d3.annotation().annotations(freeannotations)
                const myagenscore = d3.annotation().annotations(myagenannotations)
                const icefamscore = d3.annotation().annotations(icefamannotations)
                const syrfamscore = d3.annotation().annotations(syrfamannotations)
                const benfamscore = d3.annotation().annotations(benfamannotations)
                const sinhelscore = d3.annotation().annotations(sinhelannotations)
                const subsahhelscore = d3.annotation().annotations(subsahhelannotations)
                const norfreescore = d3.annotation().annotations(norfreeannotations)
                const uzbfreescore = d3.annotation().annotations(uzbfreeannotations)
                const syrfreescore = d3.annotation().annotations(syrfreeannotations)
                const sudfreescore = d3.annotation().annotations(sudfreeannotations)
                const sintruscore = d3.annotation().annotations(sintruannotations)
                const romtruscore = d3.annotation().annotations(romtruannotations)
                const botgenscore = d3.annotation().annotations(botgenannotations)
                const litgenscore = d3.annotation().annotations(litgenannotations)


                if((byear=='2021'||byear=='2020')&&(mapoption=='Happiness_Score'))
                {
                    svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(finhappy)

                    svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(afghappy)

                    svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(hapscore)
                    
                }
                else if((byear=='2015')&&(mapoption=='Happiness_Score'))
                {
                    svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(swishappy)

                    svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(subsahhappy)

                     svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(hapscore) 
                }
                else if((byear=='2016')&&(mapoption=='Happiness_Score'))
                {
                    svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(denhappy)

                    svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(subsahhappy)

                     svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(hapscore) 
                }
                else if((byear=='2017')&&(mapoption=='Happiness_Score'))
                {
                    svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(norhappy)

                    svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(subsahhappy)

                     svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(hapscore) 
                }
                else if((byear=='2018'||byear=='2019')&&(mapoption=='Happiness_Score'))
                {
                    svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(subsahhappy)

                    svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(finhappy)

                     svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(hapscore) 

                }
                else if((byear=='2015'||byear=='2016'||byear=='2017'||byear=='2018'||byear=='2019')&&(mapoption=='Economy'))
                {
                     svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(ecoscore) 

                    svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(mideco)

                    svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(subsaheco)
                }
                else if((byear=='2020'||byear=='2021')&&(mapoption=='Economy'))
                {
                     svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(ecoscore) 

                    svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(luxeco)

                    svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(subsaheco)
                }
                else if(mapoption=='Family')
                {
                     svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(famscore) 

                    svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(icefamscore)

                    svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(syrfamscore)

                    svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(benfamscore)
                }
                else if(mapoption=='Freedom')
                {
                     svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(freescore) 

                    svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(norfreescore)

                    svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(uzbfreescore)

                    svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(syrfreescore)

                    svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(sudfreescore)
                }
                else if(mapoption=='Health')
                {
                     svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(helscore) 

                    svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(sinhelscore)

                    svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(subsahhelscore)
                }
                else if(mapoption=='Trust')
                {
                     svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(trustscore) 

                    svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(sintruscore)

                    svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(romtruscore)

                }
                else if((byear=='2015'||byear=='2016'||byear=='2017'||byear=='2018')&&(mapoption=='Generosity'))
                {
                     svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(genscore) 

                    svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(myagenscore)

                    svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(litgenscore)
                }
                else if((byear=='2019'||byear=='2020'||byear=='2021')&&(mapoption=='Generosity'))
                {
                     svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(genscore) 

                    svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(myagenscore)

                    svg.append("g")
                    .style("opacity",1)
                    .attr("id","annotation")
                    .style("font-size", 15)
                    .call(botgenscore)
                }
        }
)
}                   

