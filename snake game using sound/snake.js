

let score = 0;
let snake;
let rez = 20;
let food;
let w;
let h;

let video;
// For displaying the label
let label = "waiting...";
// The classifier




//ml
let soundClassifier;
let resultP;
function preload() {
  let options = { probabilityThreshold: 0.95 };
  soundClassifier = ml5.soundClassifier('SpeechCommands18w', options);
  
}
function setup() {
  createCanvas(680,500);
  resultP = createP('waiting...');
  resultP.style('font-size','12pt');
  
  
  // Create the snake
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(5);
  snake = new Snake();
  foodLocation();

  // STEP 2: Start classifying
  soundClassifier.classify(gotResults);
  
}

function gotResults(error, results) {
  if (error) {
    console.log('something went wrong');
    console.error(error);
  }
  resultP.html(`${results[0].label} : ${results[0].confidence}`);
  label=`${results[0].label}`
  move()
}

// The video


// STEP 1: Load the model!

  
  

  
  // STEP 2 classify the videeo!

  
  
  // STEP 3: Get the classification!
 
  //snake game 
 

function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);

}

function move() {
  if (label === 'left') {
    snake.setDir(-1, 0);
  } else if (label === 'right') {
    snake.setDir(1, 0);
  } else if (label === 'down') {
    snake.setDir(0, 1);
  } else if (label === 'up') {
    snake.setDir(0, -1);
  } 

}


function draw() {
  background(225);

  
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 16);

  // Pick an emoji, the "default" is train
  scale(rez);

if (snake.eat(food)) {
  foodLocation();
}
snake.update();
snake.show();


if (snake.endGame()) {
  print("END GAME");
  background(255, 0, 0);
  noLoop();

}

noStroke();
fill(255, 0, 0);
rect(food.x, food.y, 1, 1);
}



