let img;
let cam;

function setup() {
  let canvas = createCanvas( 640, 480 );
  canvas.parent("canvasContainer");

  cam = createCapture(VIDEO);
  //cam.hide();
  // img = createImage(width, height);
}

function draw() {
  // image(cam, mouseX, mouseY);
  background(0);

  cam.loadPixels();
  consol
  img.loadPixels();

  let gridSize = 15;
  noStroke();
  for (let y = 0; y < height; y += gridSize) {
    for (let x = 0; x < width; x += gridSize) {

      let index = (x + y*width) * 4;

      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];

      fill(r, g, b);
      ellipse(x, y, gridSize, gridSize);
    }
  }
  
//   // we don't draw the image.
//   //img.updatePixels();
//   //image(img, 0, 0);
}