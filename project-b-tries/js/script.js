let currentSceneIndex = 1;
let catRoomImg, citystreetImg, receptionistsImg; 
let suitcase1,suitcase2,suitcase3;
let suitcases=[];
let ball1, ball2, ball3;
let balls = [];
let fillBox = 0;
let car1x = 0;
const points = [];
let dragPoint = null;

const numPoints = 5;
const dragRadius = 20;


function preload(){
  catRoomImg = loadImage("./assets/cat-room.png");
  citystreetImg = loadImage("./assets/citystreet.png");
  suitcase1 = loadImage("./assets/suitcase1.png"); 
  suitcase2= loadImage("./assets/suitcase2.png");
  suitcase3= loadImage("./assets/suitcase3.png");
  ball1 = loadImage("./assets/ball-1.png")
  // ball1 = loadImage("./assets/ball.png")
  // ball1 = loadImage("./assets/ball.png")
  
  receptionistsImg = loadImage("./assets/recepcionist.jpeg")
} 

function setup() {
  let canvas =  createCanvas(windowWidth, windowHeight);
  textFont("Georgia");
  canvas.parent("canvasContainer");
  imageMode(CENTER);
  balls.push(new Suitcase(width / 2,height / 2, ball1));
  suitcases.push(new Suitcase(width / 2,height / 2,suitcase1));
  suitcases.push(new Suitcase(width / 2,height / 2,suitcase2));
  suitcases.push(new Suitcase(width / 2 + 100,height / 2,suitcase3));
  
  
  for(let i = 0; i < numPoints; i ++) {
    // Points
    points.push(createVector(random(width), random(height)));
    // Text
  }
}

function draw() {
  background(220);

  push();
 
  if(currentSceneIndex == 1){
    image(catRoomImg, width / 2, height / 2, width, height);
    balls[0].update();
    balls[0].display();
    rectMode(CENTER);
      push();
          noStroke();
          fill(24, 49, 161);
         rect( 1300, 680, 150, 200);
         fill(30, 57, 179);
         rect( 1350, 650, 100, 70);
         fill(0);
         circle( 1225, 780, 20);
         circle( 1375, 780, 20);

      pop();
      fill(255, 0, 0);
    for(let p of points) {
    // Points
    circle(p.x, p.y, dragRadius * 2);
    // Text
    // p.show();
  }
    textSize(24);
    textAlign(CENTER);
    text("The Cat's Cozy Quarters", width / 2, 30);
    fill("green");
  

  }else if(currentSceneIndex == 2){
    image(citystreetImg, width / 2, height / 2, width, height);
    drawCar(car1x, height - 120, 5);
    car1x += 5;
  
   if(car1x > width + 60){
    car1x = -100;
  }
  
    textSize(24);
    textAlign(CENTER);
    text("The Bustling City Streets", width / 2, 30);
  
  }
  else if(currentSceneIndex == 3){
    // image(receptionistsImg, width/2, height/2 - 100 , width /2 - 100 , height / 2 - 100);
    // textSize(24);
    // textAlign(CENTER);
    // text("The Mysterious Hotel", width / 2, 30);

    // suitcases[0].update();
    // suitcases[0].display();

    sceneThree();
  
  }
  pop();
}

function sceneThree() {
  background('#853b40');

  // Carpet area
  fill('#931420');
  rect(0, height * 0.75, width, height * 0.25);

  // Stairs drawing
  push();
  fill('#964241');
  strokeWeight(4);
  for (let i = 0; i < 5; i++) {
      rect(width * 0.25 - i * 20, height * 0.75 - i * 20, width * 0.5 + i * 40, 20);
  }
  pop();
  for (let suitcase of suitcases) {
    suitcase.display();
  }

  // Banisters
  fill('#77182a');
  rect(width * 0.25, height * 0.45, width * 0.5, height * 0.025);

  displayNewImage();
  displayReceptionistImage();

  // Speech bubble for interaction prompt
  push();
  fill('#ffbda9');
  rect(500, 150, 200, 90, 50);
  fill('#853b40');
  textSize(13);
  textAlign(CENTER, CENTER);
  text("Welcome! Please give me ", 600, 170);
  text("your luggages to check-in!", 600, 190);
  text("(Drag the luggages", 600, 210);
  text(" to check-in!)", 600, 230);
  pop();

  // Handle suitcase interactions
  for (let i = suitcases.length - 1; i >= 0; i--) {
      suitcases[i].display();
      if (suitcases[i].checkIn()) {
          suitcases.splice(i, 1); // Remove checked-in suitcases
      }
  }

  // Transition to the next scene when all suitcases are checked in
  if (suitcases.length === 0) {
      currentScene = 4;
  }
}

