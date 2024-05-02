let swarm1;
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvasContainer");

  swarm1 = new Swarm(width/2, height/2);
  
}

function draw() {
  background(220, 120, 78);
  swarm1.update();
  swarm1.display();

  noFill();
  stroke(255);
  circle(width/2, height/2, width/2);
  
}

class Swarm{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;
    this.dia = 300;
    this.speedX = 0;
    this.speedY = 0;

    this.noiseXoffset = random (1000);
    this.noiseYoffset = random (1000);

    this.birds = [];
    
    for(let i = 0; i < 10; i++){
      let ranAngle = random(2*PI);
      let birdX = cos(ranAngle)* random(0, this.dia/2)//random(this.dia);
      let birdY = sin(ranAngle)* random(0, this.dia/2)//random(this.dia);
      this.birds.push(new Bird(birdX, birdY, this.dia/2));
    }

  }

  update(){
    let noiseValx = noise((frameCount+this.noiseXoffset)*0.01);
    this.speedX = map(noiseValx, 0, 1, -2, 2);
    
    let noiseValy = noise((frameCount + this.noiseYoffset)*0.01);
    this.speedY = map(noiseValy, 0, 1, -2, 2);

    let wouldBeX = this.x + this.speedX;
    let wouldBeY = this.y + this.speedY;


    let distanceFromCenter = dist(width/2, height/2, this.x, this.y);
    if(distanceFromCenter < width/2){
      this.x += this.speedX;
      this.y += this.speedY
    }
    

  }
  display(){
    push();
    translate(this.x, this.y);

    noFill();
    stroke(0);
    circle(0, 0, this.dia);
    
    for(let i = 0; i<this.birds.length; i++){
      this.birds[i].update();
      this.birds[i].display();
    }
    pop()
  }
}


class Bird{
  constructor(startX, startY, movenmentAllowence){
    this.x = startX;
    this.y= startY;
    this.speedX = 0;
    this.speedY = 0;

    this.noiseXoffset = random (1000);
    this.noiseYoffset = random (1000);
    this.boundary = movenmentAllowence;
  }

  update(){
    let noiseValx = noise((frameCount+this.noiseXoffset)*0.01);
    this.speedX = map(noiseValx, 0, 1, -2, 2);
    
    let noiseValy = noise((frameCount + this.noiseYoffset)*0.01);
    this.speedY = map(noiseValy, 0, 1, -2, 2);

    let wouldBeX = this.x + this.speedX;
    let wouldBeY = this.y + this.speedY;

  

    let distanceFromCenter = dist(0, 0, wouldBeX, wouldBeY);
    if(distanceFromCenter < this.boundary){
      this.x += this.speedX;
      this.y += this.speedY
    }

  }

  display(){
    push();
    translate(this.x, this.y);


    noStroke();
    fill(0);
    circle(0, 0, 10);

    pop();
  }
}