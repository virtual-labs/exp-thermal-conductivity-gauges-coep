var itr = 1;
var arrayJson1 = [];

function digitalMeter(){
	
	$("#main-div-conf").html('');	
    $("#canvas-div").html('');    
    $("#table-design").html('');
    
    $("#centerText1").html('DIAGRAM');
    $("#centerText2").html('ACTUAL READINGS');	
      
       var vin = 5;
		var rx = 0.0159;
		var r = 140;
		var a1 = 0, b1 = 0;
		var a = 0, b = 0;
		var vout1 = 0 , vout = 0;
		var vout2 = 0;
        var tempVal=0;
        var paper = new Raphael(document.getElementById('main-div-conf'),800,500);
       var x = 55;
       var y = 100;
	 wheatStone_img = paper.image("images/wheatstone.png",(x-50), (y+30),900, 600);
//	 var r1 = paper.circle(x+110,y+170,30).attr({'stroke' : '#000' , 'stroke-width' : 3 ,'fill':"#fff"}).toFront();

     var r1 = paper.rect(x+70,y+150,65,43,5).attr({'stroke' : '#706e6f' , 'stroke-width' : 6 ,'fill':"#000"}).toFront();

	 var rect1 = paper.rect(x+480,y+110,60,40).attr({'stroke' : '#000' , 'stroke-width' : 3 });
	 var txt = paper.text(x+510,y+90,"Vacuum").attr({'stroke' : '#000' , "font-size":"20px","font-weight": "bold"});
	 var rx_txt1= paper.text(x+283,y+100,"R4+Rx").attr({'stroke' : '#000' , "font-size":"16px","font-weight": "bold"});
	 var volt_text = paper.text(x-43,y+190,vin+"V").attr({'stroke' : '#000' , "font-size":"20px","font-weight": "bold"});
	var r1txt = paper.text(x + 25, y + 110, "R2 :" + r +  " \u03A9").attr({'stroke' : '#000' , "font-size":"14px", "font-weight": "bold"});

     var r2txt = paper.text(x+26,y+235,"R3 :"+r+ " \u03A9").attr({'stroke' : '#000' , "font-size":"14px","font-weight": "bold"});
     var r3txt = paper.text(x+192,y+235,"R1 :"+r+ " \u03A9").attr({'stroke' : '#000' , "font-size":"14px","font-weight": "bold"});
    
     var pressVal1 = '<div class="row" id="pressVal12" >'
	   +'<div class="col-sm-4">'
	   +'<label class="labelstyle"  style="margin-top:10px;margin-left:-5px">Select Pressure (torr) : </label>'
	   +'</div>'
	   
	   +'<div class="col-sm-4">'
	   +'<select  class="form-control selectConf" id="text5"  style="height:auto;background-color: white;" >'
	   +'<option value="0">--- Select pressure --- </option>'
	   +'<option value="0.1" >0.1  </option>'
	   +'<option value="0.09" >0.09  </option>'
	   +'<option value="0.08" >0.08  </option>'
	   +'<option value="0.07" >0.07  </option>'
	   +'<option value="0.06" >0.06  </option>'
	   +'<option value="0.05" >0.05  </option>'
	   +'<option value="0.04" >0.04  </option>'
	   +'<option value="0.03" >0.09  </option>'
	   +'<option value="0.02" >0.02  </option>'
	   +'<option value="0.01" >0.01  </option>'
      
	  
	   +'</select>'
	  
	   +'</div>'
	   +'<div class="col-sm-4">'
	   +'<button type="submit" class="btn btn-danger"  id="submit_Press4" data-toggle="modal" data-target="#myModal"  style="width:80%; margin-top:5px;" >Submit</input>'
	   +'</div>'
	    
	   +'</div>'
     
      + '<div class="row" id="temp12" hidden>'
	               +'<center><label class="labelstyle" style="margin-left:10px;"> Relevant Temperature (&#176; K): </label><label id = "relTemp1" class="labelstyle" style="margin-left:10px;">'+tempVal+' </label><label class="labelstyle" style="margin-left:10px;"> and  R<sub>1</sub>=R<sub>2</sub>=R<sub>3</sub>=R<sub>3</sub>=140 &Omega;</label></center>'
	               +'</div>'
                      


	                +'<div class="row" >'
				   +'<div class="col-sm-6">'
	                +'<button type="button" style="padding: 10px; "  class="btn btn-danger btnStyle" id="nextReading4"  disabled><b>CALCULATE </b></button>'
	                +'</div>'
	                +'<div class="col-sm-6">'
	                +'<button type="button" style="padding: 10px; "  class="btn btn-danger btnStyle" id="nextReading5" disabled><b>NEXT READING </b></button>'
	                +'<button type="button" style="padding: 10px; "  class="btn btn-danger btnStyle" id="nextReading6" hidden><b>NEXT LEVEL </b></button>'

                    +'</div>'
                    
                    +'</div>'
                    
				   
				   
		$("#canvas-div").html(pressVal1);
		var digiPressure ,digiPressure1;
		var arrWeight1 = [];
		
		$("#submit_Press4").click(function(){
			 digiPressure1 = $("#text5").val();
			 digiPressure = parseFloat(digiPressure1);
		 
			 digiPressure =$("#text5").children(":selected").attr("value");
			 $("#text5").children('option[value="' + digiPressure + '"]').attr('disabled', true);
			 
			 if(digiPressure==0){
				$(".modal-header").html("Error Message");
			$(".modal-header").css("background","#9c1203b0");
			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
			$("#MsgModal").html("Select Appropriate Value");
			}else{
			 
			 temperatureValues1();
			 console.log("digiPressure"+digiPressure);
			 $("#temp12").prop("hidden",false);
			 $("#text5").prop("disabled",true);
			 $("#submit_Press4").prop("disabled",true);
			 $("#relTemp1").text(tempVal);
			  tzt = paper.text(x+510,y+127,digiPressure).attr({'stroke' : '#000' , "font-size":"18px","font-weight": "bold"});
				rect1.attr({"fill":"#deb1c0"});
				$("#nextReading4").prop("disabled",false);
				}
		});
		
		$("#nextReading4").click(function(){
			$("#nextReading4").prop("disabled",true);
				if(itr<5){
	$("#nextReading5").prop("disabled",false);
	$("#nextReading6").prop("hidden",true);
			
	
	}else{
		$("#nextReading5").prop("hidden",true);
		$("#nextReading6").prop("hidden",false);
		
	}       
			
			calout1(); 
	        addFun1();
		});
		
		$("#nextReading5").click(function(){
			$("#nextReading5").prop("disabled",true);
			$("#text5").prop("disabled",false);
			$("#submit_Press4").prop("disabled",false);
			tzt.remove();
		rx2_txt1.remove();
		txt1Second.remove();
		
		rect1.attr({"fill":"#fff"});
		rx2_txt1 =  paper.text(x+335,y+100," ");
		r1.attr({"fill":"#000"});
		  $("#text5").val(0);
		});
		
		$("#nextReading6").click(function(){
			tableGraph();
			});
//		$("#submit_Press4").click(function(){
//			
//			
//			var digiPressure1 = $("#pressVal12").val();
//			 digiPressure = parseFloat(digiPressure1);
//			 
//			 digiPressure =$("#pressVal12").children(":selected").attr("value");
//			 if(digiPressure==0){
//				$(".modal-header").html("Error Message");
//			$(".modal-header").css("background","#9c1203b0");
//			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
//			$("#MsgModal").html("Select Appropriate values.");
//			}else{
//			 $("#pressVal12").children('option[value="' + digiPressure + '"]').attr('disabled', true);			
//				
//				temperatureValues1();
//			
//				
//	      
////				digiPressure = parseFloat($("#text5").val());
//				$("#relTemp1").text(tempVal);
////			if(digiPressure>=0.001 && digiPressure<=0.1){
//				
//			
////				 const index = arrWeight1.indexOf(digiPressure);
////                   arrWeight1.push(digiPressure);
////					var hasDuplicate = arrWeight1.some((digiPressure, i) => arrWeight1.indexOf(digiPressure) !== i);
////					
////					console.log("hasDuplicate"+hasDuplicate);
////					if(hasDuplicate == true){
////						dupFlg = 0;
//						$(".modal-header").html("Error Message");
//			$(".modal-header").css("background","#9c1203b0");
//			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
//			$("#MsgModal").html("Avoid Duplicates");
////					   alert("Avoid Duplicates");
//					  arrWeight1.splice(index,1);
//					  $("#submit_press4").prop('disabled',false);
//						$("#text5").prop('disabled',false);
////					}else{
//						$("#temp1").prop('hidden',false);
//						$("#submit_Press4").prop("disabled",true);
//						$("#text5").prop("disabled",true);
//						
//						 tzt = paper.text(x+510,y+127,digiPressure).attr({'stroke' : '#000' , "font-size":"18px","font-weight": "bold"});
//						 rect1.attr({"fill":"#deb1c0"});
//					}
//				
//
//			
////			}else{
//				(".modal-header").html("Error Message");
//			$(".modal-header").css("background","#9c1203b0");
//			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
//			$("#MsgModal").html("Enter pressure range between 0.001 to 0.1 torr");
////				alert("Select pressure range between 0.001 to 0.1 torr");
////			}
//			
////			}
//		});
//		
//		
//		var tempVal1 = 0;
//		$("#submit_Press5").click(function() {
//			tempVal1 = parseFloat($("#text6").val());
//			if(tempVal1==""){
//			 $(".modal-header").html("Error Message");
//			$(".modal-header").css("background","#9c1203b0");
//			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
//			$("#MsgModal").html("Enter the value between 50 to 60 &#176;K");	
//			}else{
//			if(tempVal1 >=50 && tempVal1<=60){
//				$("#submit_Press5").prop("disabled",true);
//				$("#text6").prop("disabled",true);
//				$("#nextReading3").prop("disabled",false);
//				random();
//			}else{
//				$(".modal-header").html("Error Message");
//			$(".modal-header").css("background","#9c1203b0");
//			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
//			$("#MsgModal").html("Enter the value between 50 to 60 &#176;K");
////				alert("Enter the value between 50 to 60 degree C");
//			}
//			}
//		});		   
    
    var rxVal1 = 0;
    
    
//    $("#nextReading3").click(function() {
//	
//	if(itr<5){
//	$("#nextReading3").prop("disabled",true);
//	$("#nextReading4").prop("disabled",false);
//			
//	calout1(); 
//	addFun1();
//	}else{
//		$("#nextReading3").prop("disabled",true);
//		$("#nextReading5").prop("hidden",false);
//		$("#nextReading4").prop("hidden",true);
//		calout1(); 
//	addFun1();
//	}       
//});


//     $("#nextReading4").click(function() {
//	
//	$("#nextReading3").prop("disabled",false);
//	$("#nextReading3").prop("disabled",true);
//	$("#nextReading4").prop("disabled",true);
//	 $("#text5").prop("disabled",false);    
//	 $("#submit_Press4").prop("disabled",false);
//	 $("#temp1").prop("hidden",true);
//	 
//	 $("#text6").prop("disabled",false);    
//	 $("#submit_Press5").prop("disabled",false); 
//	       
//		
//		tzt.remove();
//		rx2_txt1.remove();
//		txt1Second.remove();
//		rect1.attr({"fill":"#fff"});
//		rx2_txt1 =  paper.text(x+335,y+100," ");
//		r1.attr({"fill":"#000"});
//		  $("#text5").val('');
//	 $("#text6").val('');  
//	       
//});


//$("#nextReading5").click(function() {
//	
//	tableGraph();
//	
//});
  var rnum = 0 , rnum1 = 0;  
  var rx2 = 0 , rx22 = 0 ;
  var rx3 = 0 , rnum2 = 0;
  var rx2_txt1= paper.text(x+335,y+100," ");
  var ranAdd = 0 ,ranAdd1 = 0 , ranMul = 0;
  var set;
  var rx12 = 0;
function random(){
	var rmin = 0.002 ; var rmax = 0.004;
   rnum1 = (Math.random() * (rmax -rmin) + rmin);
   rnum2 = rnum1.toFixed(4);
   rnum = parseFloat(rnum2);
   digiPressure1 = parseFloat(digiPressure);
   rxVal1 = 0.953*digiPressure1+0.0137*tempVal+61.8;
            kt1 = (1/rxVal1)*1000;
            
           var kt12 = kt1.toFixed(4);
			kt1 = parseFloat(kt12)+parseFloat(140);
		   set = Math.floor(Math.random() * 2);
			if(set==1){
			ranAdd1 = parseFloat(kt1)+parseFloat(rnum);
			}else{
			ranAdd1 = parseFloat(kt1)-parseFloat(rnum);	
			}
//			ranAdd1 = kt1.toFixed(4);
            ranMul = ranAdd1.toFixed(4);
//            ranAdd = ranMul+rnum;
            ranAdd = parseFloat(ranMul);
            rx22 = ranAdd.toFixed(4);
            rx2 = parseFloat(rx22);
       rx2_txt1= paper.text(x+345,y+100," : "+rx2).attr({'stroke' : '#000' , "font-size":"16px","font-weight": "bold"});     
       
       
       var rxVal = 0.953*digiPressure1+0.0137*tempVal+61.8;
	   var	kt11 = 1/rxVal;
		var	rxConvert = kt11*1000;
	     var	rx11 = rxConvert.toFixed(4);
			rx12 = parseFloat(rx11)+parseFloat(140);
       
}
var voutSecond = 0;

function calout1(){
	       random();
			a1 = r+ranAdd;
			a = (ranAdd/a1);
			console.log("value of first term "+a);
			b1 = r+r;
			b = r/b1;
			console.log("value of second term "+b);
			vout1 = a-b;
			console.log("value of substraction "+vout1);
			vout2 = (vin * vout1);
			vout3 = (vout2*1000).toFixed(2);
			voutSecond =  parseFloat(vout3);
			console.log("value of output "+voutSecond);
		txt1Second = paper.text(x+101,y+170,voutSecond).attr({"font-size":24,"font-family":"digital-clock-font","fill":"#dceb44","font-weight":"bold"});
			
		}
		
		var rxRan = 0;
		var rxRan111 = 0;
function addFun1(){
	           var rxRan1 = rx2.toFixed(4);
	               rxRan = parseFloat(rxRan1);
	            
	            var rxRan11 = rx12.toFixed(4)
	               rxRan111 = parseFloat(rxRan11);
	               
	                         tempJson={};
							 tempJson.pressure1 = digiPressure;							 
							 tempJson.temperature1 = tempVal;
							 tempJson.calResis = rxRan111;
							 tempJson.resistance1 = rxRan;
							 tempJson.outputVoltage1 = voutSecond;
							 tempJson.pressure1Sort = digiPressure;
							  arrayJson1.push(tempJson);
							  
							   console.log(arrayJson1);
							   masterJson.demo1=arrayJson1;
							  masterJson.demo1.sort(function(a, b){
						  return a.pressure1Sort - b.pressure1Sort;
						  });						   
							  digiTable();


							   console.log(masterJson);
}

function temperatureValues1(){
			
			if(digiPressure==0.1){
				tempVal = 50;
			}else if(digiPressure == 0.09||digiPressure==0.08){
				tempVal = 50.1;
			}else if(digiPressure == 0.07||digiPressure==0.06){
				tempVal = 50.2;
			}else if(digiPressure == 0.05||digiPressure==0.04){
				tempVal = 50.3;
			}else if(digiPressure == 0.03||digiPressure==0.02){
				tempVal = 50.4;
			}else if(digiPressure == 0.01||digiPressure==0.009){
				tempVal = 50.5;
			}else if(digiPressure == 0.008){
				tempVal = 50.6;
			}else if(digiPressure == 0.007||digiPressure==0.006){
				tempVal = 50.7;
			}else if(digiPressure == 0.005||digiPressure==0.004){
				tempVal = 50.8;
			}else if(digiPressure == 0.003||digiPressure==0.002){
				tempVal = 50.9;
			}else if(digiPressure == 0.001){
				tempVal = 51;
			}
			
		}
 
}