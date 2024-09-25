class Turret {
    constructor() {
        this.roads = roads;
        this.x = 150;
        this.y = 150;
        this.size = 50
        this.gunSize = 37.5;
        this.range = 100;
        this.lookAngle = 0;
        this.placed = false;
        this.selected = false;
    }

    draw() {
        strokeWeight(1);
        stroke('black');
        fill(255, 255, 0, 50)
        ellipse(this.x, this.y, this.range * 2, this.range * 2);

        strokeWeight(5);
        stroke("white");
        var x = this.gunSize * cos(this.lookAngle);
        var y = this.gunSize * sin(this.lookAngle);
        line(this.x, this.y, this.x + x, this.y + y);

        strokeWeight(1);
        stroke('black');
        fill('white');
        ellipse(this.x, this.y, this.size, this.size);
    }

    update() {
        this.draw();
    }
}