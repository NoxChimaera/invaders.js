/* 
 * The MIT License
 *
 * Copyright 2015 Maximillian M..
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* global Utils */

function Ship(x, y) {
  this.x = x;
  this.y = y;
  
  this.width = 32;
  this.height = 64;
  
  this.velocity = 40;
}

function Rocket(x, y) {
  this.x = x;
  this.y = y;
  
  this.w = 4;
  this.h = 8;
  
  this.velocity = -42;
}

function GameState(game) {
  this.game = game;
  this.isDrawable = true;
  
  this.score = 0;
  this.lives = 3;
  this.level = 1;
  
  this.playerShip = new Ship(game.width /2 - 16, game.height - 80);
  this.rockets = [];
  this.hive = [];
}

GameState.prototype.update = function(dt) {
  if (this.game.pressedKeys[Utils.const.LEFT]) {
    this.playerShip.x -= this.playerShip.velocity * dt;
    if (this.playerShip.x < 0) {
      this.playerShip.x = 0;
    }
  }
  if (this.game.pressedKeys[Utils.const.RIGHT]) {
    this.playerShip.x += this.playerShip.velocity * dt;
    if (this.playerShip.x + this.playerShip.width > this.game.width) {
      this.playerShip.x = this.game.width - this.playerShip.width;
    }
  }
  
  // Move rockets
  for (var i = 0; i < this.rockets.length; i++) {    
    var rocket = this.rockets[i];
    if (rocket.y < 0) {
      this.rockets.splice(i--, 1);
      rocket = this.rockets[i];
    }
    
    if (!rocket) break;
    
    rocket.y += rocket.velocity * dt;
  }
};

GameState.prototype.draw = function(game, context) {
  // Drawing game info
  var text = 'Lives: ' + this.lives;
  context.font = '24px Mono';
  context.fillStyle = '#ff0';
  context.textAlign = 'left';
  context.fillText(text, 0, 24);
  
  text = 'Score: ' + this.score;
  context.textAlign = 'right';
  context.fillText(text, game.width, 24);
  
  // Drawing player
  var player = this.playerShip;
  context.fillStyle = '#888';
  context.fillRect(player.x, player.y, player.width, player.height);
  
  // Drawing hive
  
  // Drawing rockets
  context.fillStyle = '#f00';
  this.rockets.forEach(function(rocket) {
    context.fillRect(
      rocket.x - rocket.w / 2
      , rocket.y - rocket.h / 2
      , rocket.w
      , rocket.h
    );
  });
};

GameState.prototype.keyDown = function(keycode) {
  switch (keycode) {
    case Utils.const.SPACE:
      this.fire();
      break;
  }
};

GameState.prototype.fire = function() {
  var rocketsCount = this.rockets.length;
  if (rocketsCount > 2) return;
  
  this.rockets.push(new Rocket(
    this.playerShip.x + this.playerShip.width / 2
    , this.playerShip.y - 2
  ));
};
