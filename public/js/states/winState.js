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

/**
 * Represent Win Screen state
 * @constructor
 * @param {Game} game Game instance
 * @param {int} score Score
 */
function WinState(game, score) {
  this.game = game;
  this.score = score;
  this.isDrawable = true;
}

/**
 * Redraws a state
 * @param {Game} game Game instance
 * @param {Context} context HTML5 Canvas 2D-Context
 */
WinState.prototype.draw = function(game, context) {
  if (!this.isDrawable) return;
  context.font = '72px Mono';
  context.fillStyle = '#ff0';
  context.textAlign = 'center';
  var title = 'MISSION COMPLETED';
  context.fillText(title, game.width / 2, game.height / 2 + 36);

  context.font = '12px Mono';
  context.fillStyle = '#ff0';
  context.textAlign = 'center';
  context.fillText('Press [SPACE] to try again', game.width / 2, game.height / 2 + 80);
};

/**
 * On state leave event
 */
WinState.prototype.leave = function() {
  this.isDrawable = false;
};

/**
 * On key press event
 * @param {int} keycode
 */
WinState.prototype.keyDown = function(keycode) {
  if (keycode === Utils.const.SPACE) 
    this.game.setState(new GameState(this.game));
};
