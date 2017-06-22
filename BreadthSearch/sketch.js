var data;

function preload() {
    data = loadJSON('shreyas.json');
}

function setup() {
    noCanvas();
    console.log(data);
}