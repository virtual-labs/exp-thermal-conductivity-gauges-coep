
var zeroAns = 0;
var spanAns = 0;

function calibrate(){
	$("#canvas-div").html('');
    $("#main-div-conf").html('');
    $("#table-design").html('');
    $("#graph2").html('');
    $("#centerText1").html('OBSERVATIONS');
    $("#centerText2").html('CALIBRATION');
    
    $("#calibrateLevel").prop("hidden",true);
    $("#main-div-conf").html(tableMainDiv);
     graph2();
    calibrateObservedValues();
}


function calibrateObservedValues(){
   
  
		console.log(" calibration page");
		console.log(masterJson);
	    var zero_wrong = 0;
	    var span_wrong = 0;
	    var zeroCalibrationWrongMinus = 0;
	    var spanCalibrationWrongMinus = 0;
	    var zeroCalibrationAgainMinus = 0;
	    var zeroCalibrationWrongPlus = 0;
	    var spanCalibrationWrongPlus = 0;
	    var zeroCalibrationAgainPlus = 0;
	    
	    $("#showGraph").prop("hidden",true);
		htm='';
			htm+='<div class="card" id="calibrationDiv">'
//			+'  <div class="card-header  text-white" style="font-size:20px;"><center>CALIBRATION</center></div>'
			+' <div class="card-body"  style="margin-right:10px;margin-left:10px;">'
				+'<div class="row" >'
				+'<div class="col-sm-1">'
				+'</div>'
			+'<div class="col-sm-5" id="zeroAnswer" >'
			+'<div class="card ">'
			+'  <div class="card-header  text-white" style="background-color:#072647;"><center>ZERO ERROR</center></div>'
			+' <div class="card-body">'
			+'<input type="text" class="form-control" id="zeroText"/>'
			+'<br>'
			 +'<button type="button"   class="btn btn-danger btnStyle" id="zeroSubmit" data-toggle="modal" data-target="#zeroSubmitModel" ><b> SUBMIT </b></button>'
			+'</div> '
//			+' <div class="card-footer">Formula : Actual Reading - Observed Reading </div>'
			+' </div>'
			+'</div>'
			// + ' <!-- Modal -->'
				+ '<div class="modal fade" id="zeroSubmitModel" role="dialog">'
				+ ' <div class="modal-dialog modal-md">'
				+ '    <div class="modal-content">'
				+ '     <div class="modal-header">'
				
				+ '       <h4 class="modal-title">Message box</h4>'
				+ '       <button type="button" class="close" data-dismiss="modal" style="color:#fff;">&times;</button>'
				+ '     </div>'
				+ '     <div class="modal-body">'
				+ '       <p id="modelMsgZero">This is a small modal.</p>'
				+ '     </div>'
				+ '     <div class="modal-footer">'
				+ '       <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>'
				+ '     </div>'
				+ '   </div>'
				+ ' </div>'
				+ '</div>'
				//model Close
			+'<div class="col-sm-5" id="spanAnswer" hidden>'
			+'<div class="card">'
			+'  <div class="card-header  text-white" style="background-color:#072647;"><center>SPAN ERROR</center></div>'
			+' <div class="card-body">'
			+'<input type="text" class="form-control" id="spanText" />'
			+'<br>'
			 +'<button type="button"   class="btn btn-danger btnStyle" id="spanSubmit" data-toggle="modal" data-target="#spanSubmitModel" ><b> SUBMIT </b></button>'
				
			+'</div> '
//			+' <div class="card-footer">Formula : Actual Reading - Observed Reading</div>'
			+' </div>'
			+'</div>'
			+'<div class="col-sm-1">'
			+'</div>'

			+'</div>'
			 + ' <!-- Modal -->'
				+ '<div class="modal fade" id="spanSubmitModel" role="dialog">'
				+ ' <div class="modal-dialog modal-md">'
				+ '    <div class="modal-content">'
				+ '     <div class="modal-header">'
				
				+ '       <h4 class="modal-title">Message box</h4>'
				+ '       <button type="button" class="close" data-dismiss="modal" style="color:#fff;">&times;</button>'
				+ '     </div>'
				+ '     <div class="modal-body">'
				+ '       <p id="modelMsgSpan">This is a small modal.</p>'
				+ '     </div>'
				+ '     <div class="modal-footer">'
				+ '       <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>'
				+ '     </div>'
				+ '   </div>'
				+ ' </div>'
				+ '</div>'
				//model Close
			+'<div class="row cantainer " id="calibrationPanel" >'
			+'<div class="col-sm-1">'
			+'</div>'
			+'<div class="col-sm-5 " id="zeroPanel" hidden>'
				+'<div class="panel " >'
			      +' <div class="panel-heading" style="background-color:#072647;color:#fff;"><center>ZERO ERROR</center></div>'
			     	+' <div class="panel-body" id="plusMinusCalibrationZero">'
				      	+'<img src="images/minusresize.png" class="imgPlusMinus1 " id="minusZero" ></img>'
						+'<img src="images/knob.png" class="img-fluid imgPlusMinus img-circle " id="knobZero" ></img>'
						+'<img src="images/plusresize.png" class="imgPlusMinus1 " id="plusZero"></img>'
					 +'</div>'
					 +'<div class="alert alert-success" role="alert"  id="errorZeroAlert" style="margin:15px;" hidden>'
						+' <b id="errorZeroText">Zero Adjusted Successfully ...</b>'
					+'</div>'
				 +'</div>'
				
		 +'</div>'
		+'<div class="col-sm-5"  id="spanPanel" hidden>'
				+'<div class="panel "  >'
			      +' <div class="panel-heading" style="background-color:#072647;color:#fff;"><center>SPAN ERROR</center></div>'
			     	+' <div class="panel-body" id="plusMinusCalibrationSpan">'
				     	+'<img src="images/minusresize.png"class="imgPlusMinus1 "  id="minusMax" ></img>'
						+'<img src="images/knob.png" class="imgPlusMinus img-circle" id="knobSpan"></img>'
						+'<img src="images/plusresize.png"  class="imgPlusMinus1 " id="plusMax"></img>'
					+'</div>'
					+'<div class="alert alert-success" role="alert"  id="spanErrorAlert" style="margin:15px;" hidden>'
						+' <b id="spanErrorText">Span Adjusted Successfully .</b>'
					+'</div>'
					+'<div class="alert alert-danger" role="alert"  id="errorZeroAlert2" style="margin:15px;" hidden>'
						+' <b id="zeroErrorText2">But zero disturbs .</b>'
					+'</div>'
			     +'</div>'
		+'</div>'
		
		+'<div class="col-sm-1">'
		+'</div>'
		

	 +'</div>' 
	 +'</div>'
	 +'</div>'
	 
	 +'<div  id="nextFaultFindingDiv" hidden>'
	+'<button type="button" class="col-sm-12 btn btn-danger"  id="MeterCalibration" >Result</button>'
	+'</div>'
			$("#canvas-div").html(htm);
			
			$("#MeterCalibration").click(function() {
				var countTempJson = {};
				 countTempJson.zeroCalibrationForMinusWrong = zeroCalibrationWrongMinus;
				 countTempJson.spanCalibrationForMinusWrong = spanCalibrationWrongMinus;
	             countTempJson.zeroCalibrationForAgainMinus = zeroCalibrationAgainMinus;
	             countTempJson.zeroCalibrationForWrongPlus = zeroCalibrationWrongPlus;
	             countTempJson.spanCalibrationForWrongPlus = spanCalibrationWrongPlus;
	             countTempJson.zeroCalibrationForAgainPlus = zeroCalibrationAgainPlus;
	             countTempJson.zeroAnswer = zeroAns;
	             countTempJson.spanAnswer = spanAns;
	             
	             
			countTempJson.zeroWrong = zero_wrong;
			countTempJson.spanWrong = span_wrong;
			
			counterMasterJson.calibration = countTempJson;
			console.log(counterMasterJson);
				result();
				
			});
			var id=1;
			var ans3 = 0;
			var flowAns =0 ;
			$("#zeroSubmit").click(function() {
				
				
				
				
				console.log("in zero submit");
				
//				var flowAns12 = $("#zeroText").val().trim();
				flowAns = $("#zeroText").val().trim();
				var max=masterJson.demo1[0].resistance1;
				var min=masterJson.demo1[0].calResis;
				var ans=min-max;
				ans3 = parseFloat(ans);
				console.log("zero ans    "+ans);
				var ans1=ans.toFixed(4);
				
				console.log("zero Answer   "+ans1);
				zeroAns = parseFloat(ans1);
				
				if(flowAns=="")
					{

						 $("#modelMsgZero").html("<b class='boldTextBlue' >Dont Skip empty textbox . </b>");
						 $("body").css("padding","0px 0px 0px 0px");
					}
				else{
					var flowAns12 = $("#zeroText").val().trim();
                  flowAns = parseFloat(flowAns12);
				
				if (id <= 3) {
					
								if(flowAns==ans1){
									checkAns = 0;
									id=0;
									  $("#zeroSubmit").prop('disabled', true);
									$("#zeroText").prop('disabled', true);
									$("#spanAnswer").attr("hidden",false);
								}
								else if (flowAns != ans1) {
								
								 $("#modelMsgZero").html("<b class='boldTextRed'>Entered value is incorrect.Try again . </b>");
								 $("body").css("padding","0px 0px 0px 0px");
								 zero_wrong++;
								
								}


				} else if (id == 4) {
					
					$("#modelMsgZero").html("<b class='boldTextBlue'>Formula :Actual Reading - Observed Reading </b> ");
					 $("body").css("padding","0px 0px 0px 0px");
					
				} else {
//					flowAns = $("#zeroText").val();

					if (flowAns == ans1) {
						checkAns = 0;
						
						id=0;
						  $("#zeroSubmit").prop('disabled', true);
						$("#zeroText").prop('disabled', true);
						$("#spanAnswer").attr("hidden",false);
						
					} else {
						checkAns = 0;
//						alert("correct answer is " + flow );
						 $("#modelMsgZero").html("<b class='boldTextRed'>Correct answer is " + ans1+"</b>");
						 $("body").css("padding","0px 0px 0px 0px");
						 zero_wrong++;	

					}
				}
				id++;
				 
				}
             
				});
			var length= masterJson.demo1.length-1;
			var ans2 = 0;
			var id1=1;
			$("#spanSubmit").click(function() {
				
				console.log("in span submit");
				

				
				var max=masterJson.demo1[length].resistance1;
				var min=masterJson.demo1[length].calResis;
				var ans=min-max;
				console.log("span ans    "+ans);
				ans2 = parseFloat(ans);
				var ans11=ans2.toFixed(4);
				var ans1 = parseFloat(ans11);
				console.log("span Answer   "+ans1);
				
				spanAns = ans1;
				flowAns = $("#spanText").val().trim();
//				console.log("flowAns Answer   "+flowAns);
				if(flowAns=="")
					{

						 $("#modelMsgSpan").html("<b class='boldTextBlue' >Dont Skip empty textbox . </b>");
						 $("body").css("padding","0px 0px 0px 0px");
					}
				else{
                      flowAns13 = $("#spanText").val().trim();
				       flowAns = parseFloat(flowAns13);
						if (id1 <= 3) {
							
								if (flowAns == ans1) {
									checkAns = 0;
//									id=0;
//									$("#spanText").val('');
									$("#spanSubmit").prop('disabled', true);
									$("#spanText").prop('disabled', true);
									$("#spanAnswer").attr("hidden",false);
									$("#zeroPanel").attr("hidden",false);
								 
								} else if (flowAns != ans1) {

									 $("#modelMsgSpan").html("<b class='boldTextRed'>Entered value is incorrect.Try again . </b>");
									 $("body").css("padding","0px 0px 0px 0px");
									 span_wrong++;
					
					}


				} else if (id1 == 4) {
					
//					alert("formula : Volume of the float = "+unescape('%u220F')+" / 4 Dr"+unescape('%B2')+"h ");
					
					 $("#modelMsgSpan").html("<b class='boldTextBlue'> Formula : Actual Reading - Observed Reading</b> ");
					 $("body").css("padding","0px 0px 0px 0px");
					
				} else {
					flowAns = $("#spanText").val().trim();

					if (flowAns == ans1) {
						checkAns = 0;
						id=0;
						$("#spanSubmit").prop('disabled', true);
						$("#spanText").prop('disabled', true);
						$("#spanAnswer").attr("hidden",false);
						$("#zeroPanel").attr("hidden",false);
						
					} else {
						checkAns = 0;
//						alert("correct answer is " + flow );
						 $("#modelMsgSpan").html("<b class='boldTextRed'>Correct answer is " + ans1+"</b>");
						 $("body").css("padding","0px 0px 0px 0px");	
						 span_wrong++;

					}
					
				}
				
				 id1++;
				}
             
				});
			
			
			var rotate=20;
			
			$("#plusZero").click(function() {
				
				//				var max=masterJson.demo1[0].resistance1;
//				var min=masterJson.demo1[0].calResis;
				
				zeroCalibrationWrongPlus++;
				console.log("zeroCalibrationWrongPlus "+zeroCalibrationWrongPlus);
				var ydataPulse=[];
			    console.log(counterMasterJson);
				$("#knobZero").css({ transform: 'rotate('+rotate+'deg)' });
				var temp1=(masterJson.demo1[0].resistance1).toFixed(4);
				var temp2=(masterJson.demo1[0].calResis).toFixed(4);
				var actualSpan=parseFloat(temp1);
				var stdSpan=parseFloat(temp2);
//				 console.log("masterJson.weight[0].meterPressureWithError"+masterJson.weight[0].meterPressureWithError);
//				 console.log("std "+std+" actual "+actual);
				 for(i=0;i< masterJson.demo1.length;i++){
						
							 if(stdSpan==actualSpan)
							 {
								 $('#spanPanel').removeAttr('hidden');
								 $('#errorZeroAlert').attr('hidden',false);
						
									 $("#plusMinusCalibrationZero").html("");
									 
									 temp= parseFloat(masterJson.demo1[i].resistance1);
										ydataPulse[i]=masterJson.demo1[i].resistance1=temp;
								
							 }
							 
							 else{
								 temp= parseFloat(masterJson.demo1[i].resistance1)+0.0001;
								ydataPulse[i]=masterJson.demo1[i].resistance1=temp;
								
							 }
						}	
				console.log(ydataPulse);	
				var chart = $('#graph2').highcharts();
				
				chart.series[1].setData(ydataPulse, false);
				chart.redraw();
		        
		       
				 rotate+=20;
			});
			$("#minusZero").click(function() {
				zeroCalibrationWrongMinus++;
				
	   console.log("zeroCalibrationWrongMinus "+zeroCalibrationWrongMinus);
				var ydataPulse=[];
			
				$("#knobZero").css({ transform: 'rotate('+rotate+'deg)' });
				
				var temp1=(masterJson.demo1[0].resistance1).toFixed(4);
				var temp2=(masterJson.demo1[0].calResis).toFixed(4);
				var actualSpan=parseFloat(temp1);
				var stdSpan=parseFloat(temp2);
//				 console.log("std "+std+" actual "+actual);
				
				 
				 
					for(i=0;i< masterJson.demo1.length;i++){
						
							 if(stdSpan==actualSpan)
							 { $('#errorZeroAlert').attr('hidden',false);
//								 $('#zeroErrorAlert').attr('hidden',false);  
//								 $('#errorZeroAlert').removeAttr('hidden');
									$('#spanPanel').removeAttr('hidden');
									$("#plusMinusCalibrationZero").html("");
								temp= parseFloat(masterJson.demo1[i].resistance1);
									ydataPulse[i]=masterJson.demo1[i].resistance1=temp;
								
							 }
							 
							 else{
								 temp= parseFloat(masterJson.demo1[i].resistance1)-0.0001;
								ydataPulse[i]=masterJson.demo1[i].resistance1=temp;
								
							 }
						}	
				
				
					
				var chart = $('#graph2').highcharts();
					
					chart.series[1].setData(ydataPulse, false);
					chart.redraw();
		        
		       
				 rotate-=20;
			});
			var length= masterJson.demo1.length-1;
			
			var temp1=(masterJson.demo1[length].resistance1).toFixed(4);
			var temp2=(masterJson.demo1[length].calResis).toFixed(4);
			
			var actualSpan=parseFloat(temp1);
			var stdSpan=parseFloat(temp2);
			
			$("#minusMax").click(function() {
				spanCalibrationWrongMinus++;
	  			console.log("spanCalibrationWrongMinus "+spanCalibrationWrongMinus);
				var ydataPulse=[];
			
				$("#knobSpan").css({ transform: 'rotate('+rotate+'deg)' });
//				var actualSpan=parseFloat(temp1);
//			var stdSpan=parseFloat(temp2);
				var actualSpan=(masterJson.demo1[length].resistance1).toFixed(4);
				actualSpan = parseFloat(actualSpan);
				var stdSpan=parseFloat(masterJson.demo1[length].calResis).toFixed(4);
                stdSpan = parseFloat(stdSpan);
//				 console.log("std "+stdSpan+" actual "+actualSpan);
				
				 
				 
					for(i=0;i< masterJson.demo1.length;i++){
						
							 if(stdSpan==actualSpan)
							 {
								 
								   $("#plusMinusCalibrationSpan").html("");
								   $('#errorZeroAlert2').attr('hidden',false);
								   $('#spanErrorAlert').removeAttr('hidden');
//								   $('#zeroErrorAlert').html('');
								   $('#errorZeroAlert').attr('hidden',true);
								temp= parseFloat(masterJson.demo1[i].resistance1);
									ydataPulse[i]=masterJson.demo1[i].resistance1=temp;
									htm=''
										htm+='<div class="panel panel-primary"  id="zeroPanel2">'
									     
									     	+' <div class="panel-body" id="zero2">'
										     	+'<img src="images/minusresize.png"class="imgPlusMinus1 "  id="minus2" ></img>'
												+'<img src="images/knob.png" class="imgPlusMinus img-circle" id="knob2"></img>'
												+'<img src="images/plusresize.png"  class="imgPlusMinus1 " id="plus2"></img>'
											+'</div>'
											
											+'<div class="alert alert-success" role="alert"  id="zeroAlert2" style="margin:15px;" hidden>'
												+' <b id="zeroErrorText22">Again Zero Error Adjusted Successfully . </b>'
											+'</div>'
											+'<div class="alert alert-success" role="alert"  id="zeroBoth" style="margin:15px;" hidden>'
											+' <b id="zeroBoth2">Both Error  Adjusted Successfully . </b>'
										+'</div>'
									     +'</div>'
									     
									     $("#plusMinusCalibrationZero").html(htm);
//									   $("#zeroErrorAlert").attr("hidden",true);
									
									//Second Zero Set
							 }
							 
							 else{
								 temp= parseFloat(masterJson.demo1[i].resistance1)-0.0001;
								ydataPulse[i]=masterJson.demo1[i].resistance1=temp;
								
							 }
						}	
					
				var chart = $('#graph2').highcharts();
					
					chart.series[1].setData(ydataPulse, false);
					chart.redraw();
		        
		       
				 rotate-=20;
				 $("#plus2").click(function() {
					  
	  					 zeroCalibrationAgainPlus++;
	  					 console.log("zeroCalibrationAgainPlus "+zeroCalibrationAgainPlus);
						var ydataPulse=[];
						var length= masterJson.demo1.length-1;
						$("#knob2").css({ transform: 'rotate('+rotate+'deg)' });
//						var actualSpan =parseFloat(masterJson.demo1[0].resistance1);
//						var stdSpan=parseFloat(masterJson.demo1[0].calResis);
						
						var actualSpan=(masterJson.demo1[0].resistance1).toFixed(4);
				actualSpan = parseFloat(actualSpan);
				var stdSpan=parseFloat(masterJson.demo1[0].calResis).toFixed(4);
                stdSpan = parseFloat(stdSpan);

//						 console.log(" span std "+stdSpan+" actual "+actualSpan);
						
						 
						 
							for(i=0;i< masterJson.demo1.length;i++)
							{
									if(length!=i){
									 if(stdSpan==actualSpan)
									 {
										    
										 $("#zero2").html("");
										   $('#zeroAlert2').removeAttr('hidden');
										   $("#zeroBoth").removeAttr('hidden');
										   $("#nextFaultFindingDiv").attr("hidden",false);
										   $('#errorZeroAlert2').attr('hidden',true);
										   
										 temp= parseFloat(masterJson.demo1[i].resistance1);
											ydataPulse[i]=masterJson.demo1[i].resistance1=temp;
										
									 }
									 
									 else{
										 temp= parseFloat(masterJson.demo1[i].resistance1)+0.0001;
										ydataPulse[i]=masterJson.demo1[i].resistance1=temp;
										
									 }
								}
									else
									{
									temp= parseFloat(masterJson.demo1[i].resistance1);
									ydataPulse[i]=masterJson.demo1[i].resistance1=temp;
									}
							}
							
							
						var chart = $('#graph2').highcharts();
				       chart.series[1].setData(ydataPulse, false);
		        $('#graph2').highcharts().redraw();
				        rotate+=20;
				       
						
					});
				 $("#minus2").click(function() {
					 zeroCalibrationAgainMinus++;
						console.log("zeroCalibrationAgainMinus "+zeroCalibrationAgainMinus);
						var ydataPulse=[];
						var length= masterJson.demo1.length-1;
						$("#knob2").css({ transform: 'rotate('+rotate+'deg)' });
						var actualSpan=(masterJson.demo1[0].resistance1).toFixed(4);
				actualSpan = parseFloat(actualSpan);
				var stdSpan=parseFloat(masterJson.demo1[0].calResis).toFixed(4);
                stdSpan = parseFloat(stdSpan);

//						 console.log(" span std "+stdSpan+" actual "+actualSpan);
						
						 
						 
							for(i=0;i< masterJson.demo1.length;i++)
							{
									if(length!=i){
									 if(stdSpan==actualSpan)
									 {
										    
										 $("#zero2").html("");
										   $('#zeroAlert2').removeAttr('hidden');
										   $('#zeroBoth').removeAttr('hidden');
										   $("#nextFaultFindingDiv").attr("hidden",false);
										   $('#errorZeroAlert2').attr('hidden',true);
										   $('#nextDiv').attr('hidden',true);
										 temp= parseFloat(masterJson.demo1[i].resistance1);
											ydataPulse[i]=masterJson.demo1[i].resistance1=temp;
										
									 }
									 
									 else{
										 temp= parseFloat(masterJson.demo1[i].resistance1)-0.0001;
										ydataPulse[i]=masterJson.demo1[i].resistance1=temp;
										
									 }
								}
									else
									{
									temp= parseFloat(masterJson.demo1[i].resistance1);
									ydataPulse[i]=masterJson.demo1[i].resistance1=temp;
									}
							}
							
							
						var chart = $('#graph2').highcharts();
					
					chart.series[1].setData(ydataPulse, false);
					chart.redraw();
				        rotate-=20;
				       
						
					});
			});
			
			
			$("#plusMax").click(function() {
				var ydataPulse=[];
				
	 spanCalibrationWrongPlus++;
	 console.log("spanCalibrationWrongPlus "+spanCalibrationWrongPlus);
				$("#knobSpan").css({ transform: 'rotate('+rotate+'deg)' });
//				var actualSpan =parseInt(masterJson.weight[length].meterPressureWithError);
//				var stdSpan=parseInt(masterJson.weight[length].totalWeight);
				var temp1=(masterJson.demo1[length].resistance1).toFixed(4);
				var temp2=(masterJson.demo1[length].calResis).toFixed(4);
				
				var actualSpan=parseFloat(temp1);
				var stdSpan=parseFloat(temp2);
//				 console.log(" span std "+stdSpan+" actual "+actualSpan);
				
				 
				 
					for(i=0;i< masterJson.demo1.length;i++){
						
							 if(stdSpan==actualSpan)
							 {

								 $("#plusMinusCalibrationSpan").html("");
								   $('#errorZeroAlert2').attr('hidden',false);
								   $('#spanErrorAlert').removeAttr('hidden');
//								   $('#zeroErrorAlert').html('');
								   $('#errorZeroAlert').attr('hidden',true);
								temp= parseFloat(masterJson.demo1[i].resistance1);
									ydataPulse[i]=masterJson.demo1[i].resistance1=temp;
									htm=''
										htm+='<div class="panel panel-primary"  id="zeroPanel2">'
									     
									     	+' <div class="panel-body" id="zero2">'
										     	+'<img src="images/minusresize.png"class="imgPlusMinus1 "  id="minus2" ></img>'
												+'<img src="images/knob.png" class="imgPlusMinus img-circle" id="knob2"></img>'
												+'<img src="images/plusresize.png"  class="imgPlusMinus1 " id="plus2"></img>'
											+'</div>'
											
											+'<div class="alert alert-success" role="alert"  id="zeroAlert2" style="margin:15px;" hidden>'
												+' <b id="zeroErrorText22">Again Zero Error Adjusted Successfully . </b>'
											+'</div>'
											+'<div class="alert alert-success" role="alert"  id="zeroBoth" style="margin:15px;" hidden>'
											+' <b id="zeroBoth2">Both Error  Adjusted Successfully . </b>'
										+'</div>'
									     +'</div>'
									     
									     $("#plusMinusCalibrationZero").html(htm);
							 }
							 
							 else{
								 temp= parseFloat(masterJson.demo1[i].resistance1)+0.0001;
								ydataPulse[i]=masterJson.demo1[i].resistance1=temp;
								
							 }
						}	
					
				var chart = $('#graph2').highcharts();
		        chart.series[1].setData(ydataPulse, false);
		        $('#graph2').highcharts().redraw();
		        
		       
				 rotate+=20;
				 //2 zero and span
				 $("#plus2").click(function() {
					zeroCalibrationAgainPlus++;
						var ydataPulse=[];
						var length= masterJson.demo1.length-1;
						$("#knob2").css({ transform: 'rotate('+rotate+'deg)' });
						var actualSpan =(masterJson.demo1[0].resistance1).toFixed(4);
						actualSpan = parseFloat(actualSpan);
						var stdSpan=parseFloat(masterJson.demo1[0].calResis);
									stdSpan = parseFloat(stdSpan);
//						 console.log(" span std "+stdSpan+" actual "+actualSpan);
						
						 
						 
							for(i=0;i< masterJson.demo1.length;i++)
							{
									if(length!=i){
									 if(stdSpan==actualSpan)
									 {
										    
										 $("#zero2").html("");
										   $('#zeroAlert2').removeAttr('hidden');
										   $("#zeroBoth").removeAttr('hidden');
										   $("#nextFaultFindingDiv").attr("hidden",false);
										   $('#errorZeroAlert2').attr('hidden',true);
										   
										 temp= parseFloat(masterJson.demo1[i].resistance1);
											ydataPulse[i]=masterJson.demo1[i].resistance1=temp;
										
									 }
									 
									 else{
										 temp= parseFloat(masterJson.demo1[i].resistance1)+0.0001;
										ydataPulse[i]=masterJson.demo1[i].resistance1=temp;
										
									 }
								}
									else
									{
									temp= parseFloat(masterJson.demo1[i].resistance1);
									ydataPulse[i]=masterJson.demo1[i].resistance1=temp;
									}
							}
							
							
						var chart = $('#graph2').highcharts();
					
					chart.series[1].setData(ydataPulse, false);
					chart.redraw();
				        rotate+=20;
				       
						
					});
				 $("#minus2").click(function() {
					zeroCalibrationAgainMinus++;
						var ydataPulse=[];
						var length= masterJson.demo1.length-1;
						$("#knob2").css({ transform: 'rotate('+rotate+'deg)' });
						var actualSpan =(masterJson.demo1[0].resistance1).toFixed(4);
						actualSpan = parseFloat(actualSpan);
						var stdSpan=(masterJson.demo1[0].calResis).toFixed(4);
						stdSpan = parseFloat(stdSpan);

//						 console.log(" span std "+stdSpan+" actual "+actualSpan);
						
						 
						 
							for(i=0;i< masterJson.demo1.length;i++)
							{
									if(length!=i){
									 if(stdSpan==actualSpan)
									 {
										    
										 $("#zero2").html("");
										   $('#zeroAlert2').removeAttr('hidden');
										   $('#zeroBoth').removeAttr('hidden');
										   $("#nextFaultFindingDiv").attr("hidden",false);
										   $('#errorZeroAlert2').attr('hidden',true);
										   $('#nextDiv').attr('hidden',true);
										 temp= parseFloat(masterJson.demo1[i].resistance1);
											ydataPulse[i]=masterJson.demo1[i].resistance1=temp;
										
									 }
									 
									 else{
										 temp= parseFloat(masterJson.demo1[i].resistance1)-0.0001;
										ydataPulse[i]=masterJson.demo1[i].resistance1=temp;
										
									 }
								}
									else
									{
									temp= parseFloat(masterJson.demo1[i].resistance1);
									ydataPulse[i]=masterJson.demo1[i].resistance1=temp;
									}
							}
							
							
						var chart = $('#graph2').highcharts();
					
					chart.series[1].setData(ydataPulse, false);
					chart.redraw();
				        rotate-=20;
				       
						
					});
			});
//			});
			
			

  
	
}


