function PVector(x,y) {
    
    this.x = x;
    this.y = y;
    this.add = function(other) {
        var resultant = new PVector(this.x+other.x,this.y+other.y);
        return resultant;
    }
    this.sub = function(other) {
        var resultant = new PVector(this.x-other.x,this.y-other.y);
        return resultant;
    }
    this.mod = function() {
        var modd = this.x*this.x+this.y*this.y;
        modd = sqrt(modd);
        return modd;
    }
    this.mul = function (val) {
        var resultant = new PVector(this.x*val,this.y*val);
        return resultant;
    }
    this.limit = function(val) {
        if (this.mod()>val)
            return this.mul(val/this.mod());
        else
            return this;
    }
    this.random2D = function(val) {
        var ang = random(2*3.14);
        var ran = new PVector(val*cos(ang),val*sin(ang));
        return ran;
    }
}