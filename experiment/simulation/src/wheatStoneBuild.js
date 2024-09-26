var invalidConn = 0;
function wheatStoneCon(){

//function wheatStoneCon(){

$("#canvas-div").html('');
$("#main-div-conf").html('');

$("#delete-btn").prop("hidden",false);
$("#validateCon").prop("hidden",false);


$("#centerText2").html('SELECT THE COMPONENTS');
$("#centerText1").html('CONNECT THE PORTS OF WHEATSTONE BRIDGE');


const myDiv = document.getElementById('canvas-div'); // Or use querySelector if needed
    
    // Step 3: Change the size of the div
    myDiv.style.width = '900px';  // Set the width
    myDiv.style.height = '300px'; // Set the height
    
const myDiv1 = document.getElementById('main-div-conf'); // Or use querySelector if needed
    
    // Step 3: Change the size of the div
    myDiv1.style.width = '900px';  // Set the width
    myDiv1.style.height = '600px'; // Set the height    
    

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
        src: "images/wheatStoneOutline111.png",
        dots: [
            { id: "dot3", xOffset: 100, yOffset: 12 },
            { id: "dot4", xOffset: 100, yOffset: 194 },
            { id: "dot5", xOffset: 5, yOffset: 103 },
            { id: "dot6", xOffset: 195, yOffset: 103 }
        ],
        width: 220, height: 220, x: 280, y: 40
    },
    {
        src: "images/outVolt.png",
        dots: [
            { id: "dot7", xOffset: 77, yOffset: 20 },
            { id: "dot8", xOffset: 2, yOffset: 20 }
        ],
        width: 80, height: 40, x: 560, y: 115
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
    let allValid = true; // Assume all connections are valid initially  
    let connectedDots = new Set(); // To store the IDs of connected dots  

    // Iterate over each connection  
    connections.forEach(({ start, end }) => {  
        const startId = start.data("id");  
        const endId = end.data("id");  

        // Check if this connection is valid  
        const isValidConnection = validConnections[startId] && validConnections[startId].includes(endId);  

        if (!isValidConnection) {  
            allValid = false; // If any connection is invalid, set the flag to false  
            console.log(`Invalid connection between ${startId} and ${endId}`);  
            actFlg = 1;
        } else {  
            console.log(`Valid connection between ${startId} and ${endId}`);  
            // Add the connected dots to the set  
            connectedDots.add(startId);  
            connectedDots.add(endId);  
            actFlg = 1;
        }  
    });  
      
    // Check if all dots are connected (assuming you have a collection of all required dot IDs)  
    const allDots = new Set(Object.keys(validConnections));  
    if (![...allDots].every(id => connectedDots.has(id))) {  
        allValid = false;  
        console.log("Some ports are not connected properly.");  
        invalidConn++;
    }  
     
    // Show alerts based on the validations  
    if (allValid) { 
	    $("#delete-btn").prop("hidden",true);
	    $("#validateCon").prop("hidden",true); 
	        $("#btnModal").removeClass("btn-danger").addClass("btn-success");
	        $(".modal-header").html("Success Message");
            $(".modal-header").css("background","#5cb85c");
			$("#MsgModal").html("All connections are valid and all ports are connected!");
             calculate();
             console.log("invalidConn "+invalidConn);
					 var tempCountJson ={};
						tempCountJson.inValidConnection = invalidConn; 						 
						counterMasterJson.buildWheatStone = tempCountJson;
						 console.log(counterMasterJson);
    } else {
	    if(actFlg==1){
	       if (idd <= 3) {
				
				if (allValid) {
					console.log("invalidConn "+invalidConn);
					 var tempCountJson ={};
						tempCountJson.inValidConnection = invalidConn; 						 
						counterMasterJson.buildWheatStone = tempCountJson;
						 console.log(counterMasterJson);
			$("#btnModal").removeClass("btn-danger").addClass("btn-success");
	        $(".modal-header").html("Success Message");
            $(".modal-header").css("background","#5cb85c");
			$("#MsgModal").html("All connections are valid and all ports are connected!");
//        alert("All connections are valid and all dots are connected!");  
       calculate();
       
                       
					
	                       
				} else if (!allValid) {
					
			$(".modal-header").html("Failed Connection ");
			$(".modal-header").css("background","#9c1203b0");
			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
			$("#MsgModal").html("Some connections are invalid or some ports are not connected properly.");	
					
                   invalidConn++;
				}
	
	
			} else if (idd == 4) {
				
				$(".modal-header").html("Appropriate Connection");
			$(".modal-header").css("background","#23435c");
			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
			
			modelImg = '<img src="images/wheatStoneOP.png" class="img-responsive" alt="Cinque Terre">'
            $("#MsgModal").html(modelImg);
			invalidConn++;
			}else {
					
                invalidConn++;
	
				} 
			idd++;				
	
//        alert("Some connections are invalid or some dots are not connected properly.");  
    }
    else{
	invalidConn++;
	       $(".modal-header").html("Failed Connection ");
			$(".modal-header").css("background","#9c1203b0");
			$("#btnModal").removeClass("btn-success").addClass("btn-danger");
			$("#MsgModal").html("Select the components and connect them");
    }
    }  
}  

