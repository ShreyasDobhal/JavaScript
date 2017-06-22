function Individual(x,y,r) {
    
    this.location = new PVector(x,y);
    this.velocity = new PVector(0,0);
    this.acceleration = new PVector(0,0);
    
    this.rad = r;
    this.maxVelocity = 5*10/this.rad;
    this.maxHealth = 200;
    this.health = this.maxHealth;
    
    this.show = function () {
        fill(0,this.health);
        noStroke();
        ellipse(this.location.x,this.location.y,this.rad*2,this.rad*2);
    }
    this.move = function() {
        this.velocity = this.velocity.add(this.acceleration);
        this.location = this.location.add(this.velocity);
        this.velocity = this.velocity.limit(this.maxVelocity);
        
        //this.acceleration = this.acceleration.random2D(0.5);
        this.health-=0.4;
    }
    this.bound = function() {
        if (this.location.y-this.rad<0) {
            this.location.y = this.rad+1;
            this.velocity.y = this.velocity.y*-1;
        }
        if (this.location.y+this.rad>height) {
            this.location.y = height-this.rad-1;
            this.velocity.y = this.velocity.y*-1;
        }
        if (this.location.x-this.rad<0) {
            this.location.x = this.rad+1;
            this.velocity.x = this.velocity.x*-1;
        }
        if (this.location.x+this.rad>width) {
            this.location.x = width-this.rad-1;
            this.velocity.x = this.velocity.x*-1;
        }
    }
    this.haveFood = function(food) {
        for (var i=food.length-1;i>=0;i--) {
            var d1 = dist(this.location.x,this.location.y,food[i].location.x,food[i].location.y);
            var d2 = this.rad+food[i].rad;
            if (d1<=d2) {
                this.health = this.maxHealth;
                this.rad = this.rad+(1/100)*this.rad;
                food.splice(i,1);
            }
        }
    }
    this.findFood = function(food) {
        var d=100000;
        var closest=0;
        for (var i=food.length-1;i>=0;i--) {
            var tmp = dist(this.location.x,this.location.y,food[i].location.x,food[i].location.y);
            if (tmp<d) {
                d=tmp;
                closest=i;
            }
        }
        if (food[closest]) {
            this.acceleration=food[closest].location.sub(this.location);
            this.acceleration=this.acceleration.limit(0.5);
        }
        else
            this.acceleration = this.acceleration.random2D(0.5);
        
        
    }
    this.reproduce = function() {
        if (random(1)<0.001) {
            var r = this.rad;
            r = this.mutate(r);
            var child = new Individual(random(width),random(height),r);
            return child;
        }
        else 
            return null;
    }
    this.mutate = function(r) {
        if (random(1)<mutationRate) {
            var frac = random(20)-10;
            r = r+frac*1.0/100*r;
        }
        return r;
    }
}