let currentSceneIndex = 1;
let catRoomImg, citystreetImg, receptionistsImg; 
let receptionImg, catImg, elevatorImg;
let suitcase1,suitcase2,suitcase3;
let finalImg;
let suitcases=[];
let ball1, ball2, ball3;
let notDraggedBalls =[];
let notDraggedSuitcases = [];
let balls = [];
let fillBox = 0;
let car1x = 0;
let fillSuitcase = 0;
let ifDragging = false;
let showIntroText = true;
let textButton = {};
let carStopped = false;
let firstMousePress = false;
let messageDisplayed = false;
let allLuggageCheckedIn = false;
let elevatorY = 0;
let elevatorMoving = false;

let BgSound;


function preload(){
  catRoomImg = loadImage("./assets/cat-room.png");
  citystreetImg = loadImage("./assets/citystreet.png");
  catImg = loadImage("./assets/cat.png")
  suitcase1 = loadImage("./assets/suitcase1.png"); 
  suitcase2= loadImage("./assets/suitcase2.png");
  suitcase3= loadImage("./assets/suitcase3.png");
  ball1 = loadImage("./assets/ball-1.png");
  ball2 = loadImage("./assets/ball-2.png");
  ball3 = loadImage("./assets/ball-3.png");
  BgSound = loadSound("./assets/BgMusic.mp3")
  
  receptionistsImg = loadImage("./assets/recepcionist.jpeg");
  receptionImg = loadImage("./assets/reception.png");
  elevatorImg = loadImage("./assets/elivator.png");
  finalImg = loadImage("./assets/final.png");

} 

function setup() {
  let canvas =  createCanvas(windowWidth, windowHeight);
  textFont("Georgia");
  canvas.parent("canvasContainer");
  imageMode(CENTER);
  textButton = {
    x: width / 2,
    y: height / 2 - 250,
    width: 600,
    height: 120  // Adjust size to fit your text
  };
  if (!BgSound.isPlaying()) {
    BgSound.loop();  // Start the background music
  }
  balls.push(new Ball(random(width),random(height) / 2, ball1));
  balls.push(new Ball(width / 2,height / 2, ball2));
  balls.push(new Ball(width / 2 - 200,height / 2 + 100, ball3));
  notDraggedBalls = balls;
  suitcases.push(new Ball(width / 2 - 180,height / 2 + 100,suitcase1));
  suitcases.push(new Ball(width / 2 ,height / 2 + 100,suitcase2));
  suitcases.push(new Ball(width / 2 + 180,height / 2 + 100 ,suitcase2));
  notDraggedSuitcases = suitcases;
}
function draw() {
  background(220);

  push();
 
  if(currentSceneIndex == 1){
    image(catRoomImg, width / 2, height / 2, width, height);
    for(let i = 0; i < balls.length; i++){
      // if(!ifDragging){
      //   balls[i].update();
      // }
      // else{
      //   if(balls[i].beDragged){
         
      //     console.log("hiiiii")
      //   }
      // }
      balls[i].update();
      balls[i].display();
    }
    if (showIntroText) {
      let hover = mouseX > width / 2 - textButton.width / 2 && mouseX < width / 2 + textButton.width / 2 &&
                  mouseY > height / 2 - 250 - textButton.height / 2 && mouseY < height / 2 - 250 + textButton.height / 2;
      
      fill(hover ? '#ccc' : '#fff');  // Light grey on hover, white otherwise
      stroke(0);  // Black border for the rectangle
      rectMode(CENTER);
      rect(width / 2, height / 2 - 250, textButton.width + 50, textButton.height, 10); // Rounded corners
      
      fill(0); // Black text
      noStroke(); // No border for text
      textSize(18);
      textAlign(CENTER, CENTER);
      text("The cat's cozy living quarters are filled with warmth and comfort, with a soft bed,\nplayful toys, and a food bowl. However, something seems off. As you look closer,\nyou notice that things aren't quite right.", 
      textButton.x, textButton.y);
  
    }else if (!showIntroText) {
      // Display the new message after the first mouse press
      fill(0); // Black text
      noStroke(); // No border for text
      textSize(18);
      textAlign(CENTER, CENTER);
      text("Drag balls to the blue box", width / 2, height / 2 + 230);
    }



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
    textSize(24);
    textAlign(CENTER);
    text("The Cat's Cozy Quarters", width / 2, 30);
    fill("green");
  

  }else if(currentSceneIndex == 2){
  
    image(citystreetImg, width / 2, height / 2, width, height);
    drawCar(car1x, height - 120, 5);
    if (carStopped) {
      fill(0);
      rect(car1x, height - 170, 300, 80, 10);
      textSize(20);
      fill(255);
      text("Have you seen the cat's passport? \nWhy would he went to the Hotel", 
      car1x, height - 140); 
      messageDisplayed = true;
    } else {
      drawCar(car1x, height - 120, 5);
      car1x += 5;
      if (car1x > width + 60) {
        car1x = -100;
      }
    }
    textSize(24);
    textAlign(CENTER);
    text("The Bustling City Streets", width / 2, 30);
  
  }
  else if(currentSceneIndex == 3){
 
    image(receptionImg, width / 2, height / 2, width, height);
    image(receptionistsImg, width/2, height/2 + 10 , width /2 - 100 , height / 2);

    textSize(24);
    
    textAlign(CENTER);
    text("The Mysterious Hotel", width / 2, 30);

    for(let i = 0; i < suitcases.length; i++){
    suitcases[i].update();
    suitcases[i].display();
    }

    
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
    fill('#77182a');
    
    if ( currentSceneIndex == 3 && allLuggageCheckedIn == true) {
      currentSceneIndex = 4;
  }
 
  
    // Speech bubble for interaction prompt
    push();
    fill('#ffbda9');
    rect(500, 150, 200, 90, 50);
    fill('#853b40');
    textSize(13);
    textAlign(CENTER, CENTER);
    text("Welcome! Please give me ", 600, 170);
    text("your luggages to SEE THE CAT!", 600, 190);
    text("(Drag the luggages", 600, 210);
    text(" to check-in!)", 600, 230);
    pop();

  
  } else if(currentSceneIndex == 4){
    drawElevator();
  } else if(currentSceneIndex == 5){
  
    image(finalImg, width/2, height/2, width, height);
    image(catImg, width/4, height/2, width - 200, height - 200 ); 

    fill(255);
    rect(900, 500, 440, 50, 10);
    fill(92, 6, 35);
    textSize(24); 
    text("Congratulations you've found the cat!)",920,530);
  }

  pop();
}

