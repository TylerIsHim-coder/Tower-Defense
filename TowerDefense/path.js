class Path {
    constructor(nodes) {
        this.nodes = nodes;
        this.size = 50;
        this.color = 'black';
        this.createRoads();
    }

    draw() {
        strokeWeight(1);
        stroke(this.color);
        fill(this.color);
        for(var road of this.roads) {
            rect(road.x, road.y, road.w, road.h);
        }
    }
    
    createRoads() {
        this.roads = [];

        for(var i = 0; i < this.nodes.length - 1; i++) {
            let node1 = this.nodes[i];
            let node2 = this.nodes[i+1];

            //inverted if node2 is above or to the left of node1
            let inverted = node1.x > node2.x || node1.y > node2.y;

            let x = inverted ? node2.x : node1.x;
            let y = inverted ? node2.y : node1.y;

            x -= this.size / 2;
            y -= this.size / 2;

            let w = this.size + abs(node2.x - node1.x);
            let h = this.size + abs(node2.y - node1.y);

            this.roads.push({x: x, y: y, w: w, h: h});
        }
    }
}