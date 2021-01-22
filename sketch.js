var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var plinkos = [];
var divisions = [];

var divisionHeight=300;
var score =0;
var turn=0;
var gameState="play";
var particle;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) 
   {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }
    
}
 

function draw() 
{
  background("black");

  textSize(20)
  text("Score : "+score,20,30);

  //adding score 500 between divisions
  text("500",30,500);
  text("500",100,500);
  text("500",180,500);
  text("500",270,500);

  //adding score 100 between divisions
  text("100",350,500);
  text("100",430,500);
  text("100",510,500);

  //adding score 200 between divisions
  text("200",590,500);
  text("200",660,500);
  text("200",750,500);

  Engine.update(engine);
 
  
   for (var i = 0; i < plinkos.length; i++) 
   {
     
     plinkos[i].display();
     
   }
 
   for (var k = 0; k < divisions.length; k++) 
   {
     
     divisions[k].display();
   }

   if(particle!=null)
 {
   particle.display();

   if(particle.body.position.y>760)
   {
     if(particle.body.position.x<300)
     {
       score=score+500;
       particle=null;
       if(turn>=5)
       gameState="end";
     }
     else 
     {
       if(particle.body.position.x<600 && particle.body.position.x>300)
       {
        score=score+100;
        particle=null;
        if(turn>=5)
        gameState="end";
       }
       else
       {
        if(particle.body.position.x>600 && particle.body.position.x<800)
        {
         score=score+200;
         particle=null;
         if(turn>=5)
         gameState="end";
        }
       }
      }     
   }
 }

 if(gameState==="end")
 {
   textSize(50);
   text("GAME OVER",300,350);
 }
} 

function mousePressed()
{
  if(gameState!=="end")
  {
    turn++;
    particle = new Particle(mouseX,10,10,10);
  }
}