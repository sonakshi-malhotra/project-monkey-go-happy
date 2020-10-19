var gameState
var monkeyImage,obstacleImage,background,obstacleGroup,score,bananaImage
var counter=0
function preload(){
backImage = loadImage ("jungle.jpg")
monkeyImage = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  monkeyStopped=loadImage("Monkey_01.png")
bananaImage=loadImage("banana.png")
obstacleImage=loadImage("stone.png")
}


function setup() {
  gameState="play"
  createCanvas(800, 400);
  
  bg = createSprite(0,0)
  bg.addImage(backImage)
  bg.velocityX = -4
  bg.scale = 2
  bg.x=bg.width/2
  
  monkey = createSprite(50,390)
  monkey.addAnimation("Running",monkeyImage)
  monkey.scale=0.20 
  monkey.addImage("stopped",monkeyStopped)
  
  ground = createSprite(400,400,800,20)
  ground.visible=false
  
 /* banana = createSprite(120,240)
  banana.addImage(bananaImage)
  banana.scale = 0.06*/
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  score=0    
}

function draw() {
  background(220);
  if(gameState==="play")
  {
  if(bg.x<0){
  bg.x = bg.width/2
  }
   if (keyDown("space")) {
    monkey.velocityY=-9;
  }
  
  monkey.velocityY = monkey.velocityY +0.8

  
 if(monkey.isTouching (foodGroup)){
    score=score+2 
    foodGroup.destroyEach();
}
  
  switch(score){
    case 10: monkey.scale = 0.22;
            break;
    case 20: monkey.scale = 0.24;
            break;
    case 30: monkey.scale = 0.26;
            break;
    case 40: monkey.scale = 0.28;
            break; 
    default: break;        
  }
   if(obstacleGroup.isTouching(monkey)){
      monkey.scale=monkey.scale-0.05   
     counter++
   }
    if(counter===2){
      gameState="end"
     obstacleGroup.destroyEach()
    }
  
   
  spawnBananas()
  spawnStones()
  }
  if(gameState==="end"){
  bg.velocityX=0
 monkey.changeImage("stopped")
  }
  monkey.collide(ground)
  drawSprites()
    stroke("white");
  textSize(20);
  fill("white")
  text("score: "+ score, 500, 50); 
}

function spawnBananas() {
  //write code here to spawn the clouds
  if (World.frameCount % 80 === 0) {
    var bananas = createSprite(400,320);
    bananas.y = random(120,200);
    bananas.addImage(bananaImage);
    bananas.scale = 0.08;
    bananas.velocityX = -3;
    
     //assign lifetime to the variable
   bananas.lifetime = 134;
    
    //adjust the depth
    bananas.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
   foodGroup.add(bananas  );
  }
}

function spawnStones() {
  //write code here to spawn the clouds
  if (World.frameCount % 300 === 0) {
    var obstacles = createSprite(400,320);
    obstacles.addImage(obstacleImage);
    obstacles.scale = 0.2;
    obstacles.velocityX = -3;
    
     //assign lifetime to the variable
  obstacles.lifetime = 134;
    
    //adjust the depth
    
   obstacleGroup.add(obstacles);
  }
}

