
function Organism(dna) {
    this.pos=createVector(startX,startY);
    this.speed=createVector(0,0);
    this.acc=createVector(0,0);
    this.maxSpeed=5;
    this.len=4;
    this.angle=0;
    this.dna;
    if (dna)
        this.dna=new DNA(dna);
    else
        this.dna=new DNA();
    this.fitness=0;
    this.completed=false;
    this.show = function() {
        fill(255,200);
        noStroke();
        beginShape();
        vertex(this.pos.x-this.len*sin(this.angle),this.pos.y-this.len*cos(this.angle));
        vertex(this.pos.x+this.len*4*cos(this.angle),this.pos.y-this.len*4*sin(this.angle));
        vertex(this.pos.x+this.len*sin(this.angle),this.pos.y+this.len*cos(this.angle));
        endShape();
    }
    this.move = function() {
        if (!(this.pos.x<0||this.pos.x>width||this.pos.y<0||this.pos.y>height)&&!this.completed) {
            this.pos.add(this.speed);
            this.speed.add(this.acc);
            this.speed.limit(this.maxSpeed);
            this.angle=-this.speed.heading();
            this.acc=this.dna.genes[count];
        }
    }
    this.calcFitness = function() {
        
        var d=dist(this.pos.x,this.pos.y,target.x,target.y);
        var f=1;
        var t=1;
        if (this.pos.x>obstacle.x&&this.pos.x<obstacle.x+obstacle.w&&this.pos.y>obstacle.y&&this.pos.y<obstacle.y+obstacle.h) {
            f=0.1;
            this.completed=true;
        }
        if (d<target.r&&!this.completed) {
            f=10;
            this.completed=true;
            t=map(count,0,lifeSpan,10,1);
        }
        d=map(d,0,width,1,0);
        if (d>this.fitness)
            this.fitness=d*f*t;
    }
    this.crossOver = function(other) {
        var childgene=this.dna.crossOver(other.dna);
        var child=new Organism(childgene);
        child.dna.mutate();
        return child;
    }
}