/***********************
 ****** VARIABLES ******
 ***********************/
var playing = true;

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
 var money = 100000;
 var health = 100;
 var wave;

function setup() {
    createCanvas(700, 700).parent("gameCanvas");
    grassImg = loadImage("https://TylerIsHim-coder.github.io/Tower-Defense/grass.png");
    path = new Path(levelOneNodes);
    //enemy = new Enemy(1, 3, levelOneNodes);
    enemies = [];
    turrets = [];
    projectiles = [];
    wave = new Wave();
    updateInfo();
    turrets.push(new Turret(path.roads));
    //setInterval(function() { enemies.push(new Enemy(floor(random(1,5)), 3, levelOneNodes)) }, 1000);
}    

/***********************
 **** DRAW FUNCTION ****
 ***********************/

function draw() {
   if(playing) {
    background(0, 200, 0); 
    image(grassImg, 0, 0, 700, 700); 
    path.draw();

    for(var enemy of enemies) {
        enemy.update();
    }

    for(var turret of turrets) {
        turret.update();
    }

    for(var projectile of projectiles) {
        projectile.update();
    }

    filterArrays();
    checkCollision();
    wave.update();
}else{
    drawGameOver();
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

 function checkTurret() {
    var text = "";
    if(getTurretBeingPlaced() != null) {
        text = "Unavailable";
    } else {
        text = "Price: $100";
    }
    document.getElementById("buyTurretText").textContent = text;
 }

 function checkUpgrade() {
    var text = "";
    var turret = getTurretBeingSelected();
    if(turret != null) {
        if(turret.upgrades >= turret.maxUpgrades) {
            text = "Max Upgrade!";
        } else {
            text = "Price: $";
            text += (turret.upgrades+ 2) * 100;
        }
    } else {
        text = "No Turret Selected!";
    }
    document.getElementById("upgradeTurretText").textContent = text;
 }

 function checkWave() {
    var text = "";
    if (wave.active == false) {
        text = "Wave Ready";
    } else {
        text = "Wave Not Ready";
    }
    document.getElementById("waveText").textContent = text;
    //when button pressed change to wave not ready
 }

 function drawGameOver() {
    background(0, 0, 0, 20);
    fill(255);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("GAME OVER!", 350, 350);
 }

 function updateInfo() {
    document.getElementById("Money").innerHTML = money;
    document.getElementById("Wave").innerHTML = wave.number;
    document.getElementById("Health").innerHTML = health;
 }

 function startWave() {
    wave.start();
    updateInfo();
 }

function checkCollision() {
    for(var enemy of enemies) {
        for(var projectile of projectiles) {
            if(CircleInCircle(enemy, projectile)) {
                var damage = min(enemy.strength, projectile.strength);

                enemy.strength -= damage;
                projectile.strength -= damage;
                money += damage;
                updateInfo();
                filterArrays();
            }
        }
    }
}

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