
			var flag = false;
			var myRadio = null;
			
			 counterMasterJson = {};
           var ansCount = 0;
			
			var questions = '';
			questions += ''
				+ '<div id = "questionDiv">'

			for (var i = 0; i < QuestionsJSON.data["SEC"].length; i++) {

				for (var j = 0; j < QuestionsJSON.data["SEC"][0].QUES.length; j++) {

					questions += '<div class="col-md-12">'
						+ '<br><span class="queno">Question No : ' + (i + 1) + '</span>'
						+ '<br><div class="queTitle">'

						+ QuestionsJSON.data["SEC"][i].QUES[j].QC
						+ '</div>'

					for (var k = 0; k < QuestionsJSON.data["SEC"][i].QUES[j].ANS.length; k++) {

						questions += '<div>'
							+ '<div class="ansTitle col-md-6">'

							+ "<input class='radioType'  name='radio-" + i + "' id='" + i + "' ANSID='" + QuestionsJSON.data["SEC"][i].QUES[j].ANS[k].ANSID + "' type='radio'"
							+ "' value='"
							+ QuestionsJSON.data["SEC"][i].QUES[j].ANS[k].content
							+ "' >"
							+ '<p style="margin: -20px 0 8px 29px;font-size: 18px;">'
							+ QuestionsJSON.data["SEC"][i].QUES[j].ANS[k].content
							+ '</p>'

							+ '</div>'
							+ '</div>'
					}
					questions += '</div>'
				}
			}

			questions += '<div class="buttonDiv">'
				+ '<button  class="btn btn-danger" data-toggle="modal" data-target="#myModal" id="testSubmit">Submit Test</button>'
		        + '<button  class="btn btn-danger" id="nextLevelConfig" hidden>Next Level</button>'
			    + '</div>'	
				

//				+ ' <!-- Modal -->'
//				+ '<div class="modal fade" id="myModal" role="dialog">'
//				+ ' <div class="modal-dialog modal-md">'
//				+ '    <div class="modal-content">'
//				+ '     <div class="modal-header">'
//				
//				+ '       <h4 class="modal-title">Message box</h4>'
//				+ '       <button type="button" class="close" data-dismiss="modal" style="color:#fff;">&times;</button>'
//				+ '     </div>'
//				+ '     <div class="modal-body">'
//				+ '       <p id="modelMsg">This is a small modal.</p>'
//				+ '     </div>'
//				+ '     <div class="modal-footer">'
//				+ '       <button type="button" class="btn btn-danger" id = "nextPage" data-dismiss="modal" >Okay</button>'
//				+'</style>'
//				+ '     </div>'
//				
//				+ '   </div>'
//				+ ' </div>'
//				+ '</div>'
//				

//				+ ' </div>'	
		

			$("#main-div-conf").html(questions);

			$('#testSubmit').on('click', function() {		
				$("body").css("padding","0px 0px 0px 0px");

					var arr = [];
					
					for (var i = 0; i < QuestionsJSON.data["SEC"].length; i++) {

						var qid = $('input[name=radio-' + i + ']').attr(
							'id');

						var ansId = $('input[name=radio-' + i + ']:checked').attr(
							'ANSID');

						myRadio = $(
							'input[name=radio-' + i + ']:checked')
							.val();

						if (myRadio == null) {
							flag = flag && false;
//							alert('Please attempt all the questions');
							$("body").css("padding","0px");
							$(".modal-header").html("Error Message");
							$(".modal-header").css("background","#9c1203b0");
							$("#btnModal").removeClass("btn-success").addClass("btn-danger");
							$("#MsgModal").html("Please attempt all the questions");
//							$("#modelMsg").html("<b class='boldTextRed'>Please attempt all the questions.</b>");
							break;
						}
						arr.push({
							"QID": qid,
							"ANS": myRadio,
							"ANSId": ansId
						});
					}

					var ansCount = 0;

					if (myRadio != null) {
						for (var i = 0; i < arr.length; i++) {
							if (arr[i].ANSId == "true") {
								ansCount++;
							}
						}
						var wrongAns = 6-ansCount;
                         var tempCountJson ={};
						tempCountJson.correctAnswer = ansCount; 
						tempCountJson.wrongAnswer = wrongAns; 
						counterMasterJson.questionary = tempCountJson;
						 console.log(counterMasterJson);
						
						 $("#btnModal").removeClass("btn-danger").addClass("btn-success");
	                     $(".modal-header").html("Success Message");
				         $(".modal-header").css("background","#5cb85c");
						 $("#MsgModal").html("Test Submitted Successfully .<br> Number of Correct Answers  : " + ansCount);
//						 $("#modelMsg").html("<b class='boldTextGreen'>Test Submitted Successfully .<br> Number of Correct Answers  : " + ansCount+"</b>");
                         $('#nextLevelConfig').prop('hidden',false);
						 
						    $('#testSubmit').prop('hidden',true); 

		   			
					}
					
					$('#nextLevelConfig').on('click', function() {	
						 
//	      if(ansCount != 0){
		$("#main-div-conf").html("");
//				  $("#main-div-conf").html('<img src="images/loadCellMerge.png"  width="100%" height="60%" class="img-fluid" >');
				$("#canvas-div").html("");
				$("#main-div-conf").html(""); 
//				  config1();
//     calculate();
     wheatStoneCon();
//       digitalMeter();
//	} 
	});	
					
});

	
	
