'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.font = exports.imageSize = exports.empty = undefined;

var _fonts = require('./fonts');

var _fonts2 = _interopRequireDefault(_fonts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var empty = exports.empty = function empty(name) {
  if (!name) return 'Empty input!';
  return true;
};

var imageSize = exports.imageSize = function imageSize(size) {
  if (!size) return 'Empty input!';
  var sizes = size.split('x').map(function (s) {
    return parseInt(s);
  });
  var width = sizes[0];
  var height = sizes[1];
  if (!Number.isInteger(width) || !Number.isInteger(height)) return 'Input [width(Integer)]x[height(Integer)].';
  return true;
};

var font = exports.font = function font(fontName) {
  var targetFont = _fonts2.default.availables.find(function (f) {
    return f.name === fontName;
  });
  if (!targetFont) return 'Invalid font name';
  return true;
};