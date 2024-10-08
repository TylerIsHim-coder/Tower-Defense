class Turret {
    constructor(roads) {
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
        stroke(this.chooseColor())
        stroke("white");
        var x = this.gunSize * cos(this.lookAngle);
        var y = this.gunSize * sin(this.lookAngle);
        line(this.x, this.y, this.x + x, this.y + y);

        strokeWeight(1);
        stroke('black');
        fill(this.chooseColor());
        ellipse(this.x, this.y, this.size, this.size);
    }

    chooseColor() {
        if(this.placed || this.isValid()) {
            return "white";
        } else {
            return "red";
        }
    }

    followMouse() {
        this.x = mouseX;
        this.y = mouseY;
    }

    onRoad() {
        for(var road of this.roads) {
            if(CircleInRect(this, road)) {
                return true;
            }
        }
        return false;
    }

    isValid() {
        if(this.x < 0 || this.x > 700 || this.y < 0 || this.y > 700) {
            return false;
        }

        if(this.onRoad()) {
            return false;
        } 

        return true;
    }

    update() {

        if(this.placed == false) {
            this.followMouse();
        }

        this.draw();

    }
}

function CircleInRect(c, r) {
        
    let closeX = c.x;
    let closeY = c.y;

    if(c.x < r.x) {
        closeX = r.x;
    }else if(c.x > r.x + r.w) {
        closeX = r.x + r.w;
    }
    if(c.y < r.y) {
        closeY = r.y;
    }else if(c.y > r.y + r.h) {
        closeY = r.y + r.h;
    }

    if(dist(c.x, c.y, closeX, closeY) < c.size / 2) {
        return true;
    } else {
        return false;
    }
}