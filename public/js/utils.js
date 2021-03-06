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

var Utils = {
  /**
   * Returns random hex number between range
   * @param {int} from Start of range
   * @param {int} to End of range
   * @returns {String} HEX number
   */
  getRandomHex: function(from, to) {
    return Math.floor(Math.random() * (to - from) + from).toString(16);
  },
  /**
   * Returns random colour
   * @param {type} r Start of red range
   * @param {type} g Start of green range
   * @param {type} b Start of blue range
   * @returns {String} Colour
   */
  getRandomColor: function(r, g, b) {
    return '#' + this.getRandomHex(r, 255) + this.getRandomHex(g, 255) + this.getRandomHex(b, 255);
  },
  /**
   * Checks intersection of two rectangles
   * @param {type} a
   * @param {type} b
   * @returns {Boolean}
   */
  rectIntersects: function(a, b) {
    var foo = ((a.x + a.width < b.x) || (a.x > b.x + b.width))
        || ((a.y + a.height < b.y) || (a.y > b.y + b.height));
    return !foo;
  },
  /**
   * Key constants
   * @type type
   */
  const: {
    SPACE: 32,
    LEFT: 37,
    RIGHT: 39
  }
};
