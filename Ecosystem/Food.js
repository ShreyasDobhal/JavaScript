function Food() {
    
    this.location = new PVector(random(width),random(height));
    this.rad = 2;
    
    this.show = function() {
        fill(150);
        strokeWeight(2);
        stroke(0);
        ellipse(this.location.x,this.location.y,this.rad*2,this.rad*2);
    }
}