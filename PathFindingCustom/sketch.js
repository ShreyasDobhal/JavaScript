var cols = 25;
var rows = 25;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var start;
var end;

var w,h;

var path=[];

var noSoln = false;
var startFind = false;


function Spot(i,j) {
    // f(n) = g(n) + h(n)
    this.f = 0;
    this.g = 0;
    this.h = 0;
    
    this.i = i;
    this.j = j;
    
    this.neighbors = [];
    this.previous = undefined;
    
    this.wall = false;
    
    if (random(1)<0.3) {
        this.wall = true;
    }
        
    
    this.show = function(col) {
        fill(col);
        if (this.wall) {
            fill(0);
        }
        noStroke();
        rect(this.i*w,this.j*h,w-1,h-1);
    }
    
    this.addNeighbor = function(grid) {
        var i = this.i;
        var j = this.j;
        if (i<cols-1) {
            this.neighbors.push(grid[i+1][j]);
        }
        if (i>0) {
            this.neighbors.push(grid[i-1][j]);
        }
        if (j<rows-1) {
            this.neighbors.push(grid[i][j+1]);
        }
        if (j>0) {
            this.neighbors.push(grid[i][j-1]);    
        }
        
    }
}

function removeFromArray(arr,ele) {
    for (var i=arr.length-1;i>=0;i--) {
        if (arr[i]==ele) {
            arr.splice(i,1);
        }
    }
}

function heuristic(a,b) {
    //var d = dist(a.i,a.j,b.i,b.j);
    var d = abs(a.i-b.i)+abs(a.j-b.j);
    return d;
}


function setup() {
	createCanvas(400,400);
    console.log("A*");
    w = width/cols;
    h = height/rows;
    
    // Making a 2D array
    for (var i=0;i<cols;i++) {
        grid[i] = new Array(rows);
    }
    
    for (var i=0;i<cols;i++) {
        for (var j=0;j<rows;j++) {
            grid[i][j] = new Spot(i,j);
        }
    }
    
     for (var i=0;i<cols;i++) {
        for (var j=0;j<rows;j++) {
            grid[i][j].addNeighbor(grid);
        }
    }
    
    start = grid[0][0];
    //end = grid[5][rows-1];
    
    start.wall = false;
    //end.wall = false;
    
    openSet.push(start);
    
    console.log(grid);
}

function mousePressed() {
    end = grid[floor(mouseX/w)][floor(mouseY/h)];
    end.wall = false;
    startFind = true;
}

function draw() {
    background(0);
    
    if (startFind) {
        if (openSet.length > 0) {
            // end point not reached yet
            var winner = 0;
            for (var i=0; i<openSet.length;i++) {
                if (openSet[i].f < openSet[winner].f) {
                    winner = i;
                }
            }
            var current = openSet[winner];
            if (current === end) {
                
                // now find the best path
                
                noLoop();
                console.log("Done !");
            }
            //openSet.remove(current);
            removeFromArray(openSet,current);
            closedSet.push(current);
            
            var neighbors = current.neighbors;
            for (var i=0;i<neighbors.length;i++) {
                var neighbor = neighbors[i];
                if (!(closedSet.includes(neighbor)) && !(neighbor.wall)) {
                    var tempG = current.g+1;
                    if (openSet.includes(neighbor)) {
                        if (tempG<neighbor.g) {
                            neighbor.g = tempG;
                        }
                    }
                    else {
                        neighbor.g = tempG;
                        openSet.push(neighbor);
                    }
                    neighbor.h = heuristic(neighbor,end);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                }
            }
            
        }
        else {
            // no solution
            console.log("No solution");
            noSoln = true;
            noLoop();
        }
        
        
        if (!noSoln){
            path = [];
            var temp = current;
            path.push(temp);
            while (temp.previous) {
                path.push(temp.previous);
                temp = temp.previous;
            }
        }
    
        
        
    }
    
    
    for (var i=0;i<cols;i++) {
        for (var j=0;j<rows;j++) {
            grid[i][j].show(color(255));
        }
    }
    
    for (var i=0;i<closedSet.length;i++) {
        closedSet[i].show(color(255,0,0));
    }
    
    for (var i=0;i<openSet.length;i++) {
        openSet[i].show(color(0,255,0));
    }
    
    
    
    
    for (var i=0;i<path.length;i++) {
        path[i].show(color(0,0,255));   
    }
}