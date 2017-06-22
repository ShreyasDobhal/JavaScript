// Ball object
var height = 480;
var width = 640;
var flag = false;
var i = 0;
var balls = [];

function createBall(xpos,ypos) {
    balls[i] = {
        x: 0,
        y: 0,
        speed: 0,
        maxHt: 0,
        create: function(a, b) {
            this.x=a;
            this.y=b;
            this.speed=7;
            this.maxHt=this.y;
        },
        show : function() {
            stroke(50, 0, 100);
            fill(50, 50, 200, 50);
            ellipse(this.x,this.y,50,50);
        },
        fall : function() {
            this.y += this.speed;
        },
        bounce : function() {
            if (this.y>height) {
                this.speed *= -1;
                this.maxHt = height-(height-this.maxHt)*0.75;
            }
            if (this.y<this.maxHt) {
                this.speed *= -1;
            }
            if (height-this.maxHt<5) {
                this.speed = 0;
            }
        }
    };
    balls[i].create(xpos,ypos);
    i++;
}
function setup() {
	createCanvas(640,480);
}

function draw() {
    background(200);
    for (var n=0; n<i; n++) {
        balls[n].show();
        balls[n].fall();
        balls[n].bounce();
    }
}
function mousePressed() {
    createBall(mouseX,mouseY);
}