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
 * Represent an interlevel screen
 * @constructor
 * @param {Game} game Game instance
 * @param {int} lives Count of lives on previous level
 * @param {int} score Score
 */
function InterlevelState(game, lives, score) {
  this.game = game;
  this.lives = lives;
  this.score = score;
  this.isDrawable = true;
}

/**
 * Redraws a screen
 * @param {Game} game Game instance
 * @param {Context} context HTML5 Canvas 2D-Context
 */
InterlevelState.prototype.draw = function(game, context) {
  if (!this.isDrawable) return;
  context.font = '72px Mono';
  context.fillStyle = '#ff0';
  context.textAlign = 'center';
  var title = 'LEVEL COMPLETED';
  context.fillText(title, game.width / 2, game.height / 2 + 36);

  context.font = '12px Mono';
  context.fillStyle = '#ff0';
  context.textAlign = 'center';
  context.fillText('Score: ' + this.score, game.width / 2, game.height / 2 + 80);
  context.fillText('Press [SPACE] to try again', game.width / 2, game.height / 2 + 97);
};

/**
 * On state leave event
 */
InterlevelState.prototype.leave = function() {
  this.isDrawable = false;
};

/**
 * On key press event
 * @param {int} keycode
 */
InterlevelState.prototype.keyDown = function(keycode) {
  if (keycode === Utils.const.SPACE) {
    var nextLevel = new GameState(this.game);
    nextLevel.lives = this.lives;
    nextLevel.score = this.score;
    this.game.setState(nextLevel);
  }
};