let cow1x = 150;
let cow1y = 100;
let cowSpeedX = 3;
let cowSpeedY = 3;
let moving = true;
let stoppedX, stoppedY;
let scaleValue = 0.6; // scale value for the cow's size
// let tailAngle = 0; // angle for the tail/trunk rotation
let eyeSpeed = 0.1; // speed for the eye rotation
let noiseFigures = [];
let centerX, centerY;
let radius = 150; // Radius of the main circular path
let numCircleLines = 5; // Number of circles
let cloudX = 100;
let cloudY = 100;
let blue = 189;
let scene = 0;
let planetX = [];
let planetY = [];
let spd = [];
let index =0;

function setup() {
  let cnv = createCanvas(800, 500);
  cnv.parent("p5-canvas-container")

   for(let i = 0; i < 2* PI; i += (PI / 2)){
    index ++;
    console.log(index)
    planetX.push(sin(i) * (50+ index * 50));
    planetY.push(cos(i) * (50+ index * 50));
    spd.push(random(0.01, 0.12));
  }
  centerX = width / 2;
  centerY = height / 2;
  generateNoiseFigures();
  // generatePlanets();
  
}

function draw() {
  background(20, 0, 230);

  stroke(255);
  for (let i = 0; i < 2000; i++) {
    let x = random(width);
    let y = random(height);
    point(x, y);
  }

  if (scene == 0) {
    drawNoise();
    // drawCircularPath();
    drawPlanets();
    

    if (frameCount > 100) {
        push();
      fill(255);
      rect(70, 100, 200, 100, 30);
        pop();
        textWrap(CHAR);
        textSize(20);
        if (mouseX > 80 && mouseX < 280 && mouseY > 100 && mouseY < 200) {
          fill("red");
        } else {
          fill(0);
        }
      text("Hi,let me show you the NEW World", 90, 120, 160);
    }
  } else if (scene == 1) {
    drawNewWorld();
  }

  if (moving) {
    moveCow();
  }
  drawCow(cow1x, cow1y, 0.1, scaleValue);
}

function moveCow() {
  cow1x += cowSpeedX;
  cow1y += cowSpeedY;

  if (cow1x > width - 150 || cow1x < 20) {
    // Adjusting the boundary for cow's width
    cowSpeedX *= -1;
  }
  if (cow1y > height - 150 || cow1y < 0) {
    // Adjusting the boundary for cow's height
    cowSpeedY *= -1;
  }
}

function drawCow(x, y, speed, scaleValue) {
  push();
  translate(x, y);
  scale(scaleValue);

  // Body
  fill(255, 255, 153);
  ellipse(100, 100, 250, 200);

  // Legs
  fill(133, 94, 66);
  ellipse(25, 50, 30);
  rect(25, 150, 25, 125);
  rect(150, 150, 25, 125);
  fill(62, 58, 52);
  rect(25, 250, 25, 25);
  rect(150, 250, 25, 25);

  // Ears
  fill(133, 94, 66);
  ellipse(165, 50, 25, 50);
  ellipse(235, 50, 25, 50);

  // Face
  fill(255, 255, 153);
  circle(200, 100, 125);

  // Crazy Eyes
  drawCrazyEyes(175, 70, speed, moving);
  drawCrazyEyes(225, 70, speed, moving);

  // Nose
  fill(62, 58, 52);
  ellipse(200, 110, 50, 25);
  fill(255, 255, 153);
  circle(190, 110, 10);
  circle(210, 110, 10);

  // Mouth
  noFill();
  stroke(62, 58, 52);
  strokeWeight(3);
  arc(200, 125, 50, 50, PI * 0.25, PI * 0.75);

  // Qalpak
  fill(42, 81, 190);
  ellipse(200, 30, 150, 50);
  rect(125, 20, 150, 40);
  triangle(175, 0, 225, 0, 200, 20);

  pop();
}

