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

function Ship(x, y) {
  this.x = x;
  this.y = y;
  
  this.width = 32;
  this.height = 64;
  
  this.velocity = 40;
}

function GameState(game) {
  this.game = game;
  this.isDrawable = true;
  
  this.score = 0;
  this.lives = 3;
  this.level = 1;
  
  this.playerShip = new Ship(game.width /2 - 16, game.height - 80);
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
};

GameState.prototype.draw = function(game, context) {
  // Drawing game info
  
//      star.y += dt * star.velocity;

  // Drawing player
  var player = this.playerShip;
  context.fillStyle = '#888';
  context.fillRect(player.x, player.y, player.width, player.height);
  
  // Drawing hive
};

GameState.prototype.keyDown = function(keycode) {
  switch (keycode) {
//    case Utils.const.LEFT:
//      this.playerShip.x -= this.playerShip.velocity * dt;
//      break;
  }
};
