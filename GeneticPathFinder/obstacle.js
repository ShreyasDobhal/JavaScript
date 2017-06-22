function Obstacle(a,b,c,d) {
    this.x=a;
    this.y=b;
    this.w=c;
    this.h=d;
    this.show=function() {
        fill(255);
        rect(this.x,this.y,this.w,this.h);
    }
}