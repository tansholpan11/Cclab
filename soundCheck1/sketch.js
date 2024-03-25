let kickSound;
let x = 10;
let xSpeed = 2;

let x2 = 10;
let x2Speed = 4;

function preload(){
  kickSound = loadSound("sounds/kick.mp3");
  chopSound = loadSound("sound/chop.mp4")
}

function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("canvasContainer");
  
}

function draw() {
  background(220);
  circle(x, 50, 10);
  circle(x2, 80, 10);

  x += xSpeed;
  x2 += x2Speed;

  if( x > width || x < 0){
    xSpeed = -xSpeed;
    kickSound.play();
  }

  if( x2 > width || x2 < 0){
    x2Speed = -x2Speed;
    chopSound.play();
  }
}

function mousePressed(){
  kickSound.play();
  chopSound.play();
}