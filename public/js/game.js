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

// Utilities
var Utils = {
  getRandomHex: function(from, to) {
    return Math.floor(Math.random() * (to - from) + from).toString(16);
  },
  getRandomColor: function(r, g, b) {
    return '#' + this.getRandomHex(r, 255) + this.getRandomHex(g, 255) + this.getRandomHex(b, 255);
  } 
};

// Game
function Game(container) {
  this.container = container;
  this.width = 800;
  this.height = 600;
  
  var canvas = document.createElement('canvas');
  canvas.width = this.width;
  canvas.height = this.height;
  container.appendChild(canvas);

  this.fps = 30;
  this.timer = null;
  this.background = new Space(canvas);
  this.canvas = canvas;
  
  this.stateStack = [];
}

// State machine
Game.prototype.currentState = function() {
  return this.stateStack.length > 0 ? this.stateStack[this.stateStack.length - 1] 
    : null;
};

Game.prototype.setState = function(state) {
  if (this.currentState() && this.currentState().leave) {
    this.currentState().leave(this);
    this.stateStack.pop();
  }
  
  // If enter event is defined
  if (state.enter) {
    state.enter(this);
  }
  
  this.stateStack.pop();
  this.stateStack.push(state);
};

Game.prototype.start = function() {
  this.background.start();
  this.setState(new IntroState());
  
  var self = this;
  this.timer = setInterval(function() {
    self.update();
    self.draw();
  });
};

Game.prototype.update = function() {
  var dt = 1 / this.fps;
  this.background.update(dt);
  
  var state = this.currentState();
  if (state.update) {
    state.update(this, dt);
  }
};

Game.prototype.draw = function() {
  this.background.draw();
  
  var state = this.currentState();
  if (state.draw) {
    state.draw(this, this.canvas.getContext('2d'));
  }
};

//<editor-fold defaultstate="collapsed" desc="Space background">
function Space(canvas) {
  this.canvas = canvas;
  this.context = canvas.getContext('2d');
  this.stars = [];
  
  this.config = {
    starCount: 142,
    minStarVelocity: 42,
    maxStarVelocity: 84
  };
  
  this.timer = null;
}

function Star(x, y, size, velocity, color) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.velocity = velocity;
  this.color = color;
}

Space.prototype.start = function() {
  for (var i = 0; i < this.config.starCount; i++) {
    this.stars[i] = this.createNewStar();
  }
};

Space.prototype.draw = function() {
  // Drawing space
  var ctx = this.context;
  ctx.fillStyle = '#000020';
  ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  
  // Drawing stars
  this.stars.forEach(function(star) {
    ctx.fillStyle = star.color;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI, false);
    ctx.fill();
  });
};

Space.prototype.update = function(dt) {
  for (var i = 0; i < this.stars.length; i++) {
    var star = this.stars[i];
    star.y += dt * star.velocity;
    if (star.y > this.canvas.height) {
      this.stars[i] = this.createNewStar();
    }
  }
};

Space.prototype.createNewStar = function() {
  return new Star(
    Math.random() * this.canvas.width
  , 0
  , Math.random() * 3 + 1
  , (Math.random() * (this.config.maxStarVelocity - this.config.minStarVelocity)) 
    + this.config.minStarVelocity
  , Utils.getRandomColor(200, 200, 200)
    );
};
//</editor-fold>

// Game states
function IntroState() {
}
IntroState.prototype.draw = function(game, context) {
  context.font = '72px Mono';
  context.fillStyle = '#ff0';
  context.textAlign = 'center';
  var title = '侵略者。JS';
  context.fillText(title, game.width / 2, game.height / 2 + 36);
  
  context.font = '12px Mono';
  context.fillStyle = '#ff0';
  context.textAlign = 'center';
  context.fillText('Press SPACE to start', game.width / 2, game.height / 2 + 80);
  context.fillText('[←] [→] - MOVE, [SPACE] - SHOOT', game.width / 2, game.height / 2 + 97);
};
