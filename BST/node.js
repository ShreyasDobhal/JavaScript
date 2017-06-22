function Node(val, x, y) {
    this.value = val;
    this.left = null;
    this.right = null;
    this.x = x;
    this.y = y;
}

Node.prototype.visit = function(parent) {
    if (this.left != null)
        this.left.visit(this);
    // visit code
    console.log(this.value);
    
    stroke(255);
    line(parent.x,parent.y,this.x,this.y);
    fill(50);
    ellipse(this.x,this.y,20,20);
    fill(255);
    noStroke();
    textAlign(CENTER);
    text(this.value,this.x,this.y+5);
    if (this.right != null)
        this.right.visit(this);
}

Node.prototype.addNode = function(n) {
    
    if (n.value<this.value) {
        if (this.left == null) {
            this.left = n;
            this.left.x = this.x - 50;
            this.left.y = this.y + 50;
        }
        else {
            this.left.addNode(n);
        }
    }
    else {
        if (this.right == null) {
            this.right = n;
            this.right.x = this.x + 50;
            this.right.y = this.y + 50;
        }
        else {
            this.right.addNode(n);
        }
    }
}

Node.prototype.search = function(val) {
    if (val == this.value)
        return this;
    else if (val<this.value && this.left != null)
        return this.left.search(val);
    else if (val>this.value && this.right != null)
        return this.right.search(val);
    else
        return null;
}