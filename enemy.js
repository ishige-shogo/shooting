//about enemy

//enemy_ball_class
class Enemy_ball extends Char
{

}

//enemy_class

class Enemy extends Char
{
    constructor(snum,x,y,vx,vy)
    {
      super(snum,x,y,vx,vy);
      this.flag = false;
      // this.w = 20;
      // this.h = 20;
      this.r = 10;
    }
    update()
    {
      super.update();
      
      if(!this.flag)
      {
        if(me.x>this.x && this.vx<120) this.vx += 4;
        else if(me.x<this.x && this.vx>-120) this.vx -= 4;
      }

      else
      {
        if(me.x<this.x && this.vx<400) this.vx += 30;
        else if(me.x>this.x && this.vx>-400) this.vx -= 30;
      }

      if(Math.abs(me.y-this.y)<(100<<8) && !this.flag)
      {
        this.flag = true;

        let angle,dx,dy;
        angle= Math.atan2(me.y-this.y , me.x-this.x);
        dx = Math.cos(angle) * 1000;
        dy = Math.sin(angle) * 1000;

        enemy_ball.push(new Enemy_ball(4,this.x,this.y,dx,dy));
        
      }
      if(this.flag && this.vy>-800) this.vy-=30;
    }
    draw()
    {
      super.draw();
    }
}