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

function Ship(x, y, w, h, velocity) {
  this.x = x;
  this.y = y;
  
  this.width = w;
  this.height = h;
  
  this.velocity = velocity;
}

function Rocket(x, y, velocity) {
  this.x = x;
  this.y = y;
  
  this.w = 4;
  this.h = 8;
  
  this.velocity = velocity;
}

function GameState(game) {
  this.game = game;
  this.isDrawable = true;
  
  this.score = 0;
  this.lives = 3;
//  this.level = 1;
  
  this.bombRatio = 0.05;
  
  this.playerShip = new Ship(
    game.width /2 - 16
    , game.height - 80
    , 32
    , 64
    , 40
  );
  this.rockets = [];
  this.hive = [];
  this.bombs = [];
  
  this.hiveVector = {
    x: 1,
    y: 1
  };
}

GameState.prototype.enter = function() {
  // Generate hive. So magic
  var hiveShipSize = 32;
  for (var j = 0; j < 2; j++) {
    for (var i = -5; i <= 5; i++) {
      var x = this.game.width / 2 + i * (hiveShipSize + 10);
      this.hive[(i + 5) + (j * 11)] = new Ship(
        x
        , (j + 2) * (hiveShipSize + 10)
        , hiveShipSize
        , hiveShipSize
        , 20
      );
    }
  }
};

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
  
  // Move bombs
  for (var i = 0; i < this.bombs.length; i++) {
    var bomb = this.bombs[i];
    if (bomb.y > this.game.height) {
      this.bombs.splice(i--, 1);
      bomb = this.bombs[i];
    }
    if (!bomb) break;
    bomb.y += bomb.velocity * dt;
  }
  
  
  // Move hive and drop bombs
  var self = this;
  var boundRight, boundLeft, boundTop, boundBottom = false;
  this.hive.forEach(function(enemy) {
    // Bound left and right
    if (enemy.x + enemy.width > self.game.width - enemy.width) boundRight = true;
    if (enemy.x - enemy.width < enemy.width) boundLeft = true;

    // Bound top and bottom
    if (enemy.y + enemy.height > self.playerShip.y - enemy.height) boundBottom = true;
    if (enemy.y - enemy.height < enemy.height) boundTop = true;
            
    enemy.x += enemy.velocity * dt * self.hiveVector.x;
    enemy.y += enemy.velocity * dt * self.hiveVector.y / 20;
    
    // Drop bombs
    var chance = self.bombRatio;
    if (chance < Math.random() || self.bombs.length >= 10) {
      return;
    } else {
      var bomb = new Rocket(
        enemy.x + enemy.width / 2
        , enemy.y + enemy.height / 2
        , 50
      );
      self.bombs.push(bomb);
    }
  });

  if (boundRight) {
    boundRight = false;
    this.hiveVector.x = -1;
  }
  if (boundLeft) {
    boundLeft = false;
    this.hiveVector.x = 1;
  }
  if (boundTop) {
    boundTop = false;
    this.hiveVector.y = 1;
  }
  if (boundBottom) {
    boundBottom = false;
    this.hiveVector.y = -1;
  }
  
  // Test collisions
  // Rocket - hive
  for (var i = 0; i < this.hive.length; i++) {
    var enemy = this.hive[i];
    if (!enemy) continue;
    
    var collide = false;
    for (var j = 0; j < this.rockets.length; j++) {
      var rocket = this.rockets[j];
      if (!rocket) continue;
      
      if (
        ((rocket.x + rocket.w < enemy.x) || (rocket.x > enemy.x + enemy.width))
        || ((rocket.y + rocket.h < enemy.y) || (rocket.y > enemy.y + enemy.height))
      ) { 
        continue; 
      } 
      
      collide = true;
      this.score += 10;
      this.rockets.splice(j--, 1);
      
      break;
    }
    if (collide) {      
      this.hive.splice(i--, 1);
    }
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
  context.fillStyle = '#0f0';
  this.hive.forEach(function(enemy) {
    context.fillRect(
      enemy.x
      , enemy.y
      , enemy.width
      , enemy.height
    );
  });
  
  // Drawing rockets and bombs
  context.fillStyle = '#0ff';
  this.rockets.forEach(function(rocket) {
    context.fillRect(
      rocket.x - rocket.w / 2
      , rocket.y - rocket.h / 2
      , rocket.w
      , rocket.h
    );
  });
  
  context.fillStyle = '#f00';
  this.bombs.forEach(function(rocket) {
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
    , -42
  ));
};
