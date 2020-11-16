const DEBUG = true;

let drawCount=0;
let fps=0;
let lastTime=Date.now();

const SMOOTHING = false;


//game_speed
const GAME_SPEED = 1000/60;

//screen_size
const SCREEN_W = 320;
const SCREEN_H = 400;

//canvas_size
const CANVAS_W = SCREEN_W *2;
const CANVAS_H = SCREEN_H *2;

//field_size
const FIELD_W = SCREEN_W +120;
const FIELD_H = SCREEN_H +40;

//amount_star
const STAR_MAX =300;


//canvas
let can = document.getElementById("can");
let con = can.getContext("2d");
can.width = CANVAS_W;
can.height = CANVAS_H;

con.mozimageSmoothingEnabled = SMOOTHING;
con.webkitimageSmoothingEnabled = SMOOTHING;
con.msimageSmoothingEnabled = SMOOTHING;
con.imageSmoothingEnabled = SMOOTHING;
con.font="20px 'Impact'";


let vcan = document.createElement("canvas");
let vcon = vcan.getContext("2d");
vcan.width = FIELD_W;
vcan.height = FIELD_H;

let camera_x =0;
let camera_y =0;

let gameOver =false;
let score = 0;

let star=[];

//key
let key =[];

//object
let enemy = [];
let enemy_ball =[];
let ball=[];
let explosion=[];
let me = new Me();


// enemy[0]=new Enemy(3, 200<<8, 200<<8, 0, 0);

//file_loading
let spriteImage = new Image();
spriteImage.src = "sprite2.png";


//game_start
function gameInit()
{
  for (let i=0; i<STAR_MAX;i++)star[i]=new Star();
  setInterval(gameLoop , GAME_SPEED);
}


//update
function updateObj(obj)
{
  for (let i=obj.length-1;i>=0;i--)
  {
    obj[i].update();
    if (obj[i].kill)obj.splice(i,1);
  }
}

//draw
function drawObj(obj)
{
  for (let i=0; i<obj.length;i++)obj[i].draw();
}

//movement
function updateAll()
{
  updateObj(star);
  updateObj(enemy);
  updateObj(ball);
  updateObj(enemy_ball);
  updateObj(explosion);
  if(!gameOver)me.update();
}

function drawAll()
{
  vcon.fillStyle=(me.damage)?"red":"black";
  if (me.hp == 25)vcon.fillStyle="#cd5c5c";
  if (me.hp==0)vcon.fillStyle="red";
  vcon.fillRect(camera_x,camera_y,SCREEN_W,SCREEN_H)



  drawObj(star);
  drawObj(ball);
  if(!gameOver)me.draw();
  drawObj(enemy_ball);
  drawObj(enemy);
  drawObj(explosion)
    


  camera_x = (me.x>>8)/FIELD_W * (FIELD_W-SCREEN_W);
  camera_y = (me.y>>8)/FIELD_H * (FIELD_H-SCREEN_H);

  con.drawImage(vcan, camera_x, camera_y, SCREEN_W, SCREEN_H,
    0,0,CANVAS_W,CANVAS_H);
}

function putInfo()
{
  
  con.fillStyle ="white";

  if(gameOver)
  {
  let s="GAME OVER";
  let w=con.measureText(s).width;
  let x=CANVAS_W/2 - w/2;
  let y=CANVAS_H/2+200;
  con.fillText(s,x,y);
  s="Score:"+ gameCount;
  w=con.measureText(s).width;
  x=CANVAS_W/2 - w/2;
  y=CANVAS_H/2+200+20;
  con.fillText(s,x,y);
  s="Push 'R' key to restart !";
  w=con.measureText(s).width;
  x=CANVAS_W/2 - w/2;
  y=CANVAS_H/2+200+40;
  con.fillText(s,x,y);
  }

  if(gameCount>=6000)
  {
  let s="GAME CLEAR!";
  let w=con.measureText(s).width;
  let x=CANVAS_W/2 - w/2;
  let y=CANVAS_H/2 -20;
  con.fillText(s,x,y);
  s="Score:6000";
  w=con.measureText(s).width;
  x=CANVAS_W/2 - w/2;
  y=CANVAS_H/2 -20+20;
  con.fillText(s,x,y);
  }

  if(DEBUG)
    {
      drawCount++;
      if(lastTime +1000 <=Date.now())
      {
        fps=drawCount;
        drawCount=0;
        lastTime=Date.now();
      }
      con.fillText("FPS:" + fps,20,20);
      // con.fillText("Ball:" + ball.length,20,40);
      // con.fillText("Enemy:" + enemy.length,20,60);
      // con.fillText("Enemy_ball:" + enemy_ball.length,20,80);
      // con.fillText("X:" + (me.x>>8),20,100);
      // con.fillText("Y:" + (me.y>>8),20,120);
      con.fillText("HP:" + me.hp,20,40);
      con.fillText("Time:" + (Math.round(gameCount/60)),20,60);
      if (!gameOver) {con.fillText("Score:" + gameCount,20,80);}
    }
}

let gameCount=0;

function gameLoop()
{

  if (!gameOver && gameCount<=6000) gameCount++;

  if (gameCount>=0 && gameCount<1200)
  {
    if(rand(0,60)==1)
      enemy.push(new Enemy(3, rand(0,FIELD_W)<<8, 0, 0, rand(300,1200)));
  }
  if (gameCount>=1200 && gameCount<2400)
  {
    if(rand(0,30)==1)
      enemy.push(new Enemy(6, rand(0,FIELD_W)<<8, 0, 0, rand(300,1200)));
  }
  if (gameCount>=2400 && gameCount<3600)
  {
    if(rand(0,15)==1)
      enemy.push(new Enemy(9, rand(0,FIELD_W)<<8, 0, 0, rand(300,1200)));
  }
  if (gameCount>=3600 && gameCount<4800)
  {
    if(rand(0,5)==1)
      enemy.push(new Enemy(8, rand(0,FIELD_W)<<8, 0, 0, rand(300,1200)));
  }
  if (gameCount>=4800 && gameCount<6000)
  {
    if(rand(0,1)==1)
      enemy.push(new Enemy(7, rand(0,FIELD_W)<<8, 0, 0, rand(300,1200)));
  }

  updateAll();
  drawAll();
  putInfo();
}

window.onload=function()
{
  gameInit();
}