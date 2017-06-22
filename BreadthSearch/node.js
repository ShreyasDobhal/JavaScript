function Node(val) {
    this.value = val; 
    this.edges = [];
    this.searched = false;
    this.parent = null;
}