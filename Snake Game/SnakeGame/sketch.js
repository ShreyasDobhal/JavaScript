var grid=20;
var rows,cols;
var s;
var f;
function setup() {
	createCanvas(600,600);
    frameRate(10);
    rows=width/grid;
    cols=height/grid;
    s=new Snake();
    f=new Food(random(width),random(height));
}

function draw() {
    background(50);
    if (!s.isDead()) {
        s.update();
        s.eat(f);
    }
    else {
        noLoop();
    }
    s.show();
    f.show();
}

function keyPressed() {
    if (keyCode == RIGHT_ARROW && s.speed.x>=0)
        s.speed = createVector(grid,0);
    else if (keyCode == LEFT_ARROW && s.speed.x<=0)
        s.speed = createVector(-grid,0);
    else if (keyCode == UP_ARROW && s.speed.y<=0)
        s.speed = createVector(0,-grid);
    else if (keyCode == DOWN_ARROW && s.speed.y>=0)
        s.speed = createVector(0,grid);
}