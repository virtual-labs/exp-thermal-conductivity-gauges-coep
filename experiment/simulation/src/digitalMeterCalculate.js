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
		var r = 15;
		var a1 = 0, b1 = 0;
		var a = 0, b = 0;
		var vout1 = 0 , vout = 0;
		var vout2 = 0;
      
        var paper = new Raphael(document.getElementById('main-div-conf'),800,500);
       var x = 100;
       var y = 100;
	 wheatStone_img = paper.image("images/wheatstone.png",(x-50), (y+30),900, 600);
//	 var r1 = paper.circle(x+110,y+170,30).attr({'stroke' : '#000' , 'stroke-width' : 3 ,'fill':"#fff"}).toFront();

     var r1 = paper.rect(x+75,y+150,60,40,5).attr({'stroke' : '#706e6f' , 'stroke-width' : 6 ,'fill':"#000"}).toFront();

	 var rect1 = paper.rect(x+480,y+110,60,40).attr({'stroke' : '#000' , 'stroke-width' : 3 });
	 var txt = paper.text(x+510,y+90,"Vaccum").attr({'stroke' : '#000' , "font-size":"20px","font-weight": "bold"});
	 var rx_txt1= paper.text(x+290,y+100,"Rx").attr({'stroke' : '#000' , "font-size":"20px","font-weight": "bold"});
	 var volt_text = paper.text(x-43,y+190,vin+"V").attr({'stroke' : '#000' , "font-size":"20px","font-weight": "bold"});
	 var r1txt = paper.text(x+25,y+110,"R2 :"+r+"").attr({'stroke' : '#000' , "font-size":"20px","font-weight": "bold"});
     var r2txt = paper.text(x+25,y+235,"R3 :"+r+"").attr({'stroke' : '#000' , "font-size":"20px","font-weight": "bold"});
     var r3txt = paper.text(x+190,y+235,"R1 :"+r+"").attr({'stroke' : '#000' , "font-size":"20px","font-weight": "bold"});
    
     var pressVal1 = '<div class="row" id="pressVal1" >'
				   +'<div class="col-sm-5">'
				   +'<label  id=""  class="" style="font-size:16px;margin:15px 10px ;">Enter pressure (torr) :   </label>'
				   +'</div>'
				   +'<div class="col-sm-3">'
					+'<input type="text" value="" id="text5"  style=margin:15px 10px;width:150%;height:50%;"  class=" form-control" />'
				   +'</div>'
				    +'<div class="col-sm-3">'
				   +'<br><button type="submit" class="btn btn-danger"  id="submit_Press4" style="width:100%;height:50%;margin-top: -6px;" >Submit</input>'
				   +'</div>'
				   +'</div>'
				  
				   
				   +'<div class="row" id="temp1" hidden>'
				   +'<div class="col-sm-5">'
				   +'<label  id=""  class="" style="font-size:16px;margin:15px 10px ;">Enter temperature (&#176; K):  </label>'
				   +'</div>'
				   +'<div class="col-sm-3">'
					+'<input type="text" value="" id="text6"  style=margin:15px 10px;width:150%;height:50%;"  class=" form-control" />'
				   +'</div>'
				    +'<div class="col-sm-3">'
				   +'<br><button type="submit" class="btn btn-danger"  id="submit_Press5" style="width:100%;height:50%;margin-top: -6px;" >Submit</input>'
				   +'</div>'
				   +'</div>'
				    +'<div class="row">'
				   +'<div class="col-sm-6">'
				    
	                +'<button type="button" style="padding: 10px; "  class="btn btn-danger btnStyle" id="nextReading3" data-toggle="modal" data-target="#selectCheck" hidden><b>SUBMIT </b></button>'
	               
	               
	                 +'</div>'
	                +'<div class="col-sm-6">'
	                +'<button type="button" style="padding: 10px; "  class="btn btn-danger btnStyle" id="nextReading4" data-toggle="modal" data-target="#selectCheck" hidden><b>NEXT READING </b></button>'
	                +'<button type="button" style="padding: 10px; "  class="btn btn-danger btnStyle" id="nextReading5" data-toggle="modal" data-target="#selectCheck" hidden><b>FINISHED </b></button>'

                    +'</div>'
                    +'</div>'
	                +'<br>'
				   
				   
		$("#canvas-div").html(pressVal1);
		var digiPressure = 0;
		var arrWeight1 = [];
		
		$("#submit_Press4").click(function(){
			digiPressure = parseFloat($("#text5").val());
			if(digiPressure>=0.001 && digiPressure<=0.1){
				
				 const index = arrWeight1.indexOf(digiPressure);
                   arrWeight1.push(digiPressure);
					var hasDuplicate = arrWeight1.some((digiPressure, i) => arrWeight1.indexOf(digiPressure) !== i);
					
					console.log("hasDuplicate"+hasDuplicate);
					if(hasDuplicate == true){
						dupFlg = 0;
						
					   alert("Avoid Duplicates");
					  arrWeight1.splice(index,1);
					  $("#submit_press4").prop('disabled',false);
						$("#text5").prop('disabled',false);
					}else{
						$("#temp1").prop('hidden',false);
						$("#submit_Press4").prop("disabled",true);
						$("#text5").prop("disabled",true);
						
						 tzt = paper.text(x+510,y+127,digiPressure).attr({'stroke' : '#000' , "font-size":"18px","font-weight": "bold"});
						 rect1.attr({"fill":"#deb1c0"});
					}
				

			
			}else{
				alert("Select pressure range between 0.001 to 0.1 torr");
			}
			
			
		});
		
		
		var tempVal1 = 0;
		$("#submit_Press5").click(function() {
			tempVal1 = parseFloat($("#text6").val());
			if(tempVal1 >=50 && tempVal1<=60){
				$("#submit_Press5").prop("disabled",true);
				$("#text6").prop("disabled",true);
				$("#nextReading3").prop("hidden",false);
				random();
			}else{
				alert("Enter the value between 50 to 60 degree C");
			}
		});		   
    
    var rxVal1 = 0;
    
    
    $("#nextReading3").click(function() {
	
	if(itr<5){
	$("#nextReading3").prop("disabled",true);
	$("#nextReading4").prop("hidden",false);
			
	calout1(); 
	addFun1();
	}else{
		$("#nextReading5").prop("hidden",false);
		$("#nextReading4").prop("hidden",true);
		calout1(); 
	addFun1();
	}       
});


     $("#nextReading4").click(function() {
	
	$("#nextReading3").prop("disabled",false);
	$("#nextReading3").prop("hidden",true);
	$("#nextReading4").prop("hidden",true);
	 $("#text5").prop("disabled",false);    
	 $("#submit_Press4").prop("disabled",false);
	 $("#temp1").prop("hidden",true);
	 
	 $("#text6").prop("disabled",false);    
	 $("#submit_Press5").prop("disabled",false); 
	       
		
		tzt.remove();
		rx2_txt1.remove();
		txt1Second.remove();
		rect1.attr({"fill":"#fff"});
		rx2_txt1 =  paper.text(x+335,y+100," ");
		r1.attr({"fill":"#000"});
		   
	       
});


