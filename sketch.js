var dog, happyDog;
var dogImg, happyDogImg;
var database, foodStock;

function preload()
{
  dogImg = loadImage("./dogImg1.png");
  happyDogImg = loadImage("./dogImg.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  var foodStockRef = database.ref('food');
  foodStockRef.on("value", readStock);
  dog = createSprite(250,250,10,10);
  dog.addImage("dog",dogImg);
  dog.scale = 0.25;
  
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodStock);
    dog.addImage("happyDog", happyDogImg);
  }

  if(keyWentUp(UP_ARROW)){
    dog.addImage("dog", dogImg);
  }

  drawSprites();

  fill("Black");
  text("FOOD REMAINING: " + foodStock, 200, 100);

}

function readStock(data){
  foodStock = data.val();
  console.log(foodStock);
}

function writeStock(x){
  if(x <= 0){
    x = 0;
  }
  else{
    x = x - 1;
  }

  database.ref('/').update({
    food: x
  });
}