function drawElevator() {
  // Elevator frame and background
  push();
  fill('#333333');  // Dark grey for the elevator shaft
  rect(width / 4, 0, width / 2, height);  // Draw the shaft covering the full height

  // Elevator door
  if (elevatorImg) {
    image(elevatorImg, width / 2, elevatorY, width / 2, 800);  // Adjust the size as needed
  } else {
    fill('#ad1f0e');  // Fallback color if image fails to load
    rect(width / 2, elevatorY, width / 2, 300);
  }

  // Elevator control panel
  drawControlPanel();

  // Moving text
  if (elevatorMoving) {
    textSize(20);
    fill(255);  // White text
    text("Moving to your floor...", width / 2, height - 50);
  }
  pop();
}

// Additional function to draw the elevator control panel
function drawControlPanel() {
  let panelX = width * 3 / 4 - 50;  // Position the panel on the right inside the elevator shaft
  let panelY = height / 2 - 150;
  let panelWidth = 80;
  let panelHeight = 300;

  fill('#666666');  // Grey panel
  rect(panelX, panelY, panelWidth, panelHeight, 10);  // Rounded corners for the panel

  // Buttons for floors
  fill('#bbbbbb');  // Light grey buttons
  let buttonSize = 20;
  let buttonPadding = 35;
  for (let i = 0; i < 5; i++) {  // Assume 5 buttons for different floors
    ellipse(panelX + panelWidth / 2, panelY + 50 + i * buttonPadding, buttonSize, buttonSize);
  }

  // Floor indicator
  fill(255); 
  textSize(16);
  textAlign(CENTER, CENTER);
  text("Floor: " + Math.floor(elevatorY / 100), panelX + panelWidth / 2, panelY + 20);
}

function checkElevatorPosition() {
  if (elevatorY >= height - 100) {
    elevatorY = height - 100;
    elevatorMoving = false;
    currentSceneIndex = 5;
  } else if (elevatorY < 0) {
    elevatorY = 0;
    elevatorMoving = false;
  }
}


function mouseWheel(event) {
  if (currentSceneIndex === 4) {
    elevatorY += event.deltaY * 0.5;  
    elevatorMoving = true;  
    checkElevatorPosition();  
  }
  return false;  // Prevent default scrolling behavior
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
  for (let i = 0; i < suitcases.length; i++) {
    suitcases[i].clicked();
  }
  if (!firstMousePress) {
    firstMousePress = true;
    showIntroText = false;
  }
  // if (currentSceneIndex == 1) {
  //   if (BgSound.isPlaying()) {
  //       BgSound.pause();
  //   } else {
  //       BgSound.loop();
  //   }
}

