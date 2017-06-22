var popSize=200;
var lifeSpan=300;
var mutationRate=0.01;

var organisms=[];
var target;
var obstacle;

var count=0;
var generations=1;

var startX;
var startY;

function setup() {
	createCanvas(600,400);
    startX=20;
    startY=height/2;
    for (var i=0;i<popSize;i++) {
        organisms[i]=new Organism();
    }
    target=new Target(width-50,height/2);
    obstacle=new Obstacle(width/2,height/2-100,10,height/2);
}

function draw() {
    background(50);
    target.show();
    obstacle.show();
    for (var i=0;i<popSize;i++) {
        organisms[i].show();
        organisms[i].move();
        organisms[i].calcFitness();
    }
    if (count>=lifeSpan) {
        // new Generation
        count=0;
        normalizeFitness();
        newGeneration();
        generations++;
    }
    textSize(16);
    fill(255);;
    text("Frames : "+count, 10, 30);
    text("Generation : "+generations,10,50);
    count++;
}

function normalizeFitness() {
    var sum=0;
    for (var i=0;i<popSize;i++) {
        sum+=organisms[i].fitness;
    }
    for (var i=0;i<popSize;i++) {
        organisms[i].fitness/=sum;
    }
}

function selection() {
    var index=0;
    var r=random(1);
    for (var i=0;i<popSize;i++) {
        if (r<organisms[i].fitness) {
            index=i;
            break;
        }
        r-=organisms[i].fitness;
    }
    return index;
}

function newGeneration() {
    var newPop=[];
    for (var i=0;i<popSize;i++) {
        var parentA=organisms[selection()];
        var parentB=organisms[selection()];
        var child=parentA.crossOver(parentB);
        newPop[i]=child;
    }
    organisms=newPop;
}