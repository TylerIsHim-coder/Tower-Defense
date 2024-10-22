/***********************
 ****** VARIABLES ******
 ***********************/
var grassImg;

var levelOneNodes = [
    {x: -100, y: 50},
    {x: 100, y: 50},
    {x: 100, y: 500},
    {x: 400, y: 500},
    {x: 400, y: 200},
    {x: 200, y: 200},
    {x: 200, y: 100},
    {x: 800, y: 100}
];

var path;

/***********************
 *** SETUP FUNCTION ****
 ***********************/

 var enemies;
 var turrets;
 var projectiles;

function setup() {
    createCanvas(700, 700).parent("gameCanvas");
    grassImg = loadImage("https://TylerIsHim-coder.github.io/Tower-Defense/grass.png");
    path = new Path(levelOneNodes);
    //enemy = new Enemy(1, 3, levelOneNodes);
    enemies = [];
    turrets = [];
    projectiles = [];
    turrets.push(new Turret(path.roads));
    setInterval(function() { enemies.push(new Enemy(floor(random(1,5)), 3, levelOneNodes)) }, 1000);
}    

/***********************
 **** DRAW FUNCTION ****
 ***********************/

function draw() {
    background(0, 200, 0); 
    image(grassImg, 0, 0, 700, 700); 
    path.draw();

    for(var enemy of enemies) {
        enemy.update();
    }

    filterArrays();

    for(var turret of turrets) {
        turret.update();
    }

    for(var projectile of projectiles) {
        projectile.update();
    }

    //projectiles = projectiles.filter(p => p.inWorld());
}

function filterArrays() {
    enemies = enemies.filter(e => e.finished == false && e.strength > 0);
    projectiles = projectiles.filter(p => p.inWorld() && p.strength > 0);
}

/***********************
 *** OTHER FUNCTIONS ***
 ***********************/


function mousePressed() {

    if(mouseX > 0 && mouseX < 700 && mouseY > 0 && mouseY < 700) {
        unselectAllTurrets();
    }

    let turret = getTurretBeingPlaced();
    if(turret != null){
        if(turret.isValid()) {
            turret.placed = true;

            //turrets.push(new Turret(path.roads));
        }
    }
    else {
        turret = getTurretBeingClicked();

        if(turret != null) {
            turret.selected = true;
        }
    }
}

function keyPressed() {
    let turret = getTurretBeingSelected();
    if(turret != null) {
        //Left Arrow Key
        if(keyCode == LEFT_ARROW) {
            if(turret.targetMode > 0)
                turret.targetMode -= 1;
        }

        if(keyCode == RIGHT_ARROW) {
            if(turret.targetMode < 2)
                turret.targetMode += 1;
        }
    }
}