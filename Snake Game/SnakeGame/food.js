function Food(x,y) {
    this.x=floor(x/grid)*grid;
    this.y=floor(y/grid)*grid;
    this.show = function() {
        fill(0,200,200,200);
        noStroke();
        rect(this.x,this.y,grid,grid);
    }
    this.newPlace = function() {
        var x=random(width);
        var y=random(height);
        this.x=floor(x/grid)*grid;
        this.y=floor(y/grid)*grid;
    }
}