$("#nextReading5").click(function() {
	
	 $("#text5").val('');
	 $("#text6").val('');
	alert("Successfully Calculated Standard Values and Actual Values.");	
});
  var rnum = 0 , rnum1 = 0;  
  var rx2 = 0 , rx22 = 0 ;
  var rx3 = 0 , rnum2 = 0;
  var rx2_txt1= paper.text(x+335,y+100," ");
  var ranAdd = 0 ,ranAdd1 = 0 , ranMul = 0;
function random(){
	var rmin = 0.003 ; var rmax = 0.006;
   rnum1 = (Math.random() * (rmax -rmin + 1) + rmin);
   rnum2 = rnum1.toFixed(4);
   rnum = parseFloat(rnum2);
   
   rxVal1 = 0.953*digiPressure+0.0137*tempVal1+61.8;
			kt1 = 1/rxVal1;
			ranAdd1 = parseFloat(kt1.toFixed(4));
            ranMul = ranAdd1*1000;
            ranAdd = ranMul+rnum;
            rx22 = ranAdd.toFixed(4);
            rx2 = parseFloat(rx22);
       rx2_txt1= paper.text(x+335,y+100," : "+rx2).attr({'stroke' : '#000' , "font-size":"18px","font-weight": "bold"});     
       
}
var voutSecond = 0;

function calout1(){
			a1 = r+rx2;
			a = (rx2/a1).toFixed(4);
			console.log("value of first term "+a);
			b1 = r+r;
			b = r/b1.toFixed(4);
			console.log("value of second term "+b);
			vout1 = a-b;
			console.log("value of substraction "+vout1);
			vout2 = (vin * vout1).toFixed(4);
			vout3 = vout2*1000;
			voutSecond =  parseFloat(vout3);
			console.log("value of output "+voutSecond);
		txt1Second = paper.text(x+101,y+170,voutSecond).attr({"font-size":24,"font-family":"digital-clock-font","fill":"#dceb44","font-weight":"bold"});
			
		}
		
		
function addFun1(){
	                         tempJson={};
							 tempJson.pressure1 = digiPressure;							 
							 tempJson.temperature1 = tempVal1;
							 tempJson.resistance1 = rx2;
							 tempJson.outputVoltage1 = voutSecond;
							  arrayJson1.push(tempJson);
							   console.log(arrayJson1);
							   masterJson.demo1=arrayJson1;							   
							  digiTable();
							  $("#text5").val('');
	                           $("#text6").val('');

							   console.log(masterJson);
}
 
}