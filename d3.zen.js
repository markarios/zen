d3.zen = {};
d3.zen.forceChart = function module(){
	// INSTRUCTIONS
	// var chart = d3.x.forceChart();
	// d3.select(".vis").datum(dataset)
	// 	.call(chart);
	var margin = {top: 80,right:80, bottom: 80, left:80},
	width = 640,
	height = 640,
	radius = 4,
	svg,
	svgBackgroundColor,
	colorScale = d3.scale.category20(),
	chartClass = "chart",
	containerClass = "container",
	linkDistance = [10],
	charge = [-20],
	gradient = true;

	function exports(_selection){
		_selection.each(function(_data){
			var chartW = width - margin.left - margin.right,
					chartH = height - margin.top - margin.bottom;
			if(!svg){
				svg = d3.select(this)
					.append("svg")
					.classed(chartClass,true)
					.style("background-color",function(svgBackgroundColor){
						if(!svgBackgroundColor){return "none"} 
							else 
						{return svgBackgroundColor}});
				var container = svg.append("g")
					.classed(containerClass,true)
				if(gradient){

					var fill = d3.zen.gradients();

					d3.select(this).select("svg")
						.datum(colorScale.range())
						.call(fill);
				}
			}
			svg.attr({ width: width, height: height})
			// add linkStrength(0.1), between [0,1], can be a function
			// add friction(.9), 1 frictionless, 0 freeses all particles, value outside of [0,1] are not recommended
			// add gravity(.1), can be zero, but if zero bound nodes from escaping the layout
			// add theta(0.8), determines the accuracy of the Barnes-Hut approximation
			// add alpha(0.1)
			// add chargeDistance (max distance at which force is applied, default Infinity, a finite number improves performance)
			// linkDistance, can be a function
			// charge, can be a function (negative: respulsion, postive:attraction)
			// nodes can be symbols are images
			// edges can be any dom element as well, like nodes
			svg.select("\." + containerClass).attr("transform","translate(" + margin.left + "," + margin.top + " )");
			var force = d3.layout.force()
				.nodes(_data.nodes)
				.links(_data.edges) 
				.size([ chartW, chartH])
				.linkDistance(linkDistance)
				.charge(charge)
				.start();
			var edges = container.selectAll("line")
				.data(_data.edges)
				.enter()
				.append("line")
				.classed("edges",true)
				.style("stroke","#CCC")
				.style("stroke-width",1);
			var nodes = container.selectAll("circle")
				.data(_data.nodes)
				.enter()
				.append("circle")
				.attr("r",radius)
				.style("fill",function(d,i){
					if(gradient) return "url(" + colorScale(i) + ")";
					return colorScale(i);
				})
				.call(force.drag);
			force.on("tick",function(){
				edges.attr("x1",function(d){return d.source.x;})
						.attr("y1",function(d){return d.source.y;})
						.attr("x2",function(d){return d.target.x;})
						.attr("y2",function(d){return d.target.y;})
				nodes.attr("cx",function(d){return d.x})
						 .attr("cy",function(d){return d.y});
			});
		})
	}
	exports.width = function(_) {
		if(!arguments.length) return width;
		width = _;
		return this;
	};
	exports.height = function(_) {
		if(!arguments.length) return height;
		height = _;
		return this;
	}
	exports.svgBackgroundColor = function(_) {
		if(!arguments.length) return svgBackgroundColor;
		svgBackgroundColor = _;
		return this;
	}
	exports.colorScale = function(_) {
		if(!arguments.length) return colorScale;
		colorScale = _;
		return this;
	}
	exports.margin = function(_) {
		if(!arguments.length) return margin;
		margin = _;
		return this;
	}
	exports.chartClass = function(_) {
		if(!arguments.length) return chartClass;
		chartClass = _;
		return this;
	}
	exports.containerClass = function(_) {
		 if(!arguments.length) return containerClass;
		 containerClass = _;
		 return this;
	}
	exports.linkDistance = function(_) {
		 if(!arguments.length) return linkDistance;
		 linkDistance = _;
		 return this;
	}
	exports.charge = function(_) {
		if(!arguments.length) return charge;
		charge  = _;
		return this;
	}
	exports.radius = function(_) {
		if(!arguments.length) return radius;
		radius = _;
		return this;
	}
	exports.gradient = function(_){
		if(!arguments.length) return gradient;
		gradient = _;
		return this;
	}
	return exports;
}
d3.zen.gradients = function module(){
   var defs;
   var stops = [ {opacity: 0, offset: "0"}, {opacity: .5, offset: "50%"}, {opacity: 1, offset: "100%"}];
   function exports(_selection){
     _selection.each(function(_data){
           if(!defs){
            defs = d3.select(this)
              .append("defs");
           }
           defs.selectAll("radialGradient")
             .data(_data)
             .enter()
             .append("radialGradient")
             .attr("id",function(d){return d.substring(1,Infinity);})
             .attr({"cx":"20%", "cy": "20%", "r":"100%", "fx":"30%", "fy":"30%"})
            .selectAll("stop")
             .data(stops)
             .enter()
             .append("stop")
             .attr("stop-color",function(d,i){ 
               if(i == 0) return "white";
               if(i == 2) return "black"
               return "#" + this.parentNode.id;})
             .attr("offset",function(d){return d.offset;});
         }
       )
   }
   return exports;
 }
 d3.zen.linearForceData = function (_array) {
   var forceData = {};
   var nodeArray = [],
       edgesArray = [];
   var s,t;
   for(i = 0; i < _array.length; i++){
     var o = { name: _array[i] }
     nodeArray.push(o)
   }
   for(i = 0; i < _array.length - 1; i++){
   	 s = i;
   	 t = i + 1;
     o = {source: s, target: t};
     edgesArray.push(o);
   }
   forceData.edges = edgesArray;
   forceData.nodes = nodeArray;

   console.log(forceData);

  
   return forceData
}

