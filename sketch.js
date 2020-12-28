var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var spawnFood, obstacleGroup;
var SurvivalTime;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  SurvivalTime=0;

}



function setup() {
     monkey = createSprite(80,315,20,20);
 monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(450,350,900,10);
  ground.velocityX = -(4 + 3* SurvivalTime/100)
  console.log(ground.x);
  
  
  
  bananaGroup= new Group();
  obstaclesGroup= new Group();
}


function draw(){
 background("white");
  drawSprites();
  if (keyDown("space")&& monkey.y >= 200){
  monkey.velocityY=-10;    
  }

  spawnFood();
  obstacleGroup();
  
  if(ground.x < 0){
   
  ground.x = ground.width /2;
  

    
}
  
  if(monkey.isTouching(bananaGroup)){
   banana.destroy();
     //score=score+1;
  }
  
   if(monkey.isTouching(obstaclesGroup)){
     monkey.destroy();
    gameState=END
   }
 else if(gameState===END){
 bananaGroup.destroyEach();
 obstaclesGroup.destroyEach();  
   
  
  
   ground.velocityX=0;
   
   ground.destroy();
   
    // text("SurvivalTime",100,50);
   
    stroke("red");
  fill("red");
  textSize(40);
  text("GAME OVER",100,300);
  
}
  
  ground.velocityX = -(4 + 3* SurvivalTime/60);
    SurvivalTime = SurvivalTime + Math.round(getFrameRate()/60);


  text("SurvivalTime:"+SurvivalTime,300,50);
  
  monkey.velocityY = monkey.velocityY+0.8;
monkey.collide(ground);
 

}


function spawnFood(){
  if (frameCount % 120 === 0){
    banana = createSprite(200,150);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.x=Math.round(random(120,400));
    
    banana.lifetime = 134;
    bananaGroup.add(banana);
  }
}


function obstacleGroup(){
 
  if (frameCount % 90===0){
    obstacle = createSprite(200,325);
     obstacle.velocityX = -(6 + SurvivalTime/100);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.x=Math.round(random(200,400));
    obstacle.velocityX = -4;
    obstacle.lifetime =200; 
    obstaclesGroup.add(obstacle);
  }
}