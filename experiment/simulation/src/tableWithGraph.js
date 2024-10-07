var yMinDta1,yMaxDta1;
var yMinDta2,yMaxDta2;

function tableGraph()
{
	$("#main-div-conf").html('');	
    $("#canvas-div").html('');    
     $("#table-design").html('');
     
      $("#centerText2").html('STANDARD CALCULATIONS');
      $("#centerText1").html('ACTUAL READINGS');
      
//      digiTable();
      $("#main-div-conf").html(tableMainDiv);
      $("#canvas-div").html(tableMainDiv1);
      $("#calibrateLevel").prop("hidden",false);
     graph1();
      graph2();
     
		$("#calibrateLevel").click(function(){
			calibrate();
		});
}
var graphData1=[];
function graph1(){
	var xdata=[];
	var ydata=[];
	
	
	for (var i = 0; i < masterJson.demo.length; i++)
	 {
		xdata[i] = parseFloat(masterJson.demo[i].pressureSort);
		ydata[i] = parseFloat(masterJson.demo[i].resistance);
		
	}
	for (var j = 0; j < masterJson.demo.length; j++) {
			tempArr = [];
			tempArr[0] = xdata[j];
			tempArr[1] = ydata[j];
			graphData1.push(tempArr);

	}
		console.log("xdata "+xdata);
		console.log("ydata "+ydata);
		console.log("graphData1 "+graphData1);
		ydata.sort(function(a, b) { return a - b });
		xdata.sort(function(a, b) { return a - b });
		console.log("After xdata "+xdata);
		console.log("After ydata "+ydata);
		Xmax = parseFloat(xdata[xdata.length - 1]);
		Ymax = parseFloat(ydata[ydata.length - 1]);
		console.log("Xmax "+Xmax);
		console.log("Ymax "+Ymax);
		
		Xmin = parseFloat(xdata[0]);
		Ymin = parseFloat(ydata[0]);

           yMinDta1 =Ymin;
          yMaxDta1=Ymax;

Highcharts.chart('table-design', {
	
	exporting: { enabled: false },
				credits: { enabled: false},
	
    chart: {
        type: 'line'
    },
    title: {
        text: 'Pressure v/s Resistance'
    },
    xAxis: {
        min: Xmin,
        max: Xmax,
        title: {
            text: 'Pressure'
        }
    },
    yAxis: {
        min: Ymin,
        max: Ymax,
        title: {
            text: 'Resistance'
        }
    },
    
    tooltip: {
					headerFormat: '<span >Pressure: {point.key}</span><table>',
					pointFormat: '<tr><td style="color:{series.color};padding:0">Resistance: </td>' +
						'<td style="padding:0"><b>{point.y:.4f} </b></td></tr>',
					footerFormat: '</table>',
					shared: true,
					useHTML: true
				},
    
    plotOptions: {
        line: {
            dataLabels: {
                enabled: false
            },
            enableMouseTracking: false
        }
    },
    series: [{
        type: 'line',
        name: 'Standard',
        data: graphData1,
        showInLegend: false // Hide the legend for Standard
    }, 
    {
        marker: {
            symbol: 'square'
        },
        type: 'scatter',
        name: 'Actual',
        data: graphData1,
        showInLegend: false // Hide the legend for Actual
    }]
});


//Highcharts.chart('table-design', {
//
//    title: {
//        text: 'Pressure V/S Resistance'
//    },
//
//    xAxis: {
////        tickInterval: Xmin,
//        type: 'logarithmic',
//        accessibility: {
//            rangeDescription: 'Range: '+Xmin+' to '+Xmax
//        }
//    },
//
//    yAxis: {
//        type: 'logarithmic',
////        minorTickInterval: Ymin,
//        accessibility: {
//            rangeDescription: 'Range: '+Ymin+' to '+Ymax
//        }
//    },
//
//    tooltip: {
//        headerFormat: '<b>{series.name}</b><br />',
//        pointFormat: 'x = {point.x}, y = {point.y}'
//    },
//
//    series: [{
//       data: graphData1,
//        pointStart: 1
//    }]
//});



//Highcharts.chart('table-design', {
//				title: {
//					text: ' Pressure V/S Resistance  '
//				},
//				subtitle: {
//					text: ''
//				},
//				 tooltip: {
//			            formatter: function() {
//			                return 'Pressure : '+ this.x+'</b><br/>Resistance : '+ this.y+'</b><br/>';
//			                   
//			            }
//			        },
//				xAxis: {
//					min:Xmin ,
//					max: Xmax,
//					title: {
//						text: 'Pressure'
//					}
//				},
//				yAxis: {
//					min: Ymin,
//					max: Ymax,
//					title: {
//						text: 'Resistance'
//					}
//				},
//				series: [
//					{
//						type: 'line',
////						name: 'Standard value',
//						data: [[Xmin,Ymin], [Xmax, Ymax]],
//						
//						marker: {
//							enabled: false
//						},
//						states: {
//							hover: {
//								lineWidth: 0
//							}
//						},
//						enableMouseTracking: false
//					},
//
//					{
//						type: 'scatter',
//						name: 'Observation value',
////						color:"green",
//						data: graphData1,
//						marker: {
//							radius: 4
//						}
//					}]
//
//			});


	}	
		
		var graphData2=[];
		var xAdjustGraph = [];
		function graph2(){
			graphData2=[];
	var xdata=[];
	var ydata=[];
	
	var x1data = [];
	var y1data = [];
	
	
	
	for (var i = 0; i < masterJson.demo1.length; i++)
	 {
		xdata[i] = parseFloat(masterJson.demo1[i].pressure1Sort);		
		ydata[i] = parseFloat(masterJson.demo1[i].resistance1);
		
	}
	
	for (var j = 0; j < masterJson.demo1.length; j++) {
			tempArr = [];
			tempArr[0] = xdata[j];
			tempArr[1] = ydata[j];
			graphData2.push(tempArr);
	}
	
	for (var i = 0; i < masterJson.demo1.length; i++){
		
	x1data[i] = parseFloat(masterJson.demo1[i].pressure1Sort);
	y1data[i] = parseFloat(masterJson.demo1[i].calResis);
	}
	
	for (var j = 0; j < masterJson.demo1.length; j++) {
			tempArr = [];
			tempArr[0] = x1data[j];
			tempArr[1] = y1data[j];
			xAdjustGraph.push(tempArr);

	}
	
		console.log("xdata "+xdata);
		console.log("ydata "+ydata);
		console.log("observation graph values"+graphData2);
		x1data.sort(function(a, b) { return a - b });
		y1data.sort(function(a, b) { return a - b });
		
		ydata.sort(function(a, b) { return a - b });
		xdata.sort(function(a, b) { return a - b });
		
		console.log("After xdata "+xdata);
		console.log("After ydata "+ydata);
		Xmax = parseFloat(xdata[xdata.length - 1]);
		Ymax = parseFloat(ydata[ydata.length - 1]);
		
		X1max = parseFloat(x1data[x1data.length - 1]);
		X1min = parseFloat(x1data[0]);
		
		console.log("X1max "+X1max);
		
		console.log("Xmax "+Xmax);
		console.log("Ymax "+Ymax);
		
		Xmin = parseFloat(xdata[0]);
		Ymin = parseFloat(ydata[0]);
		
		
		yMinDta2 =Ymin;
          yMaxDta2=Ymax;

if(yMinDta1>yMinDta2){
	Ymin = yMinDta2;
}else{
	Ymin = yMinDta1;
}
if(yMaxDta1<yMaxDta2){
	Ymax = yMaxDta2;
}else{
	Ymax = yMaxDta1;
}
console.log("graphData1 "+graphData1);
console.log("graphData2 "+graphData2);


			Highcharts.chart('graph2', {
				
				legend: {
//				    symbolPadding: 0,
//				    symbolWidth: 0,
//				    symbolHeight: 0,
//				    squareSymbol: false,
//				    enabled: false 
				  },
				exporting: { enabled: false },
				credits: { enabled: false},
				
    chart: {
        type: 'line'
    },
    title: {
        text: 'Pressure v/s Resistance'
    },
    
    xAxis:
     {

 				min:X1min ,
				max: X1max,
      title: {
            text: 'Pressure'
        }
    },
    subtitle: {
					text: ''
				},
    yAxis: {min:Ymin ,
				max: Ymax,
        title: {
            text: 'Resistance'
        }
    },
    tooltip: {
					headerFormat: '<span >Pressure: {point.key}</span><table>',
					pointFormat: '<tr><td style="color:{series.color};padding:0">Resistance: </td>' +
						'<td style="padding:0"><b>{point.y:.4f} </b></td></tr>',
					footerFormat: '</table>',
					shared: true,
					useHTML: true
				},
    plotOptions: {
        line: {
            dataLabels: {
                enabled: false
            },
            enableMouseTracking: false
        }
    },
    series: [{
	type: 'line',
   
        name: 'Standard',
        data: graphData1
     
    }, 
    
    {
    marker: {
        symbol: 'square'
    },
     type: 'scatter',
        name: 'Actual',
        data: graphData2
    }]
});

		
}