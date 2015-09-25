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

function Space() {
  this.fps = 30;
  
  this.canvas = null;
  this.container = null;
  
  this.width = 0;
  this.height = 0;
    
  this.stars = [];
  this.minVelocity = 42;
  this.maxVelocity = 100;
};

function Star(x, y, size, velocity, color) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.velocity = velocity;
  this.color = color;
};

var utils = {
  getRandomHex: function(from, to) {
    return Math.floor(Math.random() * (to - from) + from).toString(16);
  },
  getRandomColor: function(r, g, b) {
    return '#' + this.getRandomHex(r, 255) + this.getRandomHex(g, 255) + this.getRandomHex(b, 255);
  }
};

Space.prototype.init = function(container) {
  this.container = container;
  this.width = 800;
  this.height = 600;
  
  var canvas = document.createElement('canvas');
  container.appendChild(canvas);
  this.canvas = canvas;
  canvas.width = this.width;
  canvas.height = this.height;
};

Space.prototype.start = function() {
  for (var i = 0; i < 100; i++) {
    this.stars[i] = this.createNewStar();
  }

  var self = this;
  this.intervalId = setInterval(function() {
    self.update();
    self.draw();
  }, 1000 / this.fps);
};

Space.prototype.update = function() {
  var dt = 1 / this.fps;
  for (var i = 0; i < this.stars.length; i++) {
    var star = this.stars[i];
    
    star.y += dt * star.velocity;
    
    if (star.y > this.canvas.height) {
      this.stars[i] = this.createNewStar();
    }
  }
};

Space.prototype.draw = function() {
  var context = this.canvas.getContext('2d');
  
  // Fill dark
  context.fillStyle = '#000020';
  context.fillRect(0, 0, this.width, this.height);
  
  for (var i = 0; i < this.stars.length; i++) {
    var star = this.stars[i];
    context.fillStyle = star.color;
    context.beginPath();
    context.arc(star.x, star.y, star.size, 0, 2 * Math.PI, false);
    context.fill();
  }
};

Space.prototype.createNewStar = function() {
  return new Star(
      Math.random() * this.width
      , 0
      , Math.random() * 3 + 1
      , (Math.random() * (this.maxVelocity - this.minVelocity)) + this.minVelocity
      , utils.getRandomColor(200, 200, 200)
    );
};