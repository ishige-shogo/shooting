// about me

//ball_class

class Ball extends Char
{
  constructor(x,y,vx,vy)
  {
    super(2,x,y,vx,vy);
    // this.w = 4;
    // this.h = 6;
    this.r =4;
  }
  update()
  {
    super.update();
    

    for (let i=0; i<enemy.length ;i++)
    {
      if (!enemy[i].kill)
      {
        if(checkHit(
          this.x, this.y, this.r,
          enemy[i].x, enemy[i].y, enemy[i].r
        ))
        {
          enemy[i].kill=true;
          this.kill=true;
          explosion.push(new Explosion(5,enemy[i].x, enemy[i].y, enemy[i].vx>>3, enemy[i].vy>>3 ));
          break;
        }
      }
    }
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
    this.r = 10;
    this.damage = 0;
  }
  draw()
  {
    drawSprite(1, this.x, this.y);
  }
  update()
  {
    if(this.damage)this.damage--;
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