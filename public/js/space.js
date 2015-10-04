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

function Space(canvas) {
  this.canvas = canvas;
  this.context = canvas.getContext('2d');
  this.stars = [];
  
  this.config = {
    starCount: 142,
    minStarVelocity: 42,
    maxStarVelocity: 82
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