function drawCrazyEyes(x, y, speed, moving) {
  push();
  translate(x, y);

  let angle = frameCount * speed;
  if (moving) {
    angle = 0;
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
  if (
    mouseX > cow1x - 100 &&
    mouseX < cow1x + 100 &&
    mouseY > cow1y - 100 &&
    mouseY < cow1y + 100
  ) {
    moving = !moving;
    if (!moving) {
      stoppedX = mouseX;
      stoppedY = mouseY;
    }
  }
  if (scene == 0 && frameCount > 500) {
    if (mouseX > 80 && mouseX < 280 && mouseY > 100 && mouseY < 200) {
      scene = 1;
    }
  }

}

function keyPressed() {
  if (key == "=") {
    scaleValue += 0.1;
    if (scaleValue > 1) {
      // text("new world", 100, 100);
      scaleValue = 0.3;
    }
  }
  if (key == "-") {
    scaleValue -= 0.1;
    if (scaleValue < 0.2) {
      scaleValue = 0.3;
    }
  }
}

function drawNoise() {
  for (let i = 0; i < noiseFigures.length; i++) {
    let posX = noiseFigures[i].x;
    let posY = noiseFigures[i].y;
    let r = random(-50, 50);
    line(posX, posY, posX + r, posY);
  }
}

function generateNoiseFigures() {
  for (let i = 0; i < 5; i++) {
    let x = random(width);
    let y = random(height);
    noiseFigures.push({ x: x, y: y });
  }
}

function drawPlanets() {
  
  for(let i = 0; i < 8; i++){
    push()
    translate(width / 2, height/2);
    noFill()
    stroke(0)
    circle(0, 0, (50+ i * 50)) 
    pop()
  }
  for(let i = 0; i < planetX.length; i ++){
    push();
    translate(width / 2, height/2);
    planetX[i] = sin(i + frameCount * spd[i])* (20+ i * 20)
    planetY[i] = cos(i + frameCount * spd[i])* (20+ i * 20)
    circle(planetX[i], planetY[i], 30);
    let color;
    color = (random(0, 255), random(0,255), random(0,255));
    pop();
  }
  
}

function drawNewWorld() {
  background(180, 160, mouseY);

  // ellipse follows the mouse
  fill(255, 204, 0);
  ellipse(mouseX, mouseY, 200, 200);

  drawCloud(cloudX, cloudY);
  drawHills();
  drawCloud(cloudX + 100, cloudY + 100);
  fill(220);
  noStroke();
  triangle(100, 430, 500, 430, 300, 100);
  fill(200);
  triangle(290, 440, 500, 440, 400, 200);
  fill(210)
  triangle(0, 440, 300, 440, 170, 100 );;

  // Draw the yurt
  push();
  translate(650, 350); // Move the origin to the desired position
  drawYurt();
  pop();
  if(cloudX > width + 30){
    
    cloudX = 0;
    console.log(cloudX)

  }else{
    cloudX += 2;
  }
  
  blue--;
}

function drawCloud(cloudX, cloudY) {
  
  fill(250);
  ellipse(cloudX, cloudY, 70, 50);
  ellipse(cloudX + 10, cloudY + 10, 70, 50);
  ellipse(cloudX - 20, cloudY - 20, 70, 50);
  // add so that they move - looping
  
}

function drawHills() {
  fill(60, 145, 57);
  noStroke();
  ellipse(50, 580, 1000, 400);

  fill(69, 168, 66);
  noStroke();
  ellipse(440, 600, 1000, 400);
}

function drawYurt() {
  // Draw the main body of the yurt
  fill(255, 255, 255);
  stroke(0);
  rect(-120, 0, 250, 140); // Adjust the height of the rectangle

  // Draw the roof of the yurt
  fill(200, 0, 0);
  arc(5, 0, 250, 200, PI, TWO_PI);

  // Draw the door of the yurt
  fill(100);
  rect(-25, 40, 70, 100); // Adjust the position of the door

  strokeWeight(10);
  fill("red");
  line(-115, 0, 125, 0);

  strokeWeight(2);
  for (let i = 0; i < 10; i++) {
    for (let i = 0; i < 5; i++) {
      let x = i * 20 - 120;
      let y = i * 2;
      line(x, y, -70, -80);
    }
  }
}
