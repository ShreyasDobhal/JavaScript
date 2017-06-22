function Target(x,y) {
    this.x=x;
    this.y=y;
    this.r=15;
    this.show=function() {
        fill(0,200,200,200);
        noStroke();
        ellipse(this.x,this.y,this.r*2,this.r*2);
    }
}