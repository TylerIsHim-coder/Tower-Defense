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

function setup() {
    createCanvas(700, 700).parent("gameCanvas");
    grassImg = loadImage("https://TylerIsHim-coder.github.io/Tower-Defense/grass.png");
    path = new Path(levelOneNodes);
    enemy = new Enemy(1, 3, levelOneNodes);
}

/***********************
 **** DRAW FUNCTION ****
 ***********************/

function draw() {
    background(0, 200, 0);
    image(grassImg, 0, 0, 700, 700); 
    path.draw();
    enemy.draw();
}

/***********************
 *** OTHER FUNCTIONS ***
 ***********************/