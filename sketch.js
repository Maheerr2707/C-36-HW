var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed, lastFeed
//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feedDog = createButton("Feed Dog")
  feedDog.position(600,95)
  feedDog.mousePressed(feedTheDog)

}

function draw() {
  background(46,139,87);
  foodObj.display();


 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedTheDog(){
  dog.addImage(happyDog);

var foodStock = foodObj.getFoodStock()

if(foodStock<=0){
  foodObj.updateFoodStock(0)
}

else{
  foodObj.updateFoodStock(foodStock-1)
}
database.ref("/").update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
})
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
