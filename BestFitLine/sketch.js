var points= [];
var avgX=0,avgY=0;
var sumX=0,sumY=0;
var m=0,c=0;
function setup() {
	createCanvas(400,400);
}

function draw() {
    background(0);
    for (var i=0;i<points.length;i++) {
        points[i].show();
    }
    calcM();
    calcC();
    lineShow();
}

function mousePressed() {
    var x=mouseX;
    var y=mouseY;
    
    points.push(new Point(x,y));
    var n=points.length;
    sumX+=x;
    sumY+=y;
    avgX=sumX/n;
    avgY=sumY/n;
}

function calcM() {
    var N=0,D=0;
    for (var i=0;i<points.length&&points.length>2;i++) {
        var x1=map(points[i].x,0,width,0,1);
        var y1=map(points[i].y,0,height,1,0);
        var x2=map(avgX,0,width,0,1);
        var y2=map(avgY,0,height,1,0);
        N+=(x1-x2)*(y1-y2);
        D+=(x1-x2)*(x1-x2);
    }
    if (D!=0)
        m= N/D;
}
function calcC() {
    if (points.length>2) {
        var x1=avgX;//map(avgX,0,width,0,1);
        var y1=map(avgY,0,height,height,0);
        c=y1-m*x1;
    }
}
function lineShow() {
    stroke(255);
    strokeWeight(2);
    line(0,height-c,width,height-m*width-c);
}