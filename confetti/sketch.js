
let confettis = [];
let numConfetti = 100;

let backgroundHue;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("canvasContainer");

  colorMode(HSB);
  
  // for(let i = 0; i < numConfetti; i++){
  //   confettis.push(new Confetti(width/2, height/2))
  // }
  backgroundHue = random(255);

}

function draw() {
  background(backgroundHue, 10, 190);

  if(mouseIsPressed == true){
    confettis.push(new Confetti(mouseX, mouseY));
    confettis.push(new Confetti(mouseX, mouseY));  }

  // confettis.push(new Confetti(width/2, height/2));

  for(let i = 0; i < confettis.length; i++){
    confettis[i].update();
    confettis[i].display();
  }

  while(confettis.length > 30){
    let index = 0;
    let numElemntsToCut = 1;
    confettis.splice(index, numElemntsToCut);
  }
  
}

class Confetti{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;
    this.size = random(2, 10);
    
    this.speedX = random(-2, 2);
    this.speedY = random(-1, -3);  

    this.c = color(random(255), 255, 255);
    this.IsOnCanvas = true;

  }
  update(){
    this.x+=this.speedX;
    this.y+=this.speedY;

    this.speedY += 0.1;
    this.speedX *= 0.99;
    
    if(this.Y > height){
      this.IsOnCanvas = false;
    }
  }
  display(){    
    push();
    translate(this.x, this.y);

      fill(this.c);
      noStroke();
      circle(0, 0, this.size);
   
    pop();
  }
}
  // function mousePressed(){
  //   for(let i = 0; i < numConfetti; i++){
  //     confettis.push(new Confetti(mouseX, mouseY));
  //     // console.log(confeties.length);
  //   }
   
  // }
