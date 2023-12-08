
var tableMainDiv;
function digiTable(){
	
	
							
						
	 tableMainDiv = '<div class="row ">'
					+'<div class="col-sm-12">'
			        + '<table class=" table table-bordered " style="margin:10px; text-align: center">'
					+ ' <thead>'
					+ '  <tr style = "BACKGROUND-COLOR: #072647; color:#fff; ">'
					+ '  <th><center>Sr.No</center></th>'
					+ '  <th><center>Pressure (torr)</center></th>'
					+ '   <th><center>Temperature (&#176;K) </center></th>'
					+ '  <th><center>Resistance Rx (m&ohm;)</center> </th>'
                    + '  <th><center>Output Vout (mV)</center> </th>'
					+ '   </tr>'
					+ '  </thead>'
					+ '   <tbody>'
					 
					
					for(i=0,p=1;i<masterJson.demo1.length;i++,p++)
						{
						tableMainDiv+='    <tr>'
							+'		<td>'+p+'</td>'
							+'      <td>'+masterJson.demo1[i].pressure1+'</td>'
							+'      <td>'+masterJson.demo1[i].temperature1+'</td>'
							+'      <td>'+masterJson.demo1[i].resistance1+'</td>'
			     			+'      <td>'+masterJson.demo1[i].outputVoltage1+'</td>'
				
							+'    </tr>'
							
						}
						
			
						
						
						
					$("#table-design").html(tableMainDiv);	
                    itr++;
}