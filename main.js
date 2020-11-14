const DEBUG = true;

let drawCount=0;
let fps=0;
let lastTime=Date.now();


const GAME_SPEED = 1000/60;

const SCREEN_W = 180; 
const SCREEN_H = 320;

const CANVAS_W = SCREEN_W *2;
const CANVAS_H = SCREEN_H *2;

const FIELD_W = SCREEN_W *2;
const FIELD_H = SCREEN_H *2;

const STAR_MAX =300;

let can = document.getElementById("can");
let con = can.getContext("2d");
can.width = CANVAS_W;
can.height = CANVAS_H;

let vcan = document.createElement("canvas");
let vcon = vcan.getContext("2d");
vcan.width = FIELD_W;
vcan.height = FIELD_H;

let camera_x =0;
let camera_y =0;

let star=[];

let key =[];

document.onkeydown = function(e)
{
  key[e.keyCode] = true;
}

document.onkeyup = function(e)
{
  key[e.keyCode] = false;
}


//base_class

class Char
{
  constructor(snum,x,y,vx,vy)
    {
      this.sn   = snum;
      this.x    = x;
      this.y    = y;
      this.vx   = vx;
      this.vy   = vy;
      this.kill = false;
    }
    update()
    {
      this.x += this.vx;
      this.y += this.vy;

      if( this.x<0 || this.x>FIELD_W<<8 || this.y<0 || this.y>FIELD_H<<8 )this.kill = true;
      {

      }
    }
    draw()
    {
      drawSprite(this.sn, this.x, this.y);
    }
}

//enemy_class

class Enemy extends Char
{
    constructor(snum,x,y,vx,vy)
    {
      super(snum,x,y,vx,vy);
    }
    update()
    {
      super.update();
    }
    draw()
    {
      super.draw();
    }
}

let enemy = [
  new Enemy(3,200<<8,200<<8,0,0)
];

//ball_class

class Ball extends Char
{
  constructor(x,y,vx,vy)
  {
    super(5,x,y,vx,vy);
  }
  update()
  {
    super.update();
  }
  draw()
  {
    super.draw();
  }
}

let ball=[]



class Me
{
  constructor()
  {
    this.x = (FIELD_W/2)<<8;
    this.y = (FIELD_H/2)<<8;
    this.speed=512;
    this.reload = 0;
    this.reload2 = 0;
  }
  draw()
  {
    drawSprite(1, this.x, this.y);
  }
  update()
  {
    if(key[32] && this.reload==0)
      { 
        ball.push(new Ball(this.x, this.y,0,-2000));
        this.reload=4;
        if(++this.reload2 ==4)
        {
          this.reload=20;
          this.reload2=0;
        }
      }

    if(this.reload>0) this.reload--;

    if(key[37] && this.x>this.speed)
      {
        this.x-=this.speed;
      }
    if(key[38] && this.y>this.speed)
    {
      this.y-=this.speed;
    }
    if(key[39] && this.x<=(FIELD_W<<8)-this.speed)
    {
      this.x+=this.speed;
    }
    if(key[40] && this.y<=(FIELD_H<<8)-this.speed)
    {
      this.y+=this.speed;
    }
  }
}
let me = new Me();

let spriteImage = new Image();
spriteImage.src = "sprite2.png";

class Sprite
{
  constructor(x,y,w,h)
  {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  
}

let sprite =[
  new Sprite(10,4,8,26), //me
  new Sprite(10,4,8,26), //me
  
  new Sprite(10,22,5,5), //ball

  new Sprite(39,12,86,60), //enemy

  new Sprite(9,36,10,10), //enemy_ball

  new Sprite(152,19,130,130), //explosion
]

function drawSprite(snum, x, y)
{
    let sx = sprite[snum].x;
    let sy = sprite[snum].y;
    let sw = sprite[snum].w;
    let sh = sprite[snum].h;

    let px = (x>>8) - sw/2;
    let py = (y>>8) - sh/2;

    if( px+sw/2 <camera_x || px-sw/2>=camera_x+SCREEN_W
      || py+sh/2 <camera_y || py-sh/2>=camera_y+SCREEN_H) return;


    vcon.drawImage( spriteImage, sx,sy,sw,sh,px,py,sw,sh)
}

function rand(min,max)
{
    return Math.floor(Math.random()*(max-min+1)) + min;
}

class Star{

    constructor()
    {
       this.x = rand(0, FIELD_W)<<8;
       this.y = rand(0, FIELD_H)<<8;
       this.vx = 0;
       this.vy = rand(30,200);
       this.sz = rand(1,2);
    }

    draw()
    {   
        let x=this.x>>8;
        let y=this.y>>8;
        if( x<camera_x || x>=camera_x+SCREEN_W
         || y<camera_y || y>=camera_y+SCREEN_H) return;
        vcon.fillStyle=rand(0,2)!=0?"66f":"#8af";
        vcon.fillRect(x,y, this.sz,this.sz);
    }

    update()
    {
      this.x += this.vx;
      this.y += this.vy;
      if(this.y>FIELD_H<<8)
      {
          this.y=0;
          this.x=rand(0, FIELD_W)<<8;
      }
    }
}


function gameInit()
{
  for (let i=0; i<STAR_MAX;i++)star[i]=new Star();
  setInterval(gameLoop , GAME_SPEED);
}

function gameLoop()
{
  for (let i=0; i<STAR_MAX;i++)star[i].update();
  for (let i=ball.length-1;i>=0;i--)
  {
    ball[i].update();
    if (ball[i].kill)ball.splice(i,1);
  }
  for (let i=enemy.length-1;i>=0;i--)
  {
    enemy[i].update();
    if (enemy[i].kill)enemy.splice(i,1);
  }
    me.update();

  vcon.fillStyle="black";
  vcon.fillRect(camera_x,camera_y,SCREEN_W,SCREEN_H)
  for (let i=0; i<STAR_MAX;i++)star[i].draw();
  for (let i=0; i<ball.length;i++)ball[i].draw();
  for (let i=0; i<enemy.length;i++)enemy[i].draw();
  me.draw();



  camera_x = (me.x>>8)/FIELD_W * (FIELD_W-SCREEN_W);
  camera_y = (me.y>>8)/FIELD_H * (FIELD_H-SCREEN_H);

  con.drawImage(vcan, camera_x, camera_y, SCREEN_W, SCREEN_H,
    0,0,CANVAS_W,CANVAS_H);

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
    }
}

window.onload=function()
{
  gameInit();
}