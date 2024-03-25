/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/
let dancer;
let legAngle = 0;
let legSpeed = 0.1;
let movementSpeed = 2;
let direction = 1;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new ShopoDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only
  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class ShopoDancer {
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;  


}
update() {
  this.x = this.x + 1;
    if (this.x > windowWidth) {
      this.x = 0;
    }
    if (this.y > (windowHeight / 4) * 3) {
      this.y = (windowHeight / 4) * 3 - 10;
    } else {
      this.y = this.y + random(1, 5);
    }
  
  
}
display(){
  // draw your dancer here
    this.drawLowerBody()
    this.drawBody()
    this.drawEye()
    this.drawMouth()
    
} 
drawLowerBody(){
  push();
  translate(this.x - 80, this.y + 40);
  for( let i = 0; i < 60; i+=5){
    // fill(255)
    let xp = map(i, 0, 60, 50, 120);
    let yp = 10 * sin((frameCount - i) * 0.2)
    circle(xp, yp, 20); 
  }

  pop()
}

drawBody(){
  push();
  translate(this.x, this.y);
  fill(236, 3, 252);
  beginShape();
  vertex(0, -30); // top point
  bezierVertex(30, -20, 50, 10, 40, 30); 
  bezierVertex(30, 40, -30, 40, -40, 30); 
  bezierVertex(-50, 10, -30, -20, 0, -30); 
  endShape(CLOSE);
  pop();
}

drawEye(){
  translate(this.x,this.y)
  push()
    fill(255);
    quad(-20,-50,-18,-50,-13,-30,-17,-30)
    quad(20,-50,22,-50,17,-30,13,-30)
  pop()
  push()
  strokeWeight(2)
  fill(0, 120, 80)
  circle(-20,-52,20)
  circle(20,-52,20)
  pop()
  push()
    fill(0)
    circle(random(-25,-15),-52,5)
    circle(random(15,25),-52,5)
  pop()
}


drawMouth(){
    noStroke();
    fill(250, 0, 0); 
    beginShape();
    vertex(-15, 13);
    vertex(15, 13);
    vertex(0, 25); 
    endShape(CLOSE);
}


  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }

}

/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/