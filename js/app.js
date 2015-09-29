'use strict';
// Enemies our player must avoid
var Enemy = function () {
// Variables applied to each of our instances go here,
// we've provided one for you to get started

// The image/sprite for our enemies, this uses
// a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -80;
    this.y = this.generateRandomSpawnLoc();
    this.radius = 25;
    this.speed = this.setSpeed();
};

Enemy.prototype.generateRandomSpawnLoc = function () {
    var ranSpawnLocation = [60, 145, 225, 310];
    var y = Math.round(3 * Math.random());
    return ranSpawnLocation[y];
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
};

Enemy.prototype.setSpeed = function () {
    var speed;

    speed = [50, 100, 150];
    return speed[Math.round(2 * Math.random())];
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Heart = function () {
    this.sprite = 'images/Heart.png';
};

var Key = function () {
    this.sprite = 'images/Key.png';
    this.generateRandomSpawnPoint();
    this.radius = 20;
    this.points = 50;
};

Key.prototype.generateRandomSpawnPoint = function () {
    var ranSpawnLocationX = [0, 101, 202, 303, 404];
    var ranSpawnLocationY = [60, 145, 225];

    this.x = ranSpawnLocationX[Math.round(4 * Math.random())];
    this.y = ranSpawnLocationY[Math.round(2 * Math.random())];
};

Key.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
Heart.prototype.render = function (x, y) {
    ctx.drawImage(Resources.get(this.sprite), x, y);
};

var Player = function () {
    heart_1 = new Heart();
    heart_2 = new Heart();
    this.x = 303;
    this.y = 404;
    this.radius = 40;
    this.setState('ran');
    this.keyChain = 0;
    this.life = 2;
    this.score = 0;
};

Player.prototype.handleInput = function (key) {
    switch (key) {
        case 'left':
            if (this.x > 0) {
                this.x -= 101;
            }
            break;
        case 'right':
            if (this.x < 404) {
                this.x += 101;
            }
            break;
        case 'up':
            if (this.y === 72 && this.keyChain > 0) {
                this.score += 50;
                this.keyChain -= 1;
                this.setPosition();
                break;
            }
            if (this.y > 72) {
                this.y -= 83;
            }
            break;
        case 'down':
            if (this.y < 404) {
                this.y += 83;
            }
            break;
        case 'e':
            player.setState('princess');
            break;
        case 'r':
            player.setState('horn');
            break;
        case 'q':
            player.setState('pink');
            break;
        case 'w':
            player.setState('boy');
            break;
    }
};

Player.prototype.setPosition = function () {
    this.x = 303;
    this.y = 404;
};

Player.prototype.setState = function (state) {
    var selected;
    var c;
    var players = {
        char: {
            boy: 'images/char-boy.png',
            cat: 'images/char-cat-girl.png',
            horn: 'images/char-horn-girl.png',
            pink: 'images/char-pink-girl.png',
            princess: 'images/char-princess-girl.png'
        }
    };
    var keys = Object.keys(players.char);
    if (state === 'ran') {
        c = keys[Math.round(4 * Math.random())];
        selected = players.char[c];
    } else {
        selected = players.char[state];
        c = state;
    }
    this.sprite = selected;
    this.curChar = c;
};

Player.prototype.render = function () {
    var keyOffset = 0;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = "32px Impact";
    ctx.fillText('Score: ' + this.score.toString(), 300, 100);
    ctx.fillText('Character: ' + this.curChar, 0, 575);
    ctx.fillText('Keys: ', 300, 575);
    ctx.font = "20px Comic Sans";
    ctx.fillText('change with: q, w, e, r', 0, 540);
    for (var i = 0; i < this.keyChain; i++) {
        ctx.drawImage(Resources.get(key.sprite), 0, 0, 101, 171, (375 + keyOffset), 530, 30.3, 51.3);
        keyOffset += 25;
    }
    if (this.life > 0) {
        heart_2.render(0, 0);
        if (this.life > 1) {
            heart_2.render(101, 0);
        }
    }
};

Player.prototype.update = function (dt) {

};

function createEnemies() {
    for (var i = 0; i < 3; i++) {
        allEnemies.push(new Enemy());
    }
    return i;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies, allItems, player, enemy, key, heart_1, heart_2;
// Instantiate arrays
allEnemies = [];
allItems = [];

createEnemies();

allItems.push(key = new Key());

player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        69: 'e',
        81: 'q',
        82: 'r',
        87: 'w'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
