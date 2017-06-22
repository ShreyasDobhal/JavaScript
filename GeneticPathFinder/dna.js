function DNA(gene) {
    this.genes=[];
    if (gene) {
        this.genes=gene;
    }
    else {
        for (var i=0;i<lifeSpan;i++) {
            this.genes[i]=p5.Vector.random2D();
        }
    }
    
    this.crossOver=function(other) {
        var newgenes=[];
        var mid=floor(random(this.genes.length));
        for (var i=0;i<this.genes.length;i++) {
            if (i<mid)
                newgenes[i]=this.genes[i];
            else
                newgenes[i]=other.genes[i];
        }
        return newgenes;
    }
    this.mutate=function() {
        for (var i=0;i<this.genes.length;i++) {
            if (random(1)<mutationRate) {
                this.genes[i]=p5.Vector.random2D();
            }
        }
    }
}