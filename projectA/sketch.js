let cow1x = 150;
let cow1y = 100;
let cowSpeedX = 3;
let cowSpeedY = 3;
let moving = true;
let stoppedX, stoppedY;
let scaleValue = 0.8; //  scale value for the cow's size
let tailAngle = 0; //  angle for the tail/trunk rotation
let eyeSpeed = 0.1; // speed for the eye rotation
let noiseFigures = [];

function setup() {
  let cnv = createCanvas(800, 500); 
  cnv.parent("p5-canvas-container")
   generateNoiseFigures();

   
}

function draw() {
  background(220,30,120);
  // text("Make the cow stop running, or maybe he wants to changhe his location?" , 15, 12)
  // text("Try to age the cow:( or maybe otherwise", 15, 25);
  drawNoise();

  if (moving) {
    moveCow(); // Call function to move cow
  }
  drawCow(cow1x, cow1y, 0.1, scaleValue); // current position with scale
}

function moveCow() {
  cow1x += cowSpeedX;
  cow1y += cowSpeedY;

  if(keyIsPressed){
    if(key == "ArrowLeft"){
      cowSpeedX = -3;
    }else if(key == "ArrowRight"){
      cowSpeedX = 3;
    }else if(key == "ArrowUp"){
      cowSpeedY = -3;
    }else if(key == "ArrowDown"){
      cowSpeedY = 3;
    }
  }

  if(cow1x > width && cow1x > height ){
    cow1x =  0;
  } else if(cow1x < 0){
    cow1x = width - cow1x;
  }
  
  if(cow1y > width && cow1x < height){
    cow1y = 0;
  }else if(cow1y < 0){
    cow1y = height - cow1y;
  }
  
//   //trunk angle
//   tailAngle = cos(frameCount * 0.1) * PI / 8; // Adjust the speed and magnitude of tail movement
}

function drawCow(x, y, speed, scaleValue){
  push();
  translate(x, y);
  scale(scaleValue); // Apply scale transformation
  
  // Body
  fill(255, 255, 153); // Yellow color for the body
  ellipse(100, 100, 250, 200);
  
  // Legs
  fill(133, 94, 66); // Brown color for the legs
  ellipse(25, 50, 30);
  rect(25, 150, 25, 125);
  rect(150, 150, 25, 125);
  fill(62, 58, 52); // Dark brown color for hooves
  rect(25, 250, 25, 25);
  rect(150, 250, 25, 25);
  
  // Ears
  fill(133, 94, 66); // Brown color for ears
  ellipse(165, 50, 25, 50);
  ellipse(235, 50, 25, 50);

  // Face
  fill(255, 255, 153); 
  circle(200, 100, 125);
  
  // Crazy Eyes
  drawCrazyEyes(175, 70, speed, moving);
  drawCrazyEyes(225, 70, speed, moving);

  // Nose
  fill(62, 58, 52); // Dark brown color for nose
  ellipse(200, 110, 50, 25);
  fill(255, 255, 153); // Yellow color for nostrils
  circle(190, 110, 10);
  circle(210, 110, 10);

  // Mouth
  noFill();
  stroke(62, 58, 52); // Dark brown color for mouth
  strokeWeight(3);
  arc(200, 125, 50, 50, PI * 0.25, PI * 0.75);
  
  // Qalpak 
  fill(42, 81, 190); // Blue color for the hat
  ellipse(200, 30, 150, 50);
  rect(125, 20, 150, 40);
  triangle(175, 0, 225, 0, 200, 20);
  
  pop();
}


function drawCrazyEyes(x, y, speed, moving) {
  push();
  translate(x, y);

  //  position of the pupil 
  let angle = frameCount * speed;
  if (moving) {
    angle = 0; // If moving, set angle to 0 to stop rotation
  }
  let pupilX = 5 * cos(angle);
  let pupilY = 5 * sin(angle);

  fill(0);
  ellipse(0, 0, 25);
  fill(255);
  ellipse(pupilX, pupilY, 10);
  pop();
}


function mousePressed() {
  // Check if mouse is inside the cow
  if (mouseX > cow1x - 100 && mouseX < cow1x + 100 && mouseY > cow1y - 100 && mouseY < cow1y + 100) {
    moving = !moving;
    if (!moving) {
      stoppedX = mouseX; // Save stopped location
      stoppedY = mouseY;
    }
  }
}

function keyPressed() {
  // Increase scale when '=' is pressed
  if (key == "=") {
    scaleValue += 0.2;
    if (scaleValue > 3) {
      scaleValue = 0.3;
    }
  }
  // Decrease scale when '-' is pressed
  if (key == "-") {
    scaleValue -= 0.1;
    // Ensure scale doesn't go below zero
    if (scaleValue < 0) {
      scaleValue = 0.3;
    }
  }
}
function drawNoise() {
  for (let i = 0; i < noiseFigures.length; i++) {
    let posX = noiseFigures[i].x;
    let posY = noiseFigures[i].y;
    let r = random(-50, 50);
    line(posX, posY, posX + r, posY); // Draw noise figure at its fixed position
  }
}

function generateNoiseFigures() {
  for (let i = 0; i < 5; i++) {
    let x = random(width); // Random x position at canvas 
    let y = random(height); 
    noiseFigures.push({ x: x, y: y }); // Store position in array
  }
}
