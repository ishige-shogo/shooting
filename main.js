const DEBUG = true;

let drawCount=0;
let fps=0;
let lastTime=Date.now();

const SMOOTHING = false;


//game_speed
const GAME_SPEED = 1000/60;

//screen_size
const SCREEN_W = 320;
const SCREEN_H = 320;

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


let vcan = document.createElement("canvas");
let vcon = vcan.getContext("2d");
vcan.width = FIELD_W;
vcan.height = FIELD_H;

let camera_x =0;
let camera_y =0;

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
    me.update();
}

function drawAll()
{
  vcon.fillStyle=(me.damage)?"red":"black";
  vcon.fillRect(camera_x,camera_y,SCREEN_W,SCREEN_H)

  drawObj(star);
  drawObj(ball);
  me.draw();
  drawObj(enemy_ball);
  drawObj(enemy);
  drawObj(explosion);


  camera_x = (me.x>>8)/FIELD_W * (FIELD_W-SCREEN_W);
  camera_y = (me.y>>8)/FIELD_H * (FIELD_H-SCREEN_H);

  con.drawImage(vcan, camera_x, camera_y, SCREEN_W, SCREEN_H,
    0,0,CANVAS_W,CANVAS_H);
}

function putInfo()
{
  if(DEBUG)
    {
      drawCount++;
      if(lastTime +1000 <=Date.now())
      {
        fps=drawCount;
        drawCount=0;
        lastTime=Date.now();
      }
      con.font="20px 'Impact'";
      con.fillStyle ="white";
      con.fillText("FPS:" + fps,20,20);
      con.fillText("Ball:" + ball.length,20,40);
      con.fillText("Enemy:" + enemy.length,20,60);
      con.fillText("Enemy_ball:" + enemy_ball.length,20,80);
    }
}



function gameLoop()
{
  if(rand(0,30)==1)
    enemy.push(new Enemy(3, rand(0,FIELD_W)<<8, 0, 0, rand(300,1200)));

  updateAll();
  drawAll();
  putInfo();
}

window.onload=function()
{
  gameInit();
}

