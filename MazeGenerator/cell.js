function Cell(i,j) {
    this.i = i;
    this.j = j;
    this.walls = [true,true,true,true]; // top right bottom left
    this.visited = false;
    
    this.highlight = function() {
        var x = this.i*w;
        var y = this.j*w;
        noStroke(0);
        fill(0,0,255,100);
        rect(x,y,w,w);
    }
    
    this.show = function() {
        var x = this.i*w;
        var y = this.j*w;
        stroke(255);
        if (this.walls[0])
            line(x,y,x+w,y); // top
        if (this.walls[3])    
            line(x+w,y,x+w,y+h); // right
        if (this.walls[2])    
            line(x,y+h,x+w,y+h); // bottom
        if (this.walls[1])    
            line(x,y,x,y+h); // left
        
        if (this.visited) {
            noStroke();
            fill(255,0,255,100);
            rect(x,y,w,h);
        }
        
    }
    this.checkNeighbors = function() {
        var neighbors = [];
        var top = grid[index(this.i,this.j-1)];
        var right = grid[index(this.i+1,this.j)];
        var bottom = grid[index(this.i,this.j+1)];
        var left = grid[index(this.i-1,this.j)];
        
        if (top&&!top.visited)
            neighbors.push(top);
        if (right&&!right.visited)
            neighbors.push(right);
        if (bottom&&!bottom.visited)
            neighbors.push(bottom);
        if (left&&!left.visited)
            neighbors.push(left);
        
        if (neighbors.length>0) {
            var r = floor(random(0,neighbors.length));
            return neighbors[r];
        }
        else {
            return undefined;
        }
        
    }
}
