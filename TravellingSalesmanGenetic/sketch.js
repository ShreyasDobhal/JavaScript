var totalCities = 10;
var PopSize = 500;

var cities = [];
var population = [];
var fitness= [];

var recordDistance=Infinity;
var bestEver;

function setup() {
    createCanvas(400,400);
    var order=[];
    for (var i=0;i<totalCities;i++) {
        var v = createVector(random(width),random(height));
        cities[i] = v;
        order[i] = i;
    }
    for (var i=0;i<PopSize;i++) {
        population[i]=shuffle(order);
    }
    calculateFitness();
}
function draw() {
    background(0);
    
    // Genetic Algorithm
    calculateFitness();
    normalizeFitness();
    nextGeneration();
    
    stroke(255);
    strokeWeight(4);
    noFill();
    beginShape();
    for (var i=0;i<bestEver.length;i++) {
        var n = bestEver[i];
        vertex(cities[n].x,cities[n].y);
        ellipse(cities[n].x,cities[n].y,16,16);
    }
    endShape();
}

function swap(a,i,j) {
    var t = a[i];
    a[i] = a[j];
    a[j] = t;
}
function calcDist(points,order) {
    var sum = 0;
    for (var i=0;i<order.length-1;i++) {
        var cityA = points[order[i]];
        var cityB = points[order[i+1]];
        var d = dist(cityA.x,cityA.y,cityB.x,cityB.y);
        sum+=d;
    }
    return sum;
}