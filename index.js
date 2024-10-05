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

function setup() {
    createCanvas(700, 700).parent("gameCanvas");
    grassImg = loadImage("https://TylerIsHim-coder.github.io/Tower-Defense/grass.png");
    path = new Path(levelOneNodes);
    //enemy = new Enemy(1, 3, levelOneNodes);
    enemies = [];
    turrets = [];
    turrets.push(new Turret(path.roads));
    setInterval(function() { enemies.push(new Enemy(1, 3, levelOneNodes)) }, 1000);
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

    enemies = enemies.filter(e => e.finished == false);

    for(var turret of turrets) {
        turret.update();
    }
}

/***********************
 *** OTHER FUNCTIONS ***
 ***********************/

 function getTurretBeingPlaced() {
    for(var turret of turrets) {
        if(turret.placed == false) {
            return turret;
        }
    }
    return null;
}

function mousePressed() {
    let turret = getTurretBeingPlaced();
    if(turret != null){
        if(turret.isValid()) {
            turret.placed = true;

            turrets.push(new Turret(path.roads));
        }
    }
}