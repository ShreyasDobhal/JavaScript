function Line() {
    this.m=0;
    this.c=0;
    this.show = function() {
        fill(0);
        strokeWeight(2);
        line(0,c,m*width+c);
    }
}