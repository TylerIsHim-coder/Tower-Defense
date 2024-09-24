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

    update() {
        this.findTarget();
        this.move();
        this.draw();
    }
}