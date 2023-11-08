var masterJson = {};
var arrayJson = [];
var iteration = 1;
function calculate(){
	$("#main-div-conf").html('');	
     $("#canvas-div").html('');	   
	
     flg = 0;
     var vin = 5;
		var rx = 0.0159;
		var r = 15;
		var a1 = 0, b1 = 0;
		var a = 0, b = 0;
		var vout1 = 0 , vout = 0;
		var vout2 = 0;	
     
      $("#centerText1").html('DIAGRAM');
      $("#centerText2").html('STANDARD CALCULATIONS');
       var paper = new Raphael(document.getElementById('main-div-conf'),800,500);
       var x = 100;
       var y = 100;
	 wheatStone_img = paper.image("images/wheatstone.png",(x-50), (y+30),900, 600);
	 var r1 = paper.circle(x+110,y+170,30).attr({'stroke' : '#000' , 'stroke-width' : 3 ,'fill':"#fff"}).toFront();
	 var rect1 = paper.rect(x+480,y+110,60,40).attr({'stroke' : '#000' , 'stroke-width' : 3 });
	 var txt = paper.text(x+510,y+90,"Vaccum").attr({'stroke' : '#000' , "font-size":"20px","font-weight": "bold"});
	 var rx_txt= paper.text(x+290,y+100,"Rx").attr({'stroke' : '#000' , "font-size":"20px","font-weight": "bold"});
	 var volt_text = paper.text(x-43,y+190,vin+"V").attr({'stroke' : '#000' , "font-size":"20px","font-weight": "bold"});
	 var r1txt = paper.text(x+25,y+110,"R2 :"+r+"").attr({'stroke' : '#000' , "font-size":"20px","font-weight": "bold"});
     var r2txt = paper.text(x+25,y+235,"R3 :"+r+"").attr({'stroke' : '#000' , "font-size":"20px","font-weight": "bold"});
     var r3txt = paper.text(x+190,y+235,"R1 :"+r+"").attr({'stroke' : '#000' , "font-size":"20px","font-weight": "bold"});

	               
	 var pressVal = '<div class="row" id="pressVal" >'
				   +'<div class="col-sm-5">'
				   +'<label  id=""  class="" style="font-size:16px;margin:15px 10px ;">Enter pressure (torr) :   </label>'
				   +'</div>'
				   +'<div class="col-sm-3">'
					+'<input type="text" value="" id="text1"  style=margin:15px 10px;width:150%;height:50%;"  class=" form-control" />'
				   +'</div>'
				    +'<div class="col-sm-3">'
				   +'<br><button type="submit" class="btn btn-danger"  id="submit_Press" style="width:100%;height:50%;margin-top: -6px;" >Submit</input>'
				   +'</div>'
				   +'</div>'
				  
				   
				   +'<div class="row" id="temp" hidden>'
				   +'<div class="col-sm-5">'
				   +'<label  id=""  class="" style="font-size:16px;margin:15px 10px ;">Enter temperature (&#176; K):  </label>'
				   +'</div>'
				   +'<div class="col-sm-3">'
					+'<input type="text" value="" id="text2"  style=margin:15px 10px;width:150%;height:50%;"  class=" form-control" />'
				   +'</div>'
				    +'<div class="col-sm-3">'
				   +'<br><button type="submit" class="btn btn-danger"  id="submit_Press1" style="width:100%;height:50%;margin-top: -6px;" >Submit</input>'
				   +'</div>'
				   +'</div>'
				  
				   
				   +'<div class="row" id="calRx" hidden>'
				   +'<div class="col-sm-5">'
				   +'<label  id=""  class="" style="font-size:16px;margin:15px 10px ;">Calculate R<sub>x</sub> (m&ohm;) :  </label>'
				   +'</div>'
				   +'<div class="col-sm-3">'
					+'<input type="text" value="" id="text3"  style=margin:15px 10px;width:150%;height:50%;"  class=" form-control" />'
				   +'</div>'
				    +'<div class="col-sm-3">'
				   +'<br><button type="submit" class="btn btn-danger"  id="submit_Press2" style="width:100%;height:50%;margin-top: -6px;" >Submit</input>'
				   +'</div>'
				   +'</div>'
				   
				   +'<div class="row" id="outputVoltage" hidden>'
				   +'<div class="col-sm-5">'
				   +'<label  id=""  class="" style="font-size:16px;margin:15px 10px ;">Calculate Output voltage (mV):  </label>'
				   +'</div>'
				   +'<div class="col-sm-3">'
					+'<input type="text" value="" id="text4"  style=margin:15px 10px;width:150%;height:50%;"  class=" form-control" />'
				   +'</div>'
				    +'<div class="col-sm-3">'
				   +'<br><button type="submit" class="btn btn-danger"  id="submit_Press3" style="width:100%;height:50%;margin-top: -6px;" >Submit</input>'
				   +'</div>'
				   +'</div>'
				   
				    +'<div class="col-sm-12">'
				    
	                +'<button type="button" style="padding: 10px; "  class="btn btn-danger btnStyle" id="nextReading" data-toggle="modal" data-target="#selectCheck" hidden><b>NEXT READING </b></button>'
	                
	                +'<button type="button" style="padding: 10px; "  class="btn btn-danger btnStyle" id="nextMeterReading" data-toggle="modal" data-target="#selectCheck" hidden><b>NEXT LEVEL </b></button>'
                    +'</div>'
	                
	      
				   
		$("#canvas-div").html(pressVal);	
		var pressureVal = 0;
		var tzt = paper.text(x+510,y+127," ");
		var arrWeight = [];
		
		
		$("#submit_Press").click(function() {
			id = 1;
            id1 = 1;
            flg = 0;
			pressureVal=parseFloat($("#text1").val());
			
			if(pressureVal>=0.001 && pressureVal<=0.1){
				
				 const index = arrWeight.indexOf(pressureVal);
                   arrWeight.push(pressureVal);
					var hasDuplicate = arrWeight.some((pressureVal, i) => arrWeight.indexOf(pressureVal) !== i);
					
					console.log("hasDuplicate"+hasDuplicate);
					if(hasDuplicate == true){
						dupFlg = 0;
						
					   alert("Avoid Duplicates");
					  arrWeight.splice(index,1);
					  $("#submit_press").prop('disabled',false);
						$("#text1").prop('disabled',false);
					}else{
						$("#temp").prop('hidden',false);
						$("#submit_Press").prop("disabled",true);
						$("#text1").prop("disabled",true);
						
						 tzt = paper.text(x+510,y+127,pressureVal).attr({'stroke' : '#000' , "font-size":"18px","font-weight": "bold"});
						 rect1.attr({"fill":"#deb1c0"});
					}
				

			
			}else{
				alert("Select pressure range between 0.001 to 0.1 torr");
			}
		});
		
		var tempVal = 0;
		
		$("#submit_Press1").click(function() {
			tempVal = parseFloat($("#text2").val());
			if(tempVal >=50 && tempVal<=60)
			 {
				$("#calRx").prop("hidden",false);
				$("#text2").prop("disabled",true);
			$("#submit_Press1").prop("disabled",true);
			}else{
				alert("Enter the value between 50 to 60 degree K");
			}

		     
		});
		
		var temperature = 0;
		var calTemp = 0;
		var rxVal = 0 , kt = 0, rx1 = 0;
		var rxConvert = 0;
		var id = 1;
		var rx_txt1= paper.text(x+300,y+100," ");
		
		$("#submit_Press2").click(function() {
			calTemp = parseFloat($("#text3").val());
			rxVal = 0.953*pressureVal+0.0137*tempVal+61.8;
			kt = 1/rxVal;
			rxConvert = kt*1000;
			rx1 = rxConvert.toFixed(4);
			rx = parseFloat(rx1);
			console.log("rxVal"+rxVal);
			console.log("kt"+kt);
			
			if (id <= 3) {
				
				if (calTemp == rx) {
					checkAns = 0;
                    $("#submit_Press2").prop("disabled",true);
                    $("#text3").prop("disabled",true);
                    $("#outputVoltage").prop("hidden",false);
                rx_txt1= paper.text(x+335,y+100," : "+rx).attr({'stroke' : '#000' , "font-size":"18px","font-weight": "bold"});     
					
	
				} else if (calTemp != rx) {
					
				alert("Entered value is incorrect.Try it again.");
//				 $("#modelMsg").html("<b class='boldTextRed'>Entered value is incorrect.Try again . </b>");
//				 $("body").css("padding","0px 0px 0px 0px");
//				console.log("wrong");
//				wrong_cnt++;
				}
	
	
			} else if (id == 4) {
				
				alert("formula : Rx = 0.953 * P+ 0.0137 * T+ 61.8");
				
//				 $("#modelMsg").html("<b class='boldTextBlue'>formula : Area = "+unescape('%u220F')+" r"+unescape('%B2')+"</b> ");
//				 $("body").css("padding","0px 0px 0px 0px");
//				 wrong_cnt++;
				
			} else {
//				ax1 = $("#text2").val().trim();
	
				if (calTemp == rx) {
					checkAns = 0;
//					correct_cnt++;
					 $("#submit_Press2").prop("disabled",true);
                    $("#text3").prop("disabled",true);
                    $("#outputVoltage").prop("hidden",false);
                rx_txt1= paper.text(x+335,y+100," : "+rx).attr({'stroke' : '#000' , "font-size":"18px","font-weight": "bold"});     

					
	
				} else {
					checkAns = 0;
					alert("correct answer is " + rx );
					
//					 $("#modelMsg").html("<b class='boldTextRed'>Correct answer is " + axialCal+"</b>");
//					 $("body").css("padding","0px 0px 0px 0px");
//					 wrong_cnt++;	
	
				}
			}
			id++;
			
			
			});
			
			var outV = 0;
			var id1 = 1;
		$("#submit_Press3").click(function() {
			outV = parseFloat($("#text4").val());
			calout();
			flg = 0;
			txt1.remove();
				if (id1 <= 3) {
				
				if (outV == vout) {
					checkAns = 0;
                    $("#submit_Press3").prop("disabled",true);
                    $("#text4").prop("disabled",true);
                    $("#nextReading").prop("hidden",false);
			         flg = 1;
	                outAnim();  
	                 if(iteration >= 5){
							$("#nextMeterReading").prop("hidden",false);
							$("#nextReading").prop("hidden",true);
							
						}else{
							$("#nextMeterReading").prop("hidden",true);
							$("#nextReading").prop("hidden",false);
						}
				} else if (outV != vout) {
					
			outAnim();
				alert("Entered value is incorrect.Try it again.");
//				 $("#modelMsg").html("<b class='boldTextRed'>Entered value is incorrect.Try again . </b>");
//				 $("body").css("padding","0px 0px 0px 0px");
//				console.log("wrong");
//				wrong_cnt++;
				}
	
	
			} else if (id1 == 4) {
				
				alert("formula :Vout = Vin(Rx/(R3+Rx)-R2/(R1+R2))");
			outAnim();
//				 $("#modelMsg").html("<b class='boldTextBlue'>formula : Area = "+unescape('%u220F')+" r"+unescape('%B2')+"</b> ");
//				 $("body").css("padding","0px 0px 0px 0px");
//				 wrong_cnt++;
				
			} else {
//				ax1 = $("#text2").val().trim();
	
				if (outV == vout) {
					checkAns = 0;
//					correct_cnt++;
					 $("#submit_Press3").prop("disabled",true);
                    $("#text4").prop("disabled",true);
                   $("#nextReading").prop("hidden",false);
			       flg = 1;
			       outAnim();
			       if(iteration >= 5){
							$("#nextMeterReading").prop("hidden",false);
							$("#nextReading").prop("hidden",true);
							
						}else{
							$("#nextMeterReading").prop("hidden",true);
							$("#nextReading").prop("hidden",false);
						}
				} else {
					checkAns = 0;
					alert("correct answer is " + vout );
					outAnim();
//					 $("#modelMsg").html("<b class='boldTextRed'>Correct answer is " + axialCal+"</b>");
//					 $("body").css("padding","0px 0px 0px 0px");
//					 wrong_cnt++;	
                     
	
				}
			}
			id1++;
				
		});
		
		var txt1 = paper.text(x+110,y+170," ");
		
		function outAnim(){
			
			
		if(outV == vout){
			
			txt1 = paper.text(x+110,y+170,outV).attr({'stroke' : '#000' , "font-size":"18px","font-weight": "bold"});
			r1.attr({"fill":"green"});
			
			
		}else{
			
			txt1 = paper.text(x+110,y+170,outV).attr({'stroke' : '#000' , "font-size":"18px","font-weight": "bold"});
			r1.attr({"fill":"red"});
			
		}
		
		}	
			
		$("#nextReading").click(function(){
			
			$("#nextReading").prop("hidden",true);
			$("#text1").prop("disabled",false);
			$("#submit_Press").prop("disabled",false);
			$("#text2").prop("disabled",false);
			$("#submit_Press1").prop("disabled",false);
			$("#text3").prop("disabled",false);
			$("#submit_Press2").prop("disabled",false);
			$("#text4").prop("disabled",false);
		    $("#submit_Press3").prop("disabled",false);
		    $("#temp").prop("hidden",true);
		    $("#calRx").prop("hidden",true);
		    $("#outputVoltage").prop("hidden",true);
		    txt1.remove();
		    tzt.remove();
		    rx_txt1.remove();
		    r1.attr({"fill":"#fff"});
		    rect1.attr({"fill":"#fff"});
		    addFun();
		   
		    $("#text1").val('');
	        $("#text2").val('');
	        $("#text3").val('');
	        $("#text4").val('');
		});
		
		$("#nextMeterReading").click(function(){
			$("#main-div-conf").html('');	
            $("#canvas-div").html('');
            $("#table-design").html('');
            addFun();
			digitalMeter();
		});
		
		
		var vout3 = 0;
		function calout(){
			a1 = r+rx;
			a = (rx/a1).toFixed(4);
			console.log("value of first term "+a);
			b1 = r+r;
			b = r/b1.toFixed(4);
			console.log("value of second term "+b);
			vout1 = a-b;
			console.log("value of substraction "+vout1);
			vout2 = (vin * vout1).toFixed(4);
			vout3 = vout2*1000;
			vout =  parseFloat(vout3);
			console.log("value of output "+vout);
			
			
		}
	 
	    function addFun(){
		                     tempJson={};
							 tempJson.pressure = pressureVal;							 
							 tempJson.temperature = tempVal;
							 tempJson.resistance = rx;
							 tempJson.outputVoltage = vout;
							  arrayJson.push(tempJson);
							   console.log(arrayJson);
							   masterJson.demo=arrayJson;							   
							  tableReading();
//							   tableReadingAdded();
							   console.log(masterJson);
	}		   
}