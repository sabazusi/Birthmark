'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fontManager = require('font-manager');

var _fontManager2 = _interopRequireDefault(_fontManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var availableFonts = _fontManager2.default.getAvailableFontsSync().map(function (font) {
  return {
    name: font.postscriptName,
    path: font.path
  };
});

var rangedStartsWith = function rangedStartsWith(target, range) {
  return range.some(function (p) {
    return target.name.toUpperCase().startsWith(p.toUpperCase());
  });
};

var allocate = function allocate(fonts) {
  var allocated = {
    'a-c': [],
    'd-f': [],
    'g-i': [],
    'j-l': [],
    'm-o': [],
    'p-r': [],
    's-u': [],
    'v-z': [],
    'others': []
  };
  fonts.forEach(function (f) {
    if (rangedStartsWith(f, ['a', 'b', 'c'])) {
      allocated['a-c'].push(f);
    } else if (rangedStartsWith(f, ['d', 'e', 'f'])) {
      allocated['d-f'].push(f);
    } else if (rangedStartsWith(f, ['g', 'h', 'i'])) {
      allocated['g-i'].push(f);
    } else if (rangedStartsWith(f, ['j', 'k', 'l'])) {
      allocated['j-l'].push(f);
    } else if (rangedStartsWith(f, ['m', 'n', 'o'])) {
      allocated['m-o'].push(f);
    } else if (rangedStartsWith(f, ['p', 'q', 'r'])) {
      allocated['p-r'].push(f);
    } else if (rangedStartsWith(f, ['s', 't', 'u'])) {
      allocated['s-u'].push(f);
    } else if (rangedStartsWith(f, ['v', 'w', 'x', 'y', 'z'])) {
      allocated['v-z'].push(f);
    } else {
      allocated['others'].push(f);
    }
  });
  return allocated;
};

var font = {
  availables: availableFonts,
  allocated: allocate(availableFonts)
};

exports.default = font;