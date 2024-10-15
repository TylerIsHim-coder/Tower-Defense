class Turret {
    constructor(roads) {
        this.roads = roads;
        this.x = 150;
        this.y = 150;
        this.size = 50
        this.gunSize = 37.5;
        this.range = 200;
        this.range = 100;
        this.lookAngle = 0;
        this.placed = false;
        this.selected = false;
        this.projectileSpeed = 5;
        this.projectilesStrength = 1;
        this.shootCooldown = 30;
        this.shootingTimer = 30;
    }

    draw() {
        if(!this.placed || this.selected) {
            strokeWeight(1);
            stroke('black');
            fill(255, 255, 0, 50)
            ellipse(this.x, this.y, this.range * 2, this.range * 2);
        }

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
        if(this.selected) {
            return "blue";
        }
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

    onTurret() {
        for(var turret of turrets) {
            if(turret == this) {
                continue;
            }
            if(CircleInCircle(this, turret)) {
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

        if(this.onTurret()) {
            return false;
        }

        return true;
    }

    shootProjectile() {
        if (this.shootingTimer < this.shootCooldown) {
            this.shootingTimer += 1;
        } else {
            this.shootingTimer = 0;
        
        let x = this.x + (this.gunSize * cos(this.lookAngle));
        let y = this.y + (this.gunSize * sin(this.lookAngle));

        let xSpeed = this.projectileSpeed * cos(this.lookAngle);
        let ySpeed = this.projectileSpeed * sin(this.lookAngle);

        projectiles.push(new Projectile(x, y, xSpeed, ySpeed, this.projectileStrength));
      }
    }

    getEnemyClosestToTurret() {
        var closestDistance = Infinity;
        var closestEnemy = null;

        for(var enemy of enemies) {
            var distance = dist(enemy.x, enemy.y, this.x, this.y);
            if(distance > this.range + enemy.size/2) {
                continue;
            }

            if(distance < closestDistance) {
                closestDistance = distance;
                closestEnemy = enemy;
            }
        }
        return closestEnemy;
    }

    getStrongestEnemy() {
        var strongestEnemy = null;
        var strongestStrength = 0;

        for(var enemy of enemies) {
            var distance = dist(enemy.x, enemy.y, this.x, this.y);
            if (distance > this.range + enemy.size/2) {
                continue;
            }

            if (enemy.strength > strongestStrength) {
                strongestStrength = enemy.strength;
                strongestEnemy = enemy;
            }
        }
        return strongestEnemy;
    }

    targetEnemy() {
        var enemy = this.getStrongestEnemy();
        if (enemy == null) {
            return;
        }
        
        this.lookAngle = atan2(enemy.y - this.y, enemy.x - this.x);
    }

    update() {

        if(this.placed == false) {
            this.followMouse();
        }
        else {
            this.targetEnemy();
            this.shootProjectile();
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
function CircleInCircle(c1, c2) {
    return dist(c1.x, c1.y, c2.x, c2.y) < (c1.size/2) + (c2.size/2);
}

function getTurretBeingPlaced() {
    for(var turret of turrets) {
        if(turret.placed == false) {
            return turret;
        }
    }
    return null;
}

function getTurretBeingClicked() {
    for(var turret of turrets) {
        if(dist(mouseX, mouseY, turret.x, turret.y) < turret.size/2) {
            return turret;
        }
    }
    return null;
}

function unselectAllTurrets() {
        for(var turret of turrets) {
                turret.selected = false;
        }
 }