// Add a button to trigger the final validation  
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




//function createConnection(startDot, endDot) {
//    const pathString = generateSmoothConnection(startDot, endDot);
//    const connectionAttrs = { stroke: "black", "stroke-width": 2.5 };
//
//    const connection = canvas.path(pathString).attr(connectionAttrs);
//    connections.push({ connection, start: startDot, end: endDot });
//
//    connection.node.addEventListener('click', (e) => {
//        e.stopPropagation();
//        if (selectedConnection) {
//            selectedConnection.connection.attr({ stroke: "black" }); // Deselect previous connection
//        }
//        selectedConnection = { connection, start: startDot, end: endDot };
//        connection.attr({ "stroke": "red" ,"stroke-width": 3}); // Highlight selected connection
//        selectedShape = null;
//    });
//}

//canvas.canvas.addEventListener('click', () => {
//        if (selectedShape) {
////             selectedShape.border.hide(); // Hide the border when clicking outside the shape
//            selectedShape = null; // Deselect the shape
//        }
//        if (selectedConnection) {
//            selectedConnection.connection.node.classList.remove('selected-connection'); // Remove selected class from connection
//            selectedConnection = null; // Deselect the connection
//        }
//    });


// Utility functions (remain unchanged)


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



function generateSmoothConnection(startDot, endDot) {
        const cx1 = startDot.attr("cx");
        const cy1 = startDot.attr("cy");
        const cx2 = endDot.attr("cx");
        const cy2 = endDot.attr("cy");

        // Calculate the distance between the two dots
        const distance = Math.sqrt(Math.pow(cx2 - cx1, 2) + Math.pow(cy2 - cy1, 2));

        // Set a threshold distance
        const distanceThreshold = 195; // Adjust this value as needed

        let path;

        if (distance < distanceThreshold) {
            // If distance is small, use a straight line (shortest path)
            path = `M${cx1},${cy1} L${cx2},${cy2}`;
        } else {
            // If distance is large, use the original zigzag pattern
            const shape1 = startDot.data("parent").getBBox();
            const shape2 = endDot.data("parent").getBBox();

            if (Math.abs(cx1 - cx2) > Math.abs(cy1 - cy2)) {
                if (cx1 < cx2) {
                    path = `M${cx1},${cy1} 
                            L${shape1.x2 + 20},${cy1} 
                            L${shape1.x2 + 20},${cy2} 
                            L${cx2},${cy2}`;
                } else {
                    path = `M${cx1},${cy1} 
                            L${shape1.x - 20},${cy1} 
                            L${shape1.x - 20},${cy2} 
                            L${cx2},${cy2}`;
                }
            } else {
                if (cy1 < cy2) {
                    path = `M${cx1},${cy1} 
                            L${cx1},${shape1.y2 + 20} 
                            L${cx2},${shape1.y2 + 20} 
                            L${cx2},${cy2}`;
                } else {
                    path = `M${cx1},${cy1} 
                            L${cx1},${shape1.y - 20} 
                            L${cx2},${shape1.y - 20} 
                            L${cx2},${cy2}`;
                }
            }
        }

        return path;
    }


const validConnections = {
        dot1: ["dot3"],
        dot3: ["dot1"],
        dot2: ["dot4"],
        dot4: ["dot2"],
        dot5: ["dot8"],
        dot8: ["dot5"],
        dot6: ["dot7"],
        dot7: ["dot6"]
    };

// }   


 }   
