function Bubble(xx, yy) {
    
    this.x = xx;
    this.y = yy;
    this.rad = 25;
    this.alpha = 255;
    
    this.show = function() {
        noStroke();
        fill(255,this.alpha);
        ellipse(this.x,this.y,this.rad,this.rad);
    };
    
    this.update = function() {
        this.x += random(-2,2);
        this.y += random(-2,2);
        this.alpha--;
    };
    
    this.exists = function() {
        if (this.alpha < 0)
            return true;
        else
            return false;
    }
}