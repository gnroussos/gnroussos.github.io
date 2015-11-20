// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x=x;                               //x coord
    this.y=y;                               //y coord
    this.speedX=this.random(200,100);       //speed in x-axis
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speedX * dt;

//bug's sprite dimensions are 101x171 & canvas width 500
    if (this.x+50 > 500)                        //check if half bug box hit canvas boundaries & reset initial position
    {
        this.x=0;                                       //reposition x, no need for y
        this.speedX = this.random(200,100);             //new speed
    }
//collision detection - bug's sprite box intersects with player
//70 + 50 values give good visual game experience, it seems as the player can "avoid" hitting the bug last sec
    if(this.x-70 < player.x && this.x+70 > player.x && this.y-50<player.y && this.y+50 > player.y)
    {
        if (player.score>0)
        {
            player.score-=100;
        }
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//make game more unpredictable, bugs get random speed
Enemy.prototype.random=function(max,min)
{
    var num = Math.random() * (max-min)+min;
    return num;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//start position ~middle of the grass field
var xStart=200;
var yStart=400;

var Player = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-cat-girl.png';           //engine resource.load(s) only the boy sprite unless
                                                        //u change it manually to match another sprite
    this.score=0;
};

//move player to start
Player.prototype.reset=function(){
    this.x=xStart;
    this.y=yStart;
};

Player.prototype.update = function(){
//nothing to do here everything happens in key handler
};

//render player's sprite & score
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    ctx.fillStyle="white";
    ctx.strokeStyle="black";
    ctx.lineWidth=3;
    ctx.font="26pt Impact";

    var text = "SCORE: " + this.score.toString();
    ctx.fillText(text,330,100);
    ctx.strokeText(text,330,100);
};

Player.prototype.handleInput=function(key){
    if (key === "left")                             //left key
    {
        if (this.x > 0)
        {                                           //check for passing the canvas left boundaries
            this.x -= 100;                          //move left 1 tile
        }
    }
    else if (key === "right")
    {
        if (this.x < 400)                           //move right 1 tile
        {
            this.x+=100;
        }
    }
    else if (key === "down")
    {
        if (this.y < 400){                          //move down 1 tile
            this.y+=90;                             //90 pixels on y-axis seems the best value
        }
    }
    else if (key === "up")
    {
        if (this.y > 70)                            //move up 1 tile
        {
            this.y-=90;
        }
        else                                        //hooray reached the water, go start
        {
            this.score+=100;
            this.reset();
        }
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [
    new Enemy(-30,60),
    new Enemy(-30,145),
    new Enemy(-30,230)
];

var player = new Player(xStart,yStart);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
