function result(){
	
	$("#btnForModal").prop("hidden",true);
	$("#main-div-conf").html("");
    			     $("#canvas-div").html("");
				     
				     $("#sub-main-div1").html('');
				     $("#sub-main-div2").html('');
				     
				     	
				     $("#centerText1").html('');
				     $("#centerText2").html('');
	
	
//	counterMasterJson = {
//    "questionary": {
//        "correctAnswer": 6,
//        "wrongAnswer": 0
//    },
//    "buildWheatStone": {
//        "inValidConnection": 0
//    },
//    "standardCalculations": {
//        "calResistance": 1,
//        "calOutput": 0
//    },
//    "calibration": {
//        "zeroCalibrationForMinusWrong": 23,
//        "spanCalibrationForMinusWrong": 0,
//        "zeroCalibrationForAgainMinus": 59,
//        "zeroCalibrationForWrongPlus": 0,
//        "spanCalibrationForWrongPlus": 59,
//        "zeroCalibrationForAgainPlus": 0,
//        "zeroAnswer": -0.0022,
//        "spanAnswer": 0.0036,
//        "zeroWrong": 1,
//        "spanWrong": 1
//    }
//}
	
	var ansZero = 0;
	var ansZero1 = 0;
	var ansSpan1 = 0;
	
	if(counterMasterJson.calibration.zeroAnswer>0){
		ansZero = counterMasterJson.calibration.zeroAnswer*10000;
	}else{
		
		ansZero = -(counterMasterJson.calibration.zeroAnswer*10000);
	}
	 console.log(ansZero);
	 
	var ansSpan = 0;
	
	if(counterMasterJson.calibration.spanAnswer>0){
		ansSpan = counterMasterJson.calibration.spanAnswer*10000;
	}else{
		ansSpan = -(counterMasterJson.calibration.spanAnswer*10000);
	}
	
	
		ansZero1 = counterMasterJson.calibration.zeroAnswer*10000;
	
		ansSpan1 = counterMasterJson.calibration.spanAnswer*10000;
	
	
	console.log(ansZero);
	console.log(ansSpan);
	var totSpanNew = 0;
	
	if(ansZero1<0 && ansSpan1<0 || ansZero1>0 && ansSpan1>0){
		 if(ansSpan>ansZero){
		totSpanNew = parseInt(ansSpan)-parseInt(ansZero)-3;
		}else{
		totSpanNew = parseInt(ansZero)-parseInt(ansSpan)-3;	
		}
	}
	
	if(ansZero1>0 && ansSpan1<0 || ansZero1<0 && ansSpan1>0){
		 if(ansSpan>ansZero){
		totSpanNew = parseInt(ansSpan)+parseInt(ansZero)+3;
		}else{
		totSpanNew = parseInt(ansZero)+parseInt(ansSpan)+3;	
		}
	}
	
	if(ansZero1==ansSpan1){
		totSpanNew = 2;	
	}
	
	if(totSpanNew<=0){
		totSpanNew=2;
	}
	
	
	var zeroCalib1 = ansZero/((parseInt(counterMasterJson.calibration.zeroCalibrationForMinusWrong)+parseInt(counterMasterJson.calibration.zeroCalibrationForWrongPlus))+ansZero);
	var zeroCalibPer =   (zeroCalib1*100).toFixed(1);
	    zeroCalibPer = parseFloat(zeroCalibPer);      
	
	
	var spanCalib1 = ansSpan/((parseInt(counterMasterJson.calibration.spanCalibrationForMinusWrong)+parseInt(counterMasterJson.calibration.spanCalibrationForWrongPlus))+ansSpan);
	var spanCalibPer =   (spanCalib1*100).toFixed(1);
	    spanCalibPer = parseFloat(spanCalibPer);  
	console.log(spanCalibPer);
	console.log(zeroCalibPer);
	
	
var correctVal = (counterMasterJson.questionary.correctAnswer/6).toFixed(2);
var quesPercent = (correctVal*100).toFixed(1);
quesPercent = parseFloat(quesPercent);

console.log("quesPercent : "+quesPercent);

    var wheatStone = ((1/(counterMasterJson.constLib.invalidCnt+1))*100).toFixed(1);
	wheatStone = parseFloat(wheatStone);
	console.log(wheatStone);
	
	var piCal1 = parseInt(counterMasterJson.standardCalculations.calResistance)+parseInt(counterMasterJson.standardCalculations.calOutput);
	var piCal = ((10/(piCal1+10))*100).toFixed(1);
	piCal = parseFloat(piCal);
	console.log(piCal);
	
	var zeroCal = (1/(counterMasterJson.calibration.zeroWrong+1)*100).toFixed(1);
	zeroCal = parseFloat(zeroCal);
	console.log(zeroCal);
	
	var spanCal = (1/(counterMasterJson.calibration.spanWrong+1)*100).toFixed(1);
	spanCal = parseFloat(spanCal);
	console.log(spanCal);
	
	var zeroPercentCal = parseFloat(zeroCalibPer)+parseFloat(zeroCal);
	zeroPercentCal = zeroPercentCal.toFixed(1);
	zeroPercentCal = parseFloat(zeroPercentCal);
	console.log(zeroPercentCal);
	
	var spanPercentCal = parseFloat(spanCalibPer)+parseFloat(spanCal);
	spanPercentCal = spanPercentCal.toFixed(1);
	spanPercentCal = parseFloat(spanPercentCal);
	console.log("spanPercentCal :b "+spanPercentCal);
	
	if(spanPercentCal>100){
		spanPercentCal=100;
	}else{
		spanPercentCal = spanPercentCal;
	}
	
	console.log("spanPercentCal :a "+spanPercentCal);
	
	
	
	
	var totZero = parseInt(counterMasterJson.calibration.zeroCalibrationForMinusWrong)+parseInt(counterMasterJson.calibration.zeroCalibrationForWrongPlus);
	var totSpan = parseInt(counterMasterJson.calibration.spanCalibrationForMinusWrong)+parseInt(counterMasterJson.calibration.spanCalibrationForWrongPlus);
	
	var calPercent = ((totZero+totSpan)/2).toFixed(2);
	calPercent = parseFloat(calPercent);
	
	
var htm = ''
	+ '<div class="container-fluid">'
//	+ '  <div class="row">'
//	+ '<div class="col-md-1">'
//	+ ' <div class="panel panel-danger headingPanel" >'
//	+ ' <div class="panel-body" id="panelbody"><center><span class="heading1"><b> STANDARD CONFIGURATION </b></span></center></div>'
//	+ '</div>'
	+ '</div>'

	+ '<div class="col-md-12">'
	+ ' <div class="panel remarkBground" >'
	+ ' <div class="panel-body remark" ><center>Congratulations!!! <br> <b>Pirani meter gauge experiment is completed successfully!!</b>'
//	+ '<br> <b>Satisfactory performance</b></center></div>'
	+ '</div>'
	+ '</div>'


    +'<div class="container-fluid">'
		+'  <div class="row">'
		+'<div class="col-md-4">'
	
		 +'<br><table class="table table-bordered ">'
		   +'  <thead class="thead-dark">'
		   +'    <tr class="">'
		   +'      <th><center class="">COMPETENCY (PIRANI METER GAUGE)</center></th>'
		   +'     <th><center class="">STATUS</center></th>'
		   +'    </tr>'
		   +' </thead>'
		   +'  <tbody>'
		   +'   <tr>'
		   +'     <td class=""><center>Basic Knowledge</center></td>'
		   if(quesPercent>=60){ 
		   
		   htm +='     <td class=""><center class="attained"> Attained</center></td>'
		   }else{
			htm +='     <td class=""><center class="NotAttained"> Not Attained</center></td>'
		}
		  htm +='  </tr>'
		   +'  <tr>'
		   +'     <td class=""><center>Construct wheatstone bridge circuit</center></td>'
		   if(wheatStone>=60){
		   htm +='     <td class=""><center class="attained"> Attained</center></td>'
		   }else{
		   htm +='     <td class=""><center class="NotAttained"> Not Attained</center></td>'
		}
		  htm +=' </tr>'
		   +'   <tr>'
		  +'     <td class=""><center>Standard Calculations</center></td>'
		  if(piCal>=60){
		   htm += '     <td class=""><center class="attained">Attained</center></td>'
		  }else{
		   htm	+= '     <td class=""><center class="NotAttained">Not Attained</center></td>'
		}
		   htm +='  </tr>'
		   
		   +'  <tr>'
		+'<td class=""><center>Actual Calculations</center></td>'
		   +'<td class=""><center class="attained">Attained</center></td>'
		   +' </tr>'
		   +'<tr>'
		  +' <td class=""><center>Observation</center></td>'
		   +'<td class=""><center class="attained"> Attained</center></td>'
		  
		   +'  </tr>'
		   
		    
		   +'<tr>'
		  +' <td class=""><center>Calibration</center></td>'
		   if(calPercent>=60){
		  htm +='<td class=""><center class="attained"> Attained</center></td>'
		  }else{
		  htm += '<td class=""><center class="NotAttained"> Not Attained</center></td>'
		}
		   htm +='  </tr>'
			
		   +' </tbody>'
		  +' </table>'
		  
		+' </div>'
		+'<div class="col-md-4" id="graph-div" >'

		+' </div>'
		
		+'<div class="col-md-4">'
		+' <div class="panel panel-danger headingPanel" style = "margin-top:80px;">'
		+' <div class="panel-body" id="panelbody">'
		+'<center><span class="heading1"><b>BASIC KNOWLEDGE </b></span></center>'		
		+'</div>'
		+'</div>'
		
		+'<div class="col-md-6">'
		+' <div class="panel panel-danger " style="    margin-bottom: 28px;margin-top:4px;">'
		+'<center><span class="valueBox">Total Questions</span></center>'
		+' <div class="panel-body counterPanelRed">'
		+'<center><span class="valueBox">6</span></center>'
		+' </div>'		
		+'</div>'		
		+' </div>'
		
		+'<div class="col-md-6">'
		+' <div class="panel panel-danger " style="    margin-bottom: 28px;margin-top:4px;">'
		+'<center><span class="valueBox">Correct Answers</span></center>'
		+' <div class="panel-body counterPanelGreen">'
		+'<center><span class="valueBox">'+counterMasterJson.questionary.correctAnswer+'</span></center>'
		+' </div>'		
		+'</div>'		
		+' </div>'
		
		
		+' </div>'//closing of col 4
      
//       +' <div class="row">'
//		
//       +'<div class="col-md-8">'
//       +' </div>'
//       
//      
//      
//      
       +' </div>'
//        +' </div>'
//         +' </div>'
//         
//        
        +' <div class="row">'
		+'<div class="col-md-12">'
		+'<div class="col-md-4">'
		+' <div class="panel panel-danger headingPanel" >'
		+' <div class="panel-body" id="panelbody">'
		+'<center><span class="heading1"><b>WHEATSTONE CONSTRUCTION</b></span></center>'
		+'</div>'
		+'</div>'
		
		
		+'<div class="col-md-6">'
		+' <div class="panel panel-danger  " style="    margin-bottom: 28px;margin-top:4px;">'
		+'<center><span class="valueBox">Wrong Attempts</span></center>'
		+' <div class="panel-body counterPanelRed">'

		+'<center><span class="valueBox"><b>'+counterMasterJson.constLib.invalidCnt+'</b></span></center>'
		+'</div>'
		+'</div>'
//		+'<span class="heading1">4 </span>'
		+'</div>'
		
		+'<div class="col-md-6">'
		+' <div class="panel panel-danger " style="    margin-bottom: 28px;margin-top:4px;">'
		+'<center><span class="valueBox">Correct Attempt</span></center>'
		+' <div class="panel-body counterPanelGreen">'

		+'<center><span class="valueBox"><b>1</b></span></center>'
		+'</div>'
		+'</div>'
//		+'<span class="heading1">1 </span>'
		+'</div>'
		
		
		
		
		+'</div>'
//
		+'<div class="col-sm-4">'
		+' <div class="panel panel-danger headingPanel">'
		+' <div class="panel-body" id="panelbody"><center><span class="heading1"><b>STANDARD CALCULATIONS</b></span></center></div>'
		+'</div>'
		
		+'<div class="col-sm-6">'
		+' <div class="panel panel-danger  " style="    margin-bottom: 28px;margin-top:4px;">'
		+'<center><span class="valueBox">Wrong Attempts</span></center>'
		+' <div class="panel-body counterPanelRed">'

		+'<center><span class="valueBox"><b>'+piCal1+'</b></span></center>'
		+'</div>'
		+'</div>'
      
		+'</div>'
		
		+'<div class="col-sm-6">'
		+' <div class="panel panel-danger " style="    margin-bottom: 28px;margin-top:4px;">'
		+'<center><span class="valueBox">Correct Attempts</span></center>'
		+' <div class="panel-body counterPanelGreen">'

		+'<center><span class="valueBox"><b>10</b></span></center>'
		+'</div>'
		+'</div>'

		+'</div>'
		
		
		+' </div>'
		+'<div class="col-sm-4">'
		+' <div class="panel panel-danger headingPanel" >'
		+' <div class="panel-body" id="panelbody"><center><span class="heading1"><b>ZERO CALCULATE</b></span></center></div>'
		+'</div>'
		
		+'<div class="col-sm-6">'
		+' <div class="panel panel-danger  " style="    margin-bottom: 28px;margin-top:4px;">'
		+'<center><span class="valueBox">Wrong Attempts</span></center>'
		+' <div class="panel-body counterPanelRed">'

		+'<center><span class="valueBox"><b>'+counterMasterJson.calibration.zeroWrong+'</b></span></center>'
		+'</div>'
		+'</div>'
		+'</div>'
		
		+'<div class="col-sm-6">'
		+' <div class="panel panel-danger " style="    margin-bottom: 28px;margin-top:4px;">'
		+'<center><span class="valueBox">Correct Attempts </span></center>'
		+' <div class="panel-body counterPanelGreen">'

		+'<center><span class="valueBox"><b>1</b></span></center>'
		+'</div>'
		+'</div>'

		+'</div>'
		
		+' </div>'
		+' </div>'
		+' </div>'
		
		
		
		 +' <div class="row">'
		+'<div class="col-md-12">'
		+'<div class="col-md-4">'
		+' <div class="panel panel-danger headingPanel" >'
		+' <div class="panel-body" id="panelbody">'
		+'<center><span class="heading1"><b>SPAN CALCULATE</b></span></center>'
		+'</div>'
		+'</div>'
		
		
		+'<div class="col-md-6">'
		+' <div class="panel panel-danger  " style="    margin-bottom: 28px;margin-top:4px;">'
		+'<center><span class="valueBox">Wrong Attempts</span></center>'
		+' <div class="panel-body counterPanelRed">'

		+'<center><span class="valueBox"><b>'+counterMasterJson.calibration.spanWrong+'</b></span></center>'
		+'</div>'
		+'</div>'
//		+'<span class="heading1">4 </span>'
		+'</div>'
		
		+'<div class="col-md-6">'
		+' <div class="panel panel-danger " style="    margin-bottom: 28px;margin-top:4px;">'
		+'<center><span class="valueBox">Correct Attempt</span></center>'
		+' <div class="panel-body counterPanelGreen">'

		+'<center><span class="valueBox"><b>1</b></span></center>'
		+'</div>'
		+'</div>'
//		+'<span class="heading1">1 </span>'
		+'</div>'
		
		
		
		
		+'</div>'
//
		+'<div class="col-sm-4">'
		+' <div class="panel panel-danger headingPanel">'
		+' <div class="panel-body" id="panelbody"><center><span class="heading1"><b>ZERO CALIBRATE</b></span></center></div>'
		+'</div>'
		
		+'<div class="col-sm-6">'
		+' <div class="panel panel-danger  " style="    margin-bottom: 28px;margin-top:4px;">'
		+'<center><span class="valueBox">Total Attempts</span></center>'
		+' <div class="panel-body counterPanelRed">'

		+'<center><span class="valueBox"><b>'+totZero+'</b></span></center>'
		+'</div>'
		+'</div>'
      
		+'</div>'
		
		+'<div class="col-sm-6">'
		+' <div class="panel panel-danger " style="    margin-bottom: 28px;margin-top:4px;">'
		+'<center><span class="valueBox">Correct Attempts</span></center>'
		+' <div class="panel-body counterPanelGreen">'

		+'<center><span class="valueBox"><b>'+(parseInt(ansZero)+parseInt(1))+'</b></span></center>'
		+'</div>'
		+'</div>'

		+'</div>'
		
		
		+' </div>'
		+'<div class="col-sm-4">'
		+' <div class="panel panel-danger headingPanel" >'
		+' <div class="panel-body" id="panelbody"><center><span class="heading1"><b>SPAN CALIBRATE</b></span></center></div>'
		+'</div>'
		
		+'<div class="col-sm-6">'
		+' <div class="panel panel-danger  " style="    margin-bottom: 28px;margin-top:4px;">'
		+'<center><span class="valueBox">Total Attempts</span></center>'
		+' <div class="panel-body counterPanelRed">'

		+'<center><span class="valueBox"><b>'+(parseInt(totSpan)+parseInt(2))+'</b></span></center>'
		+'</div>'
		+'</div>'
		+'</div>'
		
		+'<div class="col-sm-6">'
		+' <div class="panel panel-danger " style="    margin-bottom: 28px;margin-top:4px;">'
		+'<center><span class="valueBox">Correct Attempts </span></center>'
		+' <div class="panel-body counterPanelGreen">'

		+'<center><span class="valueBox"><b>'+parseInt(totSpanNew)+'</b></span></center>'
		+'</div>'
		+'</div>'

		+'</div>'
		
		+' </div>'
		+' </div>'
		+' </div>'
		

$("#main-div").html(htm);

console.log(spanCalibPer);
	console.log(zeroCalibPer);

let initialData = [
    { name: 'Questionaries', y: quesPercent },
    { name: 'Construction of WheatStone Bridge', y: wheatStone },
    { name: 'Standard Calculations', y: piCal },
    { name: 'Zero Calculation', y: zeroPercentCal },
    { name: 'Span Calculation', y: spanPercentCal } 
  
];
//
//// Create the pie chart
let chart = Highcharts.chart('graph-div', {
    chart: {
        type: 'pie'
    },
    title: {
        text: 'Observations'
    },
    series: [{
        name: 'Observed',
        //colorByPoint: true,
        data: initialData
    }],
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
                format: '{point.name}: {point.percentage:.1f} %'
            }
        }
    }
});

}