function mouseReleased() {
  for( let i = 0; i < notDraggedBalls.length; i++){
    if( currentSceneIndex == 1 && notDraggedBalls[i].x > 1200 && notDraggedBalls[i].x < 1400 && notDraggedBalls[i].y > 610 && notDraggedBalls[i].y < 755){
      fillBox++;
      notDraggedBalls.splice(i, 1);
      i--;
    } 
  }
  if(currentSceneIndex == 1 && notDraggedBalls.length == 0){
    currentSceneIndex = 2;
  }
  
  checkSuitcasePlacement();  
  for (let i = 0; i < notDraggedSuitcases.length; i++){
    for (let i = 0; i < suitcases.length; i++) {
      suitcases[i].notClicked();
    }
      checkSuitcasePlacement();
  }

}
  

  // function checkSuitcasePlacement() {
  //   let totalSuitcases = suitcases.length;
  //   for (let i = suitcases.length - 1; i >= 0; i--) {
  //     if (suitcases[i].x > 500 && suitcases[i].x < 1100 && suitcases[i].y > 300 && suitcases[i].y < 500) {
  //       suitcases.splice(i, 1);  
  //       suitcasesCheckedIn++;   
  //     }
  //   }
  
   
  //   if (suitcasesCheckedIn == totalSuitcases) {
  //     currentSceneIndex = 4;  
  //   }
  // }

  function checkSuitcasePlacement() {
    let suitcasesCheckedIn = 0;

    for (let i = suitcases.length - 1; i >= 0; i--) {
        if (suitcases[i].x > 500 && suitcases[i].x < 1100 && suitcases[i].y > 300 && suitcases[i].y < 500) {
            suitcases.splice(i, 1);
            suitcasesCheckedIn++;
        }
    }

    if (suitcasesCheckedIn == suitcases.length) {
        allLuggageCheckedIn = true; // Set the flag when all suitcases are checked in
    }
}

function keyPressed(){
  if(currentSceneIndex == 3){
    currentSceneIndex = 4;
    } 
    // else{
    //   currentSceneIndex ++;
    // }
  
}
class Ball{
  constructor(x, y, img){
    this.x = x;
    this.y = y;
    this.beDragged = false;
    this.img = img;
  }
  update(){
    let distanceFromCenter = dist(this.x, this.y, mouseX, mouseY);
    if(distanceFromCenter < 100){
      if(mouseIsPressed == true){
      // this.beDragged = true;
      // ifDragging = true;
        this.x = mouseX;
        this.y = mouseY;
      } 
    //   else {
    //     ifDragging = false;
    //     this.beDragged = false;
    //   }
      
    // } else{
    //   ifDragging = false;
    //   this.beDragged = false;
    // }
  }
}
  display(){
    push();
    translate(this.x, this.y);
    image(this.img, 0, 0, 100, 100);
    pop();
  }
  clicked() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < 50) {  // Assuming the suitcase is draggable if the mouse is within 50 pixels
      this.beDragged = true;
    }
  }

  notClicked() {
    this.beDragged = false;
  }
}
function mouseClicked() {
  if (currentSceneIndex == 2) {
    let carWidth = 120;  
    let carHeight = 80;  
    let carY = height - 120;  

    if (mouseX >= car1x - carWidth / 2 && mouseX <= car1x + carWidth / 2 &&
        mouseY >= carY - carHeight && mouseY <= carY) {
      carStopped = !carStopped; 
    }


    let hotelX = width / 2; 
    let hotelWidth = 200; 
    let hotelHeight = 300; 
    if (messageDisplayed && mouseX >= hotelX - hotelWidth / 2 && mouseX <= hotelX + hotelWidth / 2 &&
        mouseY >= height / 2 - hotelHeight / 2 && mouseY <= height / 2 + hotelHeight / 2) {
      currentSceneIndex = 3; 
      messageDisplayed = false; 
    }
  }
  if (currentSceneIndex == 1 && showIntroText &&
      mouseX > width / 2 - textButton.width / 2 && mouseX < width / 2 + textButton.width / 2 &&
      mouseY > height / 2 - 250 - textButton.height / 2 && mouseY < height / 2 - 250 + textButton.height / 2) {
    showIntroText = false;  
  }
}