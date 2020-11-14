// about me

//ball_class

class Ball extends Char
{
  constructor(x,y,vx,vy)
  {
    super(2,x,y,vx,vy);
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

//me_class

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