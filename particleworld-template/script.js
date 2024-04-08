let NUM_OF_LAUNCHERS = 5;
let particles = [];
let fireActive = true;

function setup() {
  let canvas = createCanvas(500, 500);
  canvas.parent("canvasWrapper");
  colorMode(HSB, 255);

  for (let i = 0; i < NUM_OF_LAUNCHERS; i++) {
    particles.push(new Launcher(random(width), height));
  }
}

function draw() {
  background(156, 245, 66, 25);

  if (fireActive) {
    for (let i = particles.length - 1; i >= 0; i--) {
      let p = particles[i];
      p.update();
      p.display();

      if (p.type == 'launcher' && p.exploded) {
        explode(p.x, p.y);
        particles.splice(i, 1);
        particles.push(new Launcher(random(width), height));  // Create a new launcher
      } else if (p.type == 'spark' && p.lifespan <= 0) {
        particles.splice(i, 1);
      }
    }
  }
}

function explode(x, y) {
  let numSparks = random(50, 70);
  for (let i = 0; i < numSparks; i++) {
    particles.push(new Spark(x, y));
  }
}

function mousePressed() {
  fireActive = !fireActive;
}

class Launcher {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dia = 5;
    this.speedY = random(-8, -10);
    this.exploded = false;
    this.type = 'launcher';  // Indicate the type of particle
  }

  update() {
    this.y += this.speedY;
    this.speedY += 0.2;
    if (this.speedY >= 0) {
      this.exploded = true;
    }
  }

  display() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.dia, this.dia);
  }
}

class Spark {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dia = random(2, 4);
    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);
    this.hue = random(15, 35);
    this.lifespan = 255;
    this.type = 'spark';  //type of particle
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.lifespan -= 4;
  }

  display() {
    push();
    translate(this.x, this.y);
    fill(this.hue, 255, 255, this.lifespan);
    noStroke();
    ellipse(0, 0, this.dia, this.dia);
    pop();
  }
}
