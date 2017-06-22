var bubbles=[];

function setup() {
	createCanvas(640,480);
}

function draw() {
    background(0);
    for (var i=0;i<bubbles.length;i++)
    {
        bubbles[i].show();
        bubbles[i].update();
        if (bubbles[i].exists())
            bubbles.splice(i,1);
    }    
}

function mousePressed() {
    bubbles.push(new Bubble(mouseX,mouseY));
}