function drawCar(x, y, speed) {
  push();
  translate(x, y);

  // light
  fill("blue");
  ellipse(-10, -40, 10, 20);

  // body
  fill(0);
  rect(-20, -40, 40, 40);
  rect(-60, 0, 120, 40);

  // window
  fill(198, 238, 255);
  rect(-17, -37, 34, 37, 5);

  // driver
  textSize(30);
  text("👮‍♀️", -15, -5);

  // decoration
  fill("red");
  rect(-60, 20, 120, 5);
  fill("blue");
  rect(-60, 25, 120, 5);

  // wheels
  fill(0);
  // rotate(radians(180));
  // circle(-25, 40, 30);
  drawSpinningWheel(-25, 40, speed);
  // circle(25, 40, 30);
  drawSpinningWheel(25, 40, speed);

  fill("red");
  circle(0, 0, 5);

  pop();
}

function drawSpinningWheel(x, y, speed) {
  push();
  translate(x, y);
  rotate(radians(frameCount * speed));
  fill(0);
  circle(0, 0, 30);
  fill("grey");
  rect(-10, -10, 20, 20);

  fill("green");
  circle(0, 0, 5);
  pop();
}
function mousePressed() {
  for(let i = points.length - 1; i >= 0; i --) {
    // Points
    const isPressed = mouseInCircle(points[i], dragRadius);
    // Text
    // const isPressed = points[i].mouseInside();
      
    if(isPressed) {
      dragPoint = points.splice(i, 1)[0];
      // bring the drag point to the front
      points.push(dragPoint);

      break;
    }    
  }
  let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < 50) {
      this.isDragging = true;
    }
}
function mouseDragged() {
  if(dragPoint) {
    dragPoint.x = mouseX;
    dragPoint.y = mouseY;
  }
}
function mouseReleased() {
  dragPoint = null;
  this.isDragging = false;
    // Simple check-in logic
    if (this.x > width * 0.5 - 50 && this.x < width * 0.5 + 50 && this.y > height * 0.65 - 50 && this.y < height * 0.65 + 50) {
      this.x = width * 0.5; // Check-in the suitcase to the desk area
      this.y = height * 0.65;
    }

}

function mouseInCircle(pos, radius) {
  return dist(mouseX, mouseY, pos.x, pos.y) < radius
}


// TEXT AND IMAGE DRAG EXAMPLES

function mouseInBox(x, y, w, h) {
  return mouseX >= x && mouseX < x + w &&
          mouseY >= y && mouseY < y + h;
}

function keyPressed(){
  if(currentSceneIndex == 1){
    currentSceneIndex = 2;
    } 
    else{
      currentSceneIndex ++;
    }
  
}

class TextDragObject {
  constructor(x, y, str) {
    this.x = x;
    this.y = y;
    this.str = str;
  }
  
  mouseInside() {
    const w = textWidth(this.str);
    const h = textSize();
    return mouseInBox(this.x, this.y - h, w, h);
  }
  
  show() {
    text(this.str, this.x, this.y);
  }
}
class ImageDragObject {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
  }
    
  mouseInside() {
    return mouseInBox(this.x, this.y, this.img.width, this.image.height);
  }
  
  show() {
    image(this.img, this.x, this.y);
  }
}

class Suitcase {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.isDragging = false;

  }
  update(){
    let distanceFromCenter = dist(this.x, this.y, mouseX, mouseY)
    if(distanceFromCenter < 100){
      this.x = mouseX;
      this.y = mouseY;
    }
  }
  display() {
    if (this.isDragging) {
      this.x = mouseX;
      this.y = mouseY;
    }
    image(this.img, this.x, this.y, 100, 100);
  }

}