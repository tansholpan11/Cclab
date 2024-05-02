let horseIMG;
let horseFrames = [];
let frameIndex = 0;
function preload(){
  for(let i= 0; i < 9; i++){
    let imgPath = "muybridge/muybridge_"+ i +".jpg"; 
    let currentIMG = loadImage(imgPath);
    horseFrames.push(currentIMG);
    
  }
  
}
function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("canvasContainer");
  background(220);
}

function draw() {
  push();
  translate(mouseX, mouseY);
  scale(0.5);
  let currentFrame = horseFrames[frameIndex];
  image(currentFrame, -currentFrame.width/2, -currentFrame.height/2);
  pop();

  frameIndex ++;
  if (frameIndex > 8){
    frameIndex = 0;
  }
}