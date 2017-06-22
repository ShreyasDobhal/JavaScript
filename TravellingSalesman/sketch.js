var cities = [];
var totalCities = 10;

var order = [];

var recordDistance;
var bestEver;



function setup() {
    createCanvas(400,400);
    for (var i=0;i<totalCities;i++) {
        var v = createVector(random(width),random(height));
        cities[i] = v;
        order[i] = i;
    }
    recordDistance = calcDist(cities,order);
    bestEver = order.slice();
}

function nextOrder() {
    // Step 1
    var largestI = -1;
    
    for (var i=0;i<order.length-1;i++) {
        if (order[i]<order[i+1]) {
            largestI = i;
        }
    }
    if (largestI == -1) {
        noLoop();
    }
    // Step 2
    var largestJ = -1;
    for (var j=0;j<order.length;j++) {
        if (order[j]>order[largestI]) {
            largestJ = j;
        }
    }
    // Step 3
    swap(order,largestI,largestJ);
    // Step 4
    // reverse from a[x+1,...,n]
    var endArray = order.splice(largestI+1);
    endArray.reverse();
    order = order.concat(endArray);
    
}

function draw() {
    background(0);
    
    fill(255);
    for (var i=0;i<cities.length;i++) {
        ellipse(cities[i].x,cities[i].y,8,8);
    }
    
    stroke(255);
    strokeWeight(1);
    noFill();
    beginShape();
    for (var i=0;i<order.length;i++) {
        var n = order[i];
        vertex(cities[n].x,cities[n].y);
    }
    endShape();
    
    stroke(255,0,255);
    strokeWeight(4);
    noFill();
    beginShape();
    for (var i=0;i<order.length;i++) {
        var n = bestEver[i];
        vertex(cities[n].x,cities[n].y);
    }
    endShape();
    
    nextOrder();
    
    
    var d = calcDist(cities,order);
    if (d<recordDistance) {
        recordDistance = d;
        bestEver = order.slice();
    }
    
    
    
    
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