function Snake() {
    this.pos = createVector(width/2,height/2);
    this.speed = createVector(grid,0);
    this.tails=[];
    this.update = function() {
        for (var i=this.tails.length-1;i>0;i--) {
            this.tails[i].x=this.tails[i-1].x;
            this.tails[i].y=this.tails[i-1].y;
        }
        if (this.tails.length>0)
        {
            this.tails[0].x=this.pos.x;
            this.tails[0].y=this.pos.y;
        }
        this.pos.add(this.speed);
    }
    this.show = function() {
        fill(255,200);
        noStroke();
        rect(this.pos.x,this.pos.y,grid,grid);
        for (var i=0;i<this.tails.length;i++) {
            rect(this.tails[i].x,this.tails[i].y,grid,grid);
        }
    }
    this.isDead = function() {
        if (this.pos.x>width||this.pos.x<0||this.pos.y<0||this.pos.y>height) {
            return true;
        }
        for (var i=1;i<this.tails.length;i++) {
            var d=dist(this.pos.x,this.pos.y,this.tails[i].x,this.tails[i].y);
            if (d<1) {
                return true;
            }
        }
        return false;
    }
    this.eat = function(food) {
        var d=dist(this.pos.x,this.pos.y,food.x,food.y);
        if (d<1) {
            food.newPlace();
            var newend;
            if (this.tails.length>0)
                newend=createVector(this.tails[this.tails.length-1].x,this.tails[this.tails.length-1].y);
            else
                newend=createVector(this.pos.x,this.pos.y);
            this.tails.push(newend);
        }
    }
}