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
  this.pressedKeys = [];
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
  this.setState(new IntroState(this));
  
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
  if (!state) return;
  
  if (state.update) {
    state.update(dt);
  }
};
Game.prototype.draw = function() {
  this.background.draw();
  
  var state = this.currentState();
  if (state.draw) {
    state.draw(this, this.canvas.getContext('2d'));
  }
};

Game.prototype.keyDown = function(keycode) {
  this.pressedKeys[keycode] = true;
  if (!this.currentState().keyDown) return;
  this.currentState().keyDown(keycode);
};
Game.prototype.keyUp = function(keycode) {
  this.pressedKeys[keycode] = false;
  if (!this.currentState().keyUp) return;
  this.currentState().keyUp(keycode);
};
