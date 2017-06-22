function Point(x,y) {
    this.x=x;
    this.y=y;
    this.show= function() {
        fill(255);
        noStroke();
        ellipse(this.x,this.y,5,5);
    }
}