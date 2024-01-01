var tableMainDiv1;

function tableReading(){
	
	 tableMainDiv1 = '<div class="row ">'
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
					 
					
					for(i=0,p=1;i<masterJson.demo.length;i++,p++)
						{
						tableMainDiv1+='    <tr>'
							+'		<td>'+p+'</td>'
							+'      <td>'+masterJson.demo[i].pressure+'</td>'
							+'      <td>'+masterJson.demo[i].temperature+'</td>'
							+'      <td>'+masterJson.demo[i].resistance+'</td>'
			     			+'      <td>'+masterJson.demo[i].outputVoltage+'</td>'
				
							+'    </tr>'
							
						}
						
						
						
						
					$("#table-design").html(tableMainDiv1);	
	iteration++;
}