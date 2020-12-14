var PLAY = 1;
var END = 0;
var gameState = 1;
var mon,mon_img;
var survivalTime=0;
var monkey , monkey_running;
var banana ,bananaImage, rocks, rocksImage;
var FoodGroup, rocksGroup, ground, groundImage;
var score =0;
var gravity, dieSound,collectSound,jumpSound;
var gameOver,gameOverImage, restart, restartImage, invisibleGround;

function preload(){
  
  gameOverImage = loadImage ("gameOver.png");
  groundImage =loadImage("ground2.png");
  restartImage = loadImage("restart.png");
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  rocksImage = loadImage("obstacle.png");
  mon_img = loadImage("sprite_1.png");
  dieSound = loadSound("die.mp3");
  collectSound = loadSound("collect.mp3");
  jumpSound = loadSound("jump.mp3");
}



function setup() {
  monkey=createSprite(77,316,10,10);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  monkey.velocityY=12;
  
  ground=createSprite(400,350,900,10);
  ground.velcityX = 4;
  ground.addImage("moving", groundImage);
  
  gameOver = createSprite(200,200,10,10);
  gameOver.addImage(gameOverImage);
  gameOver.visible = false;
  gameOver.scale = 0.5;
  
  restart = createSprite(200,230,10,10);
  restart.addImage(restartImage);
  restart.visible = false;
  restart.scale = 0.5;
  
  mon = createSprite(77,316,10,10);
  mon.scale=0.1;
  mon.addImage(mon_img);
  mon.visible = false;
  
  invisibleGround = createSprite(400,360,900,10);
  invisibleGround.visible = false;
  
  foodGroup = createGroup();
  rocksGroup = createGroup();
}


function draw() {
  background("white");
  
  
  if (gameState === PLAY){
   rocks(); 
   bananas();
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    monkey.visible=true;
    mon.visible=false;
    gameOver.visible=false;
    restart.visible = false;
    
  if (foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    score=score+1;
    collectSound.play();
  }
    
    ground.velocityX = -(6 + 3* score/10);
    
  if (keyWentDown("space") && monkey.y >= 313.1){
  monkey.velocityY = -18;
    jumpSound.play();
  }
    //console.log(monkey.y);
    
    monkey.velocityY = monkey.velocityY + 0.8;
  
  
    fill("black");
    textSize(20)
  survivalTime = Math.ceil(frameCount/frameRate());
  text ("Survival Time:"+ survivalTime,240,20);
  } 
  
  if(rocksGroup.isTouching(monkey)){
    rocksGroup.destroyEach();  
     monkey.visible=false;
     foodGroup.destroyEach();
    gameState=END;
    dieSound.play();
    
  }
  
  if (gameState === END){
  
//  FoodGroup.setVelocityXEach(0);
  score=0;
  survivalTime=0;
    
    ground.velocityX = 0;
  
  if (mousePressedOver(restart)){
    gameState = PLAY;
    reset();
  }
  mon.visible = true;  
  gameOver.visible = true;
  restart.visible = true;
  }
  textSize(19); 
  fill("black");
  text ("Banana Collected:"+score,10,20);
  
  ground.depth = monkey.depth;
  monkey.depth = monkey.depth + 1;
  
  drawSprites();
  
  monkey.collide(invisibleGround);
}



function rocks(){
 if (frameCount % 300 === 0) {
 rock = createSprite(390,330,10,10);
 rock.setCollider("rectangle",10,10,7,7);
 rock.debug = false;       
 rock.addImage(rocksImage);
 rock.scale = 0.1;
 rock.velocityX = -(4 + 3* score/10);
 rocksGroup.add(rock);
 }
}

function bananas(){
 if (frameCount % 80 === 0) {
 banana = createSprite(200,200,10,10);
 banana.addImage(bananaImage);
 banana.scale=0.1;
 banana.velocityX=-(2 + 3* score / 10);
 banana.y = Math.round(random(120,200));
 foodGroup.add(banana);
 }
}

function reset(){
  gameState = PLAY;
  rocksGroup.destroyEach();
  foodGroup.destroyEach();
  survivalTime = 0;
  score = 0;
  
}