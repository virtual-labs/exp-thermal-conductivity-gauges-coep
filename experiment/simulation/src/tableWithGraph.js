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
     graph1();
      graph2();
     
		
}

function graph1(){
	var xdata=[];
	var ydata=[];
	
	var graphData1=[];
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




Highcharts.chart('table-design', {
				title: {
					text: ' Pressure V/S Resistance  '
				},
				subtitle: {
					text: ''
				},
				 tooltip: {
			            formatter: function() {
			                return 'Pressure : '+ this.x+'</b><br/>Resistance : '+ this.y+'</b><br/>';
			                   
			            }
			        },
				xAxis: {
					min:Xmin ,
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
				series: [
					{
						type: 'scatter',
//						name: 'Standard value',
						data: [[Xmin,Ymin], [Xmax, Ymax]],
						
						marker: {
							enabled: false
						},
						states: {
							hover: {
								lineWidth: 0
							}
						},
						enableMouseTracking: false
					},

					{
						type: 'line',
						name: 'Observation value',
//						color:"green",
						data: graphData1,
						marker: {
							radius: 4
						}
					}]

			});


	}	
		
		
		function graph2(){
	var xdata=[];
	var ydata=[];
	
	var graphData1=[];
	for (var i = 0; i < masterJson.demo1.length; i++)
	 {
		xdata[i] = parseFloat(masterJson.demo1[i].pressure1Sort);
		ydata[i] = parseFloat(masterJson.demo1[i].resistance1);
		
	}
	for (var j = 0; j < masterJson.demo1.length; j++) {
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
		
		console.log("Xmin "+Xmin);
		console.log("Ymax "+Ymin);
		
//		var maxPoint=0;
//		if(Xmax<Ymax)
//		{
//			maxPoint=Ymax;
//		}
//		else
//		{
//			maxPoint=Xmax;
//		}
//		console.log(" Weight V/S Pressure  " + graphData1);
//		Highcharts.chart('graph2', {
//			title: {
//				text: ' Pressure V/S Output Voltage  '
//			},
////			subtitle: {
////				text: 'Meter Constant is  pulses (per/ltr)'
////			},
//			xAxis: {
//				min: Xmin,
//				max: Xmax,
//				title: {
//					text: 'Pressure'
//				}
//			},
//			yAxis: {
//				min: Ymin,
//				max: Ymax,
//				title: {
//					text: 'Output Voltage'
//				}
//			},
//			series: [
//				{
//					type: 'line',
//					name: 'Standard value',
//					data: [[Xmin, Ymin], [Xmax, Ymax]],
//					marker: {
//						enabled: false
//					},
//					states: {
//						hover: {
//							lineWidth: 0
//						}
//					},
//					enableMouseTracking: false
//				},
//
//				{
//					type: 'scatter',
//					name: 'Observation value',
//
//					data: graphData1,
//					marker: {
//						radius: 4
//					}
//				}]
//
//		});
		
		Highcharts.chart('graph2', {
				title: {
					text: ' Pressure V/S Resistance  '
				},
				subtitle: {
					text: ''
				},
				 tooltip: {
			            formatter: function() {
			                return 'Pressure : '+ this.x+'</b><br/>Resistance : '+ this.y+'</b><br/>';
			                   
			            }
			        },
				xAxis: {
					min:Xmin ,
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
				series: [
/*					{
						type: 'line',
//						name: 'Standard value',
						data: [[Xmax, Ymax], [Xmin,Ymin]],
						
						marker: {
							radius: 4
						},
					},
*/
					{
						type: 'scatter',
						name: 'Observation value',
//						color:"green",
//                        data: [[Xmin,Ymin], [Xmax, Ymax]],
						data: graphData1,
						marker: {
							radius: 4
						}
					}]

			});
		
}