
var tree;

function setup() {
    createCanvas(600,400);
    background(50);
    tree = new Tree();
    for (var i=0;i<10;i++)
        tree.addValue(ceil(random(10)));
    console.log(tree);
    tree.traverse();
    
    var result = tree.search(5);
    if (result == null) {
        console.log("Not Found");
    }
    else {
        console.log("Found");
    }
}