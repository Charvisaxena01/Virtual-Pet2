//Create variables here
var dog,dog1,happyDog,database,foodS,foodStock;
var feedPet,addFood;
var fedTime,lastFed;
var foodOj;


function preload()
{
  dog1 = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")

 //mam my code is workiing properly but what I should do so that my that problem which is of thta when the food is 0 and we click on
 //up key so it again start from 20 so what code should be there to stop it.

	//load images here
}

function setup() {

  database = firebase.database()
  createCanvas(1000, 500);

  foodOj = new Food()

 foodStock = database.ref('Food');
 foodStock.on("value",readStock);

  dog = createSprite(800,200,150,150)
  dog.addImage(dog1)
  dog.scale = 0.5
  
 feedPet = createButton("Feed the dog")
 feedPet.position(700,95)
 feedPet.mousePressed(feedDog);

 addFood = createButton("Add Food")
 addFood.position(800,95)
 addFood.mousePressed(addFoods)





  
}


function draw() {  
  background("brown")
  drawSprites();
  //add styles here
  foodOj.display()


      fedTime = database.ref('FeedTime')
      fedTime.on("value",function(data){
        lastFed = data.val()
      });
   fill(255,255,254)
   textSize(15)
   if(lastFed>=12){
     text("LastFeed :" + lastFed%12+"PM", 350,30)
   }else if(lastFed == 0){
     text("Last Feed : 12 AM", 350,30)

   }else{
     text("Last Feed : " + lastFed+"AM",350,30)
   }

}


  

  

function readStock(data){
  foodS=data.val();
  foodOj.updateFoodStock(foodS)
}
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}
function feedDog(){
  dog.addImage(happyDog)
  
  foodOj.updateFoodStock(foodOj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodOj.getFoodStock(),
    fedTime:hour()
    
  })
}
 function addFoods(){
   foodS++;
   
   database.ref('/').update({
     Food:foodS
   })
 }






