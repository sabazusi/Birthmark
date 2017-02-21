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

var font = {
  availables: availableFonts
};

exports.default = font;