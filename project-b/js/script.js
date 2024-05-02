let scenes = [];
let currentSceneIndex = 0;

function setup() {
  let canvas =  createCanvas(windowWidth, windowHeight);
  textFont("Georgia");
  canvas.parent("canvasContainer");


  scenes.push(new IntroductionScene());
  scenes.push(new CatRoomScene());
  scenes.push(new CityScene());
  scenes.push(new HotelScene());
}

function draw() {
  background(220);
  scenes[currentSceneIndex].update(); 
  scenes[currentSceneIndex].display(); 
}
function startGameButton(){
  document.getElementById("mainFlexContainer").style.display = "none";
  console.log("hello!");
  
}
function mousePressed() {
  scenes[currentSceneIndex].mousePressed();
}

class Scene {
  constructor() {
    
  }
  display() {
    
  }
  update() {
    
  }
  mousePressed() {
    
    currentSceneIndex = (currentSceneIndex + 1) % scenes.length;
  }
}

class IntroductionScene  {
  display() {
    textSize(24);
    textAlign(CENTER);
    text("Welcome to Princess Catnapping", width / 2, height / 2);
  }
}

class CatRoomScene {
  display() {
    textSize(24);
    textAlign(CENTER);
    text("The Cat's Cozy Quarters", width / 2, height / 2);
    fill("green");
    rect(100, 150, 200, 100);  // Interactive area
  }

  mousePressed() {
    
    if (mouseX >= 300 && mouseX <= 500 && mouseY >= 250 && mouseY <= 350) {
      this.nextScene();
    }
  }

  nextScene() {
    currentSceneIndex = 2; // Move to the City Scene
  }
}

class CityScene {
  display() {
    textSize(24);
    textAlign(CENTER);
    text("The Bustling City Streets", width / 2, height / 2);
  }
}

class HotelScene {
  display() {
    textSize(24);
    textAlign(CENTER);
    text("The Mysterious Hotel", width / 2, height / 2);
    fill("red");
    rect(100, 150, 200, 100);  // Interactive area
  }

  mousePressed() {
    // Check if the click is within the interactive area
    if (mouseX >= 300 && mouseX <= 500 && mouseY >= 250 && mouseY <= 350) {
      this.nextScene();
    }
  }

  nextScene() {
    currentSceneIndex = 0; // go back to the Introduction
  }
}
