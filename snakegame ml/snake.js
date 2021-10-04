

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
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/VLeyFaN9b/';
let flippedVideo;



//ml


// The video


// STEP 1: Load the model!
function preload() {
    classifier = ml5.imageClassifier(modelURL + 'model.json');
  }
  
  
  function setup() {
    
 
    createCanvas(640,400);
    // Create the snake
    w = floor(width / rez);
    h = floor(height / rez);
    frameRate(5);
    snake = new Snake();
    foodLocation();
    // Create the video
    video = createCapture(VIDEO);
    video.size(640, 400);
    video.hide();

    flippedVideo = ml5.flipImage(video);
    // STEP 2: Start classifying
    classifyVideo();
  }
  
  // STEP 2 classify the videeo!
  function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResults);
    flippedVideo.remove();
  }
  
  
  
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
function gotResults(error, results) {
  // Something went wrong!
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again!
  label = results[0].label;
  move()
  classifyVideo();
}

function draw() {
  background(0);

  // Draw the video
  image(flippedVideo, 0, 0);
  // STEP 4: Draw the label
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