var data=[];
var m=0,b=0;
function setup() {
	createCanvas(400,400);
}

function draw() {
    background(0);
    drawPoints();
    if (data.length>1) {
        gradientDescent();
    }
    drawLine();
}

function mousePressed() {
    var x=map(mouseX,0,width,0,1);
    var y=map(mouseY,0,height,1,0);
    var point=createVector(x,y);
    data.push(point);
}

// for slope and intercept based learning
function LinearRegression() {
    var xsum = 0;
    var ysum = 0;
    for (var i=0;i<data.length;i++) {
        xsum+=data[i].x;
        ysum+=data[i].y;
    }
    var xmean=xsum/data.length;
    var ymean=ysum/data.length;
    var num=0,den=0;
    for (var i=0;i<data.length;i++) {
        var x=data[i].x;
        var y=data[i].y;
        num+=(x-xmean)*(y-ymean);
        den+=(x-xmean)*(x-xmean);
    }
    m=num/den;
    b=ymean-m*xmean;
}

// for gradient descent based learning
function gradientDescent() {
    var learningRate=0.01;
    for (var i=0;i<data.length;i++) {
        var x=data[i].x;
        var y=data[i].y;
        var guess=m*x+b;
        var error=y-guess;
        m=m+(error*x)*learningRate;
        b=b+error*learningRate;
    }
}

function drawLine() {
    var x1=0;
    var y1=m*x1+b;
    var x2=width;
    var y2=m*x2+b;
    x1=map(x1,0,1,0,width);
    x2=map(x2,0,1,0,width);
    y1=map(y1,0,1,height,0);
    y2=map(y2,0,1,height,0);
    
    stroke(255);
    strokeWeight(2);
    line(x1,y1,x2,y2);
}
function drawPoints() {
    for (var i=0;i<data.length;i++) {
        var x=map(data[i].x,0,1,0,width);
        var y=map(data[i].y,0,1,height,0);
        fill(255);
        stroke(255);
        ellipse(x,y,4,4);
    }
}