function config1(){
	$("#main-div-conf").html('');	
     $("#canvas-div").html('');	
     
      $("#centerText1").html('CONFIGURATION');
      $("#centerText2").html('DIAGRAM');
      
      var htm = '<img src="images/Pirani-Gauge.png" class="img-fluid" >'
      $("#canvas-div").html(htm);
      
      var btn = '<div class="col-sm-12">'
                +'<button type="button" style="padding: 10px; "  class="btn btn-danger btnStyle" id="nextLevelForCal" data-toggle="modal" data-target="#selectCheck" ><b>NEXT LEVEL</b></button>'
                +'</div>'
                $("#main-div-conf").html(btn);
                
      $("#nextLevelForCal").click(function() {
//	calculate();
calculate();
});          
}