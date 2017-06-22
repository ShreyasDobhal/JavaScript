var org;
var organism = [];
var food = [];
var mutationRate = 0.1;

function setup() {
	createCanvas(600,400);
    for (var i=0;i<10;i++)
        organism[i] = new Individual(random(width-50)+25,random(height-50)+25,random(40-2)+2);
    for (var i=0;i<20;i++)
        food[i] = new Food();
}

function draw() {
    background(220);
    
    if (random(1)<0.02)
        addFood();
    
    for (var i=food.length-1;i>=0;i--) {
        food[i].show();
    }
    for (var i=organism.length-1;i>=0;i--) {
        organism[i].findFood(food);
        
        organism[i].show();
        organism[i].move();
        organism[i].bound();
        
        organism[i].haveFood(food);
        
        var child = organism[i].reproduce();
        if (child != null) {
            organism[organism.length] = child;
            child.show();
        }
            
        
        if (organism[i].health<0)
            organism.splice(i,1);
    }
    
}

function addFood() {
    food[food.length] = new Food();
}