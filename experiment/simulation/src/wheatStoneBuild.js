var invalidConnCnt = 0;

function wheatStoneCon(){

//function wheatStoneCon(){

$("#canvas-div").html('');
$("#main-div-conf").html('');

$("#delete-btn").prop("hidden",false);
$("#validateCon").prop("hidden",false);


$("#centerText2").html('SELECT THE COMPONENTS');
$("#centerText1").html('CONNECT THE PORTS OF WHEATSTONE BRIDGE');

 
    

    // Call the function on window resize
//    window.addEventListener('resize', resizeDivs);

const myDiv = document.getElementById('canvas-div'); // Or use querySelector if needed

// Step 3: Change the size of the div
myDiv.style.width = '100%';   // Set the width to 90% of the parent
myDiv.style.height = '50vh'; // Set the height to 30% of the viewport height
//myDiv.style.color = "lightgrey";
//myDiv.style.margin = "20px auto"; // Center horizontally with auto margins
myDiv.style.position = "relative";

const myDiv1 = document.getElementById('main-div-conf'); // Or use querySelector if needed

// Step 3: Change the size of the div
myDiv1.style.width = '100%';   // Set the width to 90% of the parent
myDiv1.style.height = '80vh'; // Set the height to 60% of the viewport height


/**const myDiv = document.getElementById('canvas-div'); // Or use querySelector if needed
    
    // Step 3: Change the size of the div
    myDiv.style.width = '900px';  // Set the width
    myDiv.style.height = '300px'; // Set the height
//    myDiv.style.color="lightgrey";
      myDiv.style.margin= "20px";
           myDiv.style.position = "relative";
const myDiv1 = document.getElementById('main-div-conf'); // Or use querySelector if needed
    
    // Step 3: Change the size of the div
    myDiv1.style.width = '900px';  // Set the width
    myDiv1.style.height = '600px'; // Set the height **/   
    

// Add a global mouseup event listener to remove the shadow line
document.addEventListener('mouseup', () => {
    if (shadowLine) {
        shadowLine.remove();
        shadowLine = null;
    }
});

// Original code below
const shapeLibrary = Raphael("canvas-div", "100%", "100%");
const canvas = Raphael("main-div-conf", "100%", "100%");

let selectedShape = null;
let connectionStart = null;
let selectedConnection = null;
let connections = [];
let addedImages = new Set();
let dots = [];
let isDraggingDot = false;
let draggedDot = null;
let shadowLine = null; // Declare shadowLine here

// Images setup
const images = [
    {
        src: "images/powerSupply.png",
        dots: [
            { id: "dot1", xOffset: 135, yOffset: 72 },
            { id: "dot2", xOffset: 135, yOffset: 98 }
        ],
        width: 200, height: 200, x: 50, y: 50
    },
    {
        src: "images/wheatStoneOutline1.png",
        dots: [
            { id: "dot3", xOffset: 100, yOffset: 12 },
            { id: "dot5", xOffset: 100, yOffset: 194 },
            { id: "dot4", xOffset: 5, yOffset: 103 },
            { id: "dot6", xOffset: 195, yOffset: 103 }
        ],
        width: 220, height: 220, x: 280, y: 40
    },
    {
	 src: "images/outVolt.png",
        dots: [
            { id: "dot8", xOffset: 77, yOffset: 20 },
            { id: "dot7", xOffset: 2, yOffset: 20 }
        ],
        width: 80, height: 40, x: 100, y: 240
//        src: "images/outputVolt.png",
//        dots: [
//            { id: "dot8", xOffset: 77, yOffset: 20 },
//            { id: "dot7", xOffset: 2, yOffset: 20 }
//        ],
//        width: 80, height: 40, x: 560, y: 115
    }
];

images.forEach((image) => {
    const img = shapeLibrary.image(image.src, image.x, image.y, image.width, image.height);
    img.data("dots", image.dots);

    img.node.addEventListener('mousedown', (event) => {
        event.preventDefault();

        if (addedImages.has(image.src)) {
            return;
        }

        const cursorPosition = getCursorPosition(event);
        const newShape = canvas.image(image.src, cursorPosition.x, cursorPosition.y, image.width, image.height).attr(img.attrs);

        addedImages.add(image.src);
        newShape.drag(onMoveCanvas, onStartCanvas, onEndCanvas);
        newShape.node.addEventListener('click', (e) => {
            e.stopPropagation();
            if (selectedShape) {
                // Hide border of the previously selected shape
            }
            selectedShape = newShape;
            selectedConnection = null;
        });

        const dotsData = img.data("dots");
        const dots = createDotsForShape(newShape, dotsData);

        dots.forEach(dot => {
            dot.drag(onMoveCanvasDot, onStartCanvasDot, onEndCanvasDot);
            dot.node.addEventListener('mousedown', (e) => handleDotDragStart(e, dot));
            dot.node.addEventListener('mouseup', (e) => handleDotDragEnd(e, dot));
        });

        newShape.data("dots", dots);
        
        
    });
});


document.getElementById('delete-btn').addEventListener('click', () => {
	actFlg = 0;
    if (selectedShape) {
        const dots = selectedShape.data("dots");
        dots.forEach(dot => {
            connections = connections.filter(({ connection, start, end }) => {
                if (start === dot || end === dot) {
                    connection.remove();
                    return false;
                }
                return true;
            });
            dot.remove();
        });
        addedImages.delete(selectedShape.attr("src")); // Remove from the added images set
        selectedShape.remove();
        selectedShape = null;
    } else if (selectedConnection) {
        selectedConnection.connection.remove();
        connections = connections.filter(({ connection }) => connection !== selectedConnection.connection);
        selectedConnection = null;
    }
});


var actFlg = 0;
var idd = 1;


function checkAllConnections() {  
    let allValid = true;  // Assume all connections are valid initially  
    let requiredConditionsMet = {  
        dot1ToDot4: false,  
        dot2ToDot6: false,  
        dot1ToDot3: false,  
        dot2ToDot5: false,  
        dot3ToDot7: false,  // For the first combination  
        dot5ToDot8: false,  // For the first combination  
        dot4ToDot7: false,  // For the second combination  
        dot6ToDot8: false,   // For the second combination  
        dot1ToDot6: false,
        dot2ToDot4: false,
        dot1ToDot5: false,
        dot2ToDot3: false
    };  

    // Check each connection  
    connections.forEach(({ start, end }) => {  
        const startId = start.data("id");  
        const endId = end.data("id");  

        // Check if the connection is valid  
        const isValidConnection = validConnections[startId] && validConnections[startId].includes(endId);  

        if (!isValidConnection) {  
            allValid = false;  // If any connection is invalid, set the flag to false  
//            console.log(`Invalid connection between ${startId} and ${endId}`);  
        } else {  
//            console.log(`Valid connection between ${startId} and ${endId}`);  

            // Track required specific connections  
            if ((startId === 'dot1' && endId === 'dot4') || (startId === 'dot4' && endId === 'dot1')) {  
                requiredConditionsMet.dot1ToDot4 = true;  // dot1 is connected to dot4  
            }  
            if ((startId === 'dot2' && endId === 'dot6') || (startId === 'dot6' && endId === 'dot2')) {  
                requiredConditionsMet.dot2ToDot6 = true;  // dot2 is connected to dot6  
            }  
            if ((startId === 'dot1' && endId === 'dot3') || (startId === 'dot3' && endId === 'dot1')) {  
                requiredConditionsMet.dot1ToDot3 = true;  // dot1 is connected to dot3  
            }  
            if ((startId === 'dot2' && endId === 'dot5') || (startId === 'dot5' && endId === 'dot2')) {  
                requiredConditionsMet.dot2ToDot5 = true;  // dot2 is connected to dot5  
            } 
            
            if ((startId === 'dot1' && endId === 'dot6') || (startId === 'dot6' && endId === 'dot1')) {  
                requiredConditionsMet.dot1ToDot6 = true;  // dot2 is connected to dot5  
            }
            if ((startId === 'dot2' && endId === 'dot4') || (startId === 'dot4' && endId === 'dot2')) {  
                requiredConditionsMet.dot2ToDot4 = true;  // dot2 is connected to dot5  
            }
            if ((startId === 'dot1' && endId === 'dot5') || (startId === 'dot5' && endId === 'dot1')) {  
                requiredConditionsMet.dot1ToDot5 = true;  // dot2 is connected to dot5  
            }  
            if ((startId === 'dot2' && endId === 'dot3') || (startId === 'dot3' && endId === 'dot2')) {  
                requiredConditionsMet.dot2ToDot3 = true;  // dot2 is connected to dot5  
            }        

            // Additional connections for the first and second combinations  
            if ((startId === 'dot3' && endId === 'dot7') || (startId === 'dot7' && endId === 'dot3')) {  
                requiredConditionsMet.dot3ToDot7 = true;  // dot3 is connected to dot7  
            }  
            if ((startId === 'dot5' && endId === 'dot8') || (startId === 'dot8' && endId === 'dot5')) {  
                requiredConditionsMet.dot5ToDot8 = true;  // dot5 is connected to dot8  
            }  
            if ((startId === 'dot4' && endId === 'dot7') || (startId === 'dot7' && endId === 'dot4')) {  
            requiredConditionsMet.dot4ToDot7 = true;  
  
        } 
//        else {  
//            console.log("No valid connection between dot4 and dot7 found.");  
//        }  
            if ((startId === 'dot6' && endId === 'dot8') || (startId === 'dot8' && endId === 'dot6')) {  
                requiredConditionsMet.dot6ToDot8 = true;  // dot6 is connected to dot8  
            }  
        }  
    });  

    // Check if the first combination is valid  
    const isFirstCombinationValid = requiredConditionsMet.dot1ToDot4 && requiredConditionsMet.dot2ToDot6;  
    // Check if the second combination is valid  
    const isSecondCombinationValid = requiredConditionsMet.dot1ToDot3 && requiredConditionsMet.dot2ToDot5;
    const isThirdCombinationValid = requiredConditionsMet.dot1ToDot6 && requiredConditionsMet.dot2ToDot4;
    const isForthCombinationValid = requiredConditionsMet.dot1ToDot5 && requiredConditionsMet.dot2ToDot3;   

    // Debugging information  
//    console.log("isFirstCombinationValid: ", isFirstCombinationValid);  
//    console.log("isSecondCombinationValid: ", isSecondCombinationValid);  
//    console.log("requiredConditionsMet: ", requiredConditionsMet);  

    // Handling the first combination 
    if(idd<=3){ 
    if (isFirstCombinationValid) {  
        // Also check for dot1 to dot3 and dot2 to dot5 alongside other requirements  
        if (!requiredConditionsMet.dot3ToDot7 || !requiredConditionsMet.dot5ToDot8) {  
            allValid = false;  
            $(".modal-header").html("Error Message");
			$(".modal-header").css("background","#9c1203b0");
			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
			$("#MsgModal").html("The digital meter's input and output connections are incorrect.");
//            ("First combination is valid, but the required additional connections (dot3 to dot7 and dot5 to dot8) are missing.");  
//            return; // Exit the function here
              invalidConnCnt++;
        } else { 
	        $("#btnModal").removeClass("btn-danger").addClass("btn-success");
	        $(".modal-header").html("Success Message");
            $(".modal-header").css("background","#5cb85c");
			$("#MsgModal").html("All connections are valid and all ports are connected!"); 
			            var tempCountJson ={};
						tempCountJson.invalidCnt = invalidConnCnt; 						
						counterMasterJson.constLib = tempCountJson;
           calculate();
//            return; // Exit the function here since the first combination is valid  
        }  
    }  else

    // Handling the second combination  
    if (isSecondCombinationValid) {  
        if (!requiredConditionsMet.dot4ToDot7 || !requiredConditionsMet.dot6ToDot8) { 
	 allValid = false;  
            $(".modal-header").html("Error Message");
			$(".modal-header").css("background","#9c1203b0");
			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
			$("#MsgModal").html("The digital meter's input and output connections are incorrect.");
	       invalidConnCnt++;
//            return; // Exit the function here  
        } else {  
            $("#btnModal").removeClass("btn-danger").addClass("btn-success");
	        $(".modal-header").html("Success Message");
            $(".modal-header").css("background","#5cb85c");
			$("#MsgModal").html("All connections are valid and all ports are connected!");
			 var tempCountJson ={};
						tempCountJson.invalidCnt = invalidConnCnt; 						
						counterMasterJson.constLib = tempCountJson;  
//            return; // Exit the function since the second combination is valid 
           calculate();
        }  
    } else
    
    if (isThirdCombinationValid) {  
        if (!requiredConditionsMet.dot3ToDot7 || !requiredConditionsMet.dot5ToDot8) { 
	 allValid = false;  
            $(".modal-header").html("Error Message");
			$(".modal-header").css("background","#9c1203b0");
			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
			$("#MsgModal").html("The digital meter's input and output connections are incorrect.");            
	       invalidConnCnt++;
//            return; // Exit the function here  
        } else {  
           $("#btnModal").removeClass("btn-danger").addClass("btn-success");
	        $(".modal-header").html("Success Message");
            $(".modal-header").css("background","#5cb85c");
			$("#MsgModal").html("All connections are valid and all ports are connected!");
			 var tempCountJson ={};
						tempCountJson.invalidCnt = invalidConnCnt; 						
						counterMasterJson.constLib = tempCountJson;
			calculate();
//            return; // Exit the function since the second combination is valid  
        }  
    } else
       if (isForthCombinationValid) {  
        if (!requiredConditionsMet.dot4ToDot7 || !requiredConditionsMet.dot6ToDot8) { 
	 allValid = false;  
            $(".modal-header").html("Error Message");
			$(".modal-header").css("background","#9c1203b0");
			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
			$("#MsgModal").html("The digital meter's input and output connections are incorrect.");            
	       invalidConnCnt++;
//            return; // Exit the function here  
        } else {  
           $("#btnModal").removeClass("btn-danger").addClass("btn-success");
	        $(".modal-header").html("Success Message");
            $(".modal-header").css("background","#5cb85c");
			$("#MsgModal").html("All connections are valid and all ports are connected!"); 
			 var tempCountJson ={};
						tempCountJson.invalidCnt = invalidConnCnt; 						
						counterMasterJson.constLib = tempCountJson;
			calculate();
//            return; // Exit the function since the second combination is valid  
        }  
    } else{
	     	$(".modal-header").html("Error Message");
			$(".modal-header").css("background","#9c1203b0");
			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
			$("#MsgModal").html("Some connections are invalid or the required conditions are missing.");
			invalidConnCnt++;
//	        alert("Neither the first nor second combination is valid.");  

}
}else{
	    
	     if (isFirstCombinationValid) {  
        // Also check for dot1 to dot3 and dot2 to dot5 alongside other requirements  
        if (!requiredConditionsMet.dot3ToDot7 || !requiredConditionsMet.dot5ToDot8) {  
            allValid = false;  
           invalidConnCnt++;
	        $(".modal-header").html("Appropriate Connection");
			$(".modal-header").css("background","#23435c");
			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
			modelImg = '<img src="images/wheatStoneCond1.png" class="img-responsive" alt="Cinque Terre">'
            $("#MsgModal").html(modelImg);
//            ("First combination is valid, but the required additional connections (dot3 to dot7 and dot5 to dot8) are missing.");  
//            return; // Exit the function here  
        } else { 
	        $("#btnModal").removeClass("btn-danger").addClass("btn-success");
	        $(".modal-header").html("Success Message");
            $(".modal-header").css("background","#5cb85c");
			$("#MsgModal").html("All connections are valid and all ports are connected!"); 
            typeCell = $("#typeCell").val();
             var tempCountJson ={};
						tempCountJson.invalidCnt = invalidConnCnt; 						
						counterMasterJson.constLib = tempCountJson;
				 calculate();
//            return; // Exit the function here since the first combination is valid  
        }  
    }  else

    // Handling the second combination  
    if (isSecondCombinationValid) {  
        if (!requiredConditionsMet.dot4ToDot7 || !requiredConditionsMet.dot6ToDot8) { 
	 allValid = false;  
           invalidConnCnt++;
	        $(".modal-header").html("Appropriate Connection");
			$(".modal-header").css("background","#23435c");
			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
			modelImg = '<img src="images/wheatStoneOP.png" class="img-responsive" alt="Cinque Terre">'
            $("#MsgModal").html(modelImg);
	       
//            return; // Exit the function here  
        } else {  
            $("#btnModal").removeClass("btn-danger").addClass("btn-success");
	        $(".modal-header").html("Success Message");
            $(".modal-header").css("background","#5cb85c");
			$("#MsgModal").html("All connections are valid and all ports are connected!");  
//            return; // Exit the function since the second combination is valid  
                        var tempCountJson ={};
						tempCountJson.invalidCnt = invalidConnCnt; 						
						counterMasterJson.constLib = tempCountJson;
             calculate();
        }  
    } else
    
    if (isThirdCombinationValid) {  
        if (!requiredConditionsMet.dot3ToDot7 || !requiredConditionsMet.dot5ToDot8) { 
	 allValid = false;  
           invalidConnCnt++;
	        $(".modal-header").html("Appropriate Connection");
			$(".modal-header").css("background","#23435c");
			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
			modelImg = '<img src="images/wheatStoneCond3.png" class="img-responsive" alt="Cinque Terre">'
            $("#MsgModal").html(modelImg);            
	       
//            return; // Exit the function here  
        } else {  
           $("#btnModal").removeClass("btn-danger").addClass("btn-success");
	        $(".modal-header").html("Success Message");
            $(".modal-header").css("background","#5cb85c");
			$("#MsgModal").html("All connections are valid and all ports are connected!");  
//            return; // Exit the function since the second combination is valid 
 var tempCountJson ={};
						tempCountJson.invalidCnt = invalidConnCnt; 						
						counterMasterJson.constLib = tempCountJson; 
            calculate();
        }  
    } else
       if (isForthCombinationValid) {  
        if (!requiredConditionsMet.dot4ToDot7 || !requiredConditionsMet.dot6ToDot8) { 
	 allValid = false;  
            
	        $(".modal-header").html("Appropriate Connection");
			$(".modal-header").css("background","#23435c");
			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
			modelImg = '<img src="images/wheatStoneCond4.png" class="img-responsive" alt="Cinque Terre">'
            $("#MsgModal").html(modelImg);          
	       invalidConnCnt++;
//            return; // Exit the function here  
        } else {  
           $("#btnModal").removeClass("btn-danger").addClass("btn-success");
	        $(".modal-header").html("Success Message");
            $(".modal-header").css("background","#5cb85c");
			$("#MsgModal").html("All connections are valid and all ports are connected!"); 
			 var tempCountJson ={};
						tempCountJson.invalidCnt = invalidConnCnt; 						
						counterMasterJson.constLib = tempCountJson;
			calculate();
//            return; // Exit the function since the second combination is valid  
        }  
    } else{
	     	
	        $(".modal-header").html("Appropriate Connection");
			$(".modal-header").css("background","#23435c");
			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
			modelImg = '<img src="images/wheatStoneOP.png" class="img-responsive" alt="Cinque Terre">'
            $("#MsgModal").html(modelImg);
            invalidConnCnt++;
//	        alert("Neither the first nor second combination is valid.");  

        }
	
	
	
//	
//	        $(".modal-header").html("Appropriate Connection");
//			$(".modal-header").css("background","#23435c");
//			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
//			modelImg = '<img src="images/wheatStoneOP.png" class="img-responsive" alt="Cinque Terre">'
//            $("#MsgModal").html(modelImg);
} 
       
       
    // If neither combination is valid  
//    if (!isFirstCombinationValid && !isSecondCombinationValid && isThirdCombinationValid && isForthCombinationValid) {  
//        allValid = false;  
//        alert("Neither the first nor second combination is valid.");  
//    }  

    // Final alert if any connections were invalid  
    if(idd<=3){
    if (!allValid) {  
	$(".modal-header").html("Error Message");
			$(".modal-header").css("background","#9c1203b0");
			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
			$("#MsgModal").html("Some connections are invalid or the required conditions are missing.");
			invalidConnCnt++;
//        alert("Some connections are invalid or the required conditions are missing.");  
    }  
    }
    idd++;
    console.log("idd : "+idd);
}


document.getElementById('validateCon').addEventListener('click', checkAllConnections);


// Drag-and-drop logic for dots
function getCursorPosition(event) {  
    const svg = document.getElementById("main-div-conf");  
    const rect = svg.getBoundingClientRect();  
    return {  
        x: event.clientX - rect.left,  
        y: event.clientY - rect.top  
    };  
}

function setPointerPosition(x, y) {  
    const event = new MouseEvent('mousemove', {  
        clientX: x,  
        clientY: y  
    });  
    const position = getCursorPosition(event);  
    console.log(position); // This will log the new cursor position  
}  

function handleDotDragStart(event, dot) {  
    isDraggingDot = true;  
    draggedDot = dot;  
    setPointerPosition(50, 50);  

    // Create the shadow line when dragging starts  
    const cursorPosition = getCursorPosition(event);  
    shadowLine = canvas.path(`M${dot.attr("cx")},${dot.attr("cy")}L${cursorPosition.x},${cursorPosition.y}`)  
        .attr({   
            stroke: "gray",   
            "stroke-width": 2,   
            "stroke-dasharray": "1,3" // Dotted line pattern (1 unit on, 3 units off)  
        });  
        
    document.addEventListener('mousemove', handleDotDragMove);  
}  

function handleDotDragMove(event) {  
    if (!isDraggingDot || !shadowLine) return;  

    const cursorPosition = getCursorPosition(event);  
    const startX = draggedDot.attr("cx");  
    const startY = draggedDot.attr("cy");

    // Adjust the X and Y coordinates to position the shadow line relative to the cursor
    const adjustedX = cursorPosition.x - 15; // Move the line 5 pixels to the left of the cursor
    const adjustedY = cursorPosition.y - 15; // Move the line 5 pixels above the cursor

    const pathString = `M${startX},${startY}L${adjustedX},${adjustedY}`;  
    shadowLine.attr({ path: pathString });  
}

function handleDotDragEnd(event, dot) {  
    event.stopPropagation();  
    document.removeEventListener('mousemove', handleDotDragMove);  

    const cursorPosition = getCursorPosition(event);
    
    if (isDraggingDot) {
        // Find the closest dot from the cursor position
        const closestDot = findClosestDot(cursorPosition);

        // If the closest dot is found and is not the dragged dot
        if (closestDot && closestDot !== draggedDot) {
            // Create a connection between draggedDot and the closestDot
            createConnection(draggedDot, closestDot);  
        }

        // Remove the shadow line immediately after the drop
        if (shadowLine) {  
            shadowLine.remove();  
            shadowLine = null;  
        }  

        // Reset dragging state
        isDraggingDot = false;  
        draggedDot = null;  
    }  
}  

function findClosestDot(cursorPosition) {  
    let closestDot = null;  
    let minDistance = Infinity;  

    dots.forEach(dot => {  
        const dotPosition = { x: dot.attr("cx"), y: dot.attr("cy") };  
        const distance = Math.sqrt(Math.pow(dotPosition.x - cursorPosition.x, 2) + Math.pow(dotPosition.y - cursorPosition.y, 2));  
        if (distance < minDistance) {  
            minDistance = distance;  
            closestDot = dot;  
        }  
    });  

    // Optionally: define a threshold to consider if the drop is close enough to the dot
    const distanceThreshold = 80; // Adjust this value as needed
    return minDistance <= distanceThreshold ? closestDot : null;
}

 
function createConnection(startDot, endDot) {  
    const pathString = generateSmoothConnection(startDot, endDot);  
    const connectionAttrs = { stroke: "black", "stroke-width": 2.5 };  

    const connection = canvas.path(pathString).attr(connectionAttrs);  
    connections.push({ connection, start: startDot, end: endDot });  

    connection.node.addEventListener('click', (e) => {  
        e.stopPropagation(); // Prevent click from bubbling up to the document  
        if (selectedConnection) {  
            // Deselect previous connection and reset its attributes  
            selectedConnection.connection.attr({ stroke: "black", "stroke-width": 2.5 });  
        }  
        selectedConnection = { connection, start: startDot, end: endDot };  
        connection.attr({ "stroke": "red", "stroke-width": 3 }); // Highlight selected connection  
        selectedShape = null;  
    });  

    // Event listener for deselecting the connection when clicking outside  
    document.addEventListener('click', (e) => {  
        // Check if the click is outside the connection  
        if (selectedConnection && !connection.node.isSameNode(e.target) && !connection.node.contains(e.target)) {  
            selectedConnection.connection.attr({ stroke: "black", "stroke-width": 2.5 }); // Reset stroke and width  
            selectedConnection = null; // Reset selectedConnection  
        }  
    });  
} 


function onStartCanvas() {
    this.ox = this.attr("x");
    this.oy = this.attr("y");
}

function onMoveCanvas(dx, dy) {
    let newX, newY;
    const canvasRect = canvas.canvas.getBoundingClientRect();
    const canvasWidth = canvasRect.width;
    const canvasHeight = canvasRect.height;

    newX = this.ox + dx;
    newY = this.oy + dy;

    const imgWidth = this.attr("width");
    const imgHeight = this.attr("height");

    if (newX < 0) newX = 0;
    if (newY < 0) newY = 0;
    if (newX + imgWidth > canvasWidth) newX = canvasWidth - imgWidth;
    if (newY + imgHeight > canvasHeight) newY = canvasHeight - imgHeight;

    this.attr({ x: newX, y: newY });
    updateDotsPosition(this);
    updateConnections();

    if (this.border) {
        this.border.attr({ x: newX - 2, y: newY - 2 });
    }
}

function onEndCanvas() {}

function onMoveCanvasDot(dx, dy) {
    this.attr({ cx: this.ox + dx, cy: this.oy + dy });
    const shape = this.data("parent");
    updateDotsPosition(shape);
    updateConnections();
}

function onStartCanvasDot() {
    this.ox = this.attr("cx");
    this.oy = this.attr("cy");
}

function onEndCanvasDot() {}

function updateDotsPosition(shape) {
    const dots = shape.data("dots");
    const bbox = shape.getBBox();

    dots.forEach(dot => {
        const dotData = dot.data();
        dot.attr({ cx: bbox.x + dotData.xOffset, cy: bbox.y + dotData.yOffset });
    });
}

function createDotsForShape(shape, dotsData) {
    const shapeDots = [];
    const bbox = shape.getBBox();
    const dotAttrs = { r: 7, fill: "blue", stroke: "none" };

    dotsData.forEach(dotData => {
        const dot = canvas.circle(bbox.x + dotData.xOffset, bbox.y + dotData.yOffset, 5)
            .attr(dotAttrs)
            .data("parent", shape)
            .data("id", dotData.id)
            .data("xOffset", dotData.xOffset)
            .data("yOffset", dotData.yOffset);
        
        dots.push(dot); // Add dot to global array

        shapeDots.push(dot);
    });

    return shapeDots;
}

function updateConnections() {
    connections.forEach(({ connection, start, end }) => {
        const pathString = generateSmoothConnection(start, end);
        connection.attr({ path: pathString });
    });
}

function generateSmoothConnection(startDot, endDot, avoidAreas = []) {
    const cx1 = parseFloat(startDot.attr("cx"));
    const cy1 = parseFloat(startDot.attr("cy"));
    const cx2 = parseFloat(endDot.attr("cx"));
    const cy2 = parseFloat(endDot.attr("cy"));

    const dotId = startDot.attr("id") || "";  // Safely get the ID of the startDot
    const isPlusDot = dotId === "dot1";       // Check if the dot is "dot1"
    const isMinusDot = dotId === "dot2";      // Check if the dot is "dot2"

    const distance = Math.sqrt(Math.pow(cx2 - cx1, 2) + Math.pow(cy2 - cy1, 2));
    const horizontalOffset = 40;  // Fixed horizontal movement at the start

    let path;

    // Function to check intersection with avoid areas
    function intersectsAvoidArea(x1, y1, x2, y2, avoidAreas) {
        for (let area of avoidAreas) {
            const xMin = area.x, xMax = area.x + area.width;
            const yMin = area.y, yMax = area.y + area.height;
            // Check for intersection
            if (
                (x1 >= xMin && x1 <= xMax && y1 >= yMin && y1 <= yMax) ||
                (x2 >= xMin && x2 <= xMax && y2 >= yMin && y2 <= yMax)
            ) {
                return true;
            }
        }
        return false;
    }

    // Always start with a horizontal move of 'horizontalOffset' pixels
    const firstMoveX = cx1 < cx2 ? cx1 + horizontalOffset : cx1 - horizontalOffset;

    if (distance < 140) {
        // Short distance, draw a straight line
        path = `M${cx1},${cy1} L${cx2},${cy2}`;
    } else {
        // Path generation logic based on distance
        if (distance < 195) { // Short to medium distance
            if (!intersectsAvoidArea(cx1, cy1, cx2, cy2, avoidAreas)) {
                // Horizontal start followed by direct connection
                path = `M${cx1},${cy1} H${firstMoveX} L${cx2},${cy2}`;
            } else {
                // Adjust if intersects with avoid areas
                path = `M${cx1},${cy1} H${firstMoveX} L${firstMoveX},${cy1 + 10} L${cx2},${cy2}`;
            }
        } else if (distance >= 195 && distance < 280) {
            // For medium distances
            path = `M${cx1},${cy1} H${firstMoveX} L${firstMoveX},${cy2} L${cx2},${cy2}`;
        } else {
            // Long distance pathing
            if (isPlusDot) {
                // dot1 (plus) travels upwards after the horizontal movement, mimicking the rectifier path
                const upwardMove = cy1 - 60;  // Moves upwards by 60 units
                const diagonalMoveX = cx1 + 50;  // Diagonal movement
                const diagonalMoveY = cy1 - 50;  // Moves upwards diagonally

                // Path will move horizontally, then upwards diagonally, following the bridge rectifier pattern
                path = `M${cx1},${cy1} H${firstMoveX} L${diagonalMoveX},${diagonalMoveY} L${cx2},${cy2}`;
            } else if (isMinusDot) {
                // dot2 (minus) travels downwards after the horizontal movement
                path = `M${cx1},${cy1} H${firstMoveX} L${firstMoveX},${cy1 + 40} L${cx2},${cy1 + 40} L${cx2},${cy2}`;
            } else {
                // Default for other dots
                path = `M${cx1},${cy1} H${firstMoveX} L${firstMoveX},${cy1 + 100} L${cx2},${cy1 + 100} L${cx2},${cy2}`;
            }
        }

        // Create a curve at the intersection based on avoid areas
        if (intersectsAvoidArea(cx1, cy1, cx2, cy2, avoidAreas)) {
            const midX = (cx1 + cx2) / 2;
            const midY = (cy1 + cy2) / 2;
            const curveHeight = 20; // Adjust the height of the curve

            // Modify the path to include a curve using quadratic Bézier
            path = `M${cx1},${cy1} H${firstMoveX} Q${midX},${cy1 - curveHeight} ${cx2},${cy2}`;
        }
    }

    return path;
}






const validConnections = {
        dot1: ['dot3', 'dot4', 'dot5', 'dot6'],
        dot2: ['dot3', 'dot4', 'dot5', 'dot6'],
        dot3: ['dot1','dot2','dot7'],
        dot4: ['dot1','dot2','dot7'],
        dot5: ['dot1','dot2','dot8'],
        dot6: ['dot1','dot2','dot8'],
        dot7: ['dot3','dot4','dot5','dot6'],
        dot8: ['dot3','dot4','dot5','dot6']
      
//        dot2: ["dot4"],
//        dot4: ["dot2"],
//        dot5: ["dot8"],
//        dot8: ["dot5"],
//        dot6: ["dot7"],
//        dot7: ["dot6"]
    };

// }   


 }   
