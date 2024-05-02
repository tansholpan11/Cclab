let currentSceneIndex = 1;
let catRoomImg, citystreetImg, receptionistsImg; 
let suitcase1,suitcase2,suitcase3;
let suitcases=[];
let ball1, ball2, ball3;
let balls = [];
let fillBox = 0;
let car1x = 0;

function preload(){
  catRoomImg = loadImage("./assets/cat-room.png");
  citystreetImg = loadImage("./assets/citystreet.png");
  suitcase1 = loadImage("./assets/suitcase1.png"); 
  // suitcase2= loadImage("../assets/suitcase2.png");
  // suitcase3= loadImage("../assets/suitcase3.png");
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
}
function draw() {
  background(220);

  push();
 
  if(currentSceneIndex == 1){
    image(catRoomImg, width / 2, height / 2, width, height);
    balls[0].update();
    balls[0].display();
    rectMode(CENTER);
    rect( 1250, 700, 100, 100);
    
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
    image(receptionistsImg, width/2, height/2, width /2 , height / 2);
    textSize(24);
    textAlign(CENTER);
    text("The Mysterious Hotel", width / 2, 30);

    suitcases[0].update();
    suitcases[0].display();

  }
  pop();
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

// function startGameButton(){
//   document.getElementById("mainFlexContainer").style.display = "none";
//   // console.log("hello!"); 
//   currentSceneIndex = 1;
// }
function mousePressed() {
  // if (currentSceneIndex == 2 && mouseX > width / 2 - 50 && mouseX < width / 2 + 50 && mouseY > height - 120 - 15 && mouseY < height - 120 + 15) {
  //   currentSceneIndex = 3;
  // }
}
function mouseReleased() {
  if( currentSceneIndex == 1 && mouseX > 1200 && mouseX < 1300 && mouseY > 650 && mouseY < 750 ){
    fillBox++;
  } 
  if( fillBox == 3){
    currentSceneIndex = 2;
  }
}
function keyPressed(){
  if(currentSceneIndex == 3){
    currentSceneIndex = 1;
    } else{
      currentSceneIndex ++;
    }
  
}
class Balls {
  constructor(x, y, img){
    this.x = x;
    this.y = y;
    this.img = img;
  }
  update(){
    let distanceFromCenter = dist(this.x, this.y, mouseX, mouseY);
    if(distanceFromCenter < 100){
      this.x = mouseX;
      this.y = mouseY;
    }
  }
  display(){
    push();
    translate(this.x, this.y);
    image(this.ing, 0, 0, 100, 100);
    pop();
  }
}

class Suitcase {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
  }
  update(){
    let distanceFromCenter = dist(this.x, this.y, mouseX, mouseY)
    if(distanceFromCenter < 100){
      this.x = mouseX;
      this.y = mouseY;
    }
  }
  display() {
    push();
    translate(this.x, this.y);
    image(this.img, 0, 0, 100, 100); // imageSrc, x, y, width, height
    pop();
  }
}