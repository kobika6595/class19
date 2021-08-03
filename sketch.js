var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadAnimation("ghost-standing.png","ghost-jumping.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost =createSprite(300,300);
  ghost.addAnimation("ghost",ghostImg)
  ghost.scale=0.4;
 doorsGroup=new Group()
 climbersGroup=new Group()

 invisibleBlockGroup=new Group()
 spookySound.loop()
  
}

function draw() {
  background(0);
  if(gameState==="play"){

  
  if(tower.y > 400){
      tower.y = 300
    } 
    if(keyDown("left")){
      ghost.x-=5
    
    }
    if(keyDown("right")){
      ghost.x+=5
    }
    if(keyDown("space")){
      ghost.velocityY=-7
    }
    ghost.velocityY+=0.7
    if(climbersGroup.isTouching(ghost)){
     ghost.velocityY=0
    }
    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
      ghost.visible=false
      gameState="end"
    }
    
    spawnDoor()

    drawSprites()
  }
  else if(gameState==="end"){
    stroke("white")
    strokeWeight(4)
    fill("red")
    textSize(30)
    text("Game Over!",210,300)
    text("Press space to restart",210,340)
    if(keyDown("space")){
      gameState="restart"
      reset()
      
    }
  }
}
function spawnDoor(){
 if(frameCount%240==0) {
   door=createSprite(Math.round(random(120,500)),-25)
   door.addImage(doorImg)
   door.velocityY=1
   door.lifetime=625;
   doorsGroup.add(door)

   
   climber=createSprite(door.x,25)
   climber.addImage(climberImg)
   climber.velocityY=1
   climber.lifetime=625;
   climbersGroup.add(climber)
   

   invisibleBlock=createSprite(door.x,45,climber.width,2)
   
   invisibleBlock.velocityY=1
   invisibleBlock.lifetime=625;
  invisibleBlockGroup.add(invisibleBlock)
  invisibleBlock.visible=false
  
  ghost.depth=climber.depth+1
 }
 
}
function reset(){
  gameState="play"
  ghost.x=300
  ghost.y=300
  ghost.visible=true
  ghost.velocityY=0

}

