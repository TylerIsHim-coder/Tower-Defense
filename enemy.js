class Enemy {
    constructor(strength, speed, nodes){
        this.strength = strength;
        this.speed = speed;
        this.nodes = nodes;
        this.x = nodes[0].x;
        this.y = nodes[0].y;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.size = 30;
        this.targetNode = 0;
        this.finished = false;
    }

    draw() {
        fill('red');
        ellipse(this.x, this.y, this.size, this.size);
        fill('black');
        textAlign(CENTER, CENTER);
        textSize(15);
        text(this.strength, this.x, this.y)
    }

    move() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    findTarget() {
        //if (the player is not moving)
        if(this.xSpeed == 0 && this.ySpeed == 0) {
            //Find the next target node
            this.targetNode++;
            let target = this.nodes[this.targetNode];
            //Set x and y speed to move to target
            let xDifference = target.x - this.x;
            let yDifference = target.y - this.y;
            let angle = atan2(yDifference, xDifference);
            this.xSpeed = this.speed * cos(angle);
            this.ySpeed = this.speed * sin(angle);
        }
    }

    checkTarget() {
        let target = this.nodes[this.targetNode];
        let distance = dist(this.x, this.y, target.x, target.y);
        if(distance < this.speed) {
            this.xSpeed = 0;
            this.ySpeed = 0;

            if(this.targetNode == this.nodes.length - 1) {
                this.finished = true;
            }
        }
    }

    distanceTraveled() { 
        //This function will return how much 
        //distance an enemy has traveled 
        var distance = 0;
        //i will track which node we are looking at 
        var i = 1; 
        //if the node is past the end or past the player 
        //then stop while loop 
        while(i < this.nodes.length && i < this.targetNode) { 
            let node1 = this.nodes[i-1]; 
            let node2 = this.nodes[i]; 
            //Add the nodes distance from the previous node 
            distance += dist(node1.x, node1.y, node2.x, node2.y); 
            i += 1; 
        } 
        //Add the remaining amount the player is from his last target node 
        var lastNode = this.nodes[i-1];
        distance += dist(this.x, this.y, lastNode.x, lastNode.y); 
        return distance; 
    } 

    update() {
        this.findTarget();
        this.move();
        this.draw();
        this.checkTarget();
